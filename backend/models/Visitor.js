const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    photo: {
        type: String
    },

    company: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Visitor", visitorSchema);