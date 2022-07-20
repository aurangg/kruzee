import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import Toolbar from '../Common/Toolbar';
import '../css/onboarding.css';

function Lessons() {
	useEffect(() => {
		document.title = 'Kruzee';
	});
	return (
		<section className="onboarding">
			<div className="container">
				<Toolbar path="/" back_button="none" />
				<div className="row">
					<div className="col-12">
						<LargeHeading large_heading="What type of lessons would you like?" />
					</div>
					<div className="col-lg-4">
						<Link to="/get-code">
							<div className="onboarding-box">
								<div className="space-between-baseline">
									<div className="icon-circle align-items-center">
										<img src={process.env.PUBLIC_URL + '/images/full-package.svg'} alt="img" />
									</div>
									<div className="most-popular">
										<p className="most-popular-text">Most popular</p>
									</div>
								</div>
								<h3 className="package-name">Full Packages</h3>
								<p className="package-description">
									Get your G2 4 months faster and qualify for an insurance discount
								</p>
								<div className="gray-line"></div>
								<p className="price">Starting at $695 CAD</p>
							</div>
						</Link>
					</div>

					<div className="col-lg-4">
						<div className="onboarding-box">
							<div className="space-between-baseline">
								<div className="icon-circle align-items-center">
									<img src={process.env.PUBLIC_URL + '/images/driving-lesson.svg'} alt="img" />
								</div>
							</div>
							<h3 className="package-name">Individual Driving Lessons</h3>
							<p className="package-description">
								Book single lessons with pre-vetted driving instructors
							</p>
							<div className="gray-line"></div>
							<p className="price">Starting at $45 CAD / Lesson</p>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="onboarding-box">
							<div className="space-between-baseline">
								<div className="icon-circle align-items-center">
									<img src={process.env.PUBLIC_URL + '/images/road-test.svg'} alt="img" />
								</div>
								{/* <div className='most-popular'>
                                    <p className='most-popular-text'>
                                        Most popular
                                    </p>
                                </div> */}
							</div>
							<h3 className="package-name">Road Test Vehicle + Test Prep</h3>
							<p className="package-description">
								Rent a vehicle for your driving exam and receive a 30 min refresher lesson
							</p>
							<div className="gray-line"></div>
							<p className="price">$145 CAD per vehicle rental</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Lessons;
