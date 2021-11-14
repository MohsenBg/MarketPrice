import { Router } from "express";
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../../../../modules/Coins/M_Coins");

const router = Router();

//!/api/:CoinName/Price/:Symbol
router.get("/api/:CoinsName/Price/:Symbol", async (req, res, next) => {
  const CoinsNameRoute = req.params.CoinsName;
  const SymbolRoute = req.params.Symbol;
  const result = await CoinsModels.find({ coinName: CoinsNameRoute });
  if (result.length === 0) {
    next();
  } else {
    const newResult = result.map((coinInfo) => {
      const selectedPrice = coinInfo.price.filter(
        (price: any) => price.symbol === SymbolRoute.toUpperCase()
      );
      return {
        coinName: coinInfo.coinName,
        symbol: coinInfo.symbol,
        image: coinInfo.image,
        price: selectedPrice[0],
      };
    });
    res.send(newResult[0]);
  }
});

module.exports = router;
