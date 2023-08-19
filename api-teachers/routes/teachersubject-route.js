const Router = require('express');
const router = new Router();
const {controller} = require('../controllers/teachersubject-controller')
const authMiddleware = require('../middleware/auth-middleware')

router.get('/', controller.getAll)
router.get('/connect', controller.connect)
router.get('/:id', controller.get)
router.post('/', authMiddleware(['human resources department']), controller.create)
router.delete('/:id', authMiddleware(['human resources department']), controller.delete)
router.put('/:id', authMiddleware(['human resources department']), controller.update)

module.exports = router;