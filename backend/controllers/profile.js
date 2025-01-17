const User = require("../models/User")
const { errorFunction } = require('../utils/errorFunction')
const _ = require('lodash');



exports.profile = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log("this is from the auth user", req.user);

        if (!userId) {
            return res.status(401).json(
                errorFunction(false, "You are not authenticated first Log In!")
            )
        }

        const UserProfile = await User.findById(userId).populate('additionalDetails');

        const userProfileObject = UserProfile.toObject();

        const updatedUserProfile = _.omit(userProfileObject, 'password');

        console.log("This is user profile", updatedUserProfile);


        return res.status(200).json({
            success: true,
            data: updatedUserProfile
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json(
            errorFunction(false, "An error occurred while fetching the user Profile", error.message)
        );
    }
}