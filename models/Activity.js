const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true },
  capacity: { type: Number, require: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "profile" }],
  address: { type: String, required: true },
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true },
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
