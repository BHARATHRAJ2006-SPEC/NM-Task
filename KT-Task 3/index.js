const fs = require("fs");

const data = require("./hospitalData.json");

console.log("Hospital Record Management System\n");
console.log("Total Patients:", data.length);
console.log("-------------------------------");

data.forEach((patient, index) => {
  console.log(
    `${index + 1}. Name: ${patient.name}, DOB: ${patient.dob}, Mobile: ${patient.mobile}`
  );
});
