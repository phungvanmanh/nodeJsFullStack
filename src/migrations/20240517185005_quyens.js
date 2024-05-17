exports.up = function(knex) {
    return knex.schema.createTable("quyens", (table) => {
        table.increments("id").primary();
        table.string("ten_quyen");
        table.string("lits_chuc_nang");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("quyens");
};