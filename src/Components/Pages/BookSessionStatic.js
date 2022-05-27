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

function BookSession(){
    const [dateId, setDateId] = useState(0)
    const [activeState, setActiveState] = useState(false)
    const [btn, setBtn] = useState(false)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [slots, setSlots] = useState(0)


    const week =[
        {
            id:0,
            day:"Sun",
            date:1,
            current:true,
            available:true,
            timeSlots : [
                {
                    id:0,
                    startingTime:"1am",
                    endingTime:"10am",
                    active:true,
                },
                {
                    id:1,
                    startingTime:"10am",
                    endingTime:"11am",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"11:30am",
                    endingTime:"12:30pm",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"2pm",
                    endingTime:"3pm",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"4pm",
                    endingTime:"5pm",
                    active:false,
                },
            ]
        },
        {
            id:1,
            day:"Mon",
            date:22,
            current:false,
            available:true,
            timeSlots : [
                {
                    id:0,
                    startingTime:"822am",
                    endingTime:"10am",
                    active:true,
                },
                {
                    id:1,
                    startingTime:"11pm",
                    endingTime:"12am",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"11:30am",
                    endingTime:"12:30pm",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"2pm",
                    endingTime:"3pm",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"4pm",
                    endingTime:"5pm",
                    active:false,
                },
            ]
        },
        {
            id:2,
            day:"Tues",
            date:2,
            current:false,
            available:false,
            timeSlots : [
                {
                    id:0,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:1,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
            ]
        },
        {
            id:3,
            day:"Wed",
            date:3,
            current:false,
            available:true,
            timeSlots : [
                {
                    id:0,
                    startingTime:"3am",
                    endingTime:"10am",
                    active:true,
                },
                {
                    id:1,
                    startingTime:"10am",
                    endingTime:"11am",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"11:30am",
                    endingTime:"12:30pm",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"2pm",
                    endingTime:"3pm",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"4pm",
                    endingTime:"5pm",
                    active:false,
                },
            ]
        },
        {
            id:4,
            day:"Thu",
            date:5,
            current:false,
            available:true,
            timeSlots : [
                {
                    id:0,
                    startingTime:"5am",
                    endingTime:"10am",
                    active:true,
                },
                {
                    id:1,
                    startingTime:"10am",
                    endingTime:"11am",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"11:30am",
                    endingTime:"12:30pm",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"2pm",
                    endingTime:"3pm",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"4pm",
                    endingTime:"5pm",
                    active:false,
                },
            ]
        },
        {
            id:5,
            day:"Fri",
            date:26,
            current:false,
            available:false,
            timeSlots : [
                {
                    id:0,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:1,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"0",
                    endingTime:"0",
                    active:false,
                },
            ]
        },
        {
            id:6,
            day:"Sat",
            date:4,
            current:false,
            available:true,
            timeSlots : [
                {
                    id:0,
                    startingTime:"4am",
                    endingTime:"10am",
                    active:true,
                },
                {
                    id:1,
                    startingTime:"61am",
                    endingTime:"11am",
                    active:false,
                },
                {
                    id:2,
                    startingTime:"11:30am",
                    endingTime:"12:30pm",
                    active:false,
                },
                {
                    id:3,
                    startingTime:"2pm",
                    endingTime:"3pm",
                    active:false,
                },
                {
                    id:4,
                    startingTime:"4pm",
                    endingTime:"5pm",
                    active:false,
                },
            ]
        },
    ]

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

    const [loading, setLoading] = useState(true)
    const [errorRes, setErrorRes] = useState(false)

    const [schedule, setSchedule] = useState([])
    const postalCode = localStorage.getItem("postalCode")
    const [data, setData] = useState([])
    const location = useLocation()
    const [instructor, setInstructorId] = useState('')
    const [slicedArray, setSlicedArray] = useState([])

    const fetchTopThreeInstructor = async () => {
        try {
            const instructorData = await fetch(process.env.REACT_APP_TOP_THREE_INSTRUCTOR, {
                method:"POST",
                body:JSON.stringify({postalCode}),
                headers:{
                    "Content-Type":"application/json",
                },
            })
            const json = await instructorData.json();
            setData(json.data);
            console.log(json.data)
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
        }
        return() => {}
    },[instructor])

    const fetchSchedule = async () => {
        try{
            const scheduleData = await fetch(`${process.env.REACT_APP_GET_INSTRUCTOR_DETAIL}${instructor}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const scheduleJsonData = await scheduleData.json()
            setSchedule(scheduleJsonData.data.bookings)
            setSlots(scheduleJsonData.data.slots)
        } catch(error){
            setErrorRes(true)
        } finally{
            setLoading(false)
        }
    }

    function handleInstructorName(name){
        localStorage.setItem("instructorName", JSON.stringify(name))
    }

    // useEffect(() => {
    //     if(schedule.length != 0){
    //         setSlicedArray(schedule.slice(0, 7))
    //         const test = schedule.slice(0, 7)
    //         const findElement = console.log(test[0].friday)
    //         let startDate= test[0].startDate
    //     }
    //     return() => {}
    // }, [schedule])

    // function findFirstDate(slicedArray){
    //     for(let i= 0; i < slicedArray.length; i++){

    //     }
    // }

    
    const nextWeek = () => {
        // if (week < 23) {
        //     setWeek(week + 1);
        //     handleFirstDay();
        // }
    };

    const previousWeek = () => {
        // if (week > 0) {
        //     setWeek(week - 1);
        //     handleFirstDay();
        // }
    };



    const handleTimeSlot = useCallback((k, start, end) => {
        return (e) => {
            setStart(start)
            setEnd(end)
            setActiveState(k)
            setBtn(true)
        }
    })

    const overlayFnOn = () => {
        document.getElementById("overlay").style.display="flex";
    }

    const overlayFnOff = () => {
        document.getElementById("overlay").style.display="none";
    }

    const handleDateChange = () => {
        const result = week.filter(w => w.id === dateId)
        const newArr = [...result[0].timeSlots]
        return (
            <div>
                {newArr.map(((k, index) => (
                    <div 
                        className={activeState === index ? 'available-slot-box active-slot-box' : 'available-slot-box'} 
                        key={k.id} 
                        onClick={handleTimeSlot(index, k.startingTime, k.endingTime)}
                    >
                        <p className='time-available color-gray900'>
                            {k.startingTime} - {k.endingTime}
                        </p>
                    </div>
                )))}
            </div>
        );
    }

    function handleDate(day){
        let currentWeek = Number(week * 7);
        var curr = new Date();
        var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
        var firstday = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + day));
        const Day = format(firstday, "dd")
        return Day
    }

    function handleSlots(){
        if(slots !== 0){
            {slots.map((slot, index) => (
                <div className='available-slot-box'>
                </div>
            ))}
        }
    }


    if(loading){
        // return <NoResult />
        return <Loader />
    }
    if(errorRes){
        return <NoResult />
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
                                            <img src={process.env.PUBLIC_URL + '/images/driver-img.png'} alt="driver-img" />
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
                                            <h5 className='month'>
                                                March
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
                                        {week.map((i => (
                                            <button className='week color-gray700' onClick={() => setDateId(i.id)} disabled={!i.available} key={i.id}>
                                                {i.day}
                                                <div className={i.current ? 'blue-date-box date-box' : 'date-box white-date-box'}>
                                                    <p className={i.available ? 'color-gray900 date' : 'date color-gray700'}>
                                                        {i.date}
                                                    </p>
                                                </div>
                                            </button>
                                        )))}
                                    </div>
                                    <div className='available-slots'>
                                        {handleDateChange()}
                                    </div>
                                    <Link to="/pick-up">
                                        <div className={btn ? 'time-slot-continue-btn bg-blue500 display-block' : 'time-slot-continue-btn bg-blue500 display-none'}>
                                            Continue
                                        </div>
                                    </Link>
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
                            Showing <span className='color-blue700 weight-700'>{data.length}</span> {data.length === 1 ? 'instructor' : 'instructors'} within <span className='color-blue700 weight-700'>10km</span> of you
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
                                    <img className='instructor-picture' src={`kruzee-backend.herokuapp.com${i.instructorImage}`} alt="driver-img" />
                                    <img className='instructor-picture instructor-picture-2' src={`kruzee-backend.herokuapp.com${i.vehicleDetails.image}`} alt="driver-car" />
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
                                        <p className='review color-gray900'>
                                            Phil was the best. I couldn’t have imagined doing this with another instructor. Thanks!
                                        </p>
                                        <div className='space-between-baseline'>
                                            <h6 className='review-name'>
                                                Maria Hernandez
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
                                <button className='see-schedule-btn bg-blue500' onClick={() => {overlayFnOn(); setInstructorId(i._id); handleInstructorName(i.fullName)}}>
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