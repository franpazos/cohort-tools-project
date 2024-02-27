const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CohortSchema = new Schema ({
    cohortSlug: String,
    cohortName: String,
    program: String,
    format: String,
    campus: String,
    strartDate: Date,
    enDate: Date,
    inProgress: Boolean,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
})

const Cohort = mongoose.model("Cohort", CohortSchema)

module.exports = Cohort