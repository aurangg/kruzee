import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Common/Toolbar';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import NoResult from './NoResult';
import { useLocation } from 'react-router-dom';
import Loader from '../Common/Loader';
import { format } from 'date-fns';
import { callTime } from '../utils/utils';
import SmallLoader from '../Common/SmallLoader';
import FourOFour from '../Common/404';
import { getPostalCode } from '../utils/localStorage';
import { Data } from '@react-google-maps/api';
import { useIntercom } from 'react-use-intercom';
import '../css/onboarding.css';

function BookSession() {
	const { boot } = useIntercom();
	boot();
	const [activeState, setActiveState] = useState(false);
	const [btn, setBtn] = useState(false);
	const [week, setWeek] = useState(0);

	const [slots, setSlots] = useState(0);

	const currentDate = () => {
		const curr = new Date();
		return curr;
	};

	const daysInWeek = [
		{ day: 'Sunday', isSlotAvailable: true },
		{ day: 'Monday', isSlotAvailable: true },
		{ day: 'Tuesday', isSlotAvailable: true },
		{ day: 'Wednesday', isSlotAvailable: true },
		{ day: 'Thursday', isSlotAvailable: true },
		{ day: 'Friday', isSlotAvailable: true },
		{ day: 'Saturday', isSlotAvailable: true },
	];

	var weekIndex;

	const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const [loading, setLoading] = useState(true);
	const [errorRes, setErrorRes] = useState(false);

	const postalCode = getPostalCode().replace(/"/g, '');
	const [data, setData] = useState([]);
	const location = useLocation();
	const [instructor, setInstructorId] = useState('');

	const [selected, setSelected] = useState(0);
	const [slot, setSlot] = useState(0);
	const [date, setDate] = useState(0);
	const [bookedSlots, setBookedSlots] = useState(0);
	const [firstDay, setFirstDay] = useState(0);
	const [firstDay2, setFirstDay2] = useState(0);
	const [lastDay, setLastDay] = useState(0);
	const [lastDay2, setLastDay2] = useState(0);

	const [showMore, setShowMore] = useState(false);

	const [instructorName, setInstructorName] = useState('');

	const [timeLoader, setTimeLoader] = useState(false);

	const [bookedStatus, setBookedStatus] = useState(false);
	const [selectedInstructorDetail, setSelectedInstructorDetail] = useState();
	const [bookInstructorSlot, setBookInstructorSlot] = useState(0);

	const [instructorImage, setInstructorImage] = useState('');
	const [instructorVehicleImage, setInstructorVehicleImage] = useState('');

	useEffect(() => {
		document.title = 'Book A Lesson | Kruzee';
		localStorage.removeItem('instructorName');
		localStorage.removeItem('date');
		localStorage.removeItem('day');
		localStorage.removeItem('slot');
		localStorage.removeItem('instructorId');
		localStorage.removeItem('weekStartDate');
		localStorage.removeItem('instructorImage');
		localStorage.removeItem('instructorVehicleImage');
	}, []);

	const fetchTopThreeInstructor = async () => {
		try {
			const instructorData = await fetch(
				`${process.env.REACT_APP_BASE_URL}/api/student/searchTopThreeInstructors`,
				{
					method: 'POST',
					body: JSON.stringify({ postalCode }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const json = await instructorData.json();
			setData(json.data);
		} catch (error) {
			setErrorRes(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		let ignore = false;
		if (!ignore) fetchTopThreeInstructor(postalCode);
		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		if (instructor != '') {
			fetchSchedule(instructor);
			localStorage.setItem('instructorId', JSON.stringify(instructor));
		}
		return () => {};
	}, [instructor]);

	useEffect(() => {
		if (data) {
			data.map((instructorDetail, index) => {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
				window.dataLayer.push({ instructors_details: null });
				window.dataLayer.push({
					event: 'driving_instructor_list_viewed',
					total_instructors: data.length,
					instructors_details: {
						instructors: [
							{
								instructor_id: instructorDetail._id,
								instructor_name: instructorDetail.fullName,
								instructor_language: instructorDetail.languages[0],
								instructor_vehicle: `${instructorDetail.vehicleDetails.year} ${instructorDetail.vehicleDetails.make} ${instructorDetail.vehicleDetails.model}`,
								instructor_vehicle_type: instructorDetail.vehicleDetails.transmission,
								instructor_rating: 5,
								index: 0,
							},
						],
					},
				});
			});
		}
	}, [data]);

	const fetchSchedule = async () => {
		try {
			const scheduleData = await fetch(
				`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${instructor}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const scheduleJsonData = await scheduleData.json();
			setSlots(scheduleJsonData.data.slots);
			setInstructorImage(scheduleJsonData.data.instructorImage);
			setInstructorVehicleImage(scheduleJsonData.data.vehicleDetails.image);
			setSelectedInstructorDetail(scheduleJsonData.data);
			const sortedBookedSlots = scheduleJsonData.data.bookedSlots.sort(function (a, b) {
				const nameA = a.startDate;
				const nameB = b.startDate;
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			setBookedSlots(sortedBookedSlots);
			// data.map((scheduleJsonData.data, index) => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
			window.dataLayer.push({ instructors_details: null });
			window.dataLayer.push({
				event: 'driving_instructor_viewed',
				total_instructors: data.length,
				instructors_details: {
					instructors: [
						{
							instructor_id: scheduleJsonData.data._id,
							instructor_name: scheduleJsonData.data.fullName,
							instructor_language: scheduleJsonData.data.languages[0],
							instructor_vehicle: `${scheduleJsonData.data.vehicleDetails.year} ${scheduleJsonData.data.vehicleDetails.make} ${scheduleJsonData.data.vehicleDetails.model}`,
							instructor_vehicle_type: scheduleJsonData.data.vehicleDetails.transmission,
							instructor_rating: 5,
							index: 0,
						},
					],
				},
			});
			// });
			// availableSlots();
		} catch (error) {
			setErrorRes(true);
		} finally {
			setLoading(false);
			setTimeLoader(true);
		}
	};

	const nextWeek = () => {
		if (week < 23) {
			setWeek(week + 1);
			handleFirstDay();
			// setActiveIndex(0)
		}
	};

	const previousWeek = () => {
		if (week > 0) {
			setWeek(week - 1);
			handleFirstDay();
			// setActiveIndex(0)
		}
	};

	const [slotDay, setSlotDay] = useState('Sunday');

	const handleTimeSlot = (index, bool) => {
		setActiveState(index);
		if (bool == false) {
			setBtn(false);
		} else {
			setBtn(true);
		}
		setBookInstructorSlot(index);
		localStorage.setItem('day', JSON.stringify(slotDay.toLowerCase()));
		localStorage.setItem('slot', JSON.stringify(index));
	};

	const overlayFnOn = () => {
		document.getElementById('overlay').style.display = 'flex';
	};

	const overlayFnOff = () => {
		document.getElementById('overlay').style.display = 'none';
	};

	const handleFirstDay = useCallback(() => {
		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var weekFirstDay = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + 0));
		var weekLastDay = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + 6));
		const dayFirst = format(weekFirstDay, 'yyyy-MM-dd');
		const dayLast = format(weekLastDay, 'yyyy-MM-dd');
		const dayFirst2 = format(weekFirstDay, 'MMMM dd');
		const dayLast2 = format(weekLastDay, 'MMMM dd');
		const currentDate = new Data();
		const currentDayFirstTest = format(weekFirstDay, 'dd');
		const currentTestDate = format(curr, 'dd');
		// if(bookedSlots != 0){
		// 	let weekIndex = 4;
		// 	if(Number(currentTestDate) >= Number(currentDayFirstTest) && Number(currentDayFirstTest)+7 > Number(currentTestDate)){
		// 		weekIndex = Number(currentTestDate) - Number(currentDayFirstTest)
		// 	}
		// 	if(dayFirst === bookedSlots[0].startDate.slice(0,10)){
		// 		daysInWeek[weekIndex] = {
		// 			day: daysInWeek[weekIndex].day,
		// 			isSlotAvailable: false,
		// 		};
		// 	}
		// 	else{
		// 		daysInWeek[weekIndex] = {
		// 			day: daysInWeek[weekIndex].day,
		// 			isSlotAvailable: true,
		// 		};
		// 	}
		// }
		// if(bookedSlots != 0){
		// 	outerloop: for(let k = 0; k < bookedSlots.length; k++){
		// 		if(dayFirst === bookedSlots[k].startDate.slice(0,10)){
		// 			daysInWeek[weekIndex] = {
		// 				day: daysInWeek[weekIndex].day,
		// 				isSlotAvailable: false,
		// 			};
		// 			break outerloop;
		// 		}
		// 	}
		// }
		setFirstDay2(dayFirst2);
		setLastDay2(dayLast2);
		setFirstDay(dayFirst);
		setLastDay(dayLast);
	}, [week, bookedSlots]);

	const getBookedSlots = (staTime) => {
		if (bookedSlots) {
			const bookedSlotsData = bookedSlots?.find((item) => {
				return item.startDate.split('T')[0] === staTime;
			});
			return bookedSlotsData;
		}
	};

	const slotsBooked = getBookedSlots(firstDay);

	useEffect(() => {
		handleFirstDay();
	}, [firstDay, lastDay, week, handleFirstDay]);

	function handleDate(index) {
		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var firstday = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + index));
		const Day = format(firstday, 'yyyy-MM-dd');
		return Day;
	}

	const onPackageClick = (key, day, isDisabled, isPrevious) => {
		if (!isDisabled && !isPrevious) {
			// setSelected(key);
			// setSlot({
			// 	date: firstDay,
			// 	day: key.split('-')[0],
			// 	slot: key.split('-')[1],
			// });
			setDate(handleDate(day)[2]);
		}
	};

	const [activeIndex, setActiveIndex] = useState();

	const handleIndex = (index) => {
		setActiveIndex(index);
	};

	function setSelectedInstructorInfo() {
		localStorage.setItem('instructorName', JSON.stringify(instructorName));
		localStorage.setItem('instructorImage', JSON.stringify(instructorImage));
		localStorage.setItem('instructorVehicleImage', JSON.stringify(instructorVehicleImage));

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ instructors_details: null });
		window.dataLayer.push({
			event: 'driving_date_time_selected',
			schedule_details: {
				day: slotDay,
				date: date.split('-')[2],
				month: date.split('-')[1],
				year: date.split('-')[0],
				start_time: bookInstructorSlot,
				end_time: bookInstructorSlot + 1,
			},
			instructors_details: {
				instructors: [
					{
						instructor_id: selectedInstructorDetail._id,
						instructor_name: instructorName,
						instructor_language: selectedInstructorDetail.languages[0],
						instructor_vehicle: `${selectedInstructorDetail.vehicleDetails.year} ${selectedInstructorDetail.vehicleDetails.make} ${selectedInstructorDetail.vehicleDetails.model}`,
						instructor_vehicle_type: selectedInstructorDetail.vehicleDetails.transmission,
						instructor_rating: 5,
						index: 0,
					},
				],
			},
		});
	}

	useEffect(() => {
		handleDateSelected(handleDate(weeks.findIndex((e) => e === slotDay)));
	});

	function handleDateSelected(date) {
		if (date !== '') {
			setDate(date);
			localStorage.setItem('date', JSON.stringify(date));
			localStorage.setItem('weekStartDate', JSON.stringify(firstDay));
		}
	}

	const [slotsAvailable, setSlotsAvailable] = useState(false);

	const availableSlots = () => {
		var totalTime;

		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var weekFirstDay = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + 0));
		const currentDayFirstTest = format(weekFirstDay, 'dd');
		const currentTestDate = format(curr, 'dd');
		var isWeekBooked = false;
		daysInWeek.map((dayInWeek, index) => {
			if (slots) {
				slots[`${dayInWeek.day.toLowerCase()}`]?.map((slot, index) => {
					const numberSlot = Math.abs(slot.startTime - slot.endTime);
					const numberSlotArray = Array.from(Array(numberSlot).keys());
					return numberSlotArray.map((item, index_2) => {
						const time = slot.startTime + item;
						let booked = '';
						if (slotsBooked) {
							booked = slotsBooked[`${dayInWeek.day.toLowerCase()}`];
						}
						const isBooked = booked?.includes(time);
						totalTime =
							slots[`${dayInWeek.day.toLowerCase()}`][0].endTime -
							slots[`${dayInWeek.day.toLowerCase()}`][0].startTime;
					});
				});
				console.log('currentTestDate,currentDayFirstTest,', currentTestDate, currentDayFirstTest);
				if (
					Number(currentTestDate) >= Number(currentDayFirstTest) &&
					Number(currentDayFirstTest) + 7 > Number(currentTestDate)
				) {
					weekIndex = Number(currentTestDate) - Number(currentDayFirstTest);
					for (let i = 0; i < weekIndex + 1; i++) {
						console.log('daysInWeek[i]', daysInWeek[i]);
						daysInWeek[i] = {
							day: daysInWeek[i].day,
							isSlotAvailable: false,
						};
					}
				}
				var countBookedSlots = totalTime;
				slotsBooked[`${dayInWeek.day.toLowerCase()}`].map((slotBooked) => {
					slots[`${dayInWeek.day.toLowerCase()}`].map((slot) => {
						if (
							Math.min(slot.startTime, slot.endTime) <= slotBooked &&
							Math.max(slot.startTime, slot.endTime) >= slotBooked
						) {
							countBookedSlots = countBookedSlots - 1;
						}
					});
				});
				if (countBookedSlots === 0) {
					daysInWeek[index] = {
						day: dayInWeek.day,
						isSlotAvailable: false,
					};
				} else {
					isWeekBooked = true;

					daysInWeek[index] = {
						day: dayInWeek.day,
						isSlotAvailable: true,
					};
				}
			} else {
				daysInWeek[index] = {
					day: dayInWeek.day,
					isSlotAvailable: false,
				};
			}
		});
		// if (isWeekBooked) {
		// 	setSlotsAvailable(true);
		// }
		// isWeekBooked = false;
	};

	useEffect(() => {
		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var weekFirstDay = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + 0));
		const weekStartDate = format(weekFirstDay, 'dd');
		const currentDate = format(curr, 'dd');
		if (Number(currentDate) >= Number(weekStartDate) && Number(weekStartDate) + 6 > Number(currentDate)) {
			weekIndex = Number(currentDate) - Number(weekStartDate);
		}
		if (weekIndex !== undefined) {
			for (let i = 0; i < weekIndex + 1; i++) {
				daysInWeek[i] = {
					day: daysInWeek[i].day,
					isSlotAvailable: false,
				};
			}
			setSlotDay(daysInWeek[weekIndex + 1].day);
			setActiveIndex(weekIndex + 1);
			setBtn(false);
		}
	}, [week]);

	useEffect(() => {
		slots[`${slotDay.toLowerCase()}`]?.map((slot, index) => {
			const numberSlot = Math.abs(slot.startTime - slot.endTime);
			const numberSlotArray = Array.from(Array(numberSlot).keys());
			return numberSlotArray.map((item, index_2) => {
				const time = slot.startTime + item;
				let booked = '';
				if (slotsBooked) {
					booked = slotsBooked[`${slotDay.toLowerCase()}`];
				}
				const isBooked = booked?.includes(time);
				const totalTime =
					slots[`${slotDay.toLowerCase()}`][0].endTime - slots[`${slotDay.toLowerCase()}`][0].startTime;
				if (slotsBooked[`${slotDay.toLowerCase()}`].length === totalTime) {
					setSlotsAvailable(true);
				} else {
					setSlotsAvailable(false);
				}
			});
		});
		// availableSlots();
	}, [slotDay, firstDay]);

	if (loading) {
		return <Loader />;
	}
	if (data?.length === 0 || !data) {
		return <NoResult />;
	}
	if (errorRes) {
		return <FourOFour />;
	}
	return (
		<section className="simple-bg h-100vh">
			<div id="overlay" className="overlay">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 offset-lg-3">
							<div className="time-slot">
								<div className="time-slot-header">
									<div className="space-between">
										<div className="align-items">
											<img
												className="time-slot-driver-img"
												src={`${process.env.REACT_APP_BASE_URL}${instructorImage}`}
												alt="driver-img"
											/>
											{/* <img className='time-slot-driver-img' src="https://kruzeee.tk/uploads/image-1650487578785.JPG" alt="driver-img" /> */}
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
									<div className=" time-body-header d-flex justify-content-evenly">
										{/* <div className="col-3 flex-end">
											<button className="time-slot-btn left-time-btn" onClick={previousWeek}>
												<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
											</button>
										</div> */}
										{/* <div className="col-0"></div> */}
										<div className="">
											{week === 0 ? (
												<button className="opacity-03 time-slot-btn disabled left-time-btn">
													<img
														src={process.env.PUBLIC_URL + '/images/left.svg'}
														alt="right-img"
													/>
												</button>
											) : (
												<button className="time-slot-btn left-time-btn" onClick={previousWeek}>
													<img
														src={process.env.PUBLIC_URL + '/images/left.svg'}
														alt="right-img"
													/>
												</button>
											)}
										</div>
										{/* <div className="col-3 flex-end">
											<button
												className="time-slot-btn left-time-btn"
												onClick={previousWeek}
												style={{ height: '41px' }}
											>
												<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
											</button>
										</div> */}
										<div className=" align-items-center">
											<h5 className="month color-gray900">{`${firstDay2} - ${lastDay2}`}</h5>
										</div>
										<div className="">
											<button className="time-slot-btn right-time-btn" onClick={nextWeek}>
												<img
													src={process.env.PUBLIC_URL + '/images/right.svg'}
													alt="right-img"
												/>
											</button>
										</div>
									</div>
									<div className="time-slot-spacing" style={{ width: '100%' }}>
										{availableSlots()}
										{daysInWeek.map((dayInWeek, index) => {
											availableSlots();
											return slots[`${dayInWeek.day.toLowerCase()}`]?.length !== 0 &&
												dayInWeek.isSlotAvailable === true ? (
												<React.Fragment key={index}>
													<button className="week" style={{ color: 'black' }}>
														{dayInWeek.day.slice(0, 3)}
														<div
															className={`date-box  disabled d-flex justify-content-center align-items-center ${
																activeIndex === index
																	? 'blue-date-box'
																	: 'white-date-box'
															}`}
															onClick={() => {
																setSlotDay(dayInWeek.day);
																handleIndex(index);
																handleTimeSlot(index, false);
															}}
														>
															<p
																className={`date`}
																style={{
																	fontWeight: '400 !important',
																	marginTop: '2px',
																}}
															>
																{handleDate(index).slice(8, 10)}
															</p>
														</div>
													</button>
												</React.Fragment>
											) : (
												<React.Fragment key={index}>
													<button
														className="week color-gray700"
														style={{ cursor: 'default' }}
													>
														{dayInWeek.day.slice(0, 3)}
														<div className={`date-box  disabled ${'lcx'}`}>
															<p className={`date`} style={{ color: '#bfc4c7' }}>
																{handleDate(index).slice(8, 10)}
															</p>
														</div>
													</button>
												</React.Fragment>
											);
										})}
									</div>
									{timeLoader === false ? (
										<SmallLoader />
									) : (
										<div>
											{slots[`${slotDay.toLowerCase()}`].length !== 0 ? (
												<div className="available-slots">
													{slots[`${slotDay.toLowerCase()}`]?.map((slot, index) => {
														const numberSlot = Math.abs(slot.startTime - slot.endTime);
														const numberSlotArray = Array.from(Array(numberSlot).keys());
														return numberSlotArray.map((item, index_2) => {
															const time = slot.startTime + item;
															let booked = '';
															if (slotsBooked) {
																booked = slotsBooked[`${slotDay.toLowerCase()}`];
															}
															const isBooked = booked?.includes(time);
															const key = `${slotDay.toLowerCase()}-${time}`;
															const isPrevious = currentDate() >= handleDate(index)[1];
															return (
																<div
																	key={item}
																	onLoad={() => setBookedStatus(isBooked)}
																>
																	{isBooked ? (
																		<></>
																	) : (
																		<div
																			value={item}
																			className={`available-slot-box ${
																				activeState === time
																					? 'active-slot-box'
																					: ''
																			}`}
																			onClick={(e) => {
																				onPackageClick(
																					key,
																					index,
																					isBooked,
																					isPrevious
																				);
																				handleTimeSlot(time, true);
																			}}
																		>
																			<p className="time-available color-gray900">
																				{callTime(time)} - {callTime(time + 1)}
																			</p>
																		</div>
																	)}
																</div>
															);
														});
													})}
												</div>
											) : (
												<>
													{slotsAvailable === true ? (
														''
													) : (
														<p className="apologies-text">
															Whoops! Looks like there are no time slots available. Please
															try selecting a different date 🥺
														</p>
													)}
												</>
											)}
											{slotsAvailable === true ? (
												<p className="apologies-text">
													Whoops! Looks like there are no time slots available. Please try
													selecting a different date 🥺
												</p>
											) : (
												''
											)}
											<Link to="/pick-up" onClick={setSelectedInstructorInfo}>
												<div
													className={`time-slot-continue-btn bg-blue500 ${
														btn ? ' display-block' : 'display-none'
													}`}
												>
													Continue
												</div>
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<Toolbar path="/driving-test" back_button="block" />
				<div className="row">
					<ProgressBar
						location={[
							{
								progress: 'complete',
							},
						]}
						packages={[
							{
								progress: 'complete',
							},
						]}
						pickup={[
							{
								progress: 'current',
							},
						]}
						account={[
							{
								progress: 'incomplete',
							},
						]}
						payment={[
							{
								progress: 'incomplete',
							},
						]}
					/>
					<div className="col-12">
						<LargeHeading large_heading={location.state.heading_name} />
						<p className="onboarding-description">
							Showing <span className="no-index-padding color-blue700 weight-700">{data.length}</span>{' '}
							{data.length === 1 ? 'instructor' : 'instructors'} within{' '}
							<span className="no-index-padding color-blue700 weight-700">10km</span> of you
						</p>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row instructor-box-row">
					{data.map((i, index) => (
						<div className="col-lg-4" key={index}>
							<div className="instructor-box">
								<div className="instructor-start-info">
									<img
										className="instructor-picture"
										src={`${process.env.REACT_APP_BASE_URL}${i.instructorImage}`}
										alt="driver-img"
									/>
									<img
										className="instructor-picture instructor-picture-2"
										src={`${process.env.REACT_APP_BASE_URL}${i.vehicleDetails.image}`}
										alt="driver-car"
									/>
									<h6 className="instructor-name color-gray900">{i.fullName}</h6>
								</div>
								<div className="instruction-description-box">
									<p className="instructor-description color-gray900">{i.bio}</p>
								</div>
								<div className="features-box">
									<div>
										<img src={process.env.PUBLIC_URL + '/images/features-1.svg'} alt="feature-1" />
									</div>
									<p className="feature-info color-gray900">
										{i.vehicleDetails.year} {i.vehicleDetails.make} {i.vehicleDetails.model}
									</p>
								</div>
								<div className="features-box">
									<div>
										<img src={process.env.PUBLIC_URL + '/images/features-2.svg'} alt="feature-2" />
									</div>
									<p className="feature-info color-gray900">Speaks {i.languages[0]}</p>
								</div>
								<div className="features-box">
									<div>
										<img src={process.env.PUBLIC_URL + '/images/features-3.svg'} alt="feature-3" />
									</div>
									<p className="feature-info color-gray900">
										{i.vehicleDetails.transmission} Transmission
									</p>
								</div>
								<h6 className="student-reviews color-gray900">Student Reviews</h6>
								<div className="review-container">
									<div className="review-box bg-gray100">
										<p
											className={`review color-gray900 review-text ${
												showMore ? 'display-block' : 'webkit-box'
											}`}
										>
											{i.fullName === 'Cory Froklage'
												? 'I had Cory who was very detail oriented and generous with his knowledge. You’ll learn defensive driving techniques that other schools won’t teach, like the S approach and ABS. Highly recommend!'
												: i.fullName === 'Zainab Qiam'
												? 'I learned how to drive thanks to Kruzee, my instructor was great at making points and it stuck with me, diagrams helped a lot too!'
												: 'I couldn’t have imagined doing these lessons with an instructor with a platform other than Kruzee. Thanks!'}
										</p>
										<button className="review-span" onClick={() => setShowMore(!showMore)}>
											{showMore ? 'Show Less' : 'See More'}
										</button>
										<div className="space-between-baseline">
											<h6 className="review-name">
												{i.fullName === 'Cory Froklage'
													? 'Hoang N.'
													: i.fullName === 'Zainab Qiam'
													? 'Ali R.'
													: 'Maria Hernandez'}
											</h6>
											<div className="ratings">
												<p className="rating-score color-gray900 mr-2">5.0 </p>{' '}
												<div className="pl-2">
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
								<button
									className="see-schedule-btn bg-blue500"
									onClick={() => {
										overlayFnOn();
										setInstructorId(i._id);
										setInstructorName(i.fullName);
									}}
								>
									See Schedule
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default BookSession;
