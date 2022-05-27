import { useEffect, useState } from 'react';
import './onboarding.css';
import {Link} from 'react-router-dom';
import {isEmail} from 'validator'
import Toolbar from '../Common/Toolbar';
import ProgressBar from '../Common/ProgressBar';

function NoResult(){
    useEffect(() => {
        document.title = "No Instructors Found | Kruzee"
    })
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [disable, setDisable] = useState(true);
    function handleEmail(e){
        setEmail(e.target.value)
        if(isEmail(e.target.value)){
            setEmailError('')
            setDisable(false)
        }
        else{
            setEmailError('Invalid Email')
            setDisable(true)
        }
    }
    return(
        <section className='simple-bg h-100vh'>
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
                   
                    <div className='col-lg-4 offset-lg-4'>
                        <div className='no-instructor-box bg-gray200'>
                            <h2 className='no-instructor-heading color-gray900'>
                                We appreciate your patience
                            </h2>
                            <p className='no-instructor-description color-gray800'>
                                Unfortunately, all the instructors in your area are fully booked at this time, but we'll notify you as soon as one becomes available
                            </p>
                        </div>
                        <div className='email-container no-instructor-email'>
                            <div className='notify-email-width'>
                                <h6 className='email-heading color-gray900'>
                                    Email Address
                                </h6>
                                <input className={`email-input ${emailError === '' ? '' : 'error-border' }`} type="email" onChange={handleEmail} value={email} />
                                <p className={`input-info-text ${emailError ? 'error-text-color' : ""}`}>{emailError}</p>
                            </div>
                            <Link to="/" className='notify-me-btn-main'>
                                <button className={`notify-me-btn bg-blue500 ${disable ? 'opacity-03' : 'opacity-01' }`} disabled={disable} style={{marginTop:`${emailError === '' ? '38px' : '25px'}`}}>
                                    Notify Me
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoResult;