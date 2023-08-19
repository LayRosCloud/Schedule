const Router = require('express')
const router = new Router();
const controller = require('../controllers/course-controller')
const authMiddleware = require("../middleware/auth-middleware");

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/',authMiddleware(['admin']), controller.create)
router.put('/:id',authMiddleware(['admin']), controller.update)
router.delete('/:id',authMiddleware(['admin']), controller.delete)

module.exports = router;