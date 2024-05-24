const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

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

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
