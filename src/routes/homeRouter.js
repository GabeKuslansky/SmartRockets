const Router = require('koa-router');

const router = new Router();

const levelsRepository = require('../models/levelModel');

router.get('/', async (ctx, next) => {
    const levels = await levelsRepository.find({})
    .sort(x => x.date)
    .limit(15);

    await ctx.render('home', { title: `Home - Try ${levels.length} levels`, levels}); 
})

.get('/create', (ctx, next) => ctx.render('createLevel', { title: 'Create level - Smart Rockets' }))

module.exports = router;