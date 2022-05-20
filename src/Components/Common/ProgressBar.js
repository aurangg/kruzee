import React from 'react';
import './common.css';


function ProgressBar({location, packages, pickup, account, payment}){


    function checkLocation(){
        if(location[0].progress === "complete"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Location
                    </p>
                    <img src={process.env.PUBLIC_URL + '/images/tick.svg'} alt="tick" />
                </div>
            )
        }
        else if(location[0].progress === "current"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Location
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className='steps'>
                    <p className='step-name color-gray700'>
                        Location
                    </p>
                </div>
            )
        }
    }

    function checkPackages(){
        if(packages[0].progress === "complete"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Package
                    </p>
                    <img src={process.env.PUBLIC_URL + '/images/tick.svg'} alt="tick" />
                </div>
            )
        }
        else if(packages[0].progress === "current"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Package
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className='steps'>
                    <p className='step-name color-gray700'>
                        Package
                    </p>
                </div>
            )
        }
    }

    function checkPickup(){
        if(pickup[0].progress === "complete"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Pickup
                    </p>
                    <img src={process.env.PUBLIC_URL + '/images/tick.svg'} alt="tick" />
                </div>
            )
        }
        else if(pickup[0].progress === "current"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Pickup
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className='steps'>
                    <p className='step-name color-gray700'>
                        Pickup
                    </p>
                </div>
            )
        }
    }

    function checkAccount(){
        if(account[0].progress === "complete"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Account
                    </p>
                    <img src={process.env.PUBLIC_URL + '/images/tick.svg'} alt="tick" />
                </div>
            )
        }
        else if(account[0].progress === "current"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Account
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className='steps'>
                    <p className='step-name color-gray700'>
                        Account
                    </p>
                </div>
            )
        }
    }

    function checkPayment(){
        if(payment[0].progress === "complete"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Payment
                    </p>
                    <img src={process.env.PUBLIC_URL + '/images/tick.svg'} alt="tick" />
                </div>
            )
        }
        else if(payment[0].progress === "current"){
            return(
                <div className='steps'>
                    <p className='step-name color-gray900'>
                        Payment
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className='steps'>
                    <p className='step-name color-gray700'>
                        Payment
                    </p>
                </div>
            )
        }
    }

    return(
        <div className='col-lg-6 offset-lg-3' id='no-padding'>
            <div className='space-evenly-baseline steps-border'>
                {checkLocation()}
                {checkPackages()}
                {checkPickup()}
                {checkAccount()}
                {checkPayment()}
            </div>
        </div>
    )
}
export default ProgressBar;