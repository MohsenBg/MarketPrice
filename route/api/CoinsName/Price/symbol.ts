import { Router } from "express";
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../../../../modules/Coins/M_Coins");

const router = Router();

//!/api/:CoinName/Price/:symbol
router.get("/api/:CoinsName/Price", async (req, res, next) => {
  const CoinsNameRoute = req.params.CoinsName;
  const result = await CoinsModels.find({ coinName: CoinsNameRoute });
  if (result.length === 0) {
    next();
  } else {
    const newResult = result.map((coinInfo) => {
      return {
        coinName: coinInfo.coinName,
        symbol: coinInfo.symbol,
        image: coinInfo.image,
        price: coinInfo.price,
      };
    });
    res.send(newResult[0]);
  }
});

module.exports = router;
