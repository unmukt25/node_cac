const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const login = asyncHandler(async (req, res) => {

    // console.log("req-body:",req.body);

    const { username, password } = req.body;
    
    const result = await authService.login(
        username,
        password
    );

    return ApiResponse.success(
        res,
        "Login successful",
        result
    );
});

const signup = asyncHandler(async (req, res)=>{
       
        const { username, password, fullName, role, isActive } = req.body;

        const userdata = {username,password,fullName,role,isActive};

        const result = await authService.signup(userdata);

        return ApiResponse.success(
        res,
        "user creation successful",
        result
    );
});

module.exports = {
    login,
    signup
};