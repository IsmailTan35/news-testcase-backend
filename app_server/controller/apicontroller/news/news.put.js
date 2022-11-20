const formidable = require("formidable");
const adminSchema = require("../../../schema/admin.schema");
const newsSchema = require("../../../schema/news.schema");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "server not found" });
      const { id, title, content } = fields;
      if (!title || !content || !token) return res.status(400).json("18");
      const user = await adminSchema.aggregate([
        {
          $match: {
            token: { $in: [token] },
          },
        },
      ]);

      if (user.length == 0) return res.sendStatus(401);

      let newsUpdate = {
        title: title,
        content: content,
        timestamps: new Date(),
      };

      if (files && files.newsPicture && files.newsPicture.filepath) {
        try {
          let oldPath = files.newsPicture.filepath;
          let newFileName = `${newsUpdate._id.toString()}.png`;
          let rawPath = `app_server/uploads/newsPicture`;
          let newPath = path.join(path.resolve(), rawPath, newFileName);
          let rawData = fs.readFileSync(oldPath);
          const res = await fs.writeFile(newPath, rawData, () => {});
          newsUpdate.newsPicture = newFileName;
        } catch (error) {
          if (error) console.error(error);
          newsUpdate.newsPicture = null;
        }
      }

      await newsSchema.findOneAndUpdate({ _id: id }, newsUpdate);

      if (!newsSchema) return res.status(401).json(55);

      const newArr = await newsSchema.find({});
      res.status(200).json(newArr);
    });
  } catch (error) {
    console.error(error);
    res.status(404);
  }
};
