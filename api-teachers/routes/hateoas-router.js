const Router = require('express')
const router = new Router();
const controller = require('../controllers/hateoas-controller')

router.get('/', controller.getAll)
router.get('/:rel', controller.getByRel)

module.exports = router;