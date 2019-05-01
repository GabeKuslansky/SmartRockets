const combineRouters = require('koa-combine-routers')
const homeRouter = require('./homeRouter');
const levelRouter = require('./levelRouter');
const levelApi = require('./api/levelApi');

const router = combineRouters(levelApi, homeRouter, levelRouter);

module.exports = router;