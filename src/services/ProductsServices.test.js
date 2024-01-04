const ProductsRepositoryInMemory = require('../repositories/repositoriesInMemory/ProductsRepositoryInMemory');
const ProductsServices = require('./ProductsServices');
const AppError = require('../utils/AppError');

describe('ProductsServices', () => {
    // create a new instance of the repository and the service before each test
    let productsRepositoryInMemory;
    let productsServices;

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        productsServices = new ProductsServices(productsRepositoryInMemory);
    });

    it("should be able to create a new product", async () => {
        // create a product object
        const product = {
            title: "Product test",
            price: "15,97",
            description: "Product description test",
            category: "food",
            ingredients: ["ingredient 1", "ingredient 2"]
        }

        // create the product
        const productCreated = await productsServices.createProduct(product);

        // expect the product to have an id
        expect(productCreated).toHaveProperty("id");

    });

    it("should not be able to create a new product with an existing title", async () => {
        // create a product object
        const product1 = {
            title: "Product test",
            price: "15,97",
            description: "Product description test",
            category: "food",
            ingredients: ["ingredient 1", "ingredient 2"]
        }

        // create another product object
        const product2 = {
            title: "Product test",
            price: "15,97",
            description: "Product description test",
            category: "food",
            ingredients: ["ingredient 1", "ingredient 2"]
        }

        // create the first product
        await productsServices.createProduct(product1);

        // expect the second product creation to fail
        await expect(productsServices.createProduct(product2)).rejects.toEqual(new AppError("Produto já cadastrado!"));
    });

    it("should not be able to create a new product with an invalid category", async () => {
        // create a product object
        const product = {
            title: "Product test",
            price: "15,97",
            description: "Product description test",
            category: "invalid category",
            ingredients: ["ingredient 1", "ingredient 2"]
        }

        // expect the product creation to fail
        await expect(productsServices.createProduct(product)).rejects.toEqual(new AppError("Categoria inválida!"));
    });

    it("should be able to delete a product", async () => {
        // create a product object
        const product = {
            title: "Product test",
            price: "15,97",
            description: "Product description test",
            category: "food",
            ingredients: ["ingredient 1", "ingredient 2"]
        }

        // create the product
        const productCreated = await productsServices.createProduct(product);

        // delete the product
        await productsServices.deleteProduct(productCreated.id);

        // expect the product to not exist
        const productFound = await productsRepositoryInMemory.findProductById(productCreated.id);
        
        expect(productFound).toBeUndefined();
    });
});