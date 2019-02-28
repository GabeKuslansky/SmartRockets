const Koa = require('koa');
const Router = require('koa-router');
const levelsRepository = require('../models/levelModel.js');

const router = new Router();

router.get('/level/:id', async (ctx, next) => {
    const level = await levelsRepository.find({_id: ctx.params.id});
    ctx.body = level;
});

router.post('/level', async(ctx, next) => levelsRepository.insert(ctx.params.level));

module.exports = router