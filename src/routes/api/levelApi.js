const Router = require('koa-router');
const levelService = require('../../services/levelService').default;

const router = new Router({ prefix: '/api/level' })

router.get('/:id', async(ctx, next) => {
    const level = await levelService.findById(ctx.params.id)
    ctx.response.status = 200;
    ctx.body = level;
})

.get('/group/:index', async(ctx, next) => this.body = await levelsRepository.find({index: { $gt: ctx.params.index }}).sort({ index: 1 }).limit(15))

module.exports = router;