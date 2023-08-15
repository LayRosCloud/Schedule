const Router = require('express');
const router = new Router();
const {controller} = require('../controllers/teachersubject-controller')

router.get('/', controller.getAll)
router.get('/connect', controller.connect)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.delete('/:id', controller.delete)
router.put('/:id', controller.update)

module.exports = router;