const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const response = await axios.get(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=USDTRY=X,GBPTRY=X,eurtry=X,EURUSD=X,GBPUSD=X,JPY=X"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
};
