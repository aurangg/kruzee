import { ROAD_TEST_PACKAGE_PRICE } from '../Common/constants';
import {
	// getUser,
	getEmail,
	getUserName,
	getPostalCode,
	getBDE,
	// getLessons,
	getSlotSelected,
	getInstructorId,
	setUserLogin,
	getDateSelected,
	getWeekStartDate,
	getLat,
	getLng,
	getPickUp,
	getPassword,
	getPhoneNumber,
	getLessons,
	getPackage,
	getPackageName,
	getInstructorName,
	getDaySelected,
	getRoadTestVehicle,
} from './localStorage';

// import { instructorSlotBooked } from '../Pages/utlis';

import axios from 'axios';
import { getSlot } from '../Common/localStorage';

// const instructorSlotBooked = 2

export const studentLogin = async (email, password) => {
	localStorage.clear();
	try {
		const loginData = {
			email: email,
			password: password,
		};
		const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/login`, {
			method: 'POST',
			body: JSON.stringify({ loginData }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const resUserData = await data.json();
		// console.log(resUserData)
		// setUserLogin(data.data);
	} catch (error) {
		console.log(error);
	}
};

export const createStudent = async () => {
	const email = getEmail();
	const password = getPassword();
	const phoneNumber = getPhoneNumber();
	const fullName = getUserName();
	const lessons = getLessons();
	const isBDE = getBDE();
	const day = getDaySelected();
	// const date = getDateSelected();
	const weekStartDate = getWeekStartDate();
	const slot = getSlotSelected();
	const zip = getPostalCode();
	let instructorId = getInstructorId();
	// if (getInstructorId() !== null) {
	// 	instructorId = getInstructorId().replace(/"/g, '');
	// } else {
	// 	instructorId = '';
	// }

	const createStudentBodyData = {
		instructorId: instructorId.replace(/"/g, ''),
		fullName: fullName.replace(/"/g, ''),
		phoneNumber: phoneNumber.replace(/"/g, ''),
		email: email.replace(/"/g, ''),
		password: password.replace(/"/g, ''),
		isBDE: true,
		lessons: +lessons,
		zip: zip.replace(/"/g, ''),
	};
	const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/signup`, {
		method: 'POST',
		body: JSON.stringify({ ...createStudentBodyData }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const resStudentData = await data.json();
	return resStudentData;
};

export const addLessons = async (student) => {
	const lessons = getLessons();
	let instructorId = getInstructorId();
	const email = getEmail();
	const fullName = getUserName();
	const password = getPassword();
	const phoneNumber = getPhoneNumber();
	const packageName = getPackage();
	const lat = getLat();
	const lng = getLng();
	const pickupLoc = getPickUp();
	const slot = getSlotSelected();
	const day = getDaySelected();
	const date = getDateSelected();
	const roadTestVehicle = getRoadTestVehicle();
	let weekStartDate = getWeekStartDate();

	if (getInstructorId() !== null) {
		instructorId = getInstructorId().replace(/"/g, '');
	} else {
		instructorId = '';
	}

	let newDate = '';
	if (date !== null) {
		newDate = date.replaceAll('-', '/').replace(/"/g, '');
	} else {
		newDate = '';
	}

	const lessonsArray = Array.from(Array(+lessons).keys());

	let lessonId;

	if (roadTestVehicle === ROAD_TEST_PACKAGE_PRICE) {
		const addLessonData = {
			student: student._id,
			studentName: student.fullName,
			studentLessonNumber: lessons + 1,
			pickupLocation: '',
			notes: '',
			status: 'Awaiting Schedule',
			type: 'Road Test Vehicle',
			totalLessons: +lessons,
		};
		const roadTestPackageData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addRoadTestLesson`, {
			method: 'POST',
			body: JSON.stringify({ ...addLessonData }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const roadTestPackageDataResponse = await roadTestPackageData.json();
		console.log(roadTestPackageDataResponse);
		return true;
	} else {
		lessonsArray.forEach(async (item, index) => {
			if (index === 0) {
				const addLessonData = {
					student: student._id,
					studentName: student.fullName,
					studentLessonNumber: index + 1,
					totalLessons: +lessons,
					instructor: instructorId.replace(/"/g, ''),
				};
				const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addLesson`, {
					method: 'POST',
					body: JSON.stringify({ ...addLessonData }),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const resLessonArrayData = await data.json();
				lessonId = resLessonArrayData.data?._id;
				localStorage.setItem('lessonId', JSON.stringify(lessonId));
				const bookedSlots = await instructorSlotBooked(instructorId);
				const addBookingData = {
					instructorId: instructorId.replace(/"/g, ''),
					lessonId: lessonId.replace(/"/g, ''),
					bookings: bookedSlots,
					time: +slot,
					day: day.replace(/"/g, ''),
					latitude: Number(lat.replace(/"/g, '')),
					longitude: Number(lng.replace(/"/g, '')),
					date: newDate,
					weekStartDate: weekStartDate.replace(/"/g, ''),
					pickupLocation: pickupLoc.replace(/"/g, ''),
					notes: '',
				};
				const dataForBooking = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addBooking`, {
					method: 'POST',
					body: JSON.stringify({ ...addBookingData }),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const resDataForBooking = await dataForBooking.json();
			} else {
				const addAllLessonData = {
					student: student._id,
					studentName: student.fullName,
					studentLessonNumber: index + 1,
					totalLessons: +lessons,
					instructor: instructorId.replace(/"/g, ''),
				};
				const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addLesson`, {
					method: 'POST',
					body: JSON.stringify({ ...addAllLessonData }),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const resAddLesson = await data.json();
			}
		});
	}

	return lessonId;
};

export const addStudentPayment = async (studentData, sum) => {
	const lessons = getLessons();
	const packages = getPackage();
	const addStudentPayment = {
		studentName: studentData.fullName,
		studentId: studentData._id,
		package: packages.replace(/"/g, ''),
		totalStudentLessons: +lessons,
		amount: sum,
	};
	const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addStudentPayments`, {
		method: 'POST',
		body: JSON.stringify({ ...addStudentPayment }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const resAddStudentPayment = await data.json();
	const nav = true;
	return nav;
};

export const studentLessons = async (userLoginData) => {
	console.log('userLoginData?.data?._id', userLoginData?.data?._id);
	try {
		const data = await fetch(
			`${process.env.REACT_APP_BASE_URL}/api/student/getMyLessons?studentId=${userLoginData?.data?._id}`
		);
		const getStudent = await data.json();
		console.log('getStudent', getStudent);

		return getStudent;
	} catch (error) {
		console.log(error);
	}
};

export const paymentSuccessNotification = async () => {
	const name = getUserName().replace(/"/g, '');
	const packagee = getPackageName().replace(/"/g, '');
	const date = getDateSelected()?.replace(/"/g, '');
	let time = getSlotSelected()?.replace(/"/g, '');
	time = +time === 12 ? '12 Pm' : +time < 12 ? `${+time} Am` : `${+time - 12} Pm`;
	const recipient = '+1' + getPhoneNumber().replace(/"/g, '');
	const instructor = getInstructorName()?.replace(/"/g, '');
	const lessons = getLessons()?.replace(/"/g, '');
	const roadTestVehicle = getRoadTestVehicle()?.replace(/"/g, '') || null;

	try {
		const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/sendAccountCreationNotification`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				package: packagee,
				date,
				time,
				instructor,
				recipient,
				lessons,
				roadTestVehicle,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

// export const instructorSlotBooked = async (instructorId) => {
// 	const slots = getSlot();

// 	const instructorSlots = await axios
// 		.get(`${process.env.REACT_APP_BASE_URL}api/student/getInstructorDetail?id=${instructorId}`)
// 		.then((res) => {
// 			return res?.data?.data;
// 		})
// 		.catch((err) => console.log(err));

// 	const getSlots = await instructorSlots?.bookedSlots?.find((item) => {
// 		return item.startDate.split('T')[0] === slots.date;
// 	});

// 	await getSlots[slots.day].push(+slots.slot);
// 	return instructorSlots?.bookedSlots;
// };

export const instructorSlotBooked = async (instructorId) => {
	// const date = getDateSelected().replace(/"/g, '');
	const day = getDaySelected().replace(/"/g, '');
	const slot = Number(getSlotSelected().replace(/"/g, ''));
	const weekStartDate = getWeekStartDate().replace(/"/g, '');
	let idOfInstructor = instructorId.replace(/"/g, '');

	const instructorSlots = await fetch(
		`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${idOfInstructor}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	const resInstructorData = await instructorSlots.json();
	// console.log("Res Data", resInstructorData)

	const getSlots = await resInstructorData.data?.bookedSlots?.find((item) => {
		return item.startDate.split('T')[0] === weekStartDate;
	});
	await getSlots[day].push(slot);
	return resInstructorData?.data?.bookedSlots;
};

export const bookedInstructorSlot = async (instructorId) => {
	const slots = getSlot();

	const instructorSlots = await axios
		.get(`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${instructorId}`)
		.then((res) => {
			return res?.data?.data;
		})
		.catch((err) => console.log(err));

	const getSlots = await instructorSlots?.bookedSlots?.find((item) => {
		return item.startDate.split('T')[0] === slots.date;
	});

	await getSlots[slots.day].push(+slots.slot);
	return instructorSlots?.bookedSlots;
};

export const instructorRescheduleSlotBooked = async (instructorId, lessonDetails) => {
	const slots = getSlot();
	const oldDate = lessonDetails.weekStartDate;
	const timeToPop = lessonDetails.time;
	const dayToPop = lessonDetails.day;

	const instructorSlots = await axios
		.get(`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${instructorId}`)
		.then((res) => {
			return res?.data?.data;
		})
		.catch((err) => console.log(err));

	const getSlots = await instructorSlots?.bookedSlots?.find((item) => {
		return item.startDate.split('T')[0] === slots.date;
	});

	const getOldSlot = await instructorSlots?.bookedSlots?.find((item) => {
		return item.startDate.split('T')[0] === oldDate;
	});
	await getSlots[slots.day].push(+slots.slot);

	let idx = getOldSlot[dayToPop].indexOf(timeToPop);
	getOldSlot[dayToPop].splice(idx, 1);

	return instructorSlots?.bookedSlots;
};

// export const amazonEmails = async (email) => {
//   try {
//     const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/amazon/email`, {
//       email: email,
//     });

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
