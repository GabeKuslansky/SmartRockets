const Router = require('koa-router');
const levelService = require('../../services/levelService');

const router = new Router({ prefix: '/api/level' })

router

.get('/:id', async(ctx, next) => {
    const level = await levelService.getLevelById(ctx.params.id);
    ctx.response.status = 200;
    ctx.body = level;
})

.post('/', async(ctx, next) => {
    if (ctx.isAuthenticated()) {
        const { googleId } = ctx.state.user;
        await levelService.saveLevel(ctx.request.body, googleId);
    } else {
        ctx.status = 500;
    }
})

.get('/delete/:id', async(ctx, next) => {
    if (ctx.isAuthenticated()) {
        const levelId = ctx.params.id;
        const level = await levelService.getLevelById(levelId);
        if (level.metadata.authorGoogleId == ctx.state.user.googleId) {
            await levelService.deleteLevel(levelId);
            ctx.redirect('/')
        } else {
            ctx.redirect('/')
        }
    } else {
        ctx.status = 500;
    }
})

// .get('/group/:index', async(ctx, next) => this.body = await levelsRepository.find({index: { $gt: ctx.params.index }}).sort({ index: 1 }).limit(15))

module.exports = router;