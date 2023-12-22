const Router = require('express');
const UserController = require('../controllers/UserController');


// Create a new instance of the UserController class
const userController = new UserController();

// Create a new instance of the Router class
const userRoutes = Router();

// Create a route to deal with user routes
userRoutes.post('/', userController.create);

module.exports = userRoutes;