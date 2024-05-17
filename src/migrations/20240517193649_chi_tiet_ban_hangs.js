exports.up = function(knex) {
    return knex.schema.createTable("chi_tiet_ban_hangs", (table) => {
        table.increments("id").primary();
        table.interger("id_don_ban_hang");
        table.interger("is_thuoc");
        table.interger("so_luong");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("chi_tiet_ban_hangs");
};