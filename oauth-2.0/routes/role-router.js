const Router = require('express')
const router = new Router();
const controller = require('../controllers/roles-controller')
const auth = require('../middleware/role-middleware')

router.get('/', auth(['admin']), controller.getAll)
router.get('/:id', auth(['admin']), controller.getById)

module.exports = router