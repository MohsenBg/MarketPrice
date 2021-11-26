import { Router } from "express";
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../../../modules/Coins/M_Coins");

const router = Router();

//!/api/Coins
router.get("/api/Coins", async (req, res, next) => {
  //@ts-ignore
  const result = await CoinsModels.find({}).lean();

  if (result.length === 0) {
    next();
  } else {
    res.send(result);
  }
});

module.exports = router;
