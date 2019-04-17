const Router = require('koa-router');
const moment = require('moment');
const levelService = require('../services/levelService');
const userService = require('../services/userService');

const router = new Router({ prefix: '/level'});

const levelsRepository = require('../models/levelModel');

router.get('/:id', async (ctx, next) => {
    const level = await levelService.getLevelById(ctx.params.id);
    const author = await userService.getUserById(level.metadata.authorGoogleId);
    ctx.render('playLevel', { title: 'Loading level...', author, level, play: true } );
})

module.exports = router;