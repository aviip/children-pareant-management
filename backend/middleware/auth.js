// Importing required modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { CONFIG } = require("../constants/config");

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  try {
    // Extracting JWT from request cookies, body or header

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    console.log("this is cookie", req.cookies);

    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      const decode = await jwt.verify(token, CONFIG.JWT.TOKEN);

      console.log(decode);

      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;
    } catch (error) {
      // If JWT verification fails, return 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (error) {
    // If there is an error during the authentication process, return 401 Unauthorized response
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

exports.isParent = async (req, res, next) => {
  try {
    console.log({ email: req.user.email });

    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== CONFIG.ACCOUNT_TYPE.PARENT) {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Parent",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
