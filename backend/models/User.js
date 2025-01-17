const { required } = require('joi');
const mongoose = require('mongoose');

// Function to generate a random unique code
const generateUniqueId = require('generate-unique-id');


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        accountType: {
            type: String,
            enum: ["Parent", "Child"],
            required: true,
        },
        email: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    // If accountType is "Parent", then email is required
                    return this.accountType !== 'Parent' || (value && value.trim().length > 0);
                },
                message: 'Email is required for Parent account type',
            },
        },
        password: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    // If accountType is "Parent", then email is required
                    return this.accountType !== 'Parent' || (value && value.trim().length > 0);
                },
                message: 'Email is required for Parent account type',
            },
        },
        active: {
            type: Boolean,
            default: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
        },
        platform: {
            type: String,
            enum: ["web", "android", "ios"],
            required: true
        },
        uniqueCode: {
            type: String,
            sparse: true,
        },
        parentAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        age: {
            type: String
        }
    },
    { timestamps: true }
)

UserSchema.pre('save', async function (next) {
    if (this.accountType === "Parent" && !this.uniqueCode) {
        this.uniqueCode = generateUniqueId({
            length: 7
        });
    }
    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;