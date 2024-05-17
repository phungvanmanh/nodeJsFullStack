const knex = require("../config/database");
const { Model } = require('objection');

Model.knex(knex);

class Thuoc extends Model {
    static get tableName() {
        return 'thuocs';
    }
}

module.exports = Thuoc;
