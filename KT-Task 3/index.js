const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const filePath = "hospitalData.json";

function readData() {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function isValidMobile(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

// GET all patients
app.get("/patients", (req, res) => {
  res.json(readData());
});

// POST add patient
app.post("/patients", (req, res) => {
  const { name, dob, mobile } = req.body;

  if (!name || !dob || !mobile)
    return res.status(400).json({ message: "All fields required" });

  if (!isValidMobile(mobile))
    return res.status(400).json({ message: "Invalid mobile number" });

  const patients = readData();
  patients.push({ name, dob, mobile });
  writeData(patients);

  res.json({ message: "Patient added successfully" });
});

// PUT update patient
app.put("/patients/:name", (req, res) => {
  const { mobile } = req.body;

  if (!isValidMobile(mobile))
    return res.status(400).json({ message: "Invalid mobile number" });

  const patients = readData();
  const patient = patients.find(p => p.name === req.params.name);

  if (!patient)
    return res.status(404).json({ message: "Patient not found" });

  patient.mobile = mobile;
  writeData(patients);

  res.json({ message: "Patient updated" });
});

// DELETE patient
app.delete("/patients/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  let patients = readData();

  const originalLength = patients.length;

  patients = patients.filter(p => p.name !== name);

  if (patients.length === originalLength) {
    return res.status(404).json({ message: "Patient not found" });
  }

  writeData(patients);
  res.json({ message: "Patient deleted successfully" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
