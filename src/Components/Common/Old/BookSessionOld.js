import React, { useCallback, useEffect, useState } from 'react';
import '../css/onboarding.css';
import { Link } from 'react-router-dom';
import Toolbar from '../Common/Toolbar';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import NoResult from './NoResult';
import { Link as Linked, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

function BookSessionTest() {
	const [dateId, setDateId] = useState(0);
	const [activeState, setActiveState] = useState(false);
	const [btn, setBtn] = useState(false);
	const week = [
		{
			id: 0,
			day: 'Sun',
			date: 1,
			current: true,
			available: true,
			timeSlots: [
				{
					id: 0,
					startingTime: '1am',
					endingTime: '10am',
					active: true,
				},
				{
					id: 1,
					startingTime: '10am',
					endingTime: '11am',
					active: false,
				},
				{
					id: 2,
					startingTime: '11:30am',
					endingTime: '12:30pm',
					active: false,
				},
				{
					id: 3,
					startingTime: '2pm',
					endingTime: '3pm',
					active: false,
				},
				{
					id: 4,
					startingTime: '4pm',
					endingTime: '5pm',
					active: false,
				},
			],
		},
		{
			id: 1,
			day: 'Mon',
			date: 22,
			current: false,
			available: true,
			timeSlots: [
				{
					id: 0,
					startingTime: '822am',
					endingTime: '10am',
					active: true,
				},
				{
					id: 1,
					startingTime: '11pm',
					endingTime: '12am',
					active: false,
				},
				{
					id: 2,
					startingTime: '11:30am',
					endingTime: '12:30pm',
					active: false,
				},
				{
					id: 3,
					startingTime: '2pm',
					endingTime: '3pm',
					active: false,
				},
				{
					id: 4,
					startingTime: '4pm',
					endingTime: '5pm',
					active: false,
				},
			],
		},
		{
			id: 2,
			day: 'Tues',
			date: 2,
			current: false,
			available: false,
			timeSlots: [
				{
					id: 0,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 1,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 2,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 3,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 4,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
			],
		},
		{
			id: 3,
			day: 'Wed',
			date: 3,
			current: false,
			available: true,
			timeSlots: [
				{
					id: 0,
					startingTime: '3am',
					endingTime: '10am',
					active: true,
				},
				{
					id: 1,
					startingTime: '10am',
					endingTime: '11am',
					active: false,
				},
				{
					id: 2,
					startingTime: '11:30am',
					endingTime: '12:30pm',
					active: false,
				},
				{
					id: 3,
					startingTime: '2pm',
					endingTime: '3pm',
					active: false,
				},
				{
					id: 4,
					startingTime: '4pm',
					endingTime: '5pm',
					active: false,
				},
			],
		},
		{
			id: 4,
			day: 'Thu',
			date: 5,
			current: false,
			available: true,
			timeSlots: [
				{
					id: 0,
					startingTime: '5am',
					endingTime: '10am',
					active: true,
				},
				{
					id: 1,
					startingTime: '10am',
					endingTime: '11am',
					active: false,
				},
				{
					id: 2,
					startingTime: '11:30am',
					endingTime: '12:30pm',
					active: false,
				},
				{
					id: 3,
					startingTime: '2pm',
					endingTime: '3pm',
					active: false,
				},
				{
					id: 4,
					startingTime: '4pm',
					endingTime: '5pm',
					active: false,
				},
			],
		},
		{
			id: 5,
			day: 'Fri',
			date: 26,
			current: false,
			available: false,
			timeSlots: [
				{
					id: 0,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 1,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 2,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 3,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
				{
					id: 4,
					startingTime: '0',
					endingTime: '0',
					active: false,
				},
			],
		},
		{
			id: 6,
			day: 'Sat',
			date: 4,
			current: false,
			available: true,
			timeSlots: [
				{
					id: 0,
					startingTime: '4am',
					endingTime: '10am',
					active: true,
				},
				{
					id: 1,
					startingTime: '61am',
					endingTime: '11am',
					active: false,
				},
				{
					id: 2,
					startingTime: '11:30am',
					endingTime: '12:30pm',
					active: false,
				},
				{
					id: 3,
					startingTime: '2pm',
					endingTime: '3pm',
					active: false,
				},
				{
					id: 4,
					startingTime: '4pm',
					endingTime: '5pm',
					active: false,
				},
			],
		},
	];

	const timeSlots = [
		{
			id: 0,
			startingTime: '9am',
			endingTime: '10am',
			active: true,
		},
		{
			id: 1,
			startingTime: '10am',
			endingTime: '11am',
			active: false,
		},
		{
			id: 2,
			startingTime: '11:30am',
			endingTime: '12:30pm',
			active: false,
		},
		{
			id: 3,
			startingTime: '2pm',
			endingTime: '3pm',
			active: false,
		},
		{
			id: 4,
			startingTime: '4pm',
			endingTime: '5pm',
			active: false,
		},
	];

	function scrollTo() {
		scroller.scrollTo('scroll-to-element', {
			duration: 800,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}

	const instructor = true;
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const handleTimeSlot = useCallback((k, start, end) => {
		return (e) => {
			setStart(start);
			setEnd(end);
			setActiveState(k);
			setBtn(true);
		};
	});
	if (!instructor) {
		return <NoResult />;
	}
	const overlayFnOn = () => {
		document.getElementById('overlay').style.display = 'flex';
	};
	const overlayFnOff = () => {
		document.getElementById('overlay').style.display = 'none';
	};
	const handleDateChange = () => {
		console.log(dateId);
		const result = week.filter((w) => w.id === dateId);
		const newArr = [...result[0].timeSlots];
		return (
			<div>
				{newArr.map((k, index) => (
					<div
						className={activeState === index ? 'available-slot-box active-slot-box' : 'available-slot-box'}
						key={k.id}
						onClick={handleTimeSlot(index, k.startingTime, k.endingTime)}
					>
						<p className="time-available color-gray900">
							{k.startingTime} - {k.endingTime}
						</p>
					</div>
				))}
			</div>
		);
	};
	return (
		<section className="simple-bg">
			<div id="overlay" className="overlay">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 offset-lg-3">
							<div className="time-slot">
								<div className="time-slot-header">
									<div className="space-between">
										<div className="align-items">
											<img
												src={process.env.PUBLIC_URL + '/images/driver-img.png'}
												alt="driver-img"
											/>
											<p className="time-slot-heading color-gray900">Select a time slot</p>
										</div>
										<img
											src={process.env.PUBLIC_URL + '/images/cancel.svg'}
											alt="driver-img"
											onClick={overlayFnOff}
											style={{ cursor: 'pointer' }}
										/>
									</div>
								</div>
								<div className="time-slot-divider"></div>
								<div className="time-body">
									<div className="row time-body-header">
										<div className="col-4"></div>
										<div className="col-4 align-items-center">
											<h5 className="month">March</h5>
										</div>
										<div className="col-4 flex-end">
											<button className="time-slot-btn left-time-btn">
												<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
											</button>
											<button className="time-slot-btn right-time-btn">
												<img
													src={process.env.PUBLIC_URL + '/images/right.svg'}
													alt="right-img"
												/>
											</button>
										</div>
									</div>
									<div className="space-between-baseline">
										{week.map((i) => (
											<div className="" key={i.id}>
												<button
													className="week color-gray700"
													onClick={() => setDateId(i.id)}
													disabled={!i.available}
												>
													{i.day}
													{/* <div className={i.current ? 'blue-date-box date-box' : 'date-box white-date-box'}> */}
													<div className="date-box white-date-box">
														<p
															className={
																i.available
																	? 'color-gray900 date'
																	: 'date color-gray700'
															}
														>
															{i.date}
														</p>
													</div>
												</button>
											</div>
										))}
									</div>
									<div className="available-slots">{handleDateChange()}</div>
									<Link to="/pick-up">
										<div
											className={
												btn
													? 'time-slot-continue-btn bg-blue500 display-block'
													: 'time-slot-continue-btn bg-blue500 display-none'
											}
										>
											Continue
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<Toolbar path="/packages" back_button="block" />
				<div className="row">
					<ProgressBar />
					<div className="col-12">
						<LargeHeading large_heading="Book your first driving lesson" />
						<p className="onboarding-description">
							Showing <span className="color-blue700 weight-700">2</span> instructors within{' '}
							<span className="color-blue700 weight-700">10km</span> of you
						</p>
					</div>
				</div>
				<button to="lastContainer" onClick={() => scrollTo()}>
					Button
				</button>
			</div>
			<div className="container-fluid container-scroll">
				<div className="row row-scroll flex-nowrap">
					<div className="col-lg-1" id="col-1"></div>
					<div className="col-lg-3 scroll-col">
						<div className="instructor-box">
							<div className="instructor-start-info">
								<img
									className="instructor-picture"
									src={process.env.PUBLIC_URL + '/images/driver-img.png'}
									alt="driver-img"
								/>
								<img
									className="instructor-picture instructor-picture-2"
									src={process.env.PUBLIC_URL + '/images/driver-car.png'}
									alt="driver-car"
								/>
								<h6 className="instructor-name color-gray900">Phil Jacobson</h6>
							</div>
							<div className="instruction-description-box">
								<p className="instructor-description color-gray900">
									Hey everyone. My name is phil and I’m a driving instructor for Kitchener Ontario.
									I’ve been doing this for five years and I am really enjoying it.
								</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
								</div>
								<p className="feature-info color-gray900">2010 Toyota Highlander</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
								</div>
								<p className="feature-info color-gray900">Speaks English, French, and German</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
								</div>
								<p className="feature-info color-gray900">Automatic Transmission</p>
							</div>
							<h6 className="student-reviews color-gray900">Student Reviews</h6>
							<div className="review-container">
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Phil was the best. I couldn’t have imagined doing this with another instructor.
										Thanks!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">Maria Hernandez</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Wow phil was awesome. I don’t know what I would have done without him!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">David Sanders</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="see-schedule-btn bg-blue500" onClick={overlayFnOn}>
								See Schedule
							</button>
						</div>
					</div>

					<div className="col-lg-3 scroll-col">
						<div className="instructor-box">
							<div className="instructor-start-info">
								<img
									className="instructor-picture"
									src={process.env.PUBLIC_URL + '/images/driver-img.png'}
									alt="driver-img"
								/>
								<img
									className="instructor-picture instructor-picture-2"
									src={process.env.PUBLIC_URL + '/images/driver-car.png'}
									alt="driver-car"
								/>
								<h6 className="instructor-name color-gray900">Phil Jacobson</h6>
							</div>
							<div className="instruction-description-box">
								<p className="instructor-description color-gray900">
									Hey everyone. My name is phil and I’m a driving instructor for Kitchener Ontario.
									I’ve been doing this for five years and I am really enjoying it.
								</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
								</div>
								<p className="feature-info color-gray900">2010 Toyota Highlander</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
								</div>
								<p className="feature-info color-gray900">Speaks English, French, and German</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
								</div>
								<p className="feature-info color-gray900">Automatic Transmission</p>
							</div>
							<h6 className="student-reviews color-gray900">Student Reviews</h6>
							<div className="review-container">
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Phil was the best. I couldn’t have imagined doing this with another instructor.
										Thanks!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">Maria Hernandez</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Wow phil was awesome. I don’t know what I would have done without him!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">David Sanders</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="see-schedule-btn bg-blue500" onClick={overlayFnOn}>
								See Schedule
							</button>
						</div>
					</div>

					<div className="col-lg-3 scroll-col">
						<div className="instructor-box">
							<div className="instructor-start-info">
								<img
									className="instructor-picture"
									src={process.env.PUBLIC_URL + '/images/driver-img.png'}
									alt="driver-img"
								/>
								<img
									className="instructor-picture instructor-picture-2"
									src={process.env.PUBLIC_URL + '/images/driver-car.png'}
									alt="driver-car"
								/>
								<h6 className="instructor-name color-gray900">Phil Jacobson</h6>
							</div>
							<div className="instruction-description-box">
								<p className="instructor-description color-gray900">
									Hey everyone. My name is phil and I’m a driving instructor for Kitchener Ontario.
									I’ve been doing this for five years and I am really enjoying it.
								</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
								</div>
								<p className="feature-info color-gray900">2010 Toyota Highlander</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
								</div>
								<p className="feature-info color-gray900">Speaks English, French, and German</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
								</div>
								<p className="feature-info color-gray900">Automatic Transmission</p>
							</div>
							<h6 className="student-reviews color-gray900">Student Reviews</h6>
							<div className="review-container">
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Phil was the best. I couldn’t have imagined doing this with another instructor.
										Thanks!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">Maria Hernandez</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Wow phil was awesome. I don’t know what I would have done without him!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">David Sanders</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="see-schedule-btn bg-blue500" onClick={overlayFnOn}>
								See Schedule
							</button>
						</div>
					</div>

					<div className="col-lg-3 scroll-col">
						<div className="instructor-box">
							<div className="instructor-start-info">
								<img
									className="instructor-picture"
									src={process.env.PUBLIC_URL + '/images/driver-img.png'}
									alt="driver-img"
								/>
								<img
									className="instructor-picture instructor-picture-2"
									src={process.env.PUBLIC_URL + '/images/driver-car.png'}
									alt="driver-car"
								/>
								<h6 className="instructor-name color-gray900">Phil Jacobson</h6>
							</div>
							<div className="instruction-description-box">
								<p className="instructor-description color-gray900">
									Hey everyone. My name is phil and I’m a driving instructor for Kitchener Ontario.
									I’ve been doing this for five years and I am really enjoying it.
								</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
								</div>
								<p className="feature-info color-gray900">2010 Toyota Highlander</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
								</div>
								<p className="feature-info color-gray900">Speaks English, French, and German</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
								</div>
								<p className="feature-info color-gray900">Automatic Transmission</p>
							</div>
							<h6 className="student-reviews color-gray900">Student Reviews</h6>
							<div className="review-container">
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Phil was the best. I couldn’t have imagined doing this with another instructor.
										Thanks!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">Maria Hernandez</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Wow phil was awesome. I don’t know what I would have done without him!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">David Sanders</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="see-schedule-btn bg-blue500" onClick={overlayFnOn}>
								See Schedule
							</button>
						</div>
					</div>

					<div className="col-lg-3 scroll-col">
						<div className="instructor-box">
							<div className="instructor-start-info">
								<img
									className="instructor-picture"
									src={process.env.PUBLIC_URL + '/images/driver-img.png'}
									alt="driver-img"
								/>
								<img
									className="instructor-picture instructor-picture-2"
									src={process.env.PUBLIC_URL + '/images/driver-car.png'}
									alt="driver-car"
								/>
								<h6 className="instructor-name color-gray900">Phil Jacobson</h6>
							</div>
							<div className="instruction-description-box">
								<p className="instructor-description color-gray900">
									Hey everyone. My name is phil and I’m a driving instructor for Kitchener Ontario.
									I’ve been doing this for five years and I am really enjoying it.
								</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
								</div>
								<p className="feature-info color-gray900">2010 Toyota Highlander</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
								</div>
								<p className="feature-info color-gray900">Speaks English, French, and German</p>
							</div>
							<div className="features-box">
								<div>
									<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
								</div>
								<p className="feature-info color-gray900">Automatic Transmission</p>
							</div>
							<h6 className="student-reviews color-gray900">Student Reviews</h6>
							<div className="review-container">
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Phil was the best. I couldn’t have imagined doing this with another instructor.
										Thanks!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">Maria Hernandez</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
								<div className="review-box bg-gray100">
									<p className="review color-gray900">
										Wow phil was awesome. I don’t know what I would have done without him!
									</p>
									<div className="space-between-baseline">
										<h6 className="review-name">David Sanders</h6>
										<div className="ratings">
											<p className="rating-score color-gray900">5</p>
											<div>
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
												<img src={process.env.PUBLIC_URL + '/images/star.svg'} alt="star" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="see-schedule-btn bg-blue500" onClick={overlayFnOn}>
								See Schedule
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BookSessionTest;
