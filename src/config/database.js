require('dotenv').config();
// const mysql = require('mysql2');
// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database : process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 100,
//     queueLimit: 0,
// });

// module.exports = connection;

const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
    }
});

module.exports = knex;