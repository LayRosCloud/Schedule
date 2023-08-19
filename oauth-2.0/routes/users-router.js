const Router = require('express')
const router = new Router();
const controller = require('../controllers/users-controller')
const auth = require('../middleware/role-middleware')

router.post('/register', auth(['admin']), controller.create)
router.post('/login', controller.login)
router.post('/verify', controller.verify)

module.exports = router