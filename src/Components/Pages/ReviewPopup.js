import React, { useState } from 'react';
// import StarRatings from 'react-star-ratings';
import { Formik, Form } from 'formik';
import { BASE_URL } from '../Common/constants';
import axios from 'axios';

const ReviewPopup = (props) => {
	const [reviewText, setReviewText] = useState('');

	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>

				<div className="row m-4">
					<h2 className="f-size-20" style={{ color: 'black', fontWeight: '800', maxWidth: '100%' }}>
						Rate {props.instructorDetail.fullName}
					</h2>

					<div className="col-12">
						{/* <StarRatings
							starDimension={25}
							starSpacing={2}
							rating={props.rating}
							starRatedColor="gold"
							changeRating={props.handleSetRating}
							numberOfStars={5}
							name="rating"
							starHoverColor="gold"
						/> */}
					</div>

					<div className="col-12">
						<Formik
							initialValues={{
								review: '',
							}}
							onSubmit={async (values, { setSubmitting }) => {
								await axios.post(`${BASE_URL}/api/student/addReview`, {
									studentId: props.studentId,
									instructorId: props.instructorDetail._id,
									review: reviewText,
									rating: props.rating,
								});
								props.handleClose();
							}}
						>
							{({ isSubmitted, isValid }) => (
								<Form>
									<div className="mb-3 form-group text_box">
										<textarea
											type="text"
											placeholder="Leave a review"
											value={reviewText}
											onChange={(e) => setReviewText(e.target.value)}
										/>
									</div>
									<button
										className="er_btn er_btn_two width-100"
										type="submit"
										style={{
											marginTop: 24,
											textAlign: 'center',
											width: '20%',
										}}
									>
										Submit
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPopup;
