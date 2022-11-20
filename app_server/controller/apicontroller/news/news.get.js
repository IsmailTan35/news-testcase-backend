const adminSchema = require("../../../schema/admin.schema");
const newsSchema = require("../../../schema/news.schema");

module.exports = async (req, res) => {
  try {
    const news = await newsSchema.find({});
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(400).json([]);
  }
};
