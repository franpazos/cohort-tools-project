const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CohortSchema = new Schema({
    cohortSlug: {
        type: String,
        required: true
    },
    cohortName: {
        type: String,
        required: true
    },
    program: {
        type: String,
        enum: ['Web Dev', 'UX/UI', 'Data Analitics', 'Cybersecurity']
    },
    format: {
        type: String,
        enum: ['Full Time', 'Part Time']
    },
    campus: {
        type: String,
        enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    inProgress: {
        type: Boolean,
        defualt: false
    },
    programManager: {
        type: String,
        required: true
    },
    leadTeacher: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        default: 360
    }
}, {
    timestamps: true
})

const Cohort = mongoose.model("Cohort", CohortSchema)

module.exports = Cohort