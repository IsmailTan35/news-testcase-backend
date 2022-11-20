const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  newsPicture: {
    type: String,
    require: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("news", newsSchema);
