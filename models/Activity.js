const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true },
  available: { type: Boolean, require: true, default: true },
  participants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    require: true,
  },
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
