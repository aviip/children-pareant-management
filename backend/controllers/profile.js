const { cloudinaryConnect } = require("../config/cloudinary");
const User = require("../models/User")
const { errorFunction } = require('../utils/errorFunction')
const _ = require('lodash');



exports.profile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("🚀 ~ exports.profile= ~ userId:", userId)

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

exports.updateProfilePicture = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "You are not authenticated, please log in!",
        });
      }
  
      const UserProfile = await User.findById(userId).populate(
        "additionalDetails"
      );
  
      if (!req.files || !req.files.image) {
        return res.status(400).send("No file uploaded");
      }
  
      const imageFile = req.files.image;
  
      const cloudinary = cloudinaryConnect();
  
      cloudinary.uploader.upload(
        imageFile.tempFilePath,
        async (error, result) => {
          if (error) {
            return res.status(500).send(error);
          }
  
          UserProfile.image = result.secure_url;
          await UserProfile.save();
  
          res.status(200).json({
            success: true,
            data: UserProfile,
            imageUrl: result.secure_url,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the user profile",
        error: error.message,
      });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json(
                errorFunction(false, "You are not authenticated, please log in!")
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json(
                errorFunction(false, "User not found!")
            );
        }

        if (user.image) {
            const cloudinary = cloudinaryConnect();
            const publicId = user.image.split('/').pop().split('.')[0];

            cloudinary.uploader.destroy(publicId, async (error, result) => {
                if (error) {
                    console.error("Error deleting image from Cloudinary:", error);
                }

                await User.findByIdAndDelete(userId);

                return res.status(200).json({
                    success: true,
                    message: "Your account has been deleted successfully."
                });
            });
        } else {
            await User.findByIdAndDelete(userId);

            return res.status(200).json({
                success: true,
                message: "Your account has been deleted successfully."
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the user profile",
            error: error.message,
        });
    }
};
