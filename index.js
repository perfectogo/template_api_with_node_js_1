const logger = require('./pkg/logger')
const config = require('./config/config')
const db = require('./pkg/db')
const storage = require('./storage/postgres')
const api = require('./api/api')


logger.info("running main function!!!")

// Loading Config
const cfg = config.load()

// Loading DB
const psql = db.pgsql(cfg)

// Loading Storage
const pgStorage = storage.pgstorage(psql)

api.new(pgStorage).listen(
    cfg.httpPort, 
    () => console.log('server is running on port: ', cfg.httpPort)
)
