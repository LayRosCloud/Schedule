const Router = require('express');
const router = new Router();
const regionRouter = require('./region-router');
const cityRouter = require('./city-router');
const streetRoute = require('./street-router');
const audienceLockedRouter = require('./audienceLocked-router');
const audienceRouter = require('./audience-router');
const corpusRouter = require('./corpus-router')

router.use('/region', regionRouter);
router.use('/city', cityRouter);
router.use('/street', streetRoute);
router.use('/audienceLocked', audienceLockedRouter);
router.use('/audience', audienceRouter);
router.use('/corpus', corpusRouter);

module.exports = router;