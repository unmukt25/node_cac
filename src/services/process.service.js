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


    const snapshotInfo =
        await processRepository.keepLatestTwoSnapshots(
            connection,
            fileInfo.table,
            uploadInfo.location
        );


    // Same behaviour as PHP:
    // if only one snapshot exists, stop here
    if (!snapshotInfo.hasTwoSnapshots) {
        return;
    }


    await processRepository.markDeletedRows(
        connection,
        fileInfo.table,
        uploadInfo.location,
        snapshotInfo.latestDate,
        snapshotInfo.previousDate
    );


    await processRepository.clearMainTable(
        connection,
        fileInfo.table,
        uploadInfo.systemDate,
        uploadInfo.location
    );


    await processRepository.copyTempToMain(
        connection,
        fileInfo.table,
        uploadInfo.systemDate,
        uploadInfo.location
    );

    // console.log(uploadInfo);
    // Next steps will be added one by one
};

module.exports = {
    processImport
};