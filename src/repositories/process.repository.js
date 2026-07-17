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

const keepLatestTwoSnapshots = async (
    connection,
    table,
    location
) => {

    // Get latest two distinct snapshot dates
    const [rows] = await connection.execute(
        `
        SELECT DISTINCT SYSTEM_DATE
        FROM temp_${table}
        WHERE CLAIM_ID LIKE ?
        ORDER BY SYSTEM_DATE DESC
        LIMIT 2
        `,
        [`${location}%`]
    );

    if (rows.length < 2) {
        return {
            hasTwoSnapshots: false
        };
    }

    const latestDate = rows[0].SYSTEM_DATE;
    const previousDate = rows[1].SYSTEM_DATE;

    // Delete snapshots older than the latest two
    await connection.execute(
        `
        DELETE
        FROM temp_${table}
        WHERE SYSTEM_DATE NOT IN (?, ?)
          AND CLAIM_ID LIKE ?
        `,
        [
            latestDate,
            previousDate,
            `${location}%`
        ]
    );

    return {
        hasTwoSnapshots: true,
        latestDate,
        previousDate
    };
};


const markDeletedRows = async (
    connection,
    table,
    location,
    latestDate,
    previousDate
) => {

    await connection.execute(
        `
        UPDATE temp_${table}
        SET deleted = 1
        WHERE CLAIM_ID IN (
            SELECT CLAIM_ID
            FROM (
                SELECT CLAIM_ID
                FROM temp_${table}
                WHERE SYSTEM_DATE = ?
                  AND CLAIM_ID LIKE ?
            ) t
        )
        AND SYSTEM_DATE = ?
        `,
        [
            previousDate,
            `${location}%`,
            latestDate
        ]
    );
};

const copyTempToMain = async (
    connection,
    table,
    systemDate,
    location
) => {

    const sql = `
        INSERT INTO \`${table}\`
        (
            ACCOUNT_GROUP,
            ACC_TASK_ID,
            CLAIM_ID,
            MEMBER_ID,
            NAME_AS_PER_CLAIM,
            NAME_AS_PER_MEMBER_MASTER,
            FATHER_NAME,
            GENDER,
            DOB,
            DOJ_EPF,
            DOJ_EPS,
            DOJ_EPF71,
            DOE_EPF,
            DOE_EPS,
            DOE_EPF71,
            FORM_TYPE,
            PARA_CODE,
            SUB_PARA_CODE,
            CREATED_ON,
            APPROVED_ON,
            SUB_PARA_CATEGORY,
            PAYMENT_MODE,
            DISPATCH_DATE,
            TOTAL_AMOUNT,
            NO_TIMES,
            ACCOUNT_NO,
            IFSC_CODE,
            BANK_DETAILS,
            CASE_STATUS,
            CREATED_BY,
            APPROVED_BY,
            SYSTEM_DATE,
            LCM
        )

        SELECT
            ACCOUNT_GROUP,
            ACC_TASK_ID,
            CLAIM_ID,
            MEMBER_ID,
            NAME_AS_PER_CLAIM,
            NAME_AS_PER_MEMBER_MASTER,
            FATHER_NAME,
            GENDER,
            DOB,
            DOJ_EPF,
            DOJ_EPS,
            DOJ_EPF71,
            DOE_EPF,
            DOE_EPS,
            DOE_EPF71,
            FORM_TYPE,
            PARA_CODE,
            SUB_PARA_CODE,
            CREATED_ON,
            APPROVED_ON,
            SUB_PARA_CATEGORY,
            PAYMENT_MODE,
            DISPATCH_DATE,
            TOTAL_AMOUNT,
            NO_TIMES,
            ACCOUNT_NO,
            IFSC_CODE,
            BANK_DETAILS,
            CASE_STATUS,
            CREATED_BY,
            APPROVED_BY,
            SYSTEM_DATE,
            LCM

        FROM temp_${table}

        WHERE deleted = 0
        AND SYSTEM_DATE = ?
        AND CLAIM_ID LIKE ?
    `;


    await connection.execute(
        sql,
        [
            systemDate,
            `${location}%`
        ]
    );
};

const clearMainTable = async (
    connection,
    table,
    systemDate,
    location
) => {

    const sql = `
        DELETE FROM \`${table}\`
        WHERE SYSTEM_DATE = ?
        AND CLAIM_ID LIKE ?
    `;

    await connection.execute(
        sql,
        [
            systemDate,
            `${location}%`
        ]
    );
};


module.exports = {
    getUploadInfo,
    syncAllTableIds,
    clearValidatedTempData,
    markDataValid,
    removeFutureData,
    keepLatestTwoSnapshots,
    markDeletedRows,
    clearMainTable,
    copyTempToMain
};