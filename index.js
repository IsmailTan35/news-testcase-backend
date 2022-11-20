const express = require("./app_server/helper/express");
const apiController = require("./app_server/controller/apicontroller");
const mongoDB = require("./app_server/model/mongoDb");
const { httpServer } = require("./app_server/helper/helperProtocol");
const dotenv = require("dotenv").config({ path: __dirname + "/./.env" });

const app = express();

mongoDB();
apiController(app);
httpServer(app, 10000);
