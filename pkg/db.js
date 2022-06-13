const client = require('pg').Pool

db = {
    pgsql: (cfg) => {
        return new client({
            user: cfg.pgUser,
            host: cfg.pgHost,
            database: cfg.pgDatabase,
            password: cfg.pgPassword,
            port: cfg.pgPort,
        })
    }
}

module.exports = db