const Router = require('koa-router');
const moment = require('moment');

const router = new Router({ prefix: '/level'});

const levelsRepository = require('../models/levelModel');

router.post('/', async(ctx, next) => {
    const level = await formatLevelObject(ctx.request.body);
    await levelsRepository.insert(level);
})

.post('/trialFinished', async(ctx, next) => {
    let { completetionTime, levelId } = ctx.params;
    completetionTime = moment().startOf('day').add(highestCompletionTime, 'second').format('mm:ss');
    await levelsRepository.update({ _id: levelId }, { highestCompletionTime: completetionTime});
})

.get('/:index', async(ctx, next) => await levelsRepository.find({index: {$gt: ctx.params.index, $lt: ctx.params.index+15}}))

.get('/:id', async (ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id});
    ctx.render('playLevel', {title: `Running ${level.metadata.author}'s level`, level})
})

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