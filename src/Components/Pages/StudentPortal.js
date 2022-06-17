import React, { useState, useEffect } from 'react';
// import CustomNavbar from '../components/CustomNavbar';
// import FooterTwo from '../components/Footer/FooterOnboard';
// import FooterData from '../components/Footer/FooterData';
import TimeTable from './TimeTablePopup';
import Review from './ReviewPopup';
import Address from './AddressPopup';
import axios from 'axios';
import { BASE_URL } from '../Common/constants';
import { getUserLogin } from '../Common/localStorage';
import { studentLessons } from '../Common/apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import StudentPortalNavbar from '../Common/StudentPortalNavbar';
import { useIntercom } from 'react-use-intercom';

import { useLocation } from 'react-router-dom';
// import Analytics from '../common/analytics';

const StudentPortal = () => {
	// const location = useLocation();
	// Analytics(location);
	const { boot } = useIntercom();
	boot();
	const userLoginData = getUserLogin();

	const [studentLessonsData, setStudentLessonsData] = useState([]);
	const [studentInstructor, setStudentInstructor] = useState([]);
	const [reschedule, setReschedule] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isOpenAddress, setIsOpenAddress] = useState(false);
	const [rating, setRating] = useState(5);
	const [lessonItem, setLessonItem] = useState(null);
	const [addressDetail, setAddressDetail] = useState(null);
	const [studentLessonNumber, setStudentLessonNumber] = useState(Number);

	const openReschedule = (lessonDetails, isReschedule, lessonNumber) => {
		setStudentLessonNumber(lessonNumber);
		setLessonItem(lessonDetails);
		setReschedule(isReschedule);
		togglePopup();
	};

	const openAddressDetail = (address) => {
		setAddressDetail(address);
		toggleAddressPopup();
	};

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleAddressPopup = () => {
		setIsOpenAddress(!isOpenAddress);
	};

	const toggleReviewPopup = () => {
		setIsReviewOpen(!isReviewOpen);
	};

	// function getComparableDate(date) {
	//   var parts = date.split("/");
	//   return new Date(parts[2], parts[1] - 1, parts[0]);
	// }

	useEffect(() => {
		const getStudentLessons = async () => {
			const data = await studentLessons(userLoginData);
			const sortedData = data?.data?.data?.sort(
				(currSlot, nextSlot) => currSlot.studentLessonNumber - nextSlot.studentLessonNumber
			);
			setStudentLessonsData(sortedData);
			await axios
				.get(`${BASE_URL}/api/student/getInstructorDetail?id=${data?.data?.data[0]?.instructor}`)
				.then((res) => {
					setStudentInstructor(res?.data?.data);
				})
				.catch((err) => console.log(err));
		};
		getStudentLessons();
	}, [isOpen]);

	return (
		<div className="body_wrapper">
			<StudentPortalNavbar />
			{/* <CustomNavbar hbtnClass="new_btn" /> */}
			<div className="row">
				<div className="col-xl-12 mx-0 portal-table">
					<div className="my-5 py-5 row justify-content-center" style={{ background: '#fbfbfb' }}>
						<div className="col-md-9">
							<div className="protal-header">
								<div className="admin">
									<div className="media-body">
										<img
											style={{
												marginRight: '-30px',
												zIndex: 1,
												border: '5px white solid',
											}}
											src={`${process.env.REACT_APP_BASE_URL}${studentInstructor?.instructorImage}`}
											width="105px"
											height="105px"
											alt=""
										/>
										<img
											src={`${process.env.REACT_APP_BASE_URL}${studentInstructor?.vehicleDetails?.image}`}
											width="100px"
											height="100px"
											alt=""
										/>
									</div>
									<div className="pl-3 admin-details">
										<h4 style={{ fontWeight: '800', color: 'black' }}>
											{studentInstructor?.fullName}
										</h4>
										<p className="mb-0" style={{ fontSize: 14, lineHeight: 1.6 }}>
											Service Area(s):{' '}
											{studentInstructor?.municipalities?.map((municipality) => {
												return <>{municipality} </>;
											})}
										</p>
										<p className="mb-0" style={{ fontSize: 14, lineHeight: 1.6 }}>
											{studentInstructor?.phoneNumber}
										</p>
										<a
											className="cursor-pointer"
											onClick={toggleReviewPopup}
											style={{
												textDecoration: 'underline',
												color: '#37a2d0',
												fontSize: 14,
												fontWeight: '500',
											}}
										>
											Leave a review
										</a>
									</div>
								</div>
							</div>

							<div className="mt-5" style={{ paddingLeft: '10px' }}>
								<table
									style={{
										width: '100%',
										display: 'block',
										overflowX: 'auto',
										whiteSpace: 'nowrap',
									}}
								>
									<thead>
										<tr style={{ color: 'black' }}>
											<th style={{ width: '20%', paddingRight: '20px' }}>Lesson</th>
											<th style={{ width: '20%', paddingRight: '45px' }}>Date</th>
											<th style={{ width: '30%', paddingRight: '20px' }}>Pickup Location</th>
											<th style={{ width: '20%', paddingRight: '20px' }}>Time</th>
											<th style={{ width: '30%', paddingRight: '20px' }}>Status</th>
											<th
												style={{
													width: '30%',
													textAlign: 'right',
													paddingRight: '20px',
												}}
											>
												Action
											</th>
										</tr>
										<tr>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
											<td className="mx-0 px-0">
												<hr />
											</td>
										</tr>
									</thead>
									<tbody>
										{studentLessonsData.map((item, idx) => {
											return (
												<tr
													style={{
														color: item.date
															? item.status === 'Completed'
																? 'rgba(0,0,0,0.4)'
																: 'black'
															: 'black',
													}}
												>
													<td style={{ fontWeight: '500', paddingRight: '20px' }}>
														{idx + 1}
													</td>
													<td style={{ paddingRight: '20px' }}>
														{item.date
															? item.date.split('/')[1] === '01'
																? 'January ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '02'
																? 'Feburary ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '03'
																? 'March ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '04'
																? 'April ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '05'
																? 'May ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '06'
																? 'June ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '07'
																? 'July ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '08'
																? 'August ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '09'
																? 'September ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '10'
																? 'October ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: item.date.split('/')[1] === '11'
																? 'November ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
																: 'December ' +
																  item.date.split('/')[0] +
																  ', 20' +
																  item.date.split('/')[2]
															: '-'}
													</td>
													<td className="d-flex" style={{ paddingRight: '20px' }}>
														{item.pickupLocation ? item.pickupLocation.split(',')[0] : '-'}
														{'  '}
														{item.pickupLocation ? (
															<a
																className="d-flex align-items-center"
																onClick={() => openAddressDetail(item.pickupLocation)}
															>
																<FontAwesomeIcon
																	className="pr-1 cursor-pointer "
																	icon={faCircleInfo}
																	style={{
																		color: 'rgba(0,0,0,0.4)',
																		borderRadius: '100%',
																		padding: 4,
																		fontWeight: '600',
																		fontSize: 12,
																	}}
																	size="3x"
																/>
															</a>
														) : (
															''
														)}
													</td>
													<td style={{ paddingRight: '20px' }}>
														{item.time
															? item.time === 12
																? item.time + ':00 pm'
																: item.time === 0
																? item.time + ':00 am'
																: item.time < 12
																? item.time + ':00 am'
																: item.time - 12 + ':00 pm'
															: '-'}
													</td>
													<td style={{ paddingRight: '20px' }}>
														{item.status === 'Scheduled' ? (
															<div className="d-flex align-items-center">
																<FontAwesomeIcon
																	className="text-white pr-1 "
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#5C9D7A',
																		fontWeight: '600',
																		fontSize: 10,
																	}}
																/>
																{item.status}
															</div>
														) : item.status === 'Completed' ? (
															<div>
																<FontAwesomeIcon
																	className="text-white pr-1 "
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#5C9D7A',
																		fontWeight: '600',
																		fontSize: 10,
																	}}
																/>

																{item.status}
															</div>
														) : (
															<div>
																<FontAwesomeIcon
																	className="text-white pr-1 "
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#37a2d0',
																		fontWeight: '600',
																		fontSize: 10,
																	}}
																/>

																{'Awaiting'}
															</div>
														)}
													</td>
													<td style={{ textAlign: 'left', paddingRight: '20px' }}>
														{item.status === 'Completed' ? (
															''
														) : item.status === 'Scheduled' ? (
															<a
																className="cursor-pointer"
																onClick={() => openReschedule(item, true)}
																style={{
																	fontDecoration: 'underline',
																	color: '#37a2d0',
																	fontSize: 14,
																	fontWeight: '500',
																}}
															>
																Reschedule
															</a>
														) : (
															<a
																className="cursor-pointer"
																onClick={() =>
																	openReschedule(
																		item,
																		false,
																		item.studentLessonNumber
																	)
																}
																style={{
																	fontDecoration: 'underline',
																	color: '#37a2d0',
																	fontSize: 14,
																	fontWeight: '500',
																}}
															>
																Schedule
															</a>
														)}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isOpen && (
				<TimeTable
					isReschedule={reschedule}
					instructorDetail={studentInstructor}
					lessonDetails={lessonItem}
					handleClose={togglePopup}
					lessonNumber={studentLessonNumber}
				/>
			)}

			{isReviewOpen && (
				<Review
					rating={rating}
					handleSetRating={setRating}
					instructorDetail={studentInstructor}
					studentId={userLoginData.data._id}
					handleClose={toggleReviewPopup}
				/>
			)}

			{isOpenAddress && <Address address={addressDetail} handleClose={toggleAddressPopup} />}
		</div>
	);
};

export default StudentPortal;
