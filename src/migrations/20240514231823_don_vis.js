exports.up = function(knex) {
    return knex.schema.createTable("don_vis", (table) => {
        table.increments("id").primary();
        table.string("ten_don_vi").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("don_vis");
};