const Router = require('express')
const router = new Router();
const TeacherRoute = require('./teacher-route')
const StudyRoute = require('./study-route')
const SubjectRoute = require('./subject-route')
const TeacherSubjectRoute = require('./teachersubject-route')
const HateoasRoute = require('./hateoas-router')
const EventRoute = require('./event-route')

router.use('/', HateoasRoute)
router.use('/events', EventRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_TEACHERS}`, TeacherRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_STUDIES}`, StudyRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_SUBJECTS}`, SubjectRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_TEACHER_SUBJECTS}`, TeacherSubjectRoute)

module.exports = router