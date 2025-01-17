const mongoose = require("mongoose");
const {CONFIG} = require('../constants/config')


const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
});


module.exports = mongoose.model("Profile", profileSchema);