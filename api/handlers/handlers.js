const getBodyData = require('../../pkg/utils')

handler = {
  newHandlers: (storage) => {
    return newBookServer = {
        // Testing
            pong: async (ctx) => {
                ctx.res.writeHead(200, {
                   'Content-Type':'application/json charset=utf8'
                })

                ctx.res.end(JSON.stringify('pong'))
            },

        // Post
            post: async (ctx)=> {
                try {
                    ctx.res.writeHead(201, {
                        'Content-Type':'application/json charset=utf8'
                    })
                    const req = await getBodyData(ctx.req)
                    const data = await storage.insert(JSON.parse(req))
                    const resp = {
                        statusCode: ctx.res.statusCode,
                        status: 'created',
                        data
                    }
                    ctx.res.end(JSON.stringify(resp))
                } catch (error) {
                    res.status(500).json({message: error.message})  
                  }
            },
        
        // Get All
            getAll: async (ctx) => {
                try {
                    ctx.res.writeHead(200, {
                        'Content-Type':'application/json charset=utf8'
                    })

                    const resp = {
                        statusCode: ctx.res.statusCode,
                        status: 'ok',
                        data: await storage.selectAll()
                    }

                    ctx.res.end(JSON.stringify(resp))

                } catch (error) {
                    console.log(error);
                    ctx.res.status(500).json({message: error.message})  
                }
            },
        
        // Get
            getById: async (ctx) => {
                ctx.res.writeHead(201, {
                    'Content-Type':'application/json charset=utf8'
                })

                const id = ctx.req.url.split("/")[2]
                const resp = {
                    statusCode: ctx.res.statusCode,
                    status: 'ok',
                    data: await storage.select(id)
                }
                ctx.res.end(JSON.stringify(resp))
            },

            put: async (ctx) => {
                ctx.res.writeHead(201, {
                    'Content-Type':'application/json charset=utf8'
                })

                const id = ctx.req.url.split("/")[2]
                const newData = JSON.parse(await getBodyData(ctx.req)) 
            
                const resp = {
                    statusCode: ctx.res.statusCode,
                    status: 'updated',
                    data: await storage.update({id, newData})
                }
                ctx.res.end(JSON.stringify(resp))
            },

            delete: (ctx) => {
                ctx.res.writeHead(200, {
                    'Content-Type':'application/json charset=utf8'
                })

                const id = ctx.req.url.split("/")[2]
                                
                const resp = {
                    statusCode: ctx.res.statusCode,
                    status: 'deleted',
                    msg: storage.delete(id)
                }
                ctx.res.end(JSON.stringify(resp))
            },
        }
    }
}

module.exports = handler