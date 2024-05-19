exports.up = function(knex) {
    return knex.schema.createTable("thuocs", (table) => {
        table.increments("id").primary();
        table.string("ten_thuoc").notNullable();
        table.dateTime("han_su_dung").notNullable();
        table.integer("so_luong").defaultTo(0);
        table.integer("id_don_vi").unsigned().nullable();
        table.integer("gia_nhap").notNullable();
        table.integer("gia_ban").notNullable();
        table.string("ghi_chu").notNullable();
        table.integer("id_nhom_thuoc").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("thuocs");
};