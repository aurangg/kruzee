import React, {useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import Paragraph from '../Common/Paragraph';
import Toolbar from '../Common/Toolbar';
import './onboarding.css';

function GetCode(){
    const [postalCode, setPostalCode] = useState('')
    const [disabled, setDisable] = useState(true)
    useEffect(() => {
        document.title = "Enter Postal Code | Kruzee"
        if(postalCode.length === 6){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
        localStorage.removeItem('packageName')
        localStorage.removeItem('perks')
        localStorage.removeItem('price')
        localStorage.removeItem('postalCode')
        localStorage.removeItem('lat')
        localStorage.removeItem('lng')
        localStorage.removeItem('lesson')
        localStorage.removeItem('roadTestVehicle')
        localStorage.removeItem('instructorName')
        localStorage.removeItem('pick-up')
        localStorage.removeItem('package')
        localStorage.removeItem('stripeCustomerId')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('userName')
        localStorage.removeItem('weekStartDate')
        localStorage.removeItem('date')
        localStorage.removeItem('day')
        localStorage.removeItem('lessonId')
        localStorage.removeItem('instructorId')
        localStorage.removeItem('locationScreenHeading')
        localStorage.removeItem('slot')
    }, [postalCode])
    const handleChange = (postalCode) => {
        setPostalCode(postalCode.toUpperCase())
    }

    function submitForm(e){
        e.preventDefault();
    }


    function handlePostalCode(){
        localStorage.setItem("postalCode", JSON.stringify(postalCode))
    }
    return(
        <section className='simple-bg'>
            <div className='container h-100vh'>
                <Toolbar path="/" back_button="none" />
                <div className='row'>
                    <div className='col-12 get-code-margin'>
                        <LargeHeading large_heading="Please enter your postal code" />
                    </div>
                    <div className='col-lg-6 offset-lg-3'>
                        <form onSubmit={submitForm} className="form-class">
                            <div className='flex-reverse-on-mobile'>
                                <div className='space-around-center'>
                                <OtpInput
                                    inputStyle="get-code-input"
                                    value={postalCode}
                                    onChange={handleChange}
                                    numInputs={6}
                                    shouldAutoFocus={true}
                                />
                                </div>
                                <p className='color-gray800 code-instruction'>
                                    This will help us find instructors in your area
                                </p>
                            </div>
                            <Link to="/pricing" onClick={handlePostalCode}>
                                <button type='submit' className={disabled ? "submit-btn opacity-03" : "submit-btn opacity-01"} disabled={disabled}>
                                    Continue
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetCode;