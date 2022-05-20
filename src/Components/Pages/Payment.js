import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LargeHeading from "../Common/LargeHeading";
import ProgressBar from "../Common/ProgressBar";
import Toolbar from "../Common/Toolbar";
import './onboarding.css';
function Payment() {

    
    const promo = 'ngsgd38sdf'


    const [cardName, setCardName] = useState('');
    const [month, setMonth] = useState('')
    const [cvc, setCVC] = useState('')


    const [card, setCard] = useState('')


    const [applyPromoCode, setApplyPromoCode] = useState(true)
    const [enterPromoCode, setEnterPromoCode] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [invalidCardNumber, setInvalidCardNumnber] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [promoCode, setPromoCode] = useState('')
    const [price, setPrice] = useState(728.84)
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        checkDisable()
    })

    function handleCardName(e) {
        setCardName(e.target.value)
    }
    function handleCard(e){
        setCard(e.target.value)
        if(e.target.value.length !== 16){
            setInvalidCardNumnber(true)
        }
        else if(e.target.value.length === 16){
            setInvalidCardNumnber(false)
        }
    }

    function handleMonth(e){
        setMonth(e.target.value)
    }
    function handleCVC(e){
        setCVC(e.target.value)
    }

    function checkDisable(){
        if(cardName != '' && card.length === 16 && month != '' && cvc.length === 3){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    }

    function handlePromoCode(e){
        setPromoCode(e.target.value)
        setInvalid(false)
    }
    function activatePromoCode(e){
        setApplyPromoCode(false)
        setEnterPromoCode(true)
    }
    function checkPromoCode(){
        if(promoCode === promo){
            setDiscount(true)
            setEnterPromoCode(false)
            setPrice(price - 20)
            setDisable(false)
        }
        else{
            setInvalid(true)
        }
    }
    return (
        <section className='simple-bg h-100vh'>
            <div className='container'>
                <Toolbar path="/create-account" back_button="display" />
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
                            progress:"complete"
                        }]} 
                        payment={[{
                            progress:"current"
                        }]}
                    />
                    <div className='col-lg-12 hide-on-desktop'>
                        <LargeHeading large_heading="Payment Information" />
                    </div>
                </div>
                <div className="row reverse mt-70">
                    <div className='col-lg-5'>
                        <form className="payment-form">
                            <h2 className="payment-form-heading">
                                Payment Information
                            </h2>
                            <div className='email-container'>
                                <h6 className='email-heading color-gray900'>
                                    Name on Card
                                </h6>
                                <input className='email-input' type="text" name="fullname" onChange={handleCardName} value={cardName} required/>
                            </div>

                            <div className='email-container'>
                                <h6 className='email-heading color-gray900'>
                                    Card Number
                                </h6>
                                <input className={`email-input ${invalidCardNumber ? "error-border" : ""}`} type="text" pattern="[0-9]{16}" autoComplete="cc-number" onChange={handleCard} value={card} required/>
                                {/* {invalidCardNumber ? <p className="error-class">Card Length exceeded</p>: <div></div>} */}
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className='email-container'>
                                        <div className="email-heading color-gray900">MM/YY</div>
                                        <input className='email-input' type="month" min="2022-05"  onChange={handleMonth} value={month} maxLength={6} required/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className='email-container'>
                                        <div className="email-heading color-gray900">CVC</div>
                                        <input className='email-input' type="text" length={3} pattern="[0-9]{3}" onChange={handleCVC} value={cvc} maxLength={3} max={3} required/>
                                    </div>
                                </div>
                            </div>
                            <div className='email-container'>
                                <Link to="/payment-success">
                                    <button className={`pay-btn ${disable ? "opacity-03": "opacity-01"}`} disabled={disable}>Pay ${price} CAD</button>
                                </Link>
                            </div>
                            <div onClick={activatePromoCode} className={applyPromoCode === true ? "promo-code color-gray800" : "promo-code color-gray800 display-none"}>+Apply Promo Code</div>
                            <div className={enterPromoCode ? "promo-code-form" : "display-none"}>
                                <div className='email-container'>
                                    <div className="email-heading color-gray900">Promo Code</div>
                                </div>
                                <div className="align-items-space-between">
                                    <div className="email-container flex-grow-2">
                                        <input className={invalid ? 'email-input error-border' : 'email-input'} type="text" onChange={handlePromoCode} value={promoCode} />
                                        <img className={invalid ? "input-img" : "display-none"} src={process.env.PUBLIC_URL + '/images/error-img.svg'} alt="check" />
                                    </div>
                                    <div className="apply-btn color-gray900" onClick={checkPromoCode}>
                                        Apply
                                    </div>                                    
                                </div>
                                {invalid ? <p className="error-class">Invalid promo code</p>: <div></div>}
                            </div>
                            <div className={discount ? "discount-applied" : "display-none"}>
                                <img src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" /> 
                                <p className="discount-text">
                                    Discount of $20 Applied
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-5">
                        <div className="order-summary">
                            <h6 className="order-summary-text color-gray900">
                                Order Summary
                            </h6>

                            <div className="gray-border-line"></div>

                            <div className="summary-package">
                                <h6 className="summary-package-name color-gray900">
                                    Full Package (Core)
                                </h6>
                                <h6 className="package-price">
                                    $645.00
                                </h6>
                            </div>

                            <div style={{marginTop:"16px", marginBottom:"20px"}}>
                                <div className='summary-box'>
                                    <img src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                    <p className='summary-info color-gray900'>
                                        MTO Certificate
                                    </p>
                                </div>
                                <div className='summary-box'>
                                    <img src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                    <p className='summary-info color-gray900'>
                                        10 hours of driving lessons
                                    </p>
                                </div>
                                <div className='summary-box'>
                                    <img src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                    <p className='summary-info color-gray900'>
                                    20 hours of in-class training (online)
                                    </p>
                                </div>
                            </div>

                            <div className="summary-package">
                                <h6 className="summary-package-name color-gray900">
                                    HST (13%)
                                </h6>
                                <h6 className="package-price">
                                    $83.85
                                </h6>
                            </div>

                            <div className="summary-package even-summary-package">
                                <h6 className="summary-package-name color-gray900">
                                    Total
                                </h6>
                                <h6 className="package-price">
                                    $728.84
                                </h6>
                            </div>

                            <div className="gray-border-line"></div>

                            <div className="summary-pickup-box">
                                <h6 className="pickup-location color-gray900">
                                    Pickup Location
                                </h6>
                                <p className="pickup-address color-gray900">
                                    540 Buckingham Blvd, Waterloo ON
                                </p>
                            </div>

                            <div className="gray-border-line"></div>

                            <div className="summary-pickup-box align-items-space-between">
                                <div>
                                    <h6 className="pickup-location color-gray900">
                                        Instructor
                                    </h6>
                                    <p className="pickup-address color-gray900">
                                        John Anderson
                                    </p>
                                </div>
                                <div className=''>
                                    <img className='instructor-img instructor-img-2' src={process.env.PUBLIC_URL + '/images/driver-img.png'} alt="driver-img" />
                                    <img className='instructor-img' src={process.env.PUBLIC_URL + '/images/driver-car.png'} alt="driver-car" />
                                </div>
                            </div>

                            <div className="note-box">
                                <p className="note-text color-gray800">
                                    <span className="note-span">Note: </span>You can buy more lessons, schedule and reschedule your existing lessons, and track your progress once you’re logged into your dashboard
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Payment