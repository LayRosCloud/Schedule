const Router = require('express')
const router = new Router();
const TeacherRoute = require('./teacher-route')
const StudyRoute = require('./study-route')
const SubjectRoute = require('./subject-route')
const TeacherSubjectRoute = require('./teachersubject-route')
const HateoasRoute = require('./hateoas-router')

router.use('/', HateoasRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_TEACHER_SUBJECTS}`, TeacherSubjectRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_TEACHERS}`, TeacherRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_STUDIES}`, StudyRoute)
router.use(`${process.env.URL_VERSION}${process.env.URL_SUBJECTS}`, SubjectRoute)

module.exports = router