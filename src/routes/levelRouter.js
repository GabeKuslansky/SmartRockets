const Koa = require('koa');
const Router = require('koa-router');
const moment = require('moment');

const levelsRepository = require('../models/levelModel');
const router = new Router();

router.get('/', async (ctx, next) => {
    const levels = await levelsRepository.find({})
    .sort(x => x.date)
    .limit(15);
    
    await ctx.render('home', {title: `Home - Try ${levels.length} levels`, levels}); 
})

.post('/level', async(ctx, next) => {
    const level = await formatLevelObject(ctx.request.body);
    await levelsRepository.insert(level);
})

.post('trialFinished', async(ctx, next) => {
    let { completetionTime, levelId } = ctx.params;
    completetionTime = moment().startOf('day').add(highestCompletionTime, 'second').format('mm:ss');
    await levelsRepository.update({ _id: levelId }, { highestCompletionTime: completetionTime});
})

.get('levels/:index', async(ctx, next) => await levelsRepository.find({index: {$gt: ctx.params.index, $lt: ctx.params.index+15}}))

.get('/level/:id', async (ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id});
    ctx.render('playLevel', {title: `Running ${level.metadata.author}'s level`, level})
})

.get('/create', (ctx, next) => ctx.render('createLevel', { title: 'Create level - Smart Rockets' }))

.get('/addFakeLevel', async (ctx, next) => {
    const level = formatLevelObject({levelStructure: {}})
    await levelsRepository.insert({ level });
})

const getLatestIndex = async() => await levelsRepository.findOne({}).projection({index: 1});

const formatLevelObject = async params => {
    const { levelStructure, author } = params;
    
    const metadata = {
        views: 0,
        author: author || 'someone',
        highestCompletionTime: 0,
    }

    const index = await getLatestIndex();
    
    return { index: ++index, levelStructure, metadata };
}

module.exports = router;