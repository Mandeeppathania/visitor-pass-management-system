const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
{
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },

    passNumber: {
        type: String,
        required: true,
        unique: true
    },

    qrCode: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "expired"],
        default: "active"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Pass", passSchema);