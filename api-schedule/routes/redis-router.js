const Router = require('express')
const router = new Router();
const controller = require('../controllers/redis-controller')

router.get('/teacherSubjects', controller.getAll)
router.get('/teachers', controller.getAllTeachers)
router.get('/teachers/:id', controller.getOneTeacher)
router.get('/audiences', controller.getAllAudiences)
router.get('/audiences/:id', controller.getOneAudience)
router.get('/corpus', controller.getAllCorpus)

module.exports = router;