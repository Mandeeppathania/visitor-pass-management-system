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

    // Reason if appointment is rejected
    remarks: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);