const express = require("./express");
const apiController = require("./app_server/controller/apicontroller");
const app = express();

apiController(app);
