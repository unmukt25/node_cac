const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    multipleStatements: true, 

    dateStrings: ['DATE']  /***** added this to get date in IST formate 2026-06-02 00:00:00 IST = 2026-06-01 18:30:00 UTC */
});

module.exports = pool;