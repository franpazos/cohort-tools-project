const router = require('express').Router()

const Cohort = require('./../models/Cohort.model')
const Student = require('./../models/Student.model')

router.post('/', (req, res, next) => {

    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours, studentId } = req.body


    Cohort
        .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours, student: [studentId] })
        .then(newCohort => Student.findByIdAndUpdate(studentId, { $push: { cohorts: newCohort._id } }))
        .then(() => res.status(201))
        .catch(err => next(err))

})

router.get('/', (req, res, next) => {


    Cohort
        .find()
        .then(allCohorts => res.status(201).json(allCohorts))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const { id: cohortId } = req.params
    Cohort
        .findById(cohortId)
        .then(cohortInfo => res.status(200).json(cohortInfo))
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {

    const { id: cohortId } = req.params
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

    Cohort
        .findByIdAndUpdate(cohortId, { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours }, { new: true, runValidator: true })
        .then(updatedCohort => res.status(200).json(updatedCohort))
        .catch(err => next(err))
})
router.delete('/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    Cohort
        .findByIdAndDelete(cohortId)
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
})

module.exports = router