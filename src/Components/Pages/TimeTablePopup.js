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
			<div className="map-container">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>
				{show === false ? (
					<ChooseTime
						isReschedule={props.isReschedule}
						instructorDetail={props.instructorDetail}
						showPickup={showMap}
						lessonNumber={props.lessonNumber}
					/>
				) : (
					<MapSchedule
						lessonDetails={props.lessonDetails}
						instructorId={props.instructorDetail._id}
						handleClose={props.handleClose}
						isReschedule={props.isReschedule}
					/>
				)}
			</div>
		</div>
	);
};

export default TimeTablePopup;
