exports.up = function(knex) {
    return knex.schema.createTable("chi_tiet_ban_hangs", (table) => {
        table.increments("id").primary();
        table.integer("id_don_ban_hang");
        table.integer("is_thuoc");
        table.integer("so_luong");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("chi_tiet_ban_hangs");
};