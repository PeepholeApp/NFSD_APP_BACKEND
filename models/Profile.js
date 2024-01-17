const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String, require: true, maxlenght: 15 },
  last_name: { type: String, require: false },
  dob: { type: Date, require: false },
  nationality: { type: String, require: true },
  gender: { type: String, require: true },
  languages: { type: Array, require: true },
  // photo: { type: [Array], require: true },
  // bio: { type: String, require: true, maxlenght: 150 },
  // interest: { type: [Array], require: true },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
