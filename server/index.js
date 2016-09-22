import Koa from 'koa';
import debug from 'debug';

import config from './config';

const app = new Koa();

// enable global debugs
debug.enable('*');
if (process.NODE_ENV === 'development') {
    debug.enable('dev');
}

// catch 500 error
app.use(async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

app.use(async ctx => {
    ctx.body = await 'test';
});

app.listen(config.port);

debug('*')(`Successfully started server at ${config.port}`);
