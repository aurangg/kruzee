import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LargeHeading from "../Common/LargeHeading";
import ProgressBar from "../Common/ProgressBar";
import Toolbar from "../Common/Toolbar";
import './onboarding.css';

import {CardElement, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import { addLessons, createStudent, addStudentPayment } from "./APIs";


import {
    getEmail,
    getPassword,
    getPhoneNumber,
    getUserName,
    getLessons,
    getPackagePrice,
    getBDE,
    // getIndividualPackage,
    // setAccountCreatedMsg,
  } from "../localStorage";

function Payment() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email").replace(/"/g, '')
    const password = getPassword()
    const userName = getUserName();
    const phoneNumber = getPhoneNumber();
    const bde = getBDE();
    const priceOfLesson = getPackagePrice();
    const lesson = getLessons();

    const [stripeCustomerId, setStripeCustomerId] = useState('')

    const [instructorName, setInstructorName] = useState('')
    const [displayInstructor, setDisplayInstructor] = useState(false)

    const [roadTestVehicle, setRoadTestVehicle] = useState('')
    const [roadTestVehicleAvailable, setRoadTestVehicleAvailable] = useState(false)

    const [lessonCount, setLessonCount] = useState('')
    const [isLessonAvailable, SetIsLessonAvailable] = useState(false)
    

    useEffect(() => {
        document.title = "Checkout | Kruzee"
        if(localStorage.getItem("instructorName")){
            setInstructorName(localStorage.getItem("instructorName").replace(/"/g, ''))
            setDisplayInstructor(true)
        }
        if(localStorage.getItem("roadTestVehicle")){
            setRoadTestVehicle(parseFloat(localStorage.getItem("roadTestVehicle")).toFixed(2))
            setRoadTestVehicleAvailable(true)
        }
        if(localStorage.getItem("lesson")){
            setLessonCount(localStorage.getItem("lesson"))
            SetIsLessonAvailable(true)
        }
    }, [])


    const promo = 'ngsgd38sdf'

    const [cardName, setCardName] = useState('');
    const [card, setCard] = useState(false)
    const [month, setMonth] = useState(false)
    const [cvc, setCVC] = useState(false)

    const [loading, setLoading] = useState(false)

    const packageName = localStorage.getItem("packageName").replace(/"/g, '')
    const packagePrice = parseFloat(localStorage.getItem("price")).toFixed(2)
    const pickUp = localStorage.getItem("pick-up").replace(/"/g, '')
    const perks = JSON.parse(localStorage.getItem("perks") || "[]")
    let hst = parseFloat((13/100)*packagePrice).toFixed(2)
    let sum = String(Number(packagePrice) + Number(hst) + Number(roadTestVehicle))


    const [applyPromoCode, setApplyPromoCode] = useState(true)
    const [enterPromoCode, setEnterPromoCode] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [invalidCardNumber, setInvalidCardNumnber] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [promoCode, setPromoCode] = useState('')
    const [price, setPrice] = useState(728.84)
    const [disable, setDisable] = useState(true);
    const [nav, setNav] = useState(false);
    



    // const userName = localStorage.getItem("name")
    const [paymentIntent, setPaymentIntent] = useState();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        checkDisable()
    })

    useEffect(() => {
        if (paymentIntent && paymentIntent.status === "succeeded"){
            const createStudentAndPayment = async() => {
                const student = await createStudent();
                const studentData = student?.data;
                const lessons = await addLessons(studentData);
                const studentPaymentData = await addStudentPayment(studentData, sum);
                if(studentPaymentData === true){
                    setLoading(false)
                    setDisable(false)
                    navigate('/payment-success')
                }
                
            }
            createStudentAndPayment();            
        }
    }, [paymentIntent])



    if(!stripe || !elements){
        return ""
    }

    function handleCardName(e) {
        setCardName(e.target.value)
    }
    function handleCard(e){
        const {complete}=e;
        setCard(complete)
    }

    function handleMonth(e){
        const {complete} = e
        setMonth(complete)
    }
    function handleCVC(e){
        const {complete} = e
        setCVC(complete)
    }

    function checkDisable(){
        if(cardName != '' && card === true && month === true && cvc === true){
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

    const handleSubmit = async (e) => {
        console.log("number")
        e.preventDefault();
        setLoading(true)
        setDisable(true)
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/createStripeCustomer`, {
            method:"POST",
            body:JSON.stringify({email})
        })
        const dataNew = await data.json()
        setStripeCustomerId(dataNew.data.id)
        localStorage.setItem("stripeCustomerId", JSON.stringify(dataNew.data.id))
        // const payment = 1
        const payment = Number(parseFloat(sum*100).toFixed(2))
        console.log(payment)
        console.log(typeof payment)
        const bodyData = {
            payment:payment,
            customerId:dataNew.data.id,
            email:email,
        }
        const cardNumberElement = elements.getElement(CardNumberElement);
        const PaymentData = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/makeStripePayment`, {
            method:'POST',
            body:JSON.stringify({...bodyData}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const resPaymentData = await PaymentData.json()
        // const client_secret = resPaymentData.client_secret

        if(PaymentData?.status !== 200){
            // setLoading(false)
            return <p>Internal Server Error</p>
        }

        const name = userName.replace(/"/g, '')
        let {error, paymentIntent} = await stripe.confirmCardPayment(
            resPaymentData.client_secret,{
                payment_method: {
                    card: cardNumberElement,
                    billing_details: {
                      name: name,
                      email: email,
                    },
                },
            }
        )

        if(error){
            console.log(error.message)
            // setLoading(false)
            // setDisable(false)
            return <p>{error.message} // Payment Error</p>
        }
        else{
            setPaymentIntent(paymentIntent)
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
                        <div className="payment-form">
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
                                <CardNumberElement className="email-input"  onChange={handleCard} />
                                {/* <input className={`email-input ${invalidCardNumber ? "error-border" : ""}`} type="text" pattern="[0-9]{16}" autoComplete="cc-number" onChange={handleCard} value={card} required/> */}
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className='email-container'>
                                        <div className="email-heading color-gray900">MM/YY</div>
                                        {/* <input className='email-input' type="month" min="2022-05"  onChange={handleMonth} value={month} maxLength={6} required/> */}
                                        <CardExpiryElement className="email-input" onChange={handleMonth} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className='email-container'>
                                        <div className="email-heading color-gray900">CVC</div>
                                        {/* <input className='email-input' type="text" length={3} pattern="[0-9]{3}" onChange={handleCVC} value={cvc} maxLength={3} max={3} required/> */}
                                        <CardCvcElement className="email-input" onChange={handleCVC} />
                                    </div>
                                </div>
                            </div>
                            <div className='email-container'>
                                <button onClick={handleSubmit}  className={`pay-btn ${disable ? "opacity-03": "opacity-01"}`} disabled={disable}>
                                    Pay ${sum} CAD
                                    <span className={`${loading === false ? '' : 'spinner-border spinner-border-sm'} `} style={{marginLeft:"5px"}}></span>
                                    </button>
                            </div>
                            {/* <button onClick={handleSubmit}>Click</button> */}
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
                        </div>
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
                                    {packageName}
                                    {isLessonAvailable ? 
                                        <span style={{display:"inline-block"}}>
                                            <p style={{marginBottom:"0px", marginLeft:"5px", fontWeight:"400", color:"var(--gray700)"}}>({lessonCount} Lessons)</p>
                                        </span>
                                        :<></>
                                    }
                                </h6>
                                <h6 className="package-price">
                                    ${packagePrice}
                                </h6>
                            </div>

                            <div style={{marginTop:"16px", marginBottom:"20px"}}>
                                {perks.map(((i, index) => (
                                    <div className='summary-box' key={index}>
                                        <img src={process.env.PUBLIC_URL + '/images/driving-test-check.svg'} alt="check" />
                                        <p className='summary-info color-gray900'>
                                            {i}
                                        </p>
                                    </div>
                                )))}
                            </div>

                            {roadTestVehicleAvailable ?
                                <div className="summary-package">
                                    <h6 className="summary-package-name color-gray900">
                                        Road Test Vehicle
                                    </h6>
                                    <h6 className="package-price">
                                        ${roadTestVehicle}
                                    </h6>
                                </div>
                                :<></>
                            }


                            <div className="summary-package">
                                <h6 className="summary-package-name color-gray900">
                                    HST (13%)
                                </h6>
                                <h6 className="package-price">
                                    ${hst}
                                </h6>
                            </div>

                            <div className="summary-package even-summary-package">
                                <h6 className="summary-package-name color-gray900">
                                    Total
                                </h6>
                                <h6 className="package-price">
                                    ${sum}
                                </h6>
                            </div>

                            <div className="gray-border-line"></div>

                            <div className="summary-pickup-box">
                                <h6 className="pickup-location color-gray900">
                                    Pickup Location
                                </h6>
                                <p className="pickup-address color-gray900">
                                    {pickUp}
                                </p>
                            </div>

                            <div className="gray-border-line"></div>

                            {displayInstructor ? 
                                <div className="summary-pickup-box align-items-space-between">
                                    <div>
                                        <h6 className="pickup-location color-gray900">
                                            Instructor
                                        </h6>
                                        <p className="pickup-address color-gray900">
                                            {instructorName}
                                        </p>
                                    </div>
                                    <div className=''>
                                        <img className='instructor-img instructor-img-2' src={process.env.PUBLIC_URL + '/images/driver-img.png'} alt="driver-img" />
                                        <img className='instructor-img' src={process.env.PUBLIC_URL + '/images/driver-car.png'} alt="driver-car" />
                                    </div>
                                </div>
                                : <></>
                            }

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