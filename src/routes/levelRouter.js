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

.get('/group/:index', async(ctx, next) => await levelsRepository.skip(15*ctx.params.index).find({}).sort({ index: 1 }).limit(15))

.get('/:id', async (ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id});
    ctx.render('playLevel', {title: `Running ${level.metadata.author}'s level`, level})
})

const getLatestIndex = async() => await levelsRepository.findOne({}).projection({index: 1});

const formatLevelObject = async levelStructure => {
    console.log(levelStructure)
    const metadata = {
        views: 0,
        author: 'someone',
        highestCompletionTime: 0,
    }

    const index = await getLatestIndex();
    
    return { index: 0, levelStructure, metadata };
}

module.exports = router;