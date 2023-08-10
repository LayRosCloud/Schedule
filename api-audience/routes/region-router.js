const Router = require('express');
const router = new Router();
const controller = require('../controllers/region-controller');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;