const Router = require('express')
const router = new Router();

const linkRouter = require('./linkRouter');
const dayRouter = require('./dayOfWeekRouter');
const timeRouter = require('./timeRouter');
const pairRouter = require('./pairRouter');
const groupRouter = require('./groupRouter');
const typeOfPairRouter = require('./typeOfPairRouter');
const cafedraRouter = require('./cafedraRouter');

router.use('/', linkRouter);
router.use(`${process.env.MAIN_VERSION}/day`, dayRouter);
router.use(`${process.env.MAIN_VERSION}/time`, timeRouter);
router.use(`${process.env.MAIN_VERSION}/pair`, pairRouter);
router.use(`${process.env.MAIN_VERSION}/group`, groupRouter);
router.use(`${process.env.MAIN_VERSION}/type`, typeOfPairRouter);
router.use(`${process.env.MAIN_VERSION}/cafedra`, cafedraRouter);

module.exports = router
