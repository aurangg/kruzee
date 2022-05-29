// Set local Storage

export const setZip = (zip) => {
	localStorage.setItem(`zip`, zip);
};

export const setIsBDE = (isBDE) => {
	localStorage.setItem(`isBDE`, isBDE);
};

export const setInstructorId = (id) => {
	localStorage.setItem(`instructorId`, id);
};

export const setInstructorName = (name) => {
	localStorage.setItem(`instructorName`, name);
};

export const setInstructorsLocal = (instructors) => {
	localStorage.setItem(`instructors`, JSON.stringify(instructors));
};

export const setSlot = (slot) => {
	localStorage.setItem(`slot`, JSON.stringify(slot));
};

export const setOldSlot = (oldSlot) => {
	localStorage.setItem(`oldSlot`, JSON.stringify(oldSlot));
};

export const setDate = (date) => {
	localStorage.setItem(`date`, date);
};

export const setLessons = (lessons) => {
	localStorage.setItem(`lessons`, lessons);
};

export const setUser = (user) => {
	localStorage.setItem(`user`, JSON.stringify(user));
};

export const setStripeCustomerId = (id) => {
	localStorage.setItem(`cutomerId`, id);
};

export const setPickup = (address) => {
	localStorage.setItem(`pickup`, address);
};

export const setPrice = (price) => {
	localStorage.setItem(`price`, price);
};

export const setIndividualPackageName = (packageName) => {
	localStorage.setItem(`individualPackage`, packageName);
};

export const setUserLogin = (user) => {
	localStorage.setItem(`userLogin`, JSON.stringify(user));
};

export const setStudentLessons = (lessons) => {
	localStorage.setItem(`studentLessons`, JSON.stringify(lessons));
};

export const setStudentInstructor = (instructors) => {
	localStorage.setItem(`studentInstructor`, JSON.stringify(instructors));
};

export const setLatLong = (LatLong) => {
	localStorage.setItem(`LatLong`, JSON.stringify(LatLong));
};

export const setAccountCreatedMsg = (status) => {
	localStorage.setItem(`accountCreatedMsg`, status);
};

// Get local Storage

export const getZip = () => {
	return localStorage.getItem(`zip`);
};

export const getIsBDE = () => {
	return localStorage.getItem(`isBDE`);
};

export const getPickup = () => {
	return localStorage.getItem(`pickup`);
};

export const getInstructorId = () => {
	return localStorage.getItem(`instructorId`);
};

export const getInstructorName = () => {
	return localStorage.getItem(`instructorName`);
};

export const getPrice = () => {
	return localStorage.getItem(`price`);
};

export const getInstructors = () => {
	return JSON.parse(localStorage.getItem(`instructors`));
};

export const getSlot = () => {
	return JSON.parse(localStorage.getItem(`slot`));
};

export const getOldSlot = () => {
	return JSON.parse(localStorage.getItem(`oldSlot`));
};

export const getLessons = () => {
	return localStorage.getItem(`lessons`);
};

export const getUser = () => {
	return JSON.parse(localStorage.getItem(`user`));
};

export const getCutomerId = () => {
	return localStorage.getItem(`cutomerId`);
};

export const getUserLogin = () => {
	return JSON.parse(localStorage.getItem(`userLogin`));
};

export const getStudentLessons = () => {
	return JSON.parse(localStorage.getItem(`studentLessons`));
};

export const getStudentInstructor = () => {
	return JSON.parse(localStorage.getItem(`studentInstructor`));
};

export const getDate = () => {
	return localStorage.getItem(`date`);
};

export const getIndividualPackage = () => {
	return localStorage.getItem(`individualPackage`);
};

export const getLatLng = () => {
	return JSON.parse(localStorage.getItem(`LatLong`));
};

export const getAccountCreatedMsg = () => {
	return localStorage.getItem(`accountCreatedMsg`);
};
