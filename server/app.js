const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const PORT = 5005;
const mongoose = require("mongoose")
const Cohort = require("./models/Cohort.model.js")
const Student = require("./models/Student.model.js")


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`conected to mongo! database name "${x.connections[0].name}"`))
  .catch(err => console.error ("error connecting to mongo", err))

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


app.get("/cohorts", (req, res) => {
  Cohort.find({})
  .then((cohorts)=>{
    console.log("retrieved cohorts ->", cohorts)
    res.status(200).json(cohorts)
  })
  .catch((error)=>{
    console.error("error while the cohort ->", error )
    res.status(500).json ({ error: "failes to create the cohort"})
  })
})


app.get("/students", (req, res) =>{
  Student.find({})
  .then((students)=>{
    console.log("retriedved students ->", students)
    res.status(200).json(students)
  })
  .catch((error)=>{
    console.error("error while the student ->", error)
    res.status(500).json ({ error: "failes to create the student"})
  })
})



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});