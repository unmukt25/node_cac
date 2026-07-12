const express = require("express");

const router = express.Router();

// Health Check
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CAC API v1 "
    });
});

// Feature Routes
router.use("/upload", require("./upload.routes"));

module.exports = router;