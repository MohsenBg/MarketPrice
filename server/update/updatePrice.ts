import axios from "axios";
require("dotenv").config();
import { Model } from "mongoose";
const CoinsModels: typeof Model = require("../modules/Coins/M_Coins");

//!Update Price From Binance
const UpdatePrice = async () => {
  setInterval(async () => {
    await axios
      .get("https://api.binance.com/api/v3/ticker/24hr")
      .then(async (res) => {
        const BtcInfoPrice = await res.data.filter((PriceInfo: any) => {
          if (PriceInfo.firstId !== -1) {
            return PriceInfo.symbol.substring(0, 3) === "BTC";
          }
        });
        const filter = { coinName: "Bitcoin" };
        const update = { price: BtcInfoPrice };
        await CoinsModels.findOneAndUpdate(filter, update);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 5000);
};
module.exports = { UpdatePrice };