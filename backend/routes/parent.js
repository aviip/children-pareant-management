const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {
  addChildUnderMe,
  GetChildrenMobileUsage,
  UpdateOrCreateInterest,
  GetInterestDataForChild,
  SetDailyScheduledActivity,
  GetScheduledActivities,
  createActivities,
  updateActivity,
  GetAllChildrenData,
  GetUsageReport,
  UpdateContinuousUsageLimit,
  RecordUsageData,
} = require("../controllers/parent");
const { isParent } = require("../middleware/auth");

const endpoints = {
  ADD_CHILD: "/add-child",
  GET_MOBILE_USAGE: "/mobile-usage",
  INSERT_UPDATE_CHILDREN_INTEREST: "/child/interest",
  GET_CHILD_INTEREST: "/child/get/interest",
  CREATE_ACTIVITY: "/create/activities",
  SCHEDULE_ACTIVITY: "/schedule/activity",
  UPDATE_ACTIVITY: "/update/activity/:activityId",
  GET_CHILDREN: "/child/get/children",
  GET_USAGE_REPORT: "/mobile-usage/report",
  UPDATE_USAGE_LIMIT: "/mobile-usage/limit",
  RECORD_USAGE: "/mobile-usage/record",
};

const JoinUnderMeSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
  }),
  age: Joi.number().integer().min(0).required().messages({
    "any.required": "Age is required",
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 0",
  }),
  platform: Joi.string().required().messages({
    "any.required": "Platform is required",
  }),
});

const validateJoinUnderMe = (req, res, next) => {
  // Validate the request body against the schema
  const { error } = JoinUnderMeSchema.validate(req.body, { abortEarly: false });

  // If there's an error, return a 400 response with the error details
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages,
    });
  }

  // Continue if validation is successful
  next();
};

const UsageLimitSchema = Joi.object({
  childId: Joi.string().required().messages({
    "any.required": "Child ID is required",
  }),
  limit: Joi.string()
    .pattern(/^\d+\s+(minutes?|hours?)$/)
    .required()
    .messages({
      "any.required": "Usage limit is required",
      "string.pattern.base":
        'Limit must be in format like "60 minutes" or "2 hours"',
    }),
});
const validateUsageLimit = (req, res, next) => {
  const { error } = UsageLimitSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages,
    });
  }
  next();
};

/*
url : localhost:4000/api/v1/parent/add-child
 */
router.post(
  endpoints.ADD_CHILD,
  isParent,
  validateJoinUnderMe,
  addChildUnderMe
);

/*
url : localhost:4000/api/v1/parent/mobile-usage
 */
router.get(endpoints.GET_MOBILE_USAGE, isParent, GetChildrenMobileUsage);

/*
url : localhost:4000/api/v1/parent/child/interest
 */
router.post(
  endpoints.INSERT_UPDATE_CHILDREN_INTEREST,
  isParent,
  UpdateOrCreateInterest
);

/*
url : localhost:4000/api/v1/parent/child/get/interest?childrenId=672df6b26045c53f2271c587
 */
router.get(endpoints.GET_CHILD_INTEREST, isParent, GetInterestDataForChild);

// url : localhost:4000/api/v1/parent/child/get/children
router.get(endpoints.GET_CHILDREN, isParent, GetAllChildrenData);

// url : localhost:4000/api/v1/parent/mobile-usage/report
router.get(endpoints.GET_USAGE_REPORT, isParent, GetUsageReport);

// url : localhost:4000/api/v1/parent/mobile-usage/limit
router.put(
  endpoints.UPDATE_USAGE_LIMIT,
  isParent,
  validateUsageLimit,
  UpdateContinuousUsageLimit
);

// url : localhost:4000/api/v1/parent/mobile-usage/record
router.post(endpoints.RECORD_USAGE, isParent, RecordUsageData);

/*
used for the creation of the activities for children - Done
url : localhost:4000/api/v1/parent/create/activity
*/
router.post(endpoints.CREATE_ACTIVITY, isParent, createActivities);

/*
set the daily scheduled activity - Done
url : localhost:4000/api/v1/parent/schedule/activity
*/
router.post(endpoints.SCHEDULE_ACTIVITY, isParent, SetDailyScheduledActivity);

/*
show the daily scheduled activity - Done
url : localhost:4000/api/v1/parent/schedule/activity
*/
router.get(endpoints.SCHEDULE_ACTIVITY, isParent, GetScheduledActivities);

/*
give the activity feedback or update the activity
url : localhost:4000/api/v1/parent/update/activity
*/
router.put(endpoints.UPDATE_ACTIVITY, isParent, updateActivity);

module.exports = router;
