import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import Toolbar from '../Common/Toolbar';
import { useIntercom } from 'react-use-intercom';

function Pricing() {
	const { boot } = useIntercom();
	boot();
	const plans = [
		{
			id: 0,
			pricing: 695,
			pricingSpan: '/ pack + HST',
			packageName: 'Full Package',
			description: '',
			popular: true,
			benefits: [
				{
					id: 0,
					benefits_info: '',
				},
				{
					id: 1,
					benefits_info: '',
				},
				{
					id: 2,
					benefits_info: '',
				},
				{
					id: 3,
					benefits_info: '',
				},
			],
		},
		{
			id: 1,
			pricing: 195,
			pricingSpan: '/ pack + HST',
			packageName: '',
			description: '',
			popular: false,
			benefits: [
				{
					id: 0,
					benefits_info: '',
				},
				{
					id: 1,
					benefits_info: '',
				},
				{
					id: 2,
					benefits_info: '',
				},
			],
		},
		{
			id: 2,
			pricing: 65,
			pricingSpan: '/ hr + HST',
			packageName: '',
			description: '',
			popular: false,
			benefits: [
				{
					id: 0,
					benefits_info: '',
				},
			],
		},
	];

	useEffect(() => {
		localStorage.removeItem('price');
		localStorage.removeItem('perks');
		localStorage.removeItem('lesson');
		localStorage.removeItem('packageName');
		localStorage.removeItem('package');
		localStorage.removeItem('locationScreenHeading');
		document.title = 'Select A Package | Kruzee';
	}, []);

	function handleFullPackage() {
		localStorage.setItem(
			'locationScreenHeading',
			JSON.stringify('Where can we pick you up for your first lesson?')
		);
		localStorage.setItem('packageName', JSON.stringify('Full Package'));
		const perks = [
			'10 hours of in-car driving lessons with a Kruzee driving instructor',
			'Get licensed sooner — With our MTO certificate course, you can unlock the ability to get your G2 in 8 months instead of 12',
			'10-20% reduction on your auto insurance (varies by insurer - terms & conditions apply)',
			'Online, self-paced learning',
		];
		let calculateTime = (10 * 60) / Number(process.env.REACT_APP_LESSON_DURATION);
		localStorage.setItem('perks', JSON.stringify(perks));
		localStorage.setItem('price', JSON.stringify(695));
		localStorage.setItem('package', JSON.stringify('Basic'));
		localStorage.setItem('lesson', JSON.stringify(calculateTime));
	}

	function handleRoadTest() {
		localStorage.setItem('locationScreenHeading', JSON.stringify('Where can we pick you up for your road test?'));
		localStorage.setItem('packageName', JSON.stringify('Road Test Support + Test Prep'));
		const perks2 = [
			"Use of instructor's vehicle for road test",
			'30 min refresher lesson before test',
			'Free pickup and drop-off from test',
		];
		localStorage.setItem('perks', JSON.stringify(perks2));
		localStorage.setItem('price', JSON.stringify(245));
		localStorage.setItem('package', JSON.stringify('Road Test'));
		localStorage.setItem('lesson', JSON.stringify(1));
	}

	function handleIndiviualLessons() {
		localStorage.setItem(
			'locationScreenHeading',
			JSON.stringify('Where can we pick you up for your first lesson?')
		);
		localStorage.setItem('packageName', JSON.stringify('Driving Practice Lessons'));
		const perks3 = [
			"Book one, five, or ten hours of lessons - it's totally up to you",
			'Free pickup and drop-off',
			'Book and schedule your in-car lessons fully online',
		];
		localStorage.setItem('perks', JSON.stringify(perks3));
		localStorage.setItem('package', JSON.stringify('Basic'));
	}

	return (
		<section className="simple-bg h-100vh">
			<div className="container">
				<Toolbar path="/" back_button="none" />
				<div className="row">
					<div className="col-12">
						<LargeHeading large_heading="What type of lessons would you like?" />
					</div>
				</div>
				<div className="row pricing-row">
					<div className="col-lg-4 pricing-padding">
						<div className="pricing-box popular-tag">
							<div className="align-items-center">
								<div className="most-popular-tag">
									<p className="most-popular-tag-text">Most Popular</p>
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '100%',
								}}
							>
								<div>
									<h6 className="pricing">
										$695<span className="pricing-span">/ pack + HST</span>
									</h6>
									<h6 className="package-name">Full Package</h6>
									<div className="align-items-center">
										<p className="package-description">Kruzee's MTO-approved certificate course</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">
											10 hours of in-car driving lessons with a Kruzee driving instructor
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">
											Get licensed sooner — With our MTO certificate course, you can unlock the
											ability to get your G2 in 8 months instead of 12
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">
											10-20% reduction on your auto insurance (varies by insurer - terms &
											conditions apply)
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">Online, self-paced learning</p>
									</div>
								</div>
								<div className="align-center">
									<Link
										to="/driving-test"
										state={{ heading_name: 'Book your first driving lesson' }}
										onClick={handleFullPackage}
									>
										<div className="pricing-btn popular-btn">Select</div>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4 pricing-padding">
						<div className="pricing-box">
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '100%',
								}}
							>
								<div>
									<h6 className="pricing">
										$65<span className="pricing-span">/ hr + HST</span>
									</h6>
									<h6 className="package-name">Driving Practice Lessons</h6>
									<div className="align-items-center">
										<p className="package-description">
											In-car lessons with an MTO-certified Kruzee instructor
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">
											Book one, five, or ten hours of lessons - it's totally up to you
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">Free pickup and drop-off</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">
											Book and schedule your in-car lessons fully online
										</p>
									</div>
								</div>
								<div className="align-center">
									<Link
										to="/indiviual-lesson"
										state={{ heading_name: 'Book your first driving lesson' }}
										onClick={handleIndiviualLessons}
									>
										<div className="pricing-btn">Select</div>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4 pricing-padding">
						<div className="pricing-box">
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '100%',
								}}
							>
								<div>
									<h6 className="pricing">
										$245<span className="pricing-span">/ pack + HST</span>
									</h6>
									<h6 className="package-name">Vehicle for Road Test and Simulation</h6>
									<div className="align-items-center">
										<p className="package-description">
											Use a Kruzee instructor’s vehicle for your exam
										</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">Use a Kruzee instructor’s vehicle for road test</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">30 min refresher lesson before test</p>
									</div>
									<div className="plan-benefits">
										<img
											className="instructor-picture"
											src={process.env.PUBLIC_URL + '/images/benefits.svg'}
											alt="benefits"
										/>
										<p className="benefits-info">Free pickup and drop-off from test</p>
									</div>
								</div>
								<div className="align-center">
									<Link to="/pick-up" onClick={handleRoadTest}>
										<div className="pricing-btn">Select</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Pricing;
