const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const routes = require('./routes/routes.js');

const app = new Koa();

app.use(cors());
app.use(
    koaBody({
      parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
    })
  );
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5001);