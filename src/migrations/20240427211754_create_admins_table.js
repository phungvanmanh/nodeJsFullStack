exports.up = function(knex) {
    return knex.schema.createTable("admins", (table) => {
        table.increments("id").primary();
        table.string("ten_dang_nhap").notNullable();
        table.string("ten_hien_thi").notNullable();
        table.string("so_dien_thoai").notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.integer("id_cua_hang").unsigned().nullable();
        table.integer("id_quyen").unsigned().nullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("admins");
};