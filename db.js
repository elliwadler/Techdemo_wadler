const { Pool } = require('pg');

let pool_dev;

pool_dev = new Pool({
    host: 'db',
    port: 5432,
    user: 'user_db',
    password: 'topsecret',
    database: 'cats_db',
});

module.exports =  pool_dev;
