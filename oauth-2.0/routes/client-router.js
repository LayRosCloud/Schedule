const Router = require('express')
const router = new Router();
const controller = require('../controllers/client-controller')
const auth = require('../middleware/role-middleware')

router.post('/', auth(['developer']), controller.create)
router.get('/:id', auth(['developer']), controller.getById)
router.delete('/:id', auth(['developer']), controller.delete)

module.exports = router