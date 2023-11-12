const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide user name"],
    },
    email: {
      type: String,
      required: [true, "Please provide user email address"],
      unique: [true, "Email address already exist!"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
