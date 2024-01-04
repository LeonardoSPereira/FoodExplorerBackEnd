const UserRepositoryInMemory = require("../repositories/repositoriesInMemory/UserRepositoryInMemory");
const AppError = require("../utils/AppError");
const UserServices = require("./UserServices");


describe("UserServices", () => {

    // create a new instance of the repository and the service before each test
    let userRepositoryInMemory;
    let userServices;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userServices = new UserServices(userRepositoryInMemory);
    });


    it("should be able to create a new user", async () => {
        // create a user object
        const user = {
            name: "User test",
            email: "email@test.com",
            password: "123456"
        }

        // create the user
        const createdUser = await userServices.createUser(user);

        // expect the user to have an id
        expect(createdUser).toHaveProperty("id");
    });

    it("should not be able to create a new user with an existing email", async () => {
        // create a user object
        const user1 = {
            name: "User test",
            email: "email@test.com",
            password: "123456"
        }

        // create another user object
        const user2 = {
            name: "User test2",
            email: "email@test.com",
            password: "1234561"
        }

        // create the first user
        await userServices.createUser(user1);

        // expect the second user creation to fail
        await expect(userServices.createUser(user2)).rejects.toEqual(new AppError("E-mail já cadastrado"));
    });
});