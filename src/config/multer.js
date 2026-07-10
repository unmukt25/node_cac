const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "storage/uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".csv") {
        return cb(new Error(`${file.originalname} is not a CSV file.`));
    }

    cb(null, true);
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        files: 20,                 // Maximum 20 files
        fileSize: 100 * 1024 * 1024 // 100 MB per file
    }
});