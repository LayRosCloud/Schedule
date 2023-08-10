const Router = require('express')
const router = new Router();
const controller = require('../Controllers/hateoas-controller')

router.get('/', controller.getAll)
router.get('/:rel', controller.getByRel)

module.exports = router;