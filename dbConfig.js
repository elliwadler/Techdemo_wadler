const development = {
    host: 'localhost',
    port: 5432,
    user: 'user_db',
    password: 'topsecret',
    database: 'cats_db',
  };
  
  const testing = {
    host: 'localhost',
    port: 5432,
    user: 'test_user',
    password: 'test_secret',
    database: 'test_cats_db',
  };
  
  module.exports = process.env.NODE_ENV === 'test' ? testing : development;
  