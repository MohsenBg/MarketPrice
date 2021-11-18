import { Schema, model } from "mongoose";
const assetPriceSchema: Schema = new Schema(
  {
    coinId: {
      type: String,
      required: true,
    },
    assetName: {
      type: String,
      required: true,
    },
    assetSymbol: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    priceChange: {
      type: String,
      required: true,
    },
    percentChange: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const assetPrice = model("assetPrice", assetPriceSchema);
module.exports = assetPrice;
