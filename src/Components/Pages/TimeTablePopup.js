import React, { useState } from 'react';
import ChooseTime from './ScheduleChooseTime';
import MapSchedule from './MapSchedule';

const TimeTablePopup = (props) => {
	const [show, setShow] = useState(false);

	const showMap = () => {
		setShow(true);
	};

	return (
		<div className="map-overlay-box">
			{/* <div className="schedule-lesson-main"> */}
				{/* <span className="close-icon" onClick={props.handleClose}>
					x
				</span> */}
				{show === false ? (
					<div className='schedule-lesson-main normal-height'>
						<div className='close-button' onClick={props.handleClose}>
							x
						</div>
						<ChooseTime
							isReschedule={props.isReschedule}
							instructorDetail={props.instructorDetail}
							showPickup={showMap}
							lessonNumber={props.lessonNumber}
						/>
					</div>
				) : (
					<div className='schedule-lesson-main extra-height'>
						<div className='close-button' onClick={props.handleClose}>
							x
						</div>
						<MapSchedule
							lessonDetails={props.lessonDetails}
							instructorId={props.instructorDetail._id}
							handleClose={props.handleClose}
							isReschedule={props.isReschedule}
						/>
					</div>
				)}
			{/* </div> */}
		</div>
	);
};

export default TimeTablePopup;
