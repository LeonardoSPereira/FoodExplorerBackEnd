//Users table migration
exports.up = knex => knex.schema.createTable("categories", table => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");
    table.text("name").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("categories");