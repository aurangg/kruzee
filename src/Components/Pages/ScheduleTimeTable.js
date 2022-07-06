import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { setSlot, setDate } from '../Common/localStorage';
import { calTime } from '../Common/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const daysInWeek = [
	{ DAY: 'SUNDAY' },
	{ DAY: 'MONDAY' },
	{ DAY: 'TUESDAY' },
	{ DAY: 'WEDNESDAY' },
	{ DAY: 'THURSDAY' },
	{ DAY: 'FRIDAY' },
	{ DAY: 'SATURDAY' },
];

const TimeTable = ({ name, slots, bookedSlots, isReschedule, showPickup, lessonNumber }) => {
	const currentDate = () => {
		const curr = new Date();

		return curr;
	};

	const [selected, setSelected] = useState(0);
	const [week, setWeek] = useState(0);
	const [firstDay, setFirstDay] = useState(0);
	const [lastDay, setLastDay] = useState(0);

	const [firstDay2, setFirstDay2] = useState(0);
	const [lastDay2, setLastDay2] = useState(0);

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

	const weekHandlePlus = () => {
		if (week < 23) {
			setWeek(week + 1);
			handleFirstDay();
		}
	};

	const weekHandleMin = () => {
		if (week > 0) {
			setWeek(week - 1);
			handleFirstDay();
		}
	};

	const handleDate = (day) => {
		let currentWeek = Number(week * 7);
		var curr = new Date();
		var currNext = new Date(curr.getTime() + currentWeek * 24 * 60 * 60 * 1000);
		var firstday = new Date(currNext.setDate(currNext.getDate() - currNext.getDay() + day));

		const Day = format(firstday, 'yyyy-MM-dd');
		return [+Day.split('-')[2], firstday, Day];
	};

	const onPackageClick = (key, day, isDisabled, isPrevious) => {
		if (!isDisabled && !isPrevious) {
			setSelected(key);
			setSlot({
				date: firstDay,
				day: key.split('-')[0],
				slot: key.split('-')[1],
			});

			setDate(handleDate(day)[2]);
		}
	};

	const getBookedSlots = (statTime) => {
		const bookedSlotsData = bookedSlots?.find((item) => {
			return item.startDate.split('T')[0] === statTime;
		});
		return bookedSlotsData;
	};

	const slotsBooked = getBookedSlots(firstDay);

	useEffect(() => {
		handleFirstDay();
	}, [firstDay, lastDay, week, handleFirstDay]);

	return (
		<div className='schedule-lesson-padding'>
			<div
				className="row py-2"
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px #EFEFEF Solid',
					marginBottom: '50px',
				}}
			>
				<div className="col-md-8">
					<h2 className="schedule-lesson-heading">
						Schedule lesson with&#160;
						<span className='schedule-lesson-heading-span'>{name}.</span>
					</h2>
				</div>

				<div
					className="col-md-4"
					// style={{
					// 	textAlign: 'right',
					// 	alignSelf: 'flex-start',
					// 	fontWeight: 600,
					// 	color: 'black',
					// }}
				>
					<div className='sp-time-plan'>
					{
						week === 0 ? 
						<button className='sp-time-button opacity-03' onClick={weekHandleMin} disabled>
							<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="" />
						</button>
						:
						<button className='sp-time-button' onClick={weekHandleMin}>
							<img src={process.env.PUBLIC_URL + '/images/left.svg'} alt="" />
						</button>
					}
						<p className='sp-dates-available'>
							{`${firstDay2} - ${lastDay2}`}
						</p>
						{week < 23 && (
							<button className='sp-time-button' onClick={weekHandlePlus}>
								<img src={process.env.PUBLIC_URL + '/images/right.svg'} alt="" />
							</button>
						)}
					</div>
				</div>
			</div>

			<div className="row" style={{ justifyContent: 'center' }}>
				{daysInWeek.map((dayInWeek, index) => {
					return (
						<div id={index} className="col-md-1 mx-md-4 px-md-0">
							<p
								className="mb-0"
								style={{
									textAlign: 'center',
									fontSize: 14,
									fontWeight: 400,
								}}
							>
								{dayInWeek.DAY}
							</p>
							<p
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: '22px',
									color: 'black',
								}}
							>
								{handleDate(index)[0]}
							</p>

							{slots[`${dayInWeek.DAY.toLowerCase()}`]?.map((slot, ind) => {
								const numSlot = Math.abs(slot.startTime - slot.endTime);
								const numSlotArray = Array.from(Array(numSlot).keys());
								let keys = ind
								return numSlotArray.map((item) => {
									const time = slot.startTime + item;
									var booked = '';
									if (slotsBooked) {
										booked = slotsBooked[`${dayInWeek.DAY.toLowerCase()}`];
									}

									const isBooked = booked?.includes(time);
									const key = `${dayInWeek.DAY.toLowerCase()}-${time}`;

									const isPrevious = currentDate() >= handleDate(index)[1];

									return (
										<p
											key={key}
											className={selected === key ? 'active-blocks' : 'slot-blocks'}
											onClick={() => onPackageClick(key, index, isBooked, isPrevious)}
											style={{
												color: isBooked || isPrevious ? '#e8b0a8' : '#CE8379',
												textDecoration: isBooked || isPrevious ? 'line-through' : '',
												textAlign: 'center',
												backgroundColor: isBooked || isPrevious ? '#FFFFFF' : '#FDF0F4',
											}}
										>
											{calTime(time)}
										</p>
									);
								});
							})}
						</div>
					);
				})}
			</div>

			<div className="row pt-3">
				<div className='col-lg-4 offset-lg-4'>
					{selected ? (
						<button className="continue-schedule-btn" onClick={showPickup}>
							Schedule class with {name.split(' ')[0]}
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};
export default TimeTable;
