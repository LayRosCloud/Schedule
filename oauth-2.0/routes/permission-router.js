const Router = require('express')
const router = new Router();
const controller = require('../controllers/permission-controller')
const auth = require('../middleware/role-middleware')

router.delete('/:id',auth('admin'), controller.delete)
router.post('/',auth('admin'), controller.create)

module.exports = router;