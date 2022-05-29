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
  getDaySelected,
} from "../localStorage";

import { instructorSlotBooked } from "./utlis";

// const instructorSlotBooked = 2

export const studentLogin = async (email, password) => {
  localStorage.clear();
  try {
    const loginData = {
      email: email,
      password: password,
    }
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/login`, {
      method:"POST",
      body:JSON.stringify({loginData}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    const resUserData = await data.json()
    // console.log(resUserData)
    // setUserLogin(data.data);
  } catch (error) {
    console.log(error);
  }
};

export const createStudent = async () => {
  console.log("test")
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
  let instructorId = ''
  if(getInstructorId() !== null){
    instructorId = getInstructorId().replace(/"/g, '');
  }
  else{
    instructorId = ''
  }

  const createStudentBodyData = {
    instructorId: instructorId.replace(/"/g, ''),
    fullName: fullName.replace(/"/g, ''),    
    phoneNumber: phoneNumber.replace(/"/g, ''),
    email: email.replace(/"/g, ''),
    password: password.replace(/"/g, ''),
    isBDE:true,
    lessons: +lessons,
    zip:zip.replace(/"/g, ''),
  }
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/signup`, {
    method:"POST",
    body:JSON.stringify({...createStudentBodyData}),
    headers:{
      "Content-Type":"application/json"
    }
  });

  const resStudentData = await data.json();
  // console.log(resStudentData)
  // return data;
  return resStudentData;
};

export const addLessons = async (student) => {
  // console.log("inside Add Lesson")
  const lessons = getLessons();
  const instructorId = getInstructorId();
  const email = getEmail();
  const fullName = getUserName();
  const password = getPassword();
  const phoneNumber = getPhoneNumber();
  // const latlng = getLatLng();
  const lat = getLat();
  const lng = getLng();
  const pickupLoc = getPickUp();
  const slot = getSlotSelected();
  const day = getDaySelected();
  // const date = getDateSelected();
  const weekStartDate = getWeekStartDate();

  const newDate = weekStartDate.replaceAll("-", "/").replace(/"/g, '');

  const lessonsArray = Array.from(Array(+lessons).keys());

  let lessonId;

  lessonsArray.forEach(async (item, index) => {
    if (index === 0) {
      const addLessonData = {
        student: student._id,
        studentName: student.fullName,
        studentLessonNumber: index + 1,
        totalLessons: +lessons,
        instructor: instructorId.replace(/"/g, ''),
      }
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addLesson`, {
        method:"POST",
        body:JSON.stringify({...addLessonData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const resLessonArrayData = await data.json()
      lessonId = resLessonArrayData.data?._id;
      localStorage.setItem("lessonId", JSON.stringify(lessonId))
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
        notes: "",
      }
      const dataForBooking = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addBooking`, {
        method:"POST",
        body:JSON.stringify({...addBookingData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });
      const resDataForBooking = await dataForBooking.json();
    } else {
      const addAllLessonData = {
        student: student._id,
        studentName: student.fullName,
        studentLessonNumber: index + 1,
        totalLessons: +lessons,
        instructor: instructorId.replace(/"/g, ''),
      }
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addLesson`, {
        method:"POST",
        body:JSON.stringify({...addAllLessonData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const resAddLesson = await data.json();
    }
  });

  return lessonId;
};

export const addStudentPayment = async (studentData, sum) => {
  const lessons = getLessons();
  const packages = getPackage();
  const addStudentPayment = {
    studentName: studentData.fullName,
    studentId: studentData._id,
    package:packages.replace(/"/g, ''),
    totalStudentLessons: +lessons,
    amount:sum,
  }
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addStudentPayments`, {
    method:"POST",
        body:JSON.stringify({...addStudentPayment}),
        headers:{
          "Content-Type" : "application/json"
        }
      }
  );
  const resAddStudentPayment = await data.json();
  const nav = true
  return nav
};

export const studentLessons = async (userLoginData) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_BASE_URL}api/student/getMyLessons?studentId=${userLoginData?.data?._id}`
    );
    const getStudent = data.json();

    return data;
  } catch (error) {
    console.log(error);
  }
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