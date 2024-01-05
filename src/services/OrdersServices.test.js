const OrdersRepositoryInMemory = require("../repositories/repositoriesInMemory/OrdersRepositoryInMemory");
const OrdersServices = require("./OrdersServices");
const AppError = require("../utils/AppError");

describe("OrdersServices", () => {
    let ordersRepositoryInMemory;
    let ordersServices;

    beforeEach(() => {
        ordersRepositoryInMemory = new OrdersRepositoryInMemory();
        ordersServices = new OrdersServices(ordersRepositoryInMemory);
    });

    it("should be able to create a new order", async () => {
        const order = {
            user_id: "123456",
            orderItems: [
                {
                    product_id: "123456",
                    quantity: 1,
                    price_per_item: 100
                },
                {
                    product_id: "789456",
                    quantity: 2,
                    price_per_item: 200
                }
            ]
        }


        expect(await ordersServices.createProduct(order)).toBeUndefined();
    });

    it("should not be able to create a new order if the user_id is not present", async () => {
        const order = {
            orderItems: [
                {
                    product_id: "123456",
                    quantity: 1,
                    price_per_item: 100
                },
                {
                    product_id: "789456",
                    quantity: 2,
                    price_per_item: 200
                }
            ]
        }

        await expect(ordersServices.createProduct(order)).rejects.toEqual(new AppError("Usuário não informado"));
    });

    it("should not be able to create a new order if there are missing data", async () => {
        const order = {
            user_id: "123456",
            orderItems: [
                {
                    product_id: "123456",
                    quantity: 1,
                    price_per_item: 100
                },
                {
                    product_id: "789456",
                    quantity: 2
                }
            ]
        }

        await expect(ordersServices.createProduct(order)).rejects.toEqual(new AppError("Dados incompletos"));
    });
    
})