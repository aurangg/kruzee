import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimeTable from './ScheduleTimeTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import LargeHeading from '../Common/LargeHeading';

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
				{props.isReschedule ? (
					<>
						<div className="row h-70vh container">
							<div className="d-flex justify-content-center align-items-end">
								<p className="four-o-four-text error-heading mb-3">
									<FontAwesomeIcon icon={faCircleExclamation} color="	#FF0000" />
									&nbsp;Rescheduling under maintenance
								</p>
							</div>
							<p className="four-o-four-text d-flex justify-content-center align-items-start">
								Please Contact support to get your lesson rescheduled
							</p>
						</div>
					</>
				) : (
					<TimeTable
						showPickup={props.showPickup}
						name={instructorDetails.fullName}
						slots={instructorDetails.slots}
						bookedSlots={instructorDetails.bookedSlots}
						isReschedule={props.isReschedule}
						handleClose={props.handleClose}
						lessonNumber={props.lessonNumber}
					/>
				)}
			</div>
		</div>
	);
};

export default ChooseTime;
