const mongoose = require("mongoose");

//Schema

module.exports = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Required field"],
    },
    password: {
      type: String,
      required: [true, "Required field"],
      minlength: [5, "Minimum 5 character should be there in password"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Required field"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Phone number should be 10 digits",
      },
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
