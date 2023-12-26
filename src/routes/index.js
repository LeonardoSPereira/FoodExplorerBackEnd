const Router = require('express');

const userRoutes = require('./user.routes');
const productsRoutes = require('./products.routes');

const routes = Router();

//separator for routes
routes.use('/users', userRoutes);
routes.use('/products', productsRoutes);


module.exports = routes;