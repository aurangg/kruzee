import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LargeHeading from "../Common/LargeHeading";
import Paragraph from "../Common/Paragraph";
import ProgressBar from "../Common/ProgressBar";
import {isEmail, isStrongPassword, isMobilePhone, isMobilePhoneLocales} from 'validator';
import Toolbar from "../Common/Toolbar";
import './onboarding.css';
import './radio-button.css';
function Account() {
 
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')

    const [fullname, setFullName] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phonenumber, setEmailPhonenumber] = useState('');

    const [invalid, setInvalid] = useState(false)
    const [valid, setValid] = useState(false)

    
    const [invalidSecond, setInvalidSecond] = useState(false)
    const [validSecond, setValidSecond] = useState(false)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disable, setDisable] = useState(true);

    useEffect(()=> {
        checkPassword()
        checkFinalValidation()
    })

    function handleFullname(e) {
        e.preventDefault();
        setFullName(e.target.value)
    }

    function handleEmail(e) {
        e.preventDefault();
        setEmail(e.target.value)
        if(isEmail(e.target.value)){
            setEmailError('')
        }
        else{
            setEmailError('Invalid Email')
        }
    }

    function handlePhonenumber(e) {
        e.preventDefault();
        setEmailPhonenumber(e.target.value)
        const check = /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(e.target.value.match(check)){
            setPhoneError(false)
        }
        else{
            setPhoneError(true)
        }
        // if(isMobilePhone(e.target.value, 'en-CA')){
        //     return true;
        // }
        // else{
        //     return false;
        // }
    }
    
    function handlePassword(e){
        e.preventDefault();
        setPassword(e.target.value)
        if(isStrongPassword(e.target.value, {
            minLength:8, minLowercase:1,minSymbols:1,minUppercase:1
        })){
            setInvalid(false)
            setValid(true)
        }
        else{
            setValid(false)
            setInvalid(true)
        }
    }

    function handleConfirmPassword(e){
        e.preventDefault();
        setConfirmPassword(e.target.value)
        if(isStrongPassword(e.target.value, {
            minLength:8, minLowercase:1,minSymbols:1,minUppercase:1
        })){
            setInvalidSecond(false)
            setValidSecond(true)
        }
        else{
            setInvalidSecond(true)
            setValidSecond(false)
        }
    }


    function checkFinalValidation(){
        if(fullname != '' && email != '' && phonenumber != '' && password === confirmPassword && password != ''){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    }

    function checkPassword(){
        if(password != confirmPassword){
            setInvalidSecond(true)
            setValidSecond(false)
        }
        else{
            setInvalidSecond(false)
        }
    }

   
    return (
        <section className='simple-bg h-100vh'>
            <div className='container'>
                <Toolbar path="/pick-up" back_button="display" />
                <div className='row'>
                    <ProgressBar 
                        location={[{
                            progress:"complete",
                        }]} 
                        packages={[{
                            progress:"complete"
                        }]} 
                        pickup={[{
                            progress:"complete"
                        }]} 
                        account={[{
                            progress:"current"
                        }]} 
                        payment={[{
                            progress:"incomplete"
                        }]}
                    />
                    <div className='col-lg-4 offset-lg-4'>
                        <LargeHeading large_heading="Create an Account" />
                        <p className='onboarding-description hide-on-desktop'>
                            You will be able to manage your lessons, and track your progress
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Full Name
                            </h6>
                            <input className='email-input' type="text" onChange={handleFullname} value={fullname} required/>
                        </div>
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Email Address
                            </h6>
                            <input className={`email-input ${emailError !== '' ? "error-border" : "" }`} type="email" onChange={handleEmail} value={email} placeholder='' required/>
                            <p className="input-info-text error-text-color">{emailError}</p>
                        </div>
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Phone Number
                            </h6>
                            <input className={`email-input ${phoneError ? 'error-border' : ''}`} type="tel"  onChange={handlePhonenumber} value={phonenumber} required/>
                            <p className="input-info-text">Communicate with your driving instructor over text</p>
                        </div>
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Password
                            </h6>
                            <div className="email-container">
                                <input className={`email-input ${invalid ? 'error-border' : '' }`} type="password" onChange={handlePassword} value={password} minLength="8" />
                                <img className={`input-img ${invalid ? "" : "display-none"}`} src={process.env.PUBLIC_URL + '/images/error-img.svg'} alt="check" />
                                <img className={`input-img ${valid ? "" : "display-none"}`} src={process.env.PUBLIC_URL + '/images/check.svg'} alt="check" />
                            </div>
                            <p className={`input-info-text ${invalid ? 'error-text-color' : ""}`}>Must have at least 8 characters with at least one capital letter and a special character</p>
                        </div>
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Confirm Password
                            </h6>
                            <div className="email-container">
                                <input className={invalidSecond ? 'email-input error-border' : 'email-input'} type="password" onChange={handleConfirmPassword} value={confirmPassword} minLength="8" />
                                <img className={invalidSecond ? "input-img" : "display-none"} src={process.env.PUBLIC_URL + '/images/error-img.svg'} alt="check" />
                                <img className={validSecond ? "input-img" : "display-none"} src={process.env.PUBLIC_URL + '/images/check.svg'} alt="check" />
                            </div>
                            <p className={`input-info-text ${invalidSecond ? 'error-text-color' : ""}`}>Must have at least 8 characters with at least one capital letter and a special character</p>

                        </div>
                        <div className='email-container'>
                            <Link to="/payment-information">
                                <button className={`create-account-btn ${disable ? "opacity-03": "opacity-01"}`} disabled={disable}>
                                    Create Account!
                                </button>
                            </Link>
                            <p className="create-tos color-gray700">By clicking continue you agree to our <Link to="/"><span className="color-blue700">Terms</span></Link>, <span className="color-blue700">Privacy Policy</span>, and <span className="color-blue700"> Content Policy</span> </p>
                        </div>
                    </div>
                </div>
               
                        
                    
                    
            </div>
        </section>
    )

}
export default Account