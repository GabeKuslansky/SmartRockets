const Router = require('koa-router');
const moment = require('moment');
const levelService = require('../services/levelService');
const userService = require('../services/userService');

const router = new Router({ prefix: '/level'});

router.get('/:id', async (ctx, next) => {
    const { id } = ctx.params;
    const level = await levelService.getLevelById(id);
    const author = await userService.getUserById(level.metadata.authorGoogleId);
    ctx.render('playLevel', { title: 'Loading level...', author, level, play: true } );
    levelService.trackViewLevel(id)
})

module.exports = router;