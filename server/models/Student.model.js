const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: mongoose.Types.ObjectId,
    projects: Array
})

const Student = mongoose.model("Student", StudentSchema)

module.exports = Student