const Router = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

//creating a new instance of the OrdersController class
const ordersController = new OrdersController();

//creating a new Router instance
const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

//defining the routes for the favorites table
ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.patch("/:id", verifyUserAuthorization, ordersController.update);



module.exports = ordersRoutes;