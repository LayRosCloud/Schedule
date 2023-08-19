const Router = require('express')
const router = new Router();
const controller = require('../controllers/client-controller')
const auth = require('../middleware/role-middleware')

router.post('/', auth(['developer']), controller.create)

module.exports = router