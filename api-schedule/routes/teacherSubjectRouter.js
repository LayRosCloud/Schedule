const Router = require('express')
const router = new Router()
const controller = require('../controllers/teacherSubjectController')

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

module.exports = router;
