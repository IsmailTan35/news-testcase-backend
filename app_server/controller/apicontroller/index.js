const axios = require("axios");
const login = require("./auth/login");
const register = require("./auth/register");
const finans = require("./finans");
const newsCreate = require("./news/news.create");
const newsDelete = require("./news/news.delete");
const newsGet = require("./news/news.get");
const newsPut = require("./news/news.put");

function ApiController(app) {
  app.get("/finans", finans);

  app.post("/auth/login", login);
  app.post("/auth/register", register);

  app.get("/news:id", newsGet);
  app.post("/news", newsCreate);
  app.put("/news", newsPut);
  app.delete("/news:id", newsDelete);

  app.get("/", function (req, res) {
    res.send("İsmail Tan");
  });
}

module.exports = ApiController;
