const config = {
    load:()=> {
        return cfg = {
            httpPort: 8080,

            pgUser: 'jasurbek',
            pgDatabase: 'postgres',
            pgHost: 'localhost',
            pgPassword: '1001',
            pgPort: '5432',
        }
    },
}

module.exports = config