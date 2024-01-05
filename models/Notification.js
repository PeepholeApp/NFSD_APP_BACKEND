const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  id: { type: String, unique: true, require: true },
  status: { type: Boolean, default: false, require: true },
  header: { type: String, require: true },
  content: { type: String, require: true },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
