const Router = require('koa-router');
const levelService = require('../services/levelService').default;

const router = new Router();

const levelsRepository = require('../models/levelModel');

router.get('/', async (ctx, next) => {
    const levels = await levelService.getLatestLevels();
    await ctx.render('home', { title: `Home - Try ${levels.length} levels`, levels}); 
})

.get('/create', (ctx, next) => ctx.render('createLevel', { title: 'Create level - Smart Rockets' }))

module.exports = router;