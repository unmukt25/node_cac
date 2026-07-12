const fs = require("fs");
const csv = require("csv-parser");

const filenameUtil = require("../utils/filename.util");
const tempDataRepository = require("../repositories/tempData.repository");

const importCsv = async (file) => {

    // 1. Parse filename
    const fileInfo = filenameUtil.parseFilename(file.originalname);

    // 2. Validate CSV Header
    await validateHeader(file.path, fileInfo);

    // 3. Parse CSV
    const rows = await parseCsv(file.path, fileInfo);

    // 4. Batch Insert into Temp Table
    await tempDataRepository.batchInsert(
        fileInfo.tempTable,
        fileInfo.headers,
        rows
    );

    return {
        module: fileInfo.module,
        totalRecords: rows.length
    };
};

const validateHeader = (filePath, fileInfo) => {

    return new Promise((resolve, reject) => {

        const headers = [];

        fs.createReadStream(filePath)
            .pipe(csv())

            .on("headers", (header) => {

                headers.push(...header);

                // patch same as PHP
                headers[0] = fileInfo.headers[0];

                if (JSON.stringify(headers) !== JSON.stringify(fileInfo.headers)) {
                    return reject(
                        new Error(`Invalid header in ${fileInfo.module}`)
                    );
                }

                resolve();
            })

            .on("error", reject);

    });

};

const parseCsv = async (filePath, fileInfo) => {
        return [];
};

module.exports = {
    importCsv
};