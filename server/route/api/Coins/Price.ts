import { Router } from "express";
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../../../modules/Coins/M_Coins");

const router = Router();

//!/api/Coins/Price
router.get("/api/Coins/Price", async (req, res, next) => {
  //@ts-ignore
  const result = await CoinsModels.find();
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
    res.send(newResult);
  }
});

module.exports = router;
