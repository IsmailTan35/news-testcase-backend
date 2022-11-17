const axios = require("axios");

function ApiController(app) {
  app.get("/finans", async (req, res) => {
    try {
      const response = await axios.get(
        "https://query1.finance.yahoo.com/v7/finance/quote?symbols=USDTRY=X,eurtry=x"
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = ApiController;
