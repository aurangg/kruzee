import axios from 'axios';
import { BASE_URL, FIVE_LESSON_PRICE, ONE_LESSON_PRICE, TEN_LESSON_PRICE } from './constants';

import {
	getUser,
	getZip,
	getIsBDE,
	getLessons,
	getSlot,
	getInstructorId,
	setUserLogin,
	getDate,
	getLatLng,
	getPickup,
} from './localStorage';

import { instructorSlotBooked } from './utils';

export const studentLogin = async (email, password) => {
	localStorage.clear();
	try {
		const data = await axios.post(`${BASE_URL}/api/student/login`, {
			email: email,
			password: password,
		});
		setUserLogin(data.data);
	} catch (error) {
		console.log(error);
	}
};

export const createStudent = async () => {
	const user = getUser();
	const lessons = getLessons();
	const isBDE = getIsBDE();
	const zip = getZip();
	const instructorId = getInstructorId();

	const data = await axios.post(`${BASE_URL}/api/student/signup`, {
		instructorId: instructorId,
		fullName: user.name,
		phoneNumber: user.phone,
		email: user.email,
		password: user.password,
		isBDE,
		lessons: +lessons,
		zip,
	});

	return data;
};

export const addLessons = async (student) => {
	const lessons = getLessons();
	const instructorId = getInstructorId();
	const user = getUser();
	const latlng = getLatLng();
	const pickupLoc = getPickup();
	const slots = getSlot();
	const date = getDate();

	const newDate = date.replaceAll('-', '/');

	const lessonsArray = Array.from(Array(+lessons).keys());

	let lessonId;

	lessonsArray.forEach(async (item, index) => {
		if (index === 0) {
			const data = await axios.post(`${BASE_URL}/api/student/addLesson`, {
				student: student._id,
				studentName: student.fullName,
				studentLessonNumber: index + 1,
				totalLessons: +lessons,

				instructor: instructorId,
			});

			lessonId = data?.data?.data?._id;
			const bookedSlots = await instructorSlotBooked(instructorId);
			await axios.post(`${BASE_URL}/api/student/addBooking`, {
				instructorId: instructorId,
				lessonId: lessonId,
				bookings: bookedSlots,
				time: +slots.slot,
				day: slots.day,
				latitude: latlng.lat,
				longitude: latlng.lng,
				date: newDate,
				weekStartDate: slots.date,
				pickupLocation: pickupLoc,
				notes: '',
			});
		} else {
			await axios.post(`${BASE_URL}/api/student/addLesson`, {
				student: student._id,
				studentName: student.fullName,
				studentLessonNumber: index + 1,
				totalLessons: +lessons,
				instructor: instructorId,
			});
		}
	});

	return lessonId;
};

export const addStudentPayment = async (studentData) => {
	const lessons = getLessons();
	await axios.post(`${BASE_URL}/api/student/addStudentPayments`, {
		studentName: studentData.fullName,
		studentId: studentData._id,
		package: 'Regular',
		totalStudentLessons: +lessons,
		amount:
			+lessons === 5
				? +FIVE_LESSON_PRICE.TOTAL_PRICE.splice('$')[1]
				: +lessons === 10
				? TEN_LESSON_PRICE.TOTAL_PRICE
				: ONE_LESSON_PRICE.SINGLE_LESSON_PRICE,
	});
};

export const studentLessons = async (userLoginData) => {
	try {
		const data = await axios.get(`${BASE_URL}/api/student/getMyLessons?studentId=${userLoginData?.data?._id}`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const amazonEmails = async (email) => {
	try {
		const data = await axios.post(`${BASE_URL}/api/student/amazon/email`, {
			email: email,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};
