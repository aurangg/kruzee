import React from "react";
import { Link } from "react-router-dom";
import LargeHeading from "../Common/LargeHeading";
import Toolbar from "../Common/Toolbar";


function Pricing(){
    const plans = [
        {
            id:0,
            pricing:695,
            pricingSpan:"/ pack + HST",
            packageName:"Full Packages",
            description:"Kruzee's MTO-approved certificate course",
            popular:true,
            benefits:[
                {
                    id:0,
                    benefits_info:"10 hours of in-car driving lessons with a Kruzee instructor",
                },
                {
                    id:1,
                    benefits_info:"Get licensed sooner — 8 months instead of 12",
                },
                {
                    id:2,
                    benefits_info:"Potential 15% reduction on your drivers insurance",
                },
                {
                    id:3,
                    benefits_info:"Online, self-paced learning",
                },
            ]
        },
        {
            id:1,
            pricing:195,
            pricingSpan:"/ pack + HST",
            packageName:"Road Test Support + Test Prep",
            description:"Use a Kruzee instructor’s vehicle for your exam",
            popular:false,
            benefits:[
                {
                    id:0,
                    benefits_info:"Use of instructor’s vehicle for road test",
                },
                {
                    id:1,
                    benefits_info:"30 min refresher lesson before test",
                },
                {
                    id:2,
                    benefits_info:"Free pickup and drop-off from test",
                },
            ]
        },
        {
            id:2,
            pricing:65,
            pricingSpan:"/ hr + HST",
            packageName:"Driving Practice Lessons",
            description:"In-car lessons with an MTO-certified Kruzee instructor",
            popular:false,
            benefits:[
                {
                    id:0,
                    benefits_info:"In-car lessons with a Kruzee instructor",
                },
            ]
        },
    ]
    return(
        <section className="simple-bg h-100vh">
            <div className="container">
                <Toolbar path="/get-code" back_button="none" />
                <div className="row">
                    <div className="col-12">
                        <LargeHeading large_heading="What type of lessons would you like?" />
                    </div>
                </div>
                <div className="row pricing-row">
                        {plans.map((p => (
                            <div className="col-lg-4 pricing-padding" key={p.id}>
                                    <div className={p.popular ? 'pricing-box popular-tag' : 'pricing-box'}>
                                        {p.popular ? 
                                            <div className="align-items-center">
                                                <div className="most-popular-tag">
                                                    <p className="most-popular-tag-text">
                                                        Most Popular
                                                    </p>
                                                </div>
                                            </div>
                                            : <></>
                                        }
                                    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                                        <div>
                                                <h6 className="pricing">${p.pricing}<span className="pricing-span">{p.pricingSpan}</span></h6>
                                                <h6 className="package-name">
                                                    {p.packageName}
                                                </h6>
                                                <p className="package-description">
                                                    {p.description}
                                                </p>
                                                {p.benefits.map((i => (
                                                    <div className="plan-benefits" key={i.id}>
                                                        <img className='instructor-picture' src={process.env.PUBLIC_URL + '/images/benefits.svg'} alt="benefits" />
                                                        <p className="benefits-info">
                                                            {i.benefits_info}
                                                        </p>
                                                    </div>
                                                )))}
                                            </div>
                                            <div className="align-center">
                                                <Link to="/driving-test">
                                                    <div className={p.popular? 'pricing-btn popular-btn' : 'pricing-btn'}>
                                                        Select
                                                    </div>
                                                </Link>
                                            </div>
                                    </div>
                                    </div>
                            </div>
                        )))}
                    </div>
            </div>
        </section>
    )
}

export default Pricing;