const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
        required: true
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    visitDate: {
        type: Date,
        required: true
    },

    visitTime: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    remarks: {
    type: String,
    trim: true
}

}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);