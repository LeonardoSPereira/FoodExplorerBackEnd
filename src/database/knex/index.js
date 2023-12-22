const knexConfig = require("../../../knexfile");
const knex = require("knex");

//create a knex connection to the database
const knexConnection = knex(knexConfig.development);

module.exports = knexConnection;