const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

function Express() {
  const app = express();

  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  // app.listen(10000, () => console.log("Express Server Started"));

  return app;
}

module.exports = Express;
