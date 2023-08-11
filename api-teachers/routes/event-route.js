const Router = require('express');
const router = new Router();
const controller = require('../controllers/event-controller')

router.get('/connect', controller.connect)

module.exports = router;