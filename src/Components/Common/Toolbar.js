import React from 'react';
import { Link } from 'react-router-dom';
import './common.css';

function Toolbar(props){
    return(
        <div className='row kruzee-main align-items-center'>
            <div className='col-3'>
                <div style={{display:`${props.back_button}`}}>
                    <Link to={`${props.path}`}>
                        <div className='back-button'>
                            <div className='back-button-prop'>
                                <img src={process.env.PUBLIC_URL + '/images/back-button.png'}></img>
                                <p className='back-button-name'>
                                    Back
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='col-6'>
                <div className='kruzee-logo align-items-center'>
                    <img src={process.env.PUBLIC_URL + '/images/kruzee-logo.png'}></img>
                </div>
            </div>
            <div className='col-3'></div>
        </div>
    )
}

export default Toolbar;