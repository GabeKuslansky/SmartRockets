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


.get('/:id', async (ctx, next) => {
    const level = await levelsRepository.findOne({_id: ctx.params.id});
    ctx.render('playLevel', {title: `Running ${level.metadata.author}'s level`, level, play: true})
})


const getLatestIndex = async() => await levelsRepository.findOne({}, { sort: {index: 1 }, limit: 1})

const formatLevelObject = async levelStructure => {
    const metadata = {
        views: 0,
        author: 'someone',
        highestCompletionTime: 0,
    }
    const index = await getLatestIndex();
    return { index: 0, levelStructure, metadata };
}

module.exports = router;