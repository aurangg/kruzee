import React, { useCallback, useEffect, useRef, useState } from 'react';
import './onboarding.css';
import {Link} from 'react-router-dom';
import Toolbar from '../Common/Toolbar';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import NoResult from './NoResult';
import { Link as Linked, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


const instructorSet = [
    {
        id:0,
        name:"Phil Jacobson",
        img:[
            {
                id:0,
                url:"driver-img.png"
            },
            {
                id:1,
                url:"driver-car.png"
            },
        ],
        description:"Hey everyone. My name is Phil and I’m a driving instructor for Kitchener Ontario. I’ve been doing this for five years and I love driving. It is my passion",
        car:"2010 Toyota Highlander",
        languages:[
            {
                id:0,
                languageName:"English",
            },
            {
                id:1,
                languageName:"French",
            },
            {
                id:2,
                languageName:"German",
            },
        ],
        transmission:"Automatic",
        reviews:[
            {
                id:0,
                review:"Maria was the best. I couldn’t have imagined doing this with another instructor. Thanks!",
                reviewBy:"Maria Hernandez",
                reviewRating:5.0
            },
            {
                id:1,
                review:"Wow Phil was awesome. I don’t  know what I would have done without him!",
                reviewBy:"Maria Hernandez",
                reviewRating:4.8
            }
        ],
        week:[
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
                date:2,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"2am",
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
                date:3,
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
                date:6,
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
                date:7,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"7am",
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
        ]

    },
    {
        id:1,
        name:"Maria Antanovia",
        img:[
            {
                id:0,
                url:"driver-img.png"
            },
            {
                id:1,
                url:"driver-car.png"
            },
        ],
        description:"Hey everyone. My name is Maria and I’m a driving instructor for Kitchener Ontario. I’ve been doing this for five years and I love driving. It is my passion",
        car:"2010 Toyota Highlander",
        languages:[
            {
                id:0,
                languageName:"English",
            },
            {
                id:1,
                languageName:"French",
            },
            {
                id:2,
                languageName:"German",
            },
        ],
        transmission:"Manual",
        reviews:[
            {
                id:0,
                review:"Maria was the best. I couldn’t have imagined doing this with another instructor. Thanks!",
                reviewBy:"Maria Hernandez",
                reviewRating:4.8
            },
            {
                id:1,
                review:"Wow Maria was awesome. I don’t  know what I would have done without him!",
                reviewBy:"Maria Hernandez",
                reviewRating:4.8
            }
        ],
        week:[
            {
                id:0,
                day:"Sun",
                date:8,
                current:true,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"8am",
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
                date:9,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"9am",
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
                date:10,
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
                date:11,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"11am",
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
                date:12,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"12am",
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
                date:13,
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
                date:14,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"14am",
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
        ]

    },
    {
        id:2,
        name:"John Doe",
        img:[
            {
                id:0,
                url:"driver-img.png"
            },
            {
                id:1,
                url:"driver-car.png"
            },
        ],
        description:"Hey everyone. My name is John Doe and I’m a driving instructor for Kitchener Ontario. I’ve been doing this for five years and I love driving. It is my passion",
        car:"2010 Toyota Highlander",
        languages:[
            {
                id:0,
                languageName:"German",
            },
            {
                id:1,
                languageName:"English",
            },
            {
                id:2,
                languageName:"German",
            },
        ],
        transmission:"Automatic",
        reviews:[
            {
                id:0,
                review:"John was the best. I couldn’t have imagined doing this with another instructor. Thanks!",
                reviewBy:"Maria Hernandez",
                reviewRating:4.8
            },
            {
                id:1,
                review:"Wow John was awesome. I don’t  know what I would have done without him!",
                reviewBy:"Maria Hernandez",
                reviewRating:4.8
            }
        ],
        week:[
            {
                id:0,
                day:"Sun",
                date:15,
                current:true,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"15am",
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
                date:16,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"16am",
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
                date:17,
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
                date:18,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"18am",
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
                date:19,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"19am",
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
                date:20,
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
                date:21,
                current:false,
                available:true,
                timeSlots : [
                    {
                        id:0,
                        startingTime:"21am",
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
        ]

    },
]

function BookSessionTest(){

    const [weekId, setWeekId] = useState()
    const [visible, setVisible] = useState(false)
    const [display, setDisplay] = useState(false)
    function scrollTo() {
        scroller.scrollTo('scroll-to-element', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }

    const instructor = true
    if(!instructor){
        return <NoResult />
    }
    const overlayFnOn = (id, i) => () => {
        setWeekId(id)
        setVisible(true)
        setDisplay(true)
        // display.current = "flex"
        // console.log(display.current)
        // document.getElementById("overlay").style.display="flex"
    }
    return(
        <section className='simple-bg'>
            <div className='container'>
                <Toolbar path="/packages" back_button="block" />
                <div className='row'>
                    <ProgressBar />
                    <div className='col-lg-6 offset-lg-3'>
                        <LargeHeading large_heading="Book your first driving lesson" />
                        <p className='onboarding-description'>
                            Showing <span className='color-blue700 weight-700'>2</span> instructors within <span className='color-blue700 weight-700'>10km</span> of you
                        </p>
                    </div>
                </div>
            {/* <button to="lastContainer" onClick={() => scrollTo()}>Button</button> */}
            </div>
            <div className={instructorSet.length > 2 ? 'container-fluid container-scroll' : 'container-fluid container-scroll container-for-2'}>
                <div className={instructorSet.length > 2 ? 'row row-scroll flex-nowrap' : 'row row-scroll flex-nowrap row-for-2'}>
                    <div className='col-lg-1'></div>
                    {instructorSet.map((i => (
                        <div className='col-lg-4 scroll-col' key={i.id} id="col-3">
                            <div className='instructor-box'>
                                <div className='instructor-start-info'>
                                    <img className='instructor-picture' src={process.env.PUBLIC_URL + `/images/${i.img[0].url}`} alt="driver-img" />
                                    <img className='instructor-picture instructor-picture-2' src={process.env.PUBLIC_URL + `/images/${i.img[1].url}`} alt="driver-car" />
                                    <h6 className='instructor-name color-gray900'>
                                        {i.name}
                                    </h6>
                                </div>
                                <div className='instruction-description-box'>
                                    <p className='instructor-description color-gray900'>
                                        {i.description}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        {i.car}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        Speaks {i.languages[0].languageName}, {i.languages[1].languageName} and {i.languages[2].languageName}
                                    </p>
                                </div>
                                <div className='features-box'>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
                                    </div>
                                    <p className='feature-info color-gray900'>
                                        {i.transmission} Transmission
                                    </p>
                                </div>
                                <h6 className='student-reviews color-gray900'>
                                    Student Reviews
                                </h6>
                                <div className='review-container'>
                                    {i.reviews.map((r => (
                                        <div className='review-box bg-gray100' key={r.id}>
                                            <p className='review color-gray900'>
                                                {r.review}
                                            </p>
                                            <div className='space-between-baseline'>
                                                <h6 className='review-name'>
                                                    {r.reviewBy}
                                                </h6>
                                                <div className='ratings'>
                                                    <p className='rating-score color-gray900'>
                                                        {r.reviewRating}
                                                    </p>
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
                                    )))}
                                </div>
                                <button className='see-schedule-btn bg-blue500' onClick={overlayFnOn(i.id)}>
                                        See Schedule
                                </button>
                            </div>
                        </div>
                    )))}
                    {visible && <Overlay props={instructorSet} weekId={weekId} display={display}/>}
                    <div className='col-lg-1' id='col-1'></div>
                </div>
            </div>
        </section>
    )
}

const Overlay = ({props, weekId, display}) =>{
    const instructor = props
    const weekID = weekId
    // const [display, setDisplay] = useState("none")
    const newArr = instructor[weekID]
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [dateId, setDateId] = useState(0)
    const [activeState, setActiveState] = useState(false)
    const [btn, setBtn] = useState(false)

    const [index, setIndex] = useState(0)

    const overlayFnOff = () => {
        
    }
    const handleTimeSlot = useCallback((k, start, end) => {
        return (e) => {
            setStart(start)
            setEnd(end)
            setActiveState(k)
            setIndex(k)
            setBtn(true)
        }
    })

    const handleDateChange = (arr) => {
        // console.log(arr)
        // console.log("Date: ", dateId)
        return (
            <div>
                {arr.week[dateId].timeSlots.map(((k, index) => (
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

    return(
        <div id='overlay' className='overlay' style={{display: display ? "flex" : "none"}}>
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
                                            <button className='time-slot-btn left-time-btn'>
                                                <img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
                                            </button>
                                            <button className='time-slot-btn right-time-btn'>
                                                <img src={process.env.PUBLIC_URL + '/images/right.svg'} alt="right-img" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='space-between-baseline'>
                                        {newArr.week.map((k => (
                                            <div className='' key={k.id} >
                                                <button className='week color-gray700' onClick={() => setDateId(k.id)} disabled={!k.available}>
                                                    {k.day}
                                                    <div className={k.current ? 'blue-date-box date-box' : 'date-box white-date-box'}>
                                                        <p className={k.available ? 'color-gray900 date' : 'date color-gray700'}>
                                                            {k.date}
                                                        </p>
                                                    </div>
                                                </button>
                                            </div>
                                        )))}
                                    </div>
                                    <div className='available-slots'>
                                        {handleDateChange(newArr)}
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
    )
}

export default BookSessionTest;