const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactPhone : {
        type: String,
        required: true,
    },
    contactWhatsApp : {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Profile", ProfileSchema);
