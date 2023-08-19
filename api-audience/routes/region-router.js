const Router = require('express');
const router = new Router();
const controller = require('../controllers/region-controller');
const authMiddleware = require("../middleware/auth-middleware");

router.post('/', authMiddleware(['audience department']), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', authMiddleware(['audience department']), controller.update);
router.delete('/:id', authMiddleware(['audience department']), controller.delete);

module.exports = router;