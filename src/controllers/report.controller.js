const reportService = require("../services/report.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const displayData = asyncHandler(async (req, res) => {

    const result = await reportService.displayData(req.body);

    return ApiResponse.success(
        res,
        "Data fetched successfully",
        result
    );
});

module.exports = {
    displayData
};