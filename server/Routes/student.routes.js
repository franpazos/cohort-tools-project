const router = require("express").Router()
const mongoose = require('mongoose')
const Student = require('../models/Student.model')

router.post(('/'), (req, res, next) => {

    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body


    Student
        .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
        .then(newStudent => res.json(newStudent))
        .catch(err => next(err))
})

router.get('/', (req, res, next) => {

    Student
        .find()
        .populate("cohort")
        .then(allStudents => res.json(allStudents))
        .catch(err => next(err))
})

router.get('/cohort/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    Student
        .find({ cohort: cohortId })
        .populate("cohort")
        .then(students => res.json(students))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {

    const { id: studentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Student
        .findById(studentId)
        .populate("cohort")
        .then(studentInfo => res.json(studentInfo))
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {

    const { id: studentId } = req.params
    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Student
        .findByIdAndUpdate(
            studentId,
            { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects }, { new: true, runValidator: true })
        .then(updatedStudent => res.status(200).json(updatedStudent))
        .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {

    const { id: studentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Student
        .findByIdAndDelete(studentId)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
})

module.exports = router
