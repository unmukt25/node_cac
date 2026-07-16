const processRepository = require("../repositories/process.repository");

const processImport = async (connection, fileInfo) => {

    const uploadInfo = await processRepository.getUploadInfo(
        connection,
        fileInfo.tempTable
    );

    if (!uploadInfo) {
        return;
    }

    await processRepository.syncAllTableIds(
        connection,
        fileInfo,
        uploadInfo
    );

    await processRepository.clearValidatedTempData(
        connection,
        fileInfo,
        uploadInfo
    );

    await processRepository.markDataValid(
        connection,
        fileInfo,
        uploadInfo
    );

    await processRepository.removeFutureData(
        connection,
        fileInfo,
        uploadInfo
    );

    // console.log(uploadInfo);
    // Next steps will be added one by one
};

module.exports = {
    processImport
};