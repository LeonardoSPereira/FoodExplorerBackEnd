const Router = require("express");

const OrdersController = require("../controllers/OrdersController");

//creating a new instance of the OrdersController class
const ordersController = new OrdersController();

//creating a new Router instance
const ordersRoutes = Router();

//defining the routes for the favorites table
ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.post("/:user_id", ordersController.create);


module.exports = ordersRoutes;