const path = require('path');

// Knexfile is a file that contains the configuration for the database connection.
module.exports = {

  development: {
    client: 'sqlite3',

    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    
    useNullAsDefault: true,
    
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    }
  }
};
