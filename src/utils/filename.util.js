const path = require("path");
const MODULES = require("../constants/fileModules");

const parseFilename = (filename) => {

    const extension = path.extname(filename).toLowerCase();

    const name = path.basename(filename, extension);

    const parts = name.split("_");

    if (parts.length !== 4) {
        throw new Error("Invalid filename format.");
    }

    const [dateString, moduleName, location, source] = parts;

    if (!MODULES[moduleName]) {
        throw new Error(`Unknown module '${moduleName}'.`);
    }

    const day = dateString.substring(0,2);
    const month = dateString.substring(2,4);
    const year = dateString.substring(4,8);

    return {

        originalName: filename,

        uploadDate: `${year}-${month}-${day}`,

        module: moduleName,

        location,

        source,

        extension,

        table: MODULES[moduleName].table,

        tempTable: MODULES[moduleName].tempTable

    };

};

module.exports = {
    parseFilename
};