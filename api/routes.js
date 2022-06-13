
route = { 
    routes: (ctx, handlers) => {
    if (ctx.req.url === '/ping' && ctx.req.method === 'GET'){
        handlers.pong(ctx)
    } else if (ctx.req.url === '/todos' && ctx.req.method === 'POST'){
        handlers.post(ctx)
    } else if (ctx.req.url === '/todos' && ctx.req.method === 'GET'){
        handlers.getAll(ctx)
    } else if(ctx.req.url.match(/\/todos\/\w+/) && ctx.req.method === 'GET'){
        handlers.getById(ctx)
    } else if(ctx.req.url.match(/\/todos\/\w+/) && ctx.req.method === 'PUT'){
        handlers.put(ctx)
    } else if(ctx.req.url.match(/\/todos\/\w+/) && ctx.req.method === 'DELETE'){
        handlers.delete(ctx)
    }
}
}
module.exports = route