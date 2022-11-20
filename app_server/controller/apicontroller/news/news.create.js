const formidable = require("../../../helper/helperFormidable");
const adminSchema = require("../../../schema/admin.schema");
const _newsSchema = require("../../../schema/news.schema");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "server not found" });
      console.log(0);

      const { title, content } = fields;
      console.log(title, content);
      if (!title || !content || !token) return res.status(400).json("18");

      const user = await adminSchema.aggregate([
        {
          $match: {
            token: { $in: [token] },
          },
        },
      ]);

      if (user.length == 0) return res.sendStatus(401);
      console.log(1);

      const newsSchema = new _newsSchema({
        title: title,
        content: content,
      });
      console.log(2);
      if (files && files.newsPicture && files.newsPicture.filepath) {
        try {
          let oldPath = files.newsPicture.filepath;
          let newFileName = `${newsSchema._id.toString()}.png`;
          let rawPath = `app_server/uploads/server`;
          let newPath = path.join(path.resolve(), rawPath, newFileName);
          let rawData = fs.readFileSync(oldPath);
          const res = await fs.writeFile(newPath, rawData, () => {});
          newsSchema.newsPicture = newFileName;
        } catch (error) {
          if (error) console.error(error);
          newsSchema.newsPicture = "";
        }
      }

      await newsSchema.save(err => {
        if (!err) return;
        console.err(err);
      });

      if (!newsSchema) return res.status(401).json(55);

      res.status(200).json({
        newsId: newsSchema._id,
        title: newsSchema.title,
        newsPicture: newsSchema.newsPicture,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(404);
  }
};
