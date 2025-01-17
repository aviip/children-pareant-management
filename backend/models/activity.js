const mongoose = require("mongoose");
const { CONFIG } = require("../constants/config");

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    benefits: {
        type: String,
        trim: true,
    },
    timings: {
        type: String,
        trim: true,
    },
    reward: {
        type: Number,
        default: 0,
    },
    activityDate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    competitiveSpirit: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    enjoymentLevel: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    challengeAcceptance: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    taskCompletion: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Activity", ActivitySchema);
