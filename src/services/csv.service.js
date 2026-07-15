const fs = require("fs");
const csv = require("csv-parser");
const filenameUtil = require("../utils/filename.util");
const tempDataRepository = require("../repositories/tempData.repository");
const { formatDate } = require("../utils/date.util");


const importCsv = async (file) => {

    // 1. Parse filename
    const fileInfo = filenameUtil.parseFilename(file.originalname);

    // 2. Validate CSV Header
    await validateHeader(file.path, fileInfo);

    // logic to change  "TO_CHAR(SYSDATE,'DD/MM/YYYY')", to   "SYSTEM_DATE"
    const dbFileInfo = {
        ...fileInfo,
        headers: [...fileInfo.headers],
        dateColumns: [...fileInfo.dateColumns]
    };

    dbFileInfo.headers[31] = "SYSTEM_DATE";

    // 3. Parse CSV
    const rows = await parseCsv(file.path, dbFileInfo);


    // 4. Batch Insert into Temp Table
    await tempDataRepository.batchInsert(
        dbFileInfo.tempTable,
        rows
    );

    return {
        module: fileInfo.module,
        originalName: file.originalname,
        totalRecords: rows.length
    };
};

const validateHeader = (filePath, fileInfo) => {

    return new Promise((resolve, reject) => {

        let validated = false;

        fs.createReadStream(filePath)
            .pipe(csv())

            .on("headers", (headers) => {

                // Patch like PHP
                // headers[0] = fileInfo.headers[0];

                if (headers.length !== fileInfo.expectedColumns) {
                    return reject(
                        new Error(
                            `${fileInfo.module}: (${headers.length}) Invalid number of columns.`
                        )
                    );
                }

                if (JSON.stringify(headers) !== JSON.stringify(fileInfo.headers)) {
                    return reject(
                        new Error(
                            `${fileInfo.module}: Header does not match expected format.`
                        )
                    );
                }

                validated = true;

                resolve();
            })

            .on("error", reject)

            .on("end", () => {

                if (!validated) {
                    reject(new Error("Unable to read CSV header."));
                }

            });

    });

};


const parseCsv = (filePath, fileInfo) => {

    return new Promise((resolve, reject) => {

        const rows = [];

        fs.createReadStream(filePath)
            .pipe(
                csv({
                    headers: false,
                    skipLines: 1
                })
            )

            .on("data", (data) => {

                // Convert object received from csv-parser into array
                const values = Object.values(data);

                // Validate column count
                if (values.length !== fileInfo.expectedColumns) {
                    return reject(
                        new Error(
                            `${fileInfo.module}: Invalid column count.`
                        )
                    );
                }

                // Convert date columns
                for (const index of fileInfo.dateColumns) {

                    values[index] = formatDate(values[index]);

                }

                // Convert array into object using headers
                const row = {};

                fileInfo.headers.forEach((header, index) => {

                    row[header] = values[index];

                });

                rows.push(row);

            })

            .on("end", () => {

                resolve(rows);

            })

            .on("error", reject);

    });

};

module.exports = {
    importCsv
};