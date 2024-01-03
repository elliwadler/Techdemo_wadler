const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

let pool_test;
let pool_dev;

pool_test = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'test_user',
    password: 'test_secret',
    database: 'test_cats_db',
});

pool_dev = new Pool({
    host: 'db',
    port: 5432,
    user: 'user_db',
    password: 'topsecret',
    database: 'cats_db',
});

module.exports = process.env.NODE_ENV === 'test' ? pool_dev : pool_test;
