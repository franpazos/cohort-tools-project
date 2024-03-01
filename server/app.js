const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")



const PORT = 5005

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`conected to mongo! database name "${x.connections[0].name}"`))
  .catch(err => console.error("error connecting to mongo", err))

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express()


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html")
})


// ROUTES Students

const studentRoutes = require("./Routes/student.routes.js")
app.use("/api/students", studentRoutes)

// ROUTES Cohorts

const cohortsRoutes = require("./Routes/cohort.routes.js")
app.use("/api/cohorts", cohortsRoutes)

require("./error-handling").default(app)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app