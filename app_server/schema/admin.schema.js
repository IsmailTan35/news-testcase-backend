const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  token: Array,
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("newsadmin", userSchema);
