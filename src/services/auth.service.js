const bcrypt = require("bcrypt");
const db = require("../config/database");

const authRepository = require("../repositories/auth.repository");
const { generateToken } = require("../utils/jwt.util");
const AppError = require("../utils/AppError");

const login = async (username, password) => {

    const connection = await db.getConnection();

    try {

        const user = await authRepository.findUserByUsername(
            connection,
            username
        );

        if (!user) {
             throw new AppError("Invalid username or password", 401);
        }

        if (!user.is_active) {
             throw new AppError("User account is disabled", 403);
        }

        const matched = await bcrypt.compare(
            password,
            user.password
        );

        if (!matched) {
             throw new AppError("Invalid username or password", 401);
        }

        const token = generateToken(user);

        return {
            token,
            user: {
                userId: user.user_id,
                username: user.username,
                fullName: user.full_name,
                role: user.role
            }
        };

    } finally {
        connection.release();
    }
};

module.exports = {
    login
};