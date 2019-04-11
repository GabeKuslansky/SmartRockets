const Router = require('koa-router');
const levelsRepository = require('../../models/levelModel');

const router = new Router({ prefix: '/api/level' })

router.get('/:id', async(ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id})
    ctx.response.status = 200;
    ctx.body = level;
})

.get('/group/:index', async(ctx, next) => this.body = await levelsRepository.find({index: { $gt: ctx.params.index }}).sort({ index: 1 }).limit(15))

module.exports = router;