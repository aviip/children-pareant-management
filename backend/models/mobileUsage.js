const mongoose = require("mongoose");
const { CONFIG } = require('../constants/config');

const moblieUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    weeklyUsage: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0], // Default to zero usage for each day of the week
    },
    coinsGenerated: {
        type: Number,
        default: 0,
    },
    continuousUsageLimit: {
        type: String,
        default: "60 minutes"// Keeping as a string to store units (e.g., "60 minutes")
    },
    dailyAverageLimit: {
        type: String,
        default: "4 hours" // For storing values like "4 hours" or other units
    },
    modelPrediction: {
        type: String, // For predicted usage with units (e.g., "3.5 hours")
        default: "3.5 hours"
    },
}, { timestamps: true });

module.exports = mongoose.model("MobileUsage", moblieUsageSchema);
