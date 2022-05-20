import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import Toolbar from '../Common/Toolbar';


function DrivingTest(){
    const [border, setBorder] = useState(null)
    const [vehicle, setVehicle] = useState("")
    const [disabled, setDisabled] = useState(true)
    const handleClick = useCallback((k) => {
        return () => {
            setVehicle(k)
            setBorder(k)
            setDisabled(false)
        }
    })
    return(
        <section className='simple-bg h-100vh'>
            <div className='container'>
                <Toolbar path="/pricing" back_button="display" />
                <div className='row'>
                    <div className='col-12'>
                    </div>
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
                        <LargeHeading large_heading="Do you need a vehicle for your road test?" />
                    </div>
                </div>
                <div className='row align-items-center-column'>
                    <div className='col-lg-4'>
                        <div className={`driving-test-box ${border === "yes" ? 'blue-border' : '' }`} onClick={handleClick("yes")}>
                            <div className='space-between-baseline'>
                                <h6 className='color-gray900 answer'>
                                    Yes, I need a vehicle
                                </h6>
                                <div className='test-price'>
                                    <p className='test-price-number color-blue700'>
                                        + $145
                                    </p>
                                </div>
                            </div>
                            <div className='driving-test-benefits'>
                                <img className='test-benefits' src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                <p className='test-benefits-info color-gray900'>
                                    Kruzee will book your appointment and provide you with a vehicle for your road test!
                                </p>
                            </div>
                            <div className='driving-test-benefits'>
                                <img className='test-benefits' src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                <p className='test-benefits-info color-gray900'>
                                    Our instructors will spend 30 minutes with you before the test to review key topics and accompany you to the test
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className={`driving-test-box ${border === "no" ? 'blue-border' : '' }`} onClick={handleClick("no")}>
                            <div className='space-between-baseline'>
                                <h6 className='color-gray900 answer'>
                                    No, I have access to a vehicle
                                </h6>
                            </div>
                            <div className='driving-test-benefits'>
                                <p className='test-benefits-info color-gray900'>
                                    I have access to a vehicle and will book my own appointment
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <Link to="/book-session">
                            <button className={`submit-btn ${disabled === false ? 'opacity-01' : 'opacity-03'}`} disabled={disabled}>
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DrivingTest;