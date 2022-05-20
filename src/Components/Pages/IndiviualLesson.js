import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import Toolbar from '../Common/Toolbar';
import './onboarding.css';
import './radio-button.css';


function IndiviualLesson(){
    const values = [
        {
            id:0,
            lessons:1,
            price:55,
            save:false,
            saveAmount:0,
            icon:""
        },
        {
            id:1,
            lessons:5,
            price:255,
            save:true,
            saveAmount:30,
            icon:"celebrate"
        },
        {
            id:2,
            lessons:10,
            price:450,
            save:true,
            saveAmount:100,
            icon:"amazing"
        },
    ]
    const [activeClass, setActiveClass] = useState(null)
    const [disabled, setDisable] = useState(true)
    const [radioValue, setRadioValue] = useState("Value 1")
    const handleChange = useCallback((index) => {
        return (e) => {
            setRadioValue(e.target.value)
            console.log(index)
            setActiveClass(index)
            setDisable(false)
        }
    })
    return(
        <section className='simple-bg h-100vh'>
            <div className='container'>
                <Toolbar path="/" back_button="block" />
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
                    <div className='col-lg-6 offset-lg-3'>
                        <LargeHeading large_heading="How many lessons you would like to book?" />
                        <div className='align-items-center'>
                            <p className='onboarding-description indiviual-lesson-description'>
                                You’ll save money by purchasing more lessons up front. You can schedule these lessons in your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
                <form>
                    <div className='row'>
                        {values.map((i, index) => (
                            <div className='col-lg-4 offset-lg-4' key={index}>
                                <label className={`indiviual-lesson my-container ${activeClass === index ? "special-active" : ""}`} id='first'>
                                    <input 
                                            type="radio" 
                                            value={i.lessons}
                                            name='lesson-name'
                                            onClick={handleChange(index)}
                                            className="radio-buttons"
                                        />
                                        <span className='checkmark'></span>
                                    <div className='lesson-count'>
                                        <p className='lesson-number color-gray900'>{i.lessons}</p>
                                        {i.lessons > 1 ? 
                                            <p className='lesson-name color-gray900'>lessons</p>
                                        :   <p className='lesson-name color-gray900'>lessons</p>
                                        }
                                    </div>
                                    <div className='lesson-prices'>
                                        <div className=''>
                                            {i.save ? 
                                                <p>Save Amount{i.saveAmount}</p>
                                                :<></>
                                            }
                                        </div>
                                        <p className='lesson-price color-gray900'>
                                            CA ${i.price}
                                        </p>
                                        <p className='per-lesson-price color-gray600'>
                                            (${i.price/i.lessons}/lesson)
                                        </p>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className='col-lg-4 offset-lg-4'>
                        <Link to="/">
                                <button className={`submit-btn ${disabled === false ? 'opacity-01' : 'opacity-03' }`} disabled={disabled}>
                                    Continue
                                </button>
                            </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default IndiviualLesson;