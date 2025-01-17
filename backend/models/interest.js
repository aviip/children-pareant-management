const mongoose = require("mongoose");
const {CONFIG} = require('../constants/config')


const InterestSchema = new mongoose.Schema({
    personalityTraits: {
        type: String,
        trim: true,
    },
    hobbies: {
        type: String,
        trim: true,
    },
    likes: {
        type: String,
        trim: true,
    },
    dislikes: {
        type: String,
        trim: true,
    },
    strengths: {
        type: String,
        trim: true,
    },
    weaknesses: {
        type: String,
        trim: true,
    },
    freeTimeActivities: {
        type: String,
        trim: true,
    },
    favoriteSubjects: {
        type: String,
        trim: true,
    },
    schoolTimings: {
        type: String,
        trim: true,
    },
    examDates: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {
    timestamps: true,
});


InterestSchema.pre('save', async function (next) {
    const user = await mongoose.model('user').findById(this.userId);
    if (!user || user.accountType !== CONFIG.ACCOUNT_TYPE.CHILD) {
        const error = new Error('Invalid user reference: user must be of type "children"');
        return next(error);
    }
    next();
});

module.exports = mongoose.model("interest", InterestSchema);
