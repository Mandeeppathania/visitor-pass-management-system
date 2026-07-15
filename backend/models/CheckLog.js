const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema(
{
    pass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pass",
        required: true
    },

    checkIn: {
        type: Date
    },

    checkOut: {
        type: Date
    },

    checkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("CheckLog", checkLogSchema);