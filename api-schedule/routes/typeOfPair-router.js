const Router = require('express')
const router = new Router();
const controller = require('../controllers/typeOfPair-controller')

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;