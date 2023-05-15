const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.post('/reg', controller.reg);
router.post('/auth', controller.auth);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

module.exports = router;
