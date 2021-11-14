import axios from "axios";
require("dotenv").config();
interface coinInterface {
  coin_id: string;
  coin_slug: string;
  coin_name: string;
  coin_symbol: string;
  coin_rank: string;
  coin_price_usd: string;
  coin_price_eth: string;
  coin_price_btc: string;
  coin_24h_volume_usd: string;
  coin_24h_volume_eth: string;
  coin_24h_volume_btc: string;
  coin_market_cap_usd: string;
  coin_available_supply: string;
  coin_total_supply: string;
  coin_percent_change_1h: string;
  coin_percent_change_12h: string;
  coin_percent_change_24h: string;
  coin_percent_change_7d: string;
  coin_last_updated: string;
}

interface Asset {
  coinId: string;
  assetName: string;
  assetSymbol: string;
  rank: number;
  price: string;
  priceChange: string;
  percentChange: string;
  imageUrl: string;
}

const fetchAssetData = async () => {
  let BinanceData: any;
  let result: any = [];
  //! first fetch from Binance Api (for Price and All asset)
  await axios
    .get("https://api.binance.com/api/v3/ticker/24hr")
    .then(async (res) => {
      let newData = await res.data.filter((coin: any) =>
        coin.symbol.includes("USDT")
      );
      newData = await newData.map(function (coin: any) {
        return {
          Symbol: coin.symbol,
          Price: coin.lastPrice,
          PriceChange: coin.priceChange,
          priceChangePercent: coin.priceChangePercent,
        };
      });
      BinanceData = await newData;
    })
    .catch((error) => {
      console.log(error);
    });

  //-----------------------------------------------------

  //! second fetch from CryptoCurrencyLivePrices Api (for rankAsset And Data like Image or id .... )
  await axios
    .get("https://cryptocurrencyliveprices.com/api/")
    .then(async (res) => {
      let FINAL: Array<coinInterface> = res.data.filter(function (o1: any) {
        return BinanceData.some(function (o2: any) {
          return `${o1.coin_symbol}USDT` === o2.Symbol;
        });
      });
      //@ts-ignore
      for (let i = 0; i < FINAL.length; i++) {
        let price: any = await BinanceData.filter(
          (priceObject: any) =>
            priceObject.Symbol === `${FINAL[i].coin_symbol}USDT`
        );
        let AssetForPost = {
          coinId: FINAL[i].coin_id,
          assetName: FINAL[i].coin_name,
          assetSymbol: FINAL[i].coin_symbol,
          rank: parseInt(FINAL[i].coin_rank),
          price: price[0].Price,
          priceChange: price[0].PriceChange,
          percentChange: price[0].priceChangePercent,
          imageUrl: `https://cryptocurrencyliveprices.com/img/${FINAL[i].coin_id}.png`,
        };
        result.push(AssetForPost);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  postNewAsset(result);
};

const UpdatePrice = async () => {
  let assets: Array<Asset>;
  let result: any = [];
  //!first fetch from server
  await axios
    .get(`${process.env.URL_SERVER}/Price`)
    .then(async (res) => {
      assets = res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  //------------------------------

  //! second fetch from Binance Api (for Price and All asset)
  await axios
    .get("https://api.binance.com/api/v3/ticker/24hr")
    .then(async (res) => {
      let newData = await res.data.filter((coin: any) =>
        coin.symbol.includes("USDT")
      );

      for (let i = 0; i < assets.length; i++) {
        let filter = await newData.filter(
          (coin: any) => coin.symbol === `${assets[i].assetSymbol}USDT`
        );
        if (filter.length > 0) {
          let ObjUpdate = {
            coinId: assets[i].coinId,
            assetName: assets[i].assetName,
            assetSymbol: assets[i].assetSymbol,
            rank: assets[i].rank,
            price: filter[0].lastPrice,
            priceChange: filter[0].priceChange,
            percentChange: filter[0].priceChangePercent,
            imageUrl: assets[i].imageUrl,
          };
          result.push(ObjUpdate);
        }
      }

      //@ts-ignore
      updatePrice(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const postNewAsset = async (asset: Array<Asset>) => {
  await axios
    .post(`${process.env.URL_SERVER}/updatePrice`, asset)
    .catch((error) => console.log(error));
};
const updatePrice = async (asset: Array<Asset>) => {
  await axios
    .post(`${process.env.URL_SERVER}/updatePrice`, asset)
    .catch((error) => console.log(error));
};
module.exports = { fetchAssetData, UpdatePrice };
