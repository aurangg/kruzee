import React, { useState } from 'react';
import ChooseTime from './ScheduleChooseTime';
// import Map from './ScheduleMap';
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
					// <Map
					// 	style={{ width: '100%', height: '100%', position: 'relative' }}
					// 	mapElement={<div className="mapElement" />}
					// 	google={props.google}
					// 	center={{ lat: 43.6534817, lng: -79.3839347 }}
					// 	width="100%"
					// 	height="400px"
					// 	zoom={15}
					// 	handleClose={props.handleClose}
					// 	lessonDetails={props.lessonDetails}
					// 	instructorId={props.instructorDetail._id}
					// 	isReschedule={props.isReschedule}
					// />
					<MapSchedule />
				)}
			</div>
		</div>
	);
};

export default TimeTablePopup;
