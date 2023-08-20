const Router = require('express')
const router = new Router();
const usersRouter = require('./users-router')
const clientRouter = require('./client-router')
const permissionRouter = require('./permission-router')
const roleRouter = require('./role-router')

router.use('/v1/users', usersRouter)
router.use('/v1/clients', clientRouter)
router.use('/v1/permissions', permissionRouter)
router.use('/v1/roles', roleRouter)

module.exports = router;