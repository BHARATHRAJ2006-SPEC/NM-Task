const fs = require("fs");

const filePath = "hospitalData.json";

// Read Data
function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Write Data
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Validate Mobile Number
function isValidMobile(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

// CREATE - Add Patient
function addPatient(name, dob, mobile) {
  if (!name || !dob || !mobile) {
    console.log("\nAll fields are required.");
    return;
  }

  if (!isValidMobile(mobile)) {
    console.log("\nInvalid mobile number. Must be 10 digits.");
    return;
  }

  const patients = readData();
  patients.push({ name, dob, mobile });
  writeData(patients);
  console.log("\nPatient added successfully.");
}

// READ - View All Patients
function viewPatients() {
  const patients = readData();
  console.log("\n--- All Patient Records ---");
  patients.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} | ${p.dob} | ${p.mobile}`);
  });
}

// UPDATE - Update Patient
function updatePatient(name, newMobile) {
  if (!isValidMobile(newMobile)) {
    console.log("\nInvalid mobile number.");
    return;
  }

  const patients = readData();
  const patient = patients.find(p => p.name === name);

  if (patient) {
    patient.mobile = newMobile;
    writeData(patients);
    console.log("\nPatient record updated.");
  } else {
    console.log("\nPatient not found.");
  }
}

// DELETE - Delete Patient
function deletePatient(name) {
  let patients = readData();
  patients = patients.filter(p => p.name !== name);
  writeData(patients);
  console.log("\nPatient record deleted.");
}

// Program Execution
console.log("\nHOSPITAL RECORD MANAGEMENT SYSTEM\n");

viewPatients();
addPatient("Ravi Kumar", "1999-05-21", "9998887776");
updatePatient("Ravi Kumar", "8887776665");
deletePatient("Ravi Kumar");
viewPatients();

console.log("\nProgram completed.\n");
