//Users table migration
exports.up = knex => knex.schema.createTable("products", table => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    
    table.text("name").notNullable();
    table.integer("price").notNullable();
    table.text("description").notNullable();
    table.text("image")

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("products");