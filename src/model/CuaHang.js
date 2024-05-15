const knex = require("../config/database");
const { Model } = require('objection');

Model.knex(knex);

class CuaHang extends Model {
    static get tableName() {
        return 'cua_hangs';
    }
}

module.exports = CuaHang;
