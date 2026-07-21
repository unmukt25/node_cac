const findUserByUsername = async (connection, username) => {

    const sql = `
        SELECT
            user_id,
            username,
            password,
            full_name,
            role,
            is_active
        FROM users
        WHERE username = ?
        LIMIT 1
    `;

    const [rows] = await connection.execute(sql, [username]);

    return rows.length ? rows[0] : null;
};

module.exports = {
    findUserByUsername
};