const { generateAccessToken } = require("../../../helper/helperToken");
const crypto = require("crypto");
const adminSchema = require("../../../schema/admin.schema");

module.exports = async (req, res) => {
  let data = req.body;
  const token = generateAccessToken({});
  const filter = {
    email: data.email,
    password: crypto.createHash("md5").update(data.password).digest("hex"),
  };

  const update = {
    $push: {
      token,
    },
  };
  try {
    var user = await adminSchema.findOneAndUpdate(filter, update);
    if (user) {
      res.status(200).json({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json("login failed");
    }
  } catch (err) {
    console.error(err);

    res.status(400).json("login failed");
  }
};
