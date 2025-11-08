const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;
const cors= require("cors")
server.use(jsonServer.bodyParser); // Enable parsing of request body

server.post('/patients', (req, res) => {
  const newPatient = req.body;
  console.log("new patient",newPatient.doctorId, newPatient)
  const doctors = router.db.get('doctors').value();
  // Find the associated doctor details using doctorId
  const associatedDoctor = doctors.find(doctor => doctor.id === Number(newPatient.doctorId));
  // Add doctor details to the new patient
  if (associatedDoctor) {
    console.log("associate doctor",associatedDoctor)
    newPatient.doctor = {
      id: associatedDoctor.id,
      name: associatedDoctor.name,
      specialization: associatedDoctor.specialization
    };
  }

  // Generate a unique ID for the new patient based on the existing patients' array length
  newPatient.id = router.db.get('patients').value().length + 1;
  console.log("final newptient",newPatient)
  // Add the new patient to the patients array
  router.db.get('patients').push(newPatient).write();
  const p=router.db.get('patients').value();
  console.log("patients details",p)
  // Respond with the newly created patient data
  res.send("added successfllyu");
});

//login route
server.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Access patients data from db.json
  const patients = router.db.get('patients').value();

  // Find the matching patient by email and password
  const patient = patients.find(
    p => p.email === email && p.password === password
  );

  if (patient) {
    // Exclude password before sending response
    const { password, ...safePatientData } = patient;
    return res.status(200).json({
      message: "Login successful",
      patient: safePatientData
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});





server.use(cors()); // Enable CORS
server.use(jsonServer.bodyParser);
server.use(require("express").urlencoded({ extended: true })); // Enable URL-encoded body parsing
server.use(middlewares);
server.use(router);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
