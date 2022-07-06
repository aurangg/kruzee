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
import './studentportal.css';

import { Link, useLocation } from 'react-router-dom';
import StudentPortalToolbar from '../Common/StudentPortalToolbar/StudentPortalToolbar';
import StudentPortalNavMain from '../Common/StudentPortalToolbar/StudentPortalNavMain';
import GetCode from './GetCode';
import BookSession from './BookSession';
import Pricing from './Pricing';
import PortalPricing from './Portal/PortalPricing';
import MainPortal from './Portal/MainPortal';
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
				.get(
					`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${data?.data?.data[0]?.instructor}`
				)
				.then((res) => {
					setStudentInstructor(res?.data?.data);
				})
				.catch((err) => console.log(err));
		};
		getStudentLessons();
	}, [isOpen]);

	const overlayFunctionOn = () => {
		document.getElementById('form-overlay-box').style.display = 'flex';
	};

	const overlayFunctionOff = () => {
		document.getElementById('form-overlay-box').style.display = 'none';
	};

	const [location, setLocation] = useState('');
	const [status, setStatus] = useState('');
	const [item, setItems] = useState();

	const updateData = (location, status, item) => {
		setLocation(location);
		setItems(item);
		setStatus(status);
	};

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2">
						<div className="form-overlay-box" id="form-overlay-box" onClick={overlayFunctionOff}>
							<div className="table-information">
								<h3 className="table-detail-heading">Details</h3>
								{location === undefined ? (
									<></>
								) : (
									<div className="table-data-line">
										<p className="table-data-name">Pickup Location:</p>
										<p className="table-data">{location}</p>
									</div>
								)}
								<div className="table-data-line">
									<p className="table-data-name">Status:</p>
									<p className="table-data">
										{status === 'Scheduled' ? (
											<FontAwesomeIcon
												className="text-white pr-1 "
												icon={faCheck}
												style={{
													borderRadius: '100%',
													padding: 4,
													backgroundColor: '#5C9D7A',
													fontSize: 10,
													marginRight: '10px',
												}}
											/>
										) : (
											<></>
										)}
										{status}
									</p>
								</div>
								<div className="table-buttons-body">
									{item?.status === 'Completed' ? (
										''
									) : item?.status === 'Scheduled' ? (
										<React.Fragment>
											<div className="table-button" onClick={() => openReschedule(item, true)}>
												Reschedule
											</div>
											<div className="table-button outline-table-button">Change Location</div>
										</React.Fragment>
									) : (
										<div
											className="table-button"
											onClick={() => openReschedule(item, false, item?.studentLessonNumber)}
										>
											Schedule
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="body_wrapper">
				{/* <StudentPortalNavbar /> */}
				{/* <StudentPortalToolbar /> */}
				<StudentPortalNavMain />
				{/* <CustomNavbar hbtnClass="new_btn" /> */}
				<div className="container">
					<div className="row table-padding">
						{/* <div className='col-lg-4'>
						<div className='next-lesson'>
							<img className='next-lesson-img'
								src={`${process.env.REACT_APP_BASE_URL}${studentInstructor?.instructorImage}`}
								alt=""
							/>
							<div className='next-lesson-time-body'>
								<p className='next-lesson-heading'>
									Next Lesson
								</p>
								<p className='next-lesson-time'>
									In 3 days - 5:00 pm
								</p>
							</div>
						</div>
					</div> */}
						<div className="col-lg-12">
							<div className="protal-header">
								<div className="admin">
									<h2 className="student-portal-heading">Your Driving Lessons</h2>
									<div className="media-body">
										<img
											className="media-body-driver-img"
											src={`${process.env.REACT_APP_BASE_URL}${studentInstructor?.instructorImage}`}
											alt=""
										/>
										<div className="sp-instructor-body">
											<h4 className="sp-instructor-name">{studentInstructor?.fullName}</h4>
											{/* <p className="mb-0" style={{ fontSize: 14, lineHeight: 1.6 }}>
											Service Area(s):{' '}
											{studentInstructor?.municipalities?.map((municipality) => {
												return <>{municipality} </>;
											})}
										</p> */}
											<p className="sp-instructor-address">
												{studentInstructor?.address ? studentInstructor?.address : 'Address'} -{' '}
												{studentInstructor?.phoneNumber}
											</p>
											<a className="sp-leave-review" onClick={toggleReviewPopup}>
												Leave a review
											</a>
										</div>
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
										<tr>
											<th className="sp-tr-styles" style={{ width: '10%', paddingRight: '20px' }}>
												#
											</th>
											<th className="sp-tr-styles" style={{ width: '20%', paddingRight: '45px' }}>
												Date
											</th>
											<th className="sp-tr-styles" style={{ width: '20%', paddingRight: '20px' }}>
												Time
											</th>
											<th
												className="sp-tr-styles desktop-only-table"
												style={{ width: '30%', paddingRight: '20px' }}
											>
												Pickup Location
											</th>
											<th
												className="sp-tr-styles desktop-only-table"
												style={{ width: '20%', paddingRight: '20px' }}
											>
												Status
											</th>
											<th
												className="sp-tr-styles"
												style={{
													width: '20%',
													textAlign: 'right',
													paddingRight: '20px',
												}}
											></th>
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
													key={idx}
													// style={{
													// 	color: item.date
													// 		? item.status !== 'Completed'
													// 			? 'rgba(0,0,0,0.1)'
													// 			: 'black'
													// 		: 'black',
													// }}
													style={{
														color: 'black',
														opacity: item.status !== 'Completed' ? '1' : '0.3',
													}}
													className="tr-body"
													// onClick={item.status !== 'Completed' ? () => {overlayFunctionOn(); updateData(item.pickupLocation, item.status, item)} : ''}
												>
													<td style={{ paddingRight: '20px' }} className="sp-td-styles">
														{idx + 1}
													</td>
													<td style={{ paddingRight: '20px' }} className="sp-td-styles">
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
													<td style={{ paddingRight: '20px' }} className="sp-td-styles">
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
													<td
														className="sp-td-styles desktop-only-table"
														style={{ paddingRight: '20px' }}
													>
														<div className="d-flex">
															{item.pickupLocation
																? item.pickupLocation.split(',')[0]
																: '-'}
															{'  '}
															{item.pickupLocation ? (
																<a
																	className="d-flex align-items-center"
																	onClick={() =>
																		openAddressDetail(item.pickupLocation)
																	}
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
																			display: 'flex',
																		}}
																		size="3x"
																	/>
																</a>
															) : (
																''
															)}
														</div>
													</td>
													<td
														style={{ paddingRight: '20px' }}
														className="desktop-only-table sp-td-styles"
													>
														{item.status === 'Scheduled' ? (
															<div className="align-items-flex-start">
																<FontAwesomeIcon
																	className="text-white pr-1 "
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#5C9D7A',
																		fontSize: 10,
																		marginRight: '10px',
																	}}
																/>
																{item.status}
															</div>
														) : item.status === 'Completed' ? (
															<div className="sp-td-styles">
																<FontAwesomeIcon
																	className="text-white pr-1"
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#5C9D7A',
																		fontSize: 10,
																		marginRight: '10px',
																	}}
																/>
																{item.status}
															</div>
														) : (
															<div className="flex sp-td-styles">
																<FontAwesomeIcon
																	className="text-white pr-1"
																	icon={faCheck}
																	style={{
																		borderRadius: '100%',
																		padding: 4,
																		backgroundColor: '#37a2d0',
																		fontSize: 10,
																		marginRight: '10px',
																	}}
																/>

																{'Awaiting'}
															</div>
														)}
													</td>
													<td
														style={{ textAlign: 'right' }}
														className="sp-td-styles no-right-padding"
													>
														<div className="desktop-only-table">
															{item.status === 'Completed' ? (
																''
															) : item.status === 'Scheduled' ? (
																<>
																	<a
																		className="cursor-pointer"
																		onClick={() => openReschedule(item, true)}
																		style={{
																			fontDecoration: 'underline',
																			color: '#37a2d0',
																		}}
																	>
																		Reschedule
																	</a>
																</>
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
																	}}
																>
																	Schedule
																</a>
															)}
														</div>
														<div className="mobile-only-table">
															<div
																style={{ display: 'flex', justifyContent: 'flex-end' }}
															>
																<div
																	className="action-btn"
																	// onClick={() => {overlayFunctionOn(); updateData(item.pickupLocation, item.status, item)}}>
																	onClick={
																		item.status !== 'Completed'
																			? () => {
																					overlayFunctionOn();
																					updateData(
																						item.pickupLocation,
																						item.status,
																						item
																					);
																			  }
																			: () => {
																					return true;
																			  }
																	}
																>
																	{item.status === 'Completed' ? (
																		<img
																			src={
																				process.env.PUBLIC_URL +
																				'/images/check.svg'
																			}
																		/>
																	) : (
																		<img
																			src={
																				process.env.PUBLIC_URL +
																				'/images/dots.svg'
																			}
																		/>
																	)}
																</div>
															</div>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="col-lg-8"></div>
						<div className="col-lg-4 flex-end">
							<Link to="/portalPricing">
								<div className="submit-btn opacity-01">Buy More Lessons</div>
							</Link>
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
		</React.Fragment>
	);
};

export default StudentPortal;
