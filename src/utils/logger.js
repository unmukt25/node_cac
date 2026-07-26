const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDir = path.join(__dirname, "../../storage/logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const date = new Date().toISOString().split("T")[0];

const customFormat = winston.format.printf((info) => {

    return `
======================================================================
TIMESTAMP : ${info.timestamp}
LEVEL     : ${info.level.toUpperCase()}
MESSAGE   : ${info.message}
REQUEST   : ${info.method} ${info.url}
CLIENT IP : ${info.ip}
USER      : ${info.user ? JSON.stringify(info.user) : "null"}

BODY:
${JSON.stringify(info.body, null, 2)}

STACK TRACE:
${info.stack || "N/A"}

======================================================================

`;
});

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, `error-${date}.log`)
        })
    ]
});

module.exports = logger;