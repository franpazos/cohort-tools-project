const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose")

const Cohort = require("./models/Cohort.model.js")
const Student = require("./models/Student.model.js")

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`conected to mongo! database name "${x.connections[0].name}"`))
  .catch(err => console.error("error connecting to mongo", err))

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }))



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});



// ROUTES Students

app.post('/api/students', (req, res) => {

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(createdStudent => res.status(201).json(createdStudent))
    .catch(err => res.status(500).json(err))
})

app.get('/api/students/', (req, res) => {

  Student
    .find()
    .populate("cohort")
    .then(allStudents => res.status(201).json(allStudents))
    .catch(err => res.status(500).json(err))
})

app.get('/api/students/cohort/:id', (req, res) => {
  const { id: studentId } = req.params
  Student
    .findById(studentId)
    .populate("cohort")
    .then(studentInfo => res.status(200).json(studentInfo))
    .catch(err => res.status(500).json(err))
})

app.get('/api/students/:id', (req, res) => {
  const { id: studentId } = req.params
  Student
    .findById(studentId)
    .populate("cohort")
    .then(studentInfo => res.status(200).json(studentInfo))
    .catch(err => res.status(500).json(err))
})

app.put('/api/students/:id', (req, res) => {
  const { id: studentId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .findByIdAndUpdate(studentId, { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects }, { new: true, runValidator: true })
    .then(updatedStudent => res.status(200).json(updatedStudent))
    .catch(err => res.status(500).json(err))
})

app.delete('/api/students/:id', (req, res) => {
  const { id: studentId } = req.params
  Student
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(202))
    .catch(err => res.status(500).json(err))
})
// ROUTES Cohorts

app.post('/api/cohorts', (req, res) => {

  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgres, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgres, programManager, leadTeacher, totalHours })
    .then(createdCohort => res.status(201).json(createdCohort))
    .catch(err => res.status(500).json(err))
})

app.get('/api/cohorts', (req, res) => {

  Cohort
    .find()
    .then(allCohorts => res.status(201).json(allCohorts))
    .catch(err => res.status(500).json(err))
})

app.get('/api/cohorts/:id', (req, res) => {
  const { id: cohortId } = req.params
  Cohort
    .findById(cohortId)
    .then(cohortInfo => res.status(200).json(cohortInfo))
    .catch(err => res.status(500).json(err))
})

app.put('/api/cohorts/:id', (req, res) => {
  const { id: cohortId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Cohort
    .findByIdAndUpdate(cohortId, { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgres, programManager, leadTeacher, totalHours }, { new: true, runValidator: true })
    .then(updatedCohort => res.status(200).json(updatedCohort))
    .catch(err => res.status(500).json(err))
})
app.delete('/api/cohorts/:id', (req, res) => {
  const { id: cohortId } = req.params
  Cohort
    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(202))
    .catch(err => res.status(500).json(err))
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});