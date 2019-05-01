const config = require('config');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const hbs = require('koa-hbs');
const serve = require('koa-static-server');
const session = require('koa-session');
const passport = require('koa-passport');
const router = require('./routes');
require('./auth');

const app = new Koa();

app.use(session({}, app))
app.keys = config.get('sessionSecret');
app.use(passport.initialize());
app.use(passport.session());

app.use(serve({rootDir: __dirname + '/public/', rootPath: '/public' }));

const errorHandler = async (ctx, next) => {
    try {
        await next();
        const httpStatusCode     = ctx.status || 404;
        if ([404, 500].includes(httpStatusCode)) {
            ctx.throw(httpStatusCode);
        }
    } catch(error) {
        ctx.redirect(ctx.originalUrl); //temp fix for unknown 404
        // ctx.render('error', { error: error.stack });
    }
}

app
.use(errorHandler)
.use(bodyParser())
.use(hbs.middleware({ viewPath: __dirname + '/views', layoutsPath: __dirname + '/views/layouts', defaultLayout: 'defaultLayout', partialsPath: __dirname + '/views/partials' }))
.use(router());

app.listen(3000, () => {
    console.log('Listening on port 3000')
})