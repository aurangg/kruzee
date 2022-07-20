import React from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import Toolbar from '../Common/Toolbar';
import '../css/onboarding.css';

function Packages() {
	return (
		<section className="simple-bg">
			<div className="container">
				<Toolbar path="/" back_button="block" />
				<div className="row">
					<div className="col-12">
						<LargeHeading large_heading="Which package are you interested in?" />
					</div>
					<div className="col-lg-8 offset-lg-2">
						<div className="package-box">
							<div className="row package-main">
								<div className="col-8">
									<h6 className="package-start">What's included</h6>
								</div>
								<div className="col-2">
									<div className="available-packages">
										<h6 className="select-package color-redish-orange">Basic</h6>
										<div className="package-border bg-redish-orange"></div>
									</div>
								</div>
								<div className="col-2">
									<div className="available-packages">
										<h6 className="select-package color-blue500">Core</h6>
										<div className="package-border bg-blue500"></div>
									</div>
								</div>
							</div>
							<div className="package-info">
								<div className="row">
									<div className="col-6" id="col-6 col-8">
										<h2 className="package-name">MTO Certificate</h2>
										<p className="package-description">
											Certificate of completion from the ministry of transport
										</p>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
										<div className=""></div>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
									</div>
								</div>
							</div>

							<div className="package-info">
								<div className="row">
									<div className="col-6" id="col-6 col-8">
										<h2 className="package-name">Driving Lessons</h2>
										<p className="package-description">
											10 hours of in-person driving lessons booked through Kruzee
										</p>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
										<div className=""></div>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
									</div>
								</div>
							</div>

							<div className="package-info">
								<div className="row">
									<div className="col-6" id="col-6 col-8">
										<h2 className="package-name">In-Class Training</h2>
										<p className="package-description">
											20 hours of theory training through Kruzee (online at your own pace)
										</p>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
										<div className=""></div>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
									</div>
								</div>
							</div>

							<div className="package-info">
								<div className="row">
									<div className="col-6" id="col-6 col-8">
										<h2 className="package-name">Road Test Vehicle</h2>
										<p className="package-description">
											Use your instructor’s vehicle to complete your road test
										</p>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/cross.svg'} alt="img" />
										<div className=""></div>
									</div>
									<div className="col-2 align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/check.svg'} alt="img" />
									</div>
								</div>
							</div>

							<div className="package-btns">
								<Link to="/book-session">
									<div className="package-btn bg-redish-orange">Basic ($695)</div>
								</Link>
								<Link to="/book-session">
									<div className="package-btn bg-blue500">Core ($895)</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Packages;
