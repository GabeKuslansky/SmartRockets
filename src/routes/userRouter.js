const Router = require('koa-router');
const levelsRepository = require('../models/levelModel');
const levelService = require('../services/levelService');

const router = new Router();

router

.get('/user/:id', async (ctx, next) => {
    if (ctx.state.user) {
    const levels = await levelService.getLevelsFromUserId(ctx.params.id);
        levels.forEach(level => level.currentUserOwnsLevel = true);
        await ctx.render('levels', { title: `${ctx.state.name}'s levels`, levels }); 
    }
})

module.exports = router;