const express = require("express");

const router = express.Router();

const reportController = require("../controllers/report.controller");
const authenticate = require("../middlewares/auth.middleware");

router.post(
    "/display",
    authenticate,
    reportController.displayData
);

module.exports = router;