const db = require("../config/database");

/**
 * Batch insert rows into a temporary table
 */
const batchInsert = async (tableName, columns, rows) => {

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