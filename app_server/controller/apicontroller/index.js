const axios = require("axios");
const adminSchema = require("../../schema/admin.schema");
const login = require("./auth/login");
const register = require("./auth/register");
const finans = require("./finans");
const newsCreate = require("./news/news.create");
const newsDelete = require("./news/news.delete");
const newsGet = require("./news/news.get");
const newsPut = require("./news/news.put");
const helperVerify = require("../../helper/helperVerify");
const formidable = require("formidable");
const path = require("path");

function ApiController(app) {
  app.get("/finans", finans);

  app.post("/auth/login", login);
  app.post("/auth/register", register);
  app.post("/auth/check", helperVerify);
  app.post("/auth/check/jwt", async (req, res) => {
    const token = req.headers.authorization;
    try {
      const user = await adminSchema.findOne({ token: { $in: [token] } });
      if (!user) return res.status(404).json({});
      res.status(200).json({
        email: user.email,
        fullname: user.fullname,
        token: token,
      });
    } catch (error) {}
  });
  app.get("/allnews", newsGet);
  app.get("/news:id", newsGet);
  app.post("/news", helperVerify, newsCreate);
  app.put("/news", helperVerify, newsPut);
  app.delete("/news", helperVerify, newsDelete);

  app.get("/newspicture/:filename", (req, res) => {
    let rawPath = `app_server/uploads/newsPicture`;
    var options = {
      root: path.join(path.resolve(), `${rawPath}`),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };
    var fileName = req.params.filename;
    res.sendFile(fileName, options);
  });

  app.get("/", function (req, res) {
    res.send("İsmail Tan");
  });
}

module.exports = ApiController;
