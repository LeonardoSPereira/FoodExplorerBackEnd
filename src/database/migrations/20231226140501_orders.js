// Orders table schema
exports.up = knex => knex.schema.createTable("orders", table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.enum("status", ["pending", "preparing", "delivered"]).defaultTo("pending");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
