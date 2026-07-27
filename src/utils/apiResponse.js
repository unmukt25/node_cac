const success = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        "Length":data.length,
        data
    });
};

const error = (res, message, statusCode = 400, errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};

module.exports = {
    success,
    error
};