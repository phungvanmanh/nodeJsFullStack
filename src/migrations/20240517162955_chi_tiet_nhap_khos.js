exports.up = function(knex) {
    return knex.schema.createTable("chi_tiet_nhap_khos", (table) => {
        table.increments("id").primary();
        table.integer("id_phieu_nhap_kho").notNullable();
        table.integer("id_thuoc").notNullable();
        table.integer("so_luong").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("chi_tiet_nhap_khos");
};