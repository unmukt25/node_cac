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

const createUser = async (connection, user) => {

    const sql = `
        INSERT INTO users
        (
            username,
            password,
            full_name,
            role,
            is_active
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(sql, [
        user.username,
        user.password,
        user.fullName,
        user.role,
        user.isActive
    ]);

    return result.insertId;
};

module.exports = {
    findUserByUsername,
    createUser
};