const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
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

    purpose: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Appointment", appointmentSchema);