const upload = async (files) => {

    if (!files || files.length === 0) {
        const err = new Error("Please select one or more CSV files.");
        err.statusCode = 400;
        throw err;
    }

    const uploadedFiles = files.map(file => ({
        originalName: file.originalname,
        storedName: file.filename,
        path: file.path,
        size: file.size
    }));

    return {
        message: `${uploadedFiles.length} file(s) uploaded successfully.`,
        data: uploadedFiles
    };
};

module.exports = {
    upload
};