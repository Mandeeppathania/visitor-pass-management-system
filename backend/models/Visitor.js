const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
{
    name: {
    type: String,
    required: true,
    trim: true
},

    email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
},

    phone: {
        type: String,
        required: true,
        trim: true
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