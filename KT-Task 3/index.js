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

// CREATE - Add Patient
function addPatient(name, dob, mobile) {
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
