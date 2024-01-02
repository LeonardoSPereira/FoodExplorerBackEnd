const Router = require("express");

const FavoritesController = require("../controllers/FavoritesController");

//creating a new instance of the FavoritesController class
const favoritesController = new FavoritesController();

//creating a new Router instance
const favoritesRoutes = Router();

//defining the routes for the favorites table
favoritesRoutes.get("/:user_id", favoritesController.index);
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.delete("/:id", favoritesController.delete);

module.exports = favoritesRoutes;