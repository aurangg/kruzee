import React from "react";

function PaymentSuccess(){
    return(
        <section className="simple-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="payment-success h-100vh">
                            <img src={process.env.PUBLIC_URL + '/images/payment-success.svg'} alt="check" />
                            <h2 className="payment-success-text color-gray900">
                                Payment Success!
                            </h2>
                            <p className="payment-success-info color-gray800">
                                Thank you for booking with Kruzee! We’re redirecting you to your dashboard...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentSuccess;