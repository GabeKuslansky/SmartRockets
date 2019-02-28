const Koa = require('koa');
const app = new Koa();
const { levelRouter } = require('./routes');

app.use(levelRouter.routes());

app.listen(3000, () => console.log("Listening on port 3000"));