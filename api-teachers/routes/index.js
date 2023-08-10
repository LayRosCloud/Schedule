const Router = require('express')
const router = new Router();
const TeacherRoute = require('./teacher-route')
const StudyRoute = require('./study-route')
const SubjectRoute = require('./subject-route')
const TeacherSubjectRoute = require('./teachersubject-route')

router.use('/teachers', TeacherRoute)
router.use('/studies', StudyRoute)
router.use('/subjects', SubjectRoute)
router.use('/teachersSubjects', TeacherSubjectRoute)

module.exports = router