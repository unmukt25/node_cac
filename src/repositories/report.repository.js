const getDisplayData = async (
    connection,
    table,
    systemDate,
    location
) => {

    const sql = `
        SELECT *
        FROM \`${table}\`
        WHERE SYSTEM_DATE = ?
        AND CLAIM_ID LIKE ?
        ORDER BY CLAIM_ID
    `;

    const [rows] = await connection.execute(
        sql,
        [
            systemDate,
            `${location}%`
        ]
    );

    return rows;
};

module.exports = {
    getDisplayData
};