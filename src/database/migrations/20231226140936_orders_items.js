exports.up = knex => knex.schema.createTable("order_items", table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());

    table.uuid("order_id").references("id").inTable("orders").onDelete("CASCADE");
    table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");

    table.integer("quantity").notNullable();
    table.integer("price_per_item").notNullable();
    table.integer("total_price").notNullable();
    
    table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("order_items");
