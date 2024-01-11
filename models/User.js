const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
  },
  { timeseries: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
