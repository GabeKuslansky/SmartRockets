
const Koa = require('koa');
const hbs = require('koa-hbs');
const serve = require('koa-static');

const app = new Koa();

app.use(serve(__dirname + '/public/'));

const { levelRouter } = require('./routes');

const errorHandler = async (ctx, next) => {
    try {
        await next();
        const status     = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
    } catch(error) {
        ctx.render('error', { error: error.stack });
    }
}

app.use(errorHandler);

app.use(hbs.middleware({ viewPath: __dirname + '/views', layoutsPath: __dirname + '/views/layouts', defaultLayout: 'defaultLayout', partialsPath: __dirname + '/views/partials' }));

app.use(levelRouter.routes());

app.listen(3000, () => console.log("Listening on port 3000"));