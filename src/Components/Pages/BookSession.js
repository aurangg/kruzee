import React, { useCallback, useEffect, useState } from 'react';
import './onboarding.css';
import {Link} from 'react-router-dom';
import Toolbar from '../Common/Toolbar';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import NoResult from './NoResult';
import {useLocation} from 'react-router-dom';
import Loader from '../Common/Loader';
import { format, getMonth } from "date-fns";
import { callTime } from "../Common/utils";
import SmallLoader from '../Common/SmallLoader';
import FourOFour from '../Common/404';
import { getPostalCode } from '../localStorage';


function BookSession(){
    const [dateId, setDateId] = useState(0)
    const [activeState, setActiveState] = useState(false)
    const [btn, setBtn] = useState(false)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [week, setWeek] = useState(0);

    const [slots, setSlots] = useState(0)



    const currentDate = () => {
        const curr = new Date();
        return curr;
      };

    const daysInWeek = [
        { day: "Sunday" },
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
    ];


    const weeks = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]

    const [loading, setLoading] = useState(true)
    const [errorRes, setErrorRes] = useState(false)

    const [schedule, setSchedule] = useState([])
    const postalCode = getPostalCode().replace(/"/g, '');
    const [data, setData] = useState([])
    const location = useLocation()
    const [instructor, setInstructorId] = useState('')

    const [selected, setSelected] = useState(0)
    const [slot, setSlot ] = useState(0);
    const [date, setDate] = useState(0)
    const [weekStartDate, setWeekStartDate] = useState('')
    const [bookedSlots, setBookedSlots] = useState(0)
    const [firstDay, setFirstDay] = useState(0)
    const [firstDay2, setFirstDay2] = useState(0)
    const [lastDay, setLastDay] = useState(0)
    const [lastDay2, setLastDay2] = useState(0)

    const [showMore, setShowMore] = useState(false) 

    const [instructorName, setInstructorName] = useState('')

    const [timeLoader, setTimeLoader] = useState(false)

    const [bookedStatus, setBookedStatus] = useState(false)

    const [instructorImage, setInstructorImage] = useState('')
    const [instructorVehicleImage, setInstructorVehicleImage] = useState('')

    const url = "https://kruzeee.tk"

    useEffect(() => {
        document.title = "Book A Lesson | Kruzee"
        localStorage.removeItem('instructorName')
        localStorage.removeItem("date")
        localStorage.removeItem("day")
        localStorage.removeItem("slot")
        localStorage.removeItem("instructorId")
        localStorage.removeItem("weekStartDate")
        localStorage.removeItem("instructorImage")
        localStorage.removeItem("instructorVehicleImage")
    },[])

    const fetchTopThreeInstructor = async () => {
        try {
            const instructorData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/searchTopThreeInstructors`, {
                method:"POST",
                body:JSON.stringify({postalCode}),
                headers:{
                    "Content-Type":"application/json",
                },
            })
            const json = await instructorData.json();
            setData(json.data);
          } catch (error) {
            setErrorRes(true)
          } finally {
            setLoading(false);
          }
    }


    useEffect(() => {
        let ignore = false;
        if(!ignore) fetchTopThreeInstructor(postalCode)
        return() => {ignore = true}
    },[])


    useEffect(() => {
        if(instructor != ''){
            fetchSchedule(instructor)
            localStorage.setItem("instructorId", JSON.stringify(instructor))
        }
        return() => {}
    },[instructor])

    const fetchSchedule = async () => {
        try{
            const scheduleData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${instructor}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const scheduleJsonData = await scheduleData.json()
            setSchedule(scheduleJsonData.data.bookings)
            setSlots(scheduleJsonData.data.slots)
            setInstructorImage(scheduleJsonData.data.instructorImage)
            setInstructorVehicleImage(scheduleJsonData.data.vehicleDetails.image)
            setBookedSlots(scheduleJsonData.data.bookedSlots)
        } catch(error){
            setErrorRes(true)
        } finally{
            setLoading(false)
            setTimeLoader(true)
        }
    }


    
    const nextWeek = () => {
        if (week < 23) {
            setWeek(week + 1);
            handleFirstDay();
            // setActiveIndex(0)
        }
    };

    const previousWeek = () => {
        if (week > 0) {
            setWeek(week - 1);
            handleFirstDay();
            // setActiveIndex(0)
        }
    };



    const [slotDay, setSlotDay] = useState('Sunday')


    const handleTimeSlot = (index, bool) => {
        setActiveState(index)
        if(bool == false){
            setBtn(false)
        }
        else{
            setBtn(true)
        }
        localStorage.setItem("day", JSON.stringify(slotDay.toLowerCase()))
        localStorage.setItem("slot", JSON.stringify(index))
    }

    const overlayFnOn = () => {
        document.getElementById("overlay").style.display="flex";
    }

    const overlayFnOff = () => {
        document.getElementById("overlay").style.display="none";
    }

    const handleFirstDay = useCallback(() => {
        let currentWeek = Number(week * 7);
        var curr = new Date();
        var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
        var weekFirstDay = new Date(
          currNext.setDate(currNext.getDate() - currNext.getDay() + 0)
        );
        var weekLastDay = new Date(
          currNext.setDate(currNext.getDate() - currNext.getDay() + 6)
        );
        const dayFirst = format(weekFirstDay, "yyyy-MM-dd");
        const dayLast = format(weekLastDay, "yyyy-MM-dd");
        const dayFirst2 = format(weekFirstDay, "MMMM dd");
        const dayLast2 = format(weekLastDay, "MMMM dd");
        setFirstDay2(dayFirst2);
        setLastDay2(dayLast2);
        setFirstDay(dayFirst);
        setLastDay(dayLast);
    }, [week]);

    const getBookedSlots = (staTime) => {
        if(bookedSlots){
            const bookedSlotsData = bookedSlots?.find((item) => {
                return item.startDate.split("T")[0] === staTime;
        });
            return bookedSlotsData;
        }
    };

    const slotsBooked = getBookedSlots(firstDay);

    useEffect(() => {
        handleFirstDay();
    }, [firstDay, lastDay, week, handleFirstDay]);



    function handleDate(index){
        let currentWeek = Number(week * 7);
        var curr = new Date();
        var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
        var firstday = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + index));
        const Day = format(firstday, "yyyy-MM-dd")
        return Day
    }

    const onPackageClick = (key, day, isDisabled, isPrevious) => {
        if (!isDisabled && !isPrevious) {
          setSelected(key);
          setSlot({
            date: firstDay,
            day: key.split("-")[0],
            slot: key.split("-")[1],
          });
          setDate(handleDate(day)[2]);
        }
    };


    const [activeIndex, setActiveIndex] = useState(0)

    const handleIndex = (index) => {
        setActiveIndex(index)
    }

    
    function setSelectedInstructorInfo(){
        localStorage.setItem("instructorName", JSON.stringify(instructorName))
        localStorage.setItem("instructorImage", JSON.stringify(instructorImage))
        localStorage.setItem("instructorVehicleImage", JSON.stringify(instructorVehicleImage))
    }

    const [dateSelected, setDateSelected] = useState('')

    useEffect(() => {
        handleDateSelected(handleDate(weeks.findIndex(e => e === slotDay)))
    })

    function handleDateSelected(date){
        if(date !== ''){
            setDateSelected(date)
            localStorage.setItem("date", JSON.stringify(date))
            localStorage.setItem("weekStartDate", JSON.stringify(firstDay))
        }
    }

    const [slotsAvailable, setSlotsAvailable] = useState(false)

    useEffect(() => {
        slots[`${slotDay.toLowerCase()}`]?.map((slot, index) => {
            const numberSlot = Math.abs(slot.startTime - slot.endTime);
            const numberSlotArray = Array.from(Array(numberSlot).keys());
            return numberSlotArray.map((item, index_2) => {
                const time = slot.startTime + item;
                let booked = "";
                if (slotsBooked) {
                        booked = slotsBooked[`${slotDay.toLowerCase()}`];
                }
                const isBooked = booked?.includes(time);
                const totalTime = slots[`${slotDay.toLowerCase()}`][0].endTime - slots[`${slotDay.toLowerCase()}`][0].startTime
                if(slotsBooked[`${slotDay.toLowerCase()}`].length === totalTime){
                    setSlotsAvailable(true)
                }
                else{
                    setSlotsAvailable(false)
                }
            });
        })
    }, [slotDay])



    if(loading){
        return <Loader />
    }
    if(data.length === 0){
        return <NoResult />
    }
    if(errorRes){
        return <FourOFour />
    }
    return(
        <section className='simple-bg h-100vh'>
            <div id='overlay' className='overlay'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 offset-lg-3'>
                            <div className='time-slot'>
                                <div className='time-slot-header'>
                                    <div className='space-between'>
                                        <div className='align-items'>
                                            <img className='time-slot-driver-img' src={`${process.env.REACT_APP_BASE_URL}${instructorImage}`} alt="driver-img" />
                                            {/* <img className='time-slot-driver-img' src="https://kruzeee.tk/uploads/image-1650487578785.JPG" alt="driver-img" /> */}
                                            <p className='time-slot-heading color-gray900'>
                                                Select a time slot
                                            </p>
                                        </div>
                                        <img src={process.env.PUBLIC_URL + '/images/cancel.svg'} alt="driver-img" onClick={overlayFnOff} style={{cursor:"pointer"}} />
                                    </div>
                                </div>
                                <div className='time-slot-divider'></div>
                                <div className='time-body'>
                                    <div className='row time-body-header'>
                                        <div className='col-4'></div>
                                        <div className='col-4 align-items-center'>
                                            <h5 className='month color-gray900'>
                                                {`${firstDay2} - ${lastDay2}`}
                                            </h5>
                                        </div>
                                        <div className='col-4 flex-end'>
                                            <button className='time-slot-btn left-time-btn' onClick={previousWeek}>
                                                <img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
                                            </button>
                                            <button className='time-slot-btn right-time-btn' onClick={nextWeek}>
                                                <img src={process.env.PUBLIC_URL + '/images/right.svg'} alt="right-img" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='time-slot-spacing' style={{width:"100%"}}>
                                        {daysInWeek.map((dayInWeek, index) => (
                                            <React.Fragment key={index}>
                                                <button className='week color-gray700'>
                                                    {dayInWeek.day.slice(0,3)}
                                                    <div className={`date-box ${ activeIndex === index ? 'blue-date-box' : 'white-date-box'}`} onClick={() => {setSlotDay(dayInWeek.day); handleIndex(index);handleTimeSlot(index, false); }}>
                                                        <p className={`date`}>
                                                            {handleDate(index).slice(8, 10)}
                                                        </p>
                                                    </div>
                                                </button>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {
                                        timeLoader === false ? 
                                        <SmallLoader />
                                        :<div >
                                            {slots[`${slotDay.toLowerCase()}`].length !== 0 ?
                                                <div className='available-slots'>
                                                    {slots[`${slotDay.toLowerCase()}`]?.map((slot, index) => {
                                                        const numberSlot = Math.abs(slot.startTime - slot.endTime);
                                                        const numberSlotArray = Array.from(Array(numberSlot).keys());
                                                        return numberSlotArray.map((item, index_2) => {
                                                            const time = slot.startTime + item;
                                                            let booked = "";
                                                            if (slotsBooked) {
                                                                    booked = slotsBooked[`${slotDay.toLowerCase()}`];
                                                            }
                                                            const isBooked = booked?.includes(time);
                                                            const key = `${slotDay.toLowerCase()}-${time}`;
                                                            const isPrevious = currentDate() >= handleDate(index)[1];
                                                            return (
                                                                <div key={item} onLoad={() => setBookedStatus(isBooked)}>
                                                                    {isBooked ? 
                                                                    <></>
                                                                    :
                                                                    <div value={item} className={`available-slot-box ${activeState === time ? 'active-slot-box' : ''}`} onClick={(e) => {onPackageClick(key, index, isBooked, isPrevious); handleTimeSlot(time, true);}}>
                                                                        <p className='time-available color-gray900'>
                                                                            {callTime(time)} - {callTime(time + 1)}
                                                                        </p>
                                                                    </div>
                                                                    }
                                                                </div>
                                                            );
                                                        });
                                                    })}
                                                </div>
                                            :
                                             <>
                                             {slotsAvailable === true ? '' : <p className='apologies-text'>Whoops! Looks like there are no time slots available. Please try selecting a different date 🥺</p>}
                                             </>
                                            }
                                            {slotsAvailable === true ? <p className='apologies-text'>Whoops! Looks like there are no time slots available. Please try selecting a different date 🥺</p>: ''}
                                            <Link to="/pick-up" onClick={setSelectedInstructorInfo}>
                                                <div className={`time-slot-continue-btn bg-blue500 ${btn ? ' display-block' : 'display-none'}`}>
                                                    Continue
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Toolbar path="/driving-test" back_button="block" />
                <div className='row'>
                    <ProgressBar 
                        location={[{
                            progress:"complete",
                        }]} 
                        packages={[{
                            progress:"complete"
                        }]} 
                        pickup={[{
                            progress:"current"
                        }]} 
                        account={[{
                            progress:"incomplete"
                        }]} 
                        payment={[{
                            progress:"incomplete"
                        }]}
                    />
                    <div className='col-12'>
                        <LargeHeading large_heading={location.state.heading_name} />
                        <p className='onboarding-description'>
                            Showing <span className='no-index-padding color-blue700 weight-700'>{data.length}</span> {data.length === 1 ? 'instructor' : 'instructors'} within <span className='no-index-padding color-blue700 weight-700'>10km</span> of you
                        </p>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row instructor-box-row'>
                    
                    {data.map(((i, index) => (
                        <div className='col-lg-4' key={index}>
                            <div className='instructor-box'>
                                <div className='instructor-start-info'>
                                    {/* <img className='instructor-picture' src={process.env.PUBLIC_URL + '/images/driver-img.png'} alt="driver-img" />
                                    <img className='instructor-picture instructor-picture-2' src={process.env.PUBLIC_URL + '/images/driver-car.png'} alt="driver-img" /> */}
                                    <img className='instructor-picture' src={`${process.env.REACT_APP_BASE_URL}${i.instructorImage}`} alt="driver-img" />
                                    <img className='instructor-picture instructor-picture-2' src={`${process.env.REACT_APP_BASE_URL}${i.vehicleDetails.image}`} alt="driver-car" />
                                    <h6 className='instructor-name color-gray900'>
                                        {i.fullName}
                                    </h6>
                                </div>
                                <div className='instruction-description-box'>
                                    <p className='instructor-description color-gray900'>
                                        {i.bio}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        {i.vehicleDetails.year} {i.vehicleDetails.make} {i.vehicleDetails.model}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        Speaks {i.languages[0]}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        {i.vehicleDetails.transmission} Transmission
                                    </p>
                                </div>
                                <h6 className='student-reviews color-gray900'>
                                    Student Reviews
                                </h6>
                                <div className='review-container'>
                                    <div className='review-box bg-gray100'>
                                        <p className={`review color-gray900 review-text ${showMore ? 'display-block' : 'webkit-box'}`}>
                                            {i.fullName === "Cory Froklage" ? 
                                            "I had Cory who was very detail oriented and generous with his knowledge. You’ll learn defensive driving techniques that other schools won’t teach, like the S approach and ABS. Highly recommend!" : 
                                            (i.fullName === "Zainab Qiam" ? 
                                            "I learned how to drive thanks to Kruzee, my instructor was great at making points and it stuck with me, diagrams helped a lot too!" : 
                                            "I couldn’t have imagined doing these lessons with an instructor with a platform other than Kruzee. Thanks!")}
                                        </p>
                                        <button className='review-span' onClick={() => setShowMore(!showMore)}>
                                            {showMore ? 'Show Less' : 'See More'}
                                        </button>
                                        <div className='space-between-baseline'>
                                            <h6 className='review-name'>
                                                {i.fullName === "Cory Froklage" ? "Hoang N." : (i.fullName === "Zainab Qiam" ? "Ali R." : "Maria Hernandez")}
                                            </h6>
                                            <div className='ratings'>
                                                <p className='rating-score color-gray900'>4.5</p>
                                                <div>
                                                    <img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
                                                    <img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
                                                    <img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
                                                    <img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
                                                    <img src={process.env.PUBLIC_URL + '/images/half-star.svg'} alt="star" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='see-schedule-btn bg-blue500' onClick={() => {overlayFnOn(); setInstructorId(i._id); setInstructorName(i.fullName)}}>
                                        See Schedule
                                </button>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </section>
    )
}

export default BookSession;
