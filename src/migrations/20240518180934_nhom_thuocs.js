exports.up = function(knex) {
    return knex.schema.createTable("nhom_thuocs", (table) => {
        table.increments("id").primary();
        table.string("ten_nhom_thuoc").notNullable();;
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("nhom_thuocs");
};