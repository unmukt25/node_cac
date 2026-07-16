const db = require("../config/database");

const getUploadInfo = async (connection, tempTable) => {

    const [rows] = await connection.query(
        `
        SELECT SYSTEM_DATE, CLAIM_ID
        FROM \`${tempTable}\`
        WHERE data_valid = 0
        LIMIT 1
        `
    );

    if (rows.length === 0) {
        return null;
    }

    return {
        systemDate: rows[0].SYSTEM_DATE,
        location: rows[0].CLAIM_ID.substring(0, 5)
    };
};

const syncAllTableIds = async (connection, fileInfo, uploadInfo) => {

    // Remove existing ids for same date & location
    await connection.query(
        `
        DELETE FROM alltable_ids
        WHERE table_name = ?
          AND system_date = ?
          AND matching_value LIKE ?
        `,
        [
            fileInfo.tempTable,
            uploadInfo.systemDate,
            `${uploadInfo.location}%`
        ]
    );


    // Insert latest ids
    await connection.query(
        `
        INSERT INTO alltable_ids
        (matching_value, system_date, table_name)

        SELECT
            CLAIM_ID,
            SYSTEM_DATE,
            ?

        FROM \`${fileInfo.tempTable}\`

        WHERE data_valid = 0
        `,
        [
            fileInfo.tempTable
        ]
    );

};

const clearValidatedTempData = async (connection, fileInfo, uploadInfo) => {

    await connection.query(
        `
        DELETE FROM \`${fileInfo.tempTable}\`
        WHERE data_valid = 1
          AND SYSTEM_DATE = ?
          AND CLAIM_ID LIKE ?
        `,
        [
            uploadInfo.systemDate,
            `${uploadInfo.location}%`
        ]
    );

};

const markDataValid = async (connection, fileInfo, uploadInfo) => {

    await connection.query(
        `
        UPDATE \`${fileInfo.tempTable}\`
        SET data_valid = 1
        WHERE SYSTEM_DATE = ?
          AND CLAIM_ID LIKE ?
        `,
        [
            uploadInfo.systemDate,
            `${uploadInfo.location}%`
        ]
    );

};

const removeFutureData = async (connection, fileInfo, uploadInfo) => {

    await connection.query(
        `
        DELETE FROM \`${fileInfo.tempTable}\`
        WHERE SYSTEM_DATE > ?
          AND CLAIM_ID LIKE ?
        `,
        [
            uploadInfo.systemDate,
            `${uploadInfo.location}%`
        ]
    );

};

const maintainAllTableIds = async () => {

};

const keepLatestTwoDates = async () => {

};

const markDeletedRows = async () => {

};

const moveTempToMain = async () => {

};

module.exports = {
    getUploadInfo,
    syncAllTableIds,
    clearValidatedTempData,
    markDataValid,
    removeFutureData,

    maintainAllTableIds,
    keepLatestTwoDates,
    markDeletedRows,
    moveTempToMain
};