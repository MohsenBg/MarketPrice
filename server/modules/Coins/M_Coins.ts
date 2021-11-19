import { Schema, model } from "mongoose";
const assetPriceSchema: Schema = new Schema(
  {
    coinName: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: [
        {
          symbol: String,
          priceChange: String,
          priceChangePercent: String,
          weightedAvgPrice: String,
          prevClosePrice: String,
          lastPrice: String,
          lastQty: String,
          bidPrice: String,
          bidQty: String,
          askPrice: String,
          askQty: String,
          openPrice: String,
          highPrice: String,
          lowPrice: String,
          volume: String,
          quoteVolume: String,
          openTime: Number,
          closeTime: Number,
          firstId: Number,
          lastId: Number,
          count: Number,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
const assetPrice = model("coins", assetPriceSchema);
module.exports = assetPrice;
