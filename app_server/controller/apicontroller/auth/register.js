const adminSchema = require("../../../schema/admin.schema");
const crypto = require("crypto");
module.exports = async (req, res) => {
  try {
    let data = req.body;
    if (Object.values(data).length < 3)
      return res.status(400).send({ error: "no data" });

    var user = new adminSchema({
      fullname: data.fullname,
      email: data.email,
      password: crypto.createHash("md5").update(data.password).digest("hex"),
      token: [],
    });

    user.save((err, user) => {
      err
        ? res.status(401).json("not registered")
        : res.status(200).json("registered");
    });
  } catch (error) {
    console.error(error);
  }
};
