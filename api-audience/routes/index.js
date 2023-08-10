const Router = require('express');
const router = new Router();
const regionRouter = require('./region-router');
const cityRouter = require('./city-router');
const streetRoute = require('./street-router');
const audienceLockedRouter = require('./audienceLocked-router');
const audienceRouter = require('./audience-router');
const corpusRouter = require('./corpus-router')
const hateoasRouter = require('./hateoas-router')

router.use('/', hateoasRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_REGION}`, regionRouter);
router.use(`${process.env.URL_VERSION}${process.env.URL_CITY}`, cityRouter);
router.use(`${process.env.URL_VERSION}${process.env.URL_STREET}`, streetRoute);
router.use(`${process.env.URL_VERSION}${process.env.URL_AUDIENCE_LOCKED}`, audienceLockedRouter);
router.use(`${process.env.URL_VERSION}${process.env.URL_AUDIENCE}`, audienceRouter);
router.use(`${process.env.URL_VERSION}${process.env.URL_CORPUS}`, corpusRouter);

module.exports = router;