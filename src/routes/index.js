const Router = require('express');

const userRoutes = require('./user.routes');
const productsRoutes = require('./products.routes');
const favoritesRoutes = require('./favorites.routes');
const ordersRoutes = require('./orders.routes');

const routes = Router();

//separator for routes
routes.use('/users', userRoutes);
routes.use('/products', productsRoutes);
routes.use('/favorites', favoritesRoutes);
routes.use('/orders', ordersRoutes);


module.exports = routes;