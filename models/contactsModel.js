const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plase provide contact name"],
    },
    email: {
      type: String,
      required: [true, "Plase provide contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Plase provide contact phone number"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conacts", contactSchema);
