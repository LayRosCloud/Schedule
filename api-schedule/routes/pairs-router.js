const Router = require('express')
const router = new Router();
const controller = require('../controllers/pair-controller')
const authMiddleware =require('../middleware/auth-middleware')

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/',authMiddleware(['dispatcher']), controller.create)
router.put('/:id',authMiddleware(['dispatcher']), controller.update)
router.delete('/:id',authMiddleware(['dispatcher']), controller.delete)

module.exports = router;