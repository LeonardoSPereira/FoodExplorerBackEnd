const Router = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');

const ProductsController = require('../controllers/ProductsController');


// Create a new instance of the ProductsController class
const productsController = new ProductsController();

// Create a new instance of the Router class
const productsRoutes = Router();

// Create a new instance of the Multer class
const upload = multer(uploadConfig.MULTER);

// Create a route to deal with user routes
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post('/', productsController.create);
productsRoutes.post("/image/:product_id", upload.single("image"), productsController.uploadImage)
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete)


// Export the routes
module.exports = productsRoutes;