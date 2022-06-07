import React, { useRef, useState, useEffect, useCallback } from 'react';
import { format, getMonth } from 'date-fns';
import { callTime } from '../Common/utils';
import Loader from '../Common/Loader';
import { useIntercom } from 'react-use-intercom';

function Test() {
	const { boot } = useIntercom();
	boot();
	const [data, setData] = useState(null);
	const instructorID = '628cd897a83d193778036b67';
	const [bookedSlots, setBookedSlots] = useState(0);
	const [week, setWeek] = useState(0);
	const [slots, setSlots] = useState(0);
	const [selected, setSelected] = useState(0);
	const [slot, setSlot] = useState(0);
	const [date, setDate] = useState(0);

	const [firstDay, setFirstDay] = useState(0);
	const [firstDay2, setFirstDay2] = useState(0);
	const [lastDay, setLastDay] = useState(0);
	const [lastDay2, setLastDay2] = useState(0);
	const [month, setMonth] = useState(0);
	const currentDate = () => {
		const curr = new Date();
		return curr;
	};
	const monthArray = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const daysInWeek = [
		{ day: 'Sunday' },
		{ day: 'Monday' },
		{ day: 'Tuesday' },
		{ day: 'Wednesday' },
		{ day: 'Thursday' },
		{ day: 'Friday' },
		{ day: 'Saturday' },
	];

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
		setFirstDay2(dayFirst2);
		setLastDay2(dayLast2);
		setFirstDay(dayFirst);
		setLastDay(dayLast);
	}, [week]);

	useEffect(() => {
		var curr = new Date();
		var monthh = monthArray[curr.getMonth()];
		setMonth(monthh);
	}, [month]);

	const nextWeek = () => {
		if (week < 23) {
			setWeek(week + 1);
			handleFirstDay();
		}
	};

	const previousWeek = () => {
		if (week > 0) {
			setWeek(week - 1);
			handleFirstDay();
		}
	};

	const fetchSchedule = async () => {
		try {
			const scheduleData = await fetch(`${process.env.REACT_APP_GET_INSTRUCTOR_DETAIL}${instructorID}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const scheduleJsonData = await scheduleData.json();
			setData(scheduleData.data);
			setBookedSlots(scheduleJsonData.data.bookedSlots);
			setSlots(scheduleJsonData.data.slots);
			console.log(scheduleJsonData.data.slots);
			console.log(scheduleJsonData.data.bookedSlots);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchSchedule();
	}, []);

	const onPackageClick = (key, day, isDisabled, isPrevious) => {
		if (!isDisabled && !isPrevious) {
			setSelected(key);
			setSlot({
				date: firstDay,
				day: key.split('-')[0],
				slot: key.split('-')[1],
			});
			setDate(handleDateChange(day)[2]);
		}
	};

	const getBookedSlots = (statTime) => {
		if (bookedSlots !== 0) {
			const bookedSlotsData = bookedSlots?.find((item) => {
				return item.startDate.split('T')[0] === statTime;
			});
			return bookedSlotsData;
		}
	};
	const slotsBooked = getBookedSlots(firstDay);
	useEffect(() => {
		handleFirstDay();
	}, [firstDay, lastDay, week, handleFirstDay]);

	function handleDateChange(day) {
		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var firstday = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + day));
		const Day = format(firstday, 'dd');
		// return [+Day.split("-")[2], firstday, Day];
		return Day;
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-6 offset-lg-3">
					<div className="time-slot">
						<div className="time-slot-header">
							<div className="space-between">
								<div className="align-items">
									<img src={process.env.PUBLIC_URL + '/images/driver-img.png'} alt="driver-img" />
									<p className="time-slot-heading color-gray900">Select a time slot</p>
								</div>
								<img
									src={process.env.PUBLIC_URL + '/images/cancel.svg'}
									alt="driver-img"
									style={{ cursor: 'pointer' }}
								/>
							</div>
						</div>
						<div className="time-slot-divider"></div>
						<div className="time-body">
							<div className="row time-body-header">
								<div className="col-4"></div>
								<div className="col-4 align-items-center">
									<h5 className="month">
										{/* {month} */}
										{`${firstDay2} - ${lastDay2}`}
									</h5>
								</div>
								<div className="col-4 flex-end">
									<button className="time-slot-btn left-time-btn" onClick={previousWeek}>
										<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="left-img" />
									</button>
									<button className="time-slot-btn right-time-btn" onClick={nextWeek}>
										<img src={process.env.PUBLIC_URL + '/images/right.svg'} alt="right-img" />
									</button>
								</div>
							</div>
							{bookedSlots !== 0 ? (
								<div className="time-slot-spacing" style={{ width: '100%' }}>
									{daysInWeek.map((dayInWeek, index) => (
										<div key={index}>
											<button className="week color-gray700">{dayInWeek.day.slice(0, 3)}</button>
											<div className="date-box white-date-box">
												<p className="color-gray900 date">{handleDateChange(index)}</p>
											</div>
											<div className="available-slots">
												{slots[`${dayInWeek.day.toLowerCase()}`]?.map((slot, index) => {
													const numSlot = Math.abs(slot.startTime - slot.endTime);
													const numSlotArray = Array.from(Array(numSlot).keys());
													return numSlotArray.map((item) => {
														const time = slot.startTime + item;
														var booked = '';
														if (slotsBooked) {
															booked = slotsBooked[`${dayInWeek.day.toLowerCase()}`];
														}
														const isBooked = booked?.includes(time);
														const key = `${dayInWeek.day.toLowerCase()}-${time}`;
														const isPrevious = currentDate() >= handleDateChange(index)[1];
														return (
															<div>
																<div
																	className="available-slot-box"
																	onClick={() =>
																		onPackageClick(key, index, isBooked, isPrevious)
																	}
																>
																	<p className="time-available color-gray900">
																		{callTime(time)} - {callTime(time + 1)}
																	</p>
																</div>
															</div>
														);
													});
												})}
											</div>
										</div>
									))}
								</div>
							) : (
								<Loader />
							)}
							{/* <Link to="/pick-up">
                                        <div className={btn ? 'time-slot-continue-btn bg-blue500 display-block' : 'time-slot-continue-btn bg-blue500 display-none'}>
                                            Continue
                                        </div>
                                    </Link> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Test;
