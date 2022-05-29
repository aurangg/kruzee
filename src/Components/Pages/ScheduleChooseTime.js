import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimeTable from './ScheduleTimeTable';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

const ChooseTime = (props) => {
	const instructorDetails = props.instructorDetail;

	return (
		<div className={useStyles.root}>
			<div className="col-lg-12">
				<TimeTable
					showPickup={props.showPickup}
					name={instructorDetails.fullName}
					slots={instructorDetails.slots}
					bookedSlots={instructorDetails.bookedSlots}
					isReschedule={props.isReschedule}
					handleClose={props.handleClose}
					lessonNumber={props.lessonNumber}
				/>
			</div>
		</div>
	);
};

export default ChooseTime;
