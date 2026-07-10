const asyncHandler = require("../utils/asyncHandler");
const response = require("../utils/apiResponse");
const uploadService = require("../services/upload.service");

exports.uploadFiles = asyncHandler(async (req, res) => {

    const result = await uploadService.upload(req.files);

    return response.success(
        res,
        result.message,
        result.data
    );

});