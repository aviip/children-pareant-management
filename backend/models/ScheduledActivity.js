const mongoose = require("mongoose");
const { CONFIG } = require("../constants/config");

const ScheduledActivitySchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    childId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    activityIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Activity', 
        required: true,
    }],
    scheduledDate: {
        type: String, 
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('ScheduledActivity', ScheduledActivitySchema);



ScheduledActivitySchema.pre('save', async function (next) {
    try {
        const parent = await mongoose.model('user').findById(this.parentId);
        if (!parent || parent.accountType !== CONFIG.ACCOUNT_TYPE.PARENT) {
            const error = new Error('Scheduled activities must be associated with a parent account.');
            return next(error);
        }

        const child = await mongoose.model('user').findById(this.childId);
        if (!child || child.accountType !== CONFIG.ACCOUNT_TYPE.CHILD) {
            const error = new Error('Activities can only be associated with children accounts.');
            return next(error);
        }

        next();
    } catch (error) {
        return next(error);
    }
});


module.exports = mongoose.model("ScheduledActivity", ScheduledActivitySchema);
