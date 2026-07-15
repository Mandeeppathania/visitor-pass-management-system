const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

   role:{
   type:String,
   enum:["admin","employee","security"],
   default:"employee"
},

    phone: {
        type: String
    },

    department: {
        type: String,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);