import React, { useState } from 'react';
import './onboarding.css';
import {Link} from 'react-router-dom';

function NoResult(){
    const [email, setEmail] = useState('');
    const [opacity, setOpacity] = useState('0.3')
    const [disable, setDisable] = useState(true);
    function handleEmail(e){
        setEmail(e.target.value)
        if(e.target.value.length > 0){
            setDisable(false)
            setOpacity('1')
        }
        else if(e.target.value.length === 0){
            setDisable(true)
            setOpacity('0.3')
        }
    }
    return(
        <section className='simple-bg'>
            <div className='container'>
                <div className='row kruzee-main'>
                    <div className='col-12'>
                        <div className='align-items-center'>
                            <Link to="/packages">
                                <div className='back-button'>
                                    <img src={process.env.PUBLIC_URL + '/images/back-button.png'} alt="back_button" />
                                    <p className='back-button-name'>
                                        Back
                                    </p>
                                </div>
                            </Link>
                            <div className='kruzee-logo align-items-center'>
                                <img src={process.env.PUBLIC_URL + '/images/kruzee-logo.png'} alt="img" />
                            </div>
                            <div style={{flexGrow:"3"}}></div>
                        </div>
                    </div>
                    <div className='col-lg-4 offset-lg-4'>
                        <div className='no-instructor-box bg-gray200'>
                            <h2 className='no-instructor-heading color-gray900'>
                                We appreciate your patience
                            </h2>
                            <p className='no-instructor-description color-gray800'>
                                Unfortunately, all the instructors in your area are fully booked at this time, but we'll notify you as soon as one becomes available
                            </p>
                        </div>
                        <div className='email-container'>
                            <h6 className='email-heading color-gray900'>
                                Email Address
                            </h6>
                            <input className='email-input' type="email" onChange={handleEmail} value={email} />
                        </div>
                        <Link to="/">
                            <button className='notify-me-btn bg-blue500' disabled={disable} style={{opacity:`${opacity}`}}>
                                Notify Me
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoResult;