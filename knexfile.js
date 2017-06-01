module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/garage_bin',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/garage_bin_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'postgres://localhost/garage_bin',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
