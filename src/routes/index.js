const combineRouters = require('koa-combine-routers')
const homeRouter = require('./homeRouter');
const levelRouter = require('./levelRouter');

const router = combineRouters(homeRouter, levelRouter);

module.exports = router;