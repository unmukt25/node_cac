const path = require("path");
const FILE_MODULES = require("../constants/fileModules");

const parseFilename = (filename) => {

    const extension = path.extname(filename).toLowerCase();

    const name = path.basename(filename, extension);

    // Expected:
    // ddmmyyyy_MODULE_LOCATION_SOURCE.csv

    const parts = name.split("_");

    if (parts.length !== 4) {
        throw new Error(
            "Invalid filename format. Expected: ddmmyyyy_MODULE_LOCATION_SOURCE.csv"
        );
    }

    const [dateString, moduleName, location, source] = parts;

    // Validate date
    if (!/^\d{8}$/.test(dateString)) {
        throw new Error("Invalid date in filename.");
    }

    // Validate module
    if (!FILE_MODULES[moduleName]) {
        throw new Error(`Unknown module '${moduleName}'.`);
    }

    // Validate location
    if (!location) {
        throw new Error("Location is missing in filename.");
    }

    // Validate source
    if (!source) {
        throw new Error("Source is missing in filename.");
    }

    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);

    return {
        originalName: filename,
        uploadDate: `${year}-${month}-${day}`,
        module: moduleName,
        location,
        source,
        extension,
        ...FILE_MODULES[moduleName]
    };
};

module.exports = {
    parseFilename
};