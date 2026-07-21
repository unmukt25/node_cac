const express = require("express");

const uploadRoutes = require("./upload.routes");
const reportRoutes = require("./report.routes");
const downloadRoutes = require("./download.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

// Health Check
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CAC API v1 "
    });
});

// Feature Routes
router.use("/upload", uploadRoutes);
// router.use("/report", reportRoutes);
// router.use("/download", downloadRoutes);
router.use("/auth", authRoutes);

module.exports = router;