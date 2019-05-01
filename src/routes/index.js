const combineRouters = require('koa-combine-routers')
const homeRouter = require('./homeRouter');
const levelRouter = require('./levelRouter');
const userRouter = require('./userRouter');
const levelApi = require('./api/levelApi');
const auth = require('../auth');

const router = combineRouters(levelApi, homeRouter, levelRouter, auth, userRouter);

module.exports = router;