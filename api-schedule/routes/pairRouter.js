const Router = require('express')
const router = new Router()
const controller = require('../controllers/pairController')

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

module.exports = router;
