const knex = require("../config/database");
const { Model } = require('objection');

Model.knex(knex);

class DonVi extends Model {
    static get tableName() {
        return 'nhom_thuocs';
    }
}

module.exports = DonVi;
