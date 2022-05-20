import React, {useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import Paragraph from '../Common/Paragraph';
import Toolbar from '../Common/Toolbar';
import './onboarding.css';

function GetCode(){
    const [otp, setOtp] = useState('')
    const [disabled, setDisable] = useState(true)
    useEffect(() => {
        if(otp.length === 6){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
        localStorage.setItem("postalCode", JSON.stringify(otp))
    }, [otp])
    const handleChange = (otp) => {
        setOtp(otp.toUpperCase())
    }

    function submitForm(e){
        e.preventDefault();
    }
    return(
        <section className='simple-bg'>
            <div className='container h-100vh'>
                <Toolbar path="/" back_button="block" />
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
                                    value={otp}
                                    onChange={handleChange}
                                    numInputs={6}
                                    shouldAutoFocus={true}
                                />
                                </div>
                                <p className='color-gray800 code-instruction'>
                                    This will help us find instructors in your area
                                </p>
                            </div>
                            <Link to="/pricing">
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