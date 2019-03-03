const Koa = require('koa');
const Router = require('koa-router');
const moment = require('moment');

const levelsRepository = require('../models/levelModel');
const router = new Router();

router.get('/', async (ctx, next) => {
    const levels = await levelsRepository.find({})
    .sort(x => x.date)
    .limit(15);

    levels.forEach(level => {
       level.highestCompletionTime = moment.utc(level.highestCompletionTime*1000).format('HH:mm:ss');
    });
    
    await ctx.render('home', {title: `Home - Try ${levels.length} levels`, levels}); 
});

router.post('/level', async(ctx, next) => {
    const level = formatLevelObject(ctx.params);
    await levelsRepository.insert(level);
});

router.get('levels/:index', async(ctx, next) => await levelsRepository.find({index: {$gt: ctx.params.index, $lt: ctx.params.index+15}}))

.get('/level/:id', async (ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id});
    ctx.render('playLevel', {title: `Running ${level.metadata.author}'s level`, level})
})

.get('/create', (ctx, next) => {
    ctx.render('createLevel', { title: 'Create level - Smart Rockets' })
})

.get('/addFakeLevel', async (ctx, next) => {
    const level = formatLevelObject({levelStructure: {}})
    await levelsRepository.insert({ level });
})

const getLatestIndex = async() => await levelsRepository.findOne({}, {index: 1})

const formatLevelObject = params => {
    const { levelStructure, author } = params;
    
    const metadata = {
        views: 0,
        author: author || 'someone',
        highestCompletionTime: 0,
    }

    const index = ++getLatestIndex();

    return { index, levelStructure, metadata, created: Date.now() };
}

module.exports = router;