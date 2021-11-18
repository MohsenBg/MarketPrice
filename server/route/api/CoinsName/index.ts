import { Router } from "express";
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../../../modules/Coins/M_Coins");

const router = Router();

//!/api/:CoinsName
router.get("/api/:CoinsName", async (req, res, next) => {
  //@ts-ignore
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
      };
    });
    res.send(newResult[0]);
  }
});

module.exports = router;
