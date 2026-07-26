const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        user: req.user || null,
        ip: req.ip
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;