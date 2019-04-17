const Router = require('koa-router');
const levelsRepository = require('../models/levelModel');
const levelService = require('../services/levelService');

const router = new Router();

router

.get('/', async (ctx, next) => {
    console.log(ctx.isAuthenticated())
    const levels = await levelService.getLatestLevels();
    await ctx.render('home', { title: `Home - Try ${levels.length} levels`, levels}); 
})

.get('/create', (ctx, next) => ctx.render('createLevel', { title: 'Create level - Smart Rockets', user: ctx.state.user }))

module.exports = router;