const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, require: true, maxlenght: 15 },
    last_name: { type: String, require: false },
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "premium", "user"],
      default: "user",
    },
    pushToken: {
      type: String,
    },
  },
  { timeseries: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
