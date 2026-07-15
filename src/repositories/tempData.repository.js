const db = require("../config/database");

const BATCH_SIZE = 1000;
/**
 * Batch insert rows into a temporary table
 */
const batchInsert = async (tableName, rows) => {

    if (!rows || rows.length === 0) {
        return;
    }

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const columns = Object.keys(rows[0]);

        const sql = `
            INSERT INTO \`${tableName}\`
            (${columns.map(col => `\`${col}\``).join(",")})
            VALUES ?
        `;

        for (let i = 0; i < rows.length; i += BATCH_SIZE) {

            const batch = rows.slice(i, i + BATCH_SIZE);

            const values = batch.map(row =>
                columns.map(column => row[column])
            );

            await connection.query(sql, [values]);
        }

        await connection.commit();

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

};
/**
 * Delete invalid imported rows
 */
const deleteInvalidRows = async (tableName) => {

};

/**
 * Get invalid imported rows
 */
const getInvalidRows = async (tableName) => {

};

/**
 * Delete previous uploaded data
 */
const deleteExistingData = async (tableName, systemDate, location) => {

};

module.exports = {
    batchInsert,
    deleteInvalidRows,
    getInvalidRows,
    deleteExistingData
};