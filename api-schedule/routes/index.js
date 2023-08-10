const Router = require('express');
const router = new Router();
const hateoasRouter = require('./hateoas-routes')
const typeOfPairRouter = require('./typeOfPair-router')
const timesRouter = require('./time-router')
const pairsRouter = require('./pairs-router')
const dayOfWeekRouter = require('./dayOfWeek-router')
const collegeRouter = require('./college-router')
const facultyRouter = require('./faculty-router')
const courseRouter = require('./course-router')
const groupRouter = require('./group-router')

router.use('/', hateoasRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_OF_PAIRS}`, typeOfPairRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TIMES}`, timesRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_PAIRS}`, pairsRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_GROUPS}`, groupRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_COURSES}`, courseRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_FACULTYS}`, facultyRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_COLLEGES}`, collegeRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_DAYOFWEEKS}`, dayOfWeekRouter)

module.exports = router