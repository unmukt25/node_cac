const csvService = require("./csv.service");
const fileUtil = require("../utils/file.util");

const upload = async (files) => {

    if (!files || files.length === 0) {
        throw new Error("Please select one or more CSV files.");
    }

    const uploaded = [];

    try {

        for (const file of files) {

            const result = await csvService.importCsv(file);

            uploaded.push(result);

        }

        return {
            message: "Files uploaded successfully.",
            data: uploaded
        };

    } catch (error) {

        // Delete every uploaded file
        for (const file of files) {
            fileUtil.deleteFile(file.path);
        }

        throw error;
    }
}

module.exports = {
    upload
};