exports.up = knex => knex.schema.createTable("orders", table => {
    
    table.uuid('id').primary().defaultTo(knex.fn.uuid());

    table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.integer("price").notNullable();
    table.integer("quantity").notNullable(); 
    table.enum("status", ["pending", "preparing", "delivered"]).defaultTo("pending");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
