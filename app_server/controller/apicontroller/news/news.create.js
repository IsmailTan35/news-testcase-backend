const formidable = require("formidable");
const adminSchema = require("../../../schema/admin.schema");
const _newsSchema = require("../../../schema/news.schema");
const _newsSchema2 = require("../../../schema/news.schema");

const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "server not found" });
      const { title, content } = fields;
      if (!title || !content || !token) return res.status(400).json("18");
      const user = await adminSchema.aggregate([
        {
          $match: {
            token: { $in: [token] },
          },
        },
      ]);

      if (user.length == 0) return res.sendStatus(401);

      const newsSchema = new _newsSchema({
        title: title,
        content: content,
      });

      if (files && files.newsPicture && files.newsPicture.filepath) {
        try {
          let oldPath = files.newsPicture.filepath;
          let newFileName = `${newsSchema._id.toString()}.png`;
          let rawPath = `app_server/uploads/newsPicture`;
          let newPath = path.join(path.resolve(), rawPath, newFileName);
          let rawData = fs.readFileSync(oldPath);
          const res = await fs.writeFile(newPath, rawData, () => {});
          newsSchema.newsPicture = newFileName;
        } catch (error) {
          if (error) console.error(error);
          newsSchema.newsPicture = "";
        }
      }

      const ress = await newsSchema.save();
      const resArr = await _newsSchema2.find({ new: true });

      if (!newsSchema) return res.status(401).json(55);
      res.status(200).json(resArr);
    });
  } catch (error) {
    console.error(error);
    res.status(404);
  }
};
