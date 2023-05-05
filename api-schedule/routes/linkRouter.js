const Router = require('express')
const router = new Router()
const controller = require('../controllers/linkController')

router.get('/', controller.getAll)

module.exports = router;