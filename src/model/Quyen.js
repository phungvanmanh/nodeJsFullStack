const knex = require("../config/database");
const { Model } = require('objection');

Model.knex(knex);

class Quyen extends Model {
    static get tableName() {
        return 'quyens';
    }
}

module.exports = Quyen;
