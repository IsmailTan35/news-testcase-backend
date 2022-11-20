const newsSchema = require("../../../schema/news.schema");

module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    const ress = await newsSchema.deleteOne({ _id: id });
    const resArr = await newsSchema.find({});
    res.status(200).json(resArr);
  } catch (error) {
    res.status(400).json("error");
  }
};
