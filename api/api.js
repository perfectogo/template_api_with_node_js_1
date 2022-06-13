const http = require('http')
const route = require('./routes')
const handler = require('./handlers/handlers')

api = {
    new: (dbstorage) => {
        const server = http.createServer(async (req, res) => {
            route.routes({req, res}, handler.newHandlers(dbstorage))
        })
        return server
    }
} 

module.exports = api