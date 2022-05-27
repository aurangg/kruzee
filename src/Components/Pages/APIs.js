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
  getLat,
  getLng,
  getPickUp,
  getPassword,
  getPhoneNumber,
  getLessons,
  getPackage,
} from "../localStorage";

// import { instructorSlotBooked } from "../helper/utils";

const instructorSlotBooked = 2

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
    console.log(resUserData)
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
  const zip = getPostalCode();
  const instructorId = getInstructorId();

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
  console.log(resStudentData)
  // return data;
  return resStudentData;
};

export const addLessons = async (student) => {
  console.log("inside Add Lesson")
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
  const slots = getSlotSelected();
  const date = getDateSelected();

  const newDate = date.replaceAll("-", "/");

  const lessonsArray = Array.from(Array(+lessons).keys());

  let lessonId;

  lessonsArray.forEach(async (item, index) => {
    if (index === 0) {
      const addLessonData = {
        student: student._id,
        studentName: student.fullName,
        studentLessonNumber: index + 1,
        totalLessons: +lessons,
        instructor: instructorId,
      }
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addLesson`, {
        method:"POST",
        body:JSON.stringify({...addLessonData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const resLessonArrayData = await data.json()

      lessonId = data?.data?.data?._id;
      const bookedSlots = await instructorSlotBooked(instructorId);
      const addBookingData = {
        instructorId: instructorId,
        lessonId: lessonId,
        bookings: bookedSlots,
        time: +slots.slot,
        day: slots.day,
        latitude: lat,
        longitude: lng,
        date: newDate,
        weekStartDate: slots.date,
        pickupLocation: pickupLoc,
        notes: "",
      }
      const dataForBooking = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addBooking`, {
        method:"POST",
        body:JSON.stringify({addBookingData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });
      const resDataForBooking = dataForBooking.json();
      console.log(resDataForBooking)
    } else {
      const addAllLessonData = {
        student: student._id,
        studentName: student.fullName,
        studentLessonNumber: index + 1,
        totalLessons: +lessons,
        instructor: instructorId,
      }
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addLesson`, {
        method:"POST",
        body:JSON.stringify({addAllLessonData}),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const resAddLesson = data.json();
    }
  });

  return lessonId;
};

export const addStudentPayment = async (studentData) => {
  const lessons = getLessons();
  const packages = getPackage();
  const addStudentPayment = {
    studentName: studentData.fullName,
    studentId: studentData._id,
    package:packages,
    totalStudentLessons: +lessons,
    // amount:
    //   +lessons === 5
    //     ? +FIVE_LESSON_PRICE.TOTAL_PRICE.splice("$")[1]
    //     : +lessons === 10
    //     ? TEN_LESSON_PRICE.TOTAL_PRICE
    //     : ONE_LESSON_PRICE.SINGLE_LESSON_PRICE,
  }
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/student/addStudentPayments`, {
    method:"POST",
        body:JSON.stringify({addStudentPayment}),
        headers:{
          "Content-Type" : "application/json"
        }
      }
  );
  const resAddStudentPayment = data.json();
  console.log(resAddStudentPayment)
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