const Router = require('express')
const router = new Router();

const linkRouter = require('./linkRouter');
const dayRouter = require('./dayOfWeekRouter');
const timeRouter = require('./timeRouter');
const pairRouter = require('./pairRouter');
const groupRouter = require('./groupRouter');
const typeOfPairRouter = require('./typeOfPairRouter');
const cafedraRouter = require('./cafedraRouter');
const audienceRouter = require('./audienceRouter');
const corpusRouter = require('./corpusRouter');
const teacherRouter = require('./teacherRouter');
const teacherSubjectRouter = require('./teacherSubjectRouter');
const userRouter = require('./userRouter');

router.use('/', linkRouter);

router.use(`${process.env.MAIN_VERSION}${process.env.URI_DAY}`, dayRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_TIME}`, timeRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_PAIR}`, pairRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_GROUP}`, groupRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_TYPE}`, typeOfPairRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_CAFEDRA}`, cafedraRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_AUDIENCE}`, audienceRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_CORPUS}`, corpusRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_TEACHER}`, teacherRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_TEACHERSUBJECT}`, teacherSubjectRouter);
router.use(`${process.env.MAIN_VERSION}${process.env.URI_USER}`, userRouter);

module.exports = router
