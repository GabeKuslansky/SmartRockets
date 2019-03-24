const config = require('config');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const hbs = require('koa-hbs');
const serve = require('koa-static-server');
const session = require('koa-session');
const passport = require('koa-passport');
const User = require('./models/userModel');
const router = require('./routes');

const app = new Koa();

app.use(serve({rootDir: __dirname + '/public/', rootPath: '/public' }));

app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

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

app.use(bodyParser());

app.use(hbs.middleware({ viewPath: __dirname + '/views', layoutsPath: __dirname + '/views/layouts', defaultLayout: 'defaultLayout', partialsPath: __dirname + '/views/partials' }));
app.use(router())

app.listen(3000, () => console.log("Listening on port 3000"));