class IngredientsRepositoryInMemory {
    constructor() {
        this.ingredients = [];
        this.id = Math.floor(Math.random() * 1000) + 1
    }

    async createIngredients(ingredients) {
        // map the ingredients array to create an array of objects
        const createdIngredients = ingredients.map(ingredient => {
            return {
                id: this.id,
                name: ingredient
            }
        });

        // add the created ingredients to the ingredients array
        this.ingredients.push(...createdIngredients);

        return this.ingredients;
    }
}

module.exports = IngredientsRepositoryInMemory;