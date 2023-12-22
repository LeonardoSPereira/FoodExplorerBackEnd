const Router = require('express');

const userRoutes = require('./user.routes');


const routes = Router();

//separator for routes
routes.use('/users', userRoutes);


module.exports = routes;