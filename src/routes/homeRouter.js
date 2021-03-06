const Router = require('koa-router');
const levelsRepository = require('../models/levelModel');
const levelService = require('../services/levelService');

const router = new Router();

router

.get('/', async (ctx, next) => {
    const levels = await levelService.getLatestLevels();
    if (ctx.state.user) {
        levels.forEach(level => level.currentUserOwnsLevel = level.author.googleId == ctx.state.user.googleId);
    }
    await ctx.render('levels', { title: `Home - Try ${levels.length} levels`, levels }); 
})

.get('/create', (ctx, next) => ctx.render('createLevel', { title: 'Create level - Smart Rockets', user: ctx.state.user }))

module.exports = router;