const db = require("../config/database");
const AppError = require("../utils/AppError");

const reportRepository = require("../repositories/report.repository");
const fileModules = require("../constants/fileModules");

const displayData = async (requestData) => {

    const connection = await db.getConnection();

    try {

        const { date, location, module } = requestData;


        const fileInfo = fileModules[module];

        if (!fileInfo) {
            throw new AppError("Invalid module", 400);
        }

        const result = await reportRepository.getDisplayData(
            connection,
            fileInfo.table,
            date,
            location
        );

        return result;

    } finally {
        connection.release();
    }

};

module.exports = {
    displayData
};