// import { BASE_URL } from "../helper/constants";
// import { getOldSlot, getSlot, getDate } from "../helper/localStorage";

import { getDateSelected, getDaySelected, getSlotSelected, getWeekStartDate } from "../localStorage"

// export const instructorSlotBooked = async (instructorId) => {
//   const slots = getSlot();

//   const instructorSlots = await axios
//     .get(`${BASE_URL}api/student/getInstructorDetail?id=${instructorId}`)
//     .then((res) => {
//       return res?.data?.data;
//     })
//     .catch((err) => console.log(err));

//   const getSlots = await instructorSlots?.bookedSlots?.find((item) => {
//     return item.startDate.split("T")[0] === slots.date;
//   });

//   await getSlots[slots.day].push(+slots.slot);
//   return instructorSlots?.bookedSlots;
// };


export const instructorSlotBooked = async (instructorId) => {

  // const date = getDateSelected().replace(/"/g, '');
  const day = getDaySelected().replace(/"/g, '');
  const slot = Number(getSlotSelected().replace(/"/g, ''));
  const weekStartDate = getWeekStartDate().replace(/"/g, '');
  let idOfInstructor = instructorId.replace(/"/g, '') 


  const instructorSlots = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/getInstructorDetail?id=${idOfInstructor}`, {
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  })
  const resInstructorData = await instructorSlots.json();
  // console.log("Res Data", resInstructorData)

  const getSlots = await resInstructorData.data?.bookedSlots?.find((item) => {
      return item.startDate.split("T")[0] === weekStartDate;
  });
  await getSlots[day].push(slot)
  return resInstructorData?.data?.bookedSlots
}

// export const instructorRescheduleSlotBooked = async (
//   instructorId,
//   lessonDetails
// ) => {
//   const slots = getSlot();
//   const oldDate = lessonDetails.weekStartDate;
//   const timeToPop = lessonDetails.time;
//   const dayToPop = lessonDetails.day;

//   const instructorSlots = await axios
//     .get(`${BASE_URL}/api/student/getInstructorDetail?id=${instructorId}`)
//     .then((res) => {
//       return res?.data?.data;
//     })
//     .catch((err) => console.log(err));

//   const getSlots = await instructorSlots?.bookedSlots?.find((item) => {
//     return item.startDate.split("T")[0] === slots.date;
//   });

//   const getOldSlot = await instructorSlots?.bookedSlots?.find((item) => {
//     return item.startDate.split("T")[0] === oldDate;
//   });

//   await getSlots[slots.day].push(+slots.slot);

//   let idx = getOldSlot[dayToPop].indexOf(timeToPop);
//   getOldSlot[dayToPop].splice(idx, 1);

//   return instructorSlots?.bookedSlots;
// };

// export const calTime = (time) => {
//   if (time === 12) {
//     return time + ":00 pm";
//   } else if (time === 0) {
//     return "12:00 am";
//   } else if (time > 12) {
//     return time - 12 + ":00 pm";
//   } else {
//     return time + ":00 am";
//   }
// };


// export const applyTax = (price) => {
//   const HST_Tax = (price / 100) * 13;
//   return price + HST_Tax;
// };