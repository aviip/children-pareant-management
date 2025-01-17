// Import the required modules
const express = require("express")
const router = express.Router();
const Joi = require('joi');
const validateWith = require('../middleware/validation')

// Import the required controllers and middleware functions
const {
    login,
    signup,
    sendotp,
    changePassword,
    profile,
    joinParent
} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPassword")

const { auth } = require("../middleware/auth")

endpoint = {
    LOG_IN: "/login",
    SIGN_UP: "/signup",
    SEND_OTP: "/sendotp",
    JOIN_PARENT : "/join-parent",
    CHANGE_PASSWORD: "/changepassword",
    RESET_PASSWORD_TOKEN: "/reset-password-token",
    RESET_PASSWORD: "/reset-password",
}


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// Route for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
    platform: Joi.string().required().messages({
        'any.required': 'Platform is required',
    }),
});
const validateLoginRequest = (req, res, next) => {
    // Validate the request body against the schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    // If there's an error, return a 400 response with the error details
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({
            success: false,
            errors: errorMessages,
        });
    }

    // Continue if validation is successful
    next();
};
router.post(endpoint.LOG_IN,validateLoginRequest,login)




// Route for user signup
const signupSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Confirm password is required',
        'any.only': 'Confirm password must match password',
    }),
    platform: Joi.string().required().messages({
        'any.required': 'Platform is required',
    }),
    accountType: Joi.string().required().messages({
        'any.required': 'Account type is required',
    }),
}).unknown();

const validateSignUpRequest = (req, res, next) => {
    // Validate the request body against the schema
    console.log(req.body)
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    // If there's an error, return a 403 response with the error details
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(403).json({
            success: false,
            errors: errorMessages,
        });
    }
    next();
};
router.post(endpoint.SIGN_UP,validateSignUpRequest, signup);


// Route for the children Joining to the parent

const joinParentSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
    }),
    parentUniqueCode: Joi.string().required().messages({
        'any.required': 'Parent unique code is required',
    }),
    platform: Joi.string().required().messages({
        'any.required': 'Platform is required',
    })
});

const validateJoinParentRequest = (req, res, next) => {
    // Validate the request body against the schema
    const { error } = joinParentSchema.validate(req.body, { abortEarly: false });

    // If there's an error, return a 400 response with the error details
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({
            success: false,
            errors: errorMessages,
        });
    }

    // Continue if validation is successful
    next();
};

router.post(endpoint.JOIN_PARENT,validateJoinParentRequest,joinParent);




// Route for Changing the password
router.post(endpoint.CHANGE_PASSWORD, auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post(endpoint.RESET_PASSWORD_TOKEN, resetPasswordToken)

// Route for resetting user's password after verification
router.post(endpoint.RESET_PASSWORD, resetPassword)

// Export the router for use in the main application
module.exports = router