const Router = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');

const ProductsController = require('../controllers/ProductsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

// Create a new instance of the ProductsController class
const productsController = new ProductsController();

// Create a new instance of the Router class
const productsRoutes = Router();

// Create a new instance of the Multer class
const upload = multer(uploadConfig.MULTER);

// Make sure user is authenticated and authorized to access the routes
productsRoutes.use(ensureAuthenticated);

// Create a route to deal with user routes
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);

productsRoutes.post('/', verifyUserAuthorization, productsController.create);
productsRoutes.put("/image/:id", verifyUserAuthorization, upload.single("image"), productsController.uploadImage)

productsRoutes.put("/:id", verifyUserAuthorization, productsController.update);
productsRoutes.delete("/:id", verifyUserAuthorization, productsController.delete)


// Export the routes
module.exports = productsRoutes;