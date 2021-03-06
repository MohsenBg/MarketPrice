import axios from "axios";
import React, { useEffect, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { CoinsInfo } from "../../interface/I-coins";
import { ActionTypeCoinsData } from "../../redux/CoinsData/ActionType";
import { ActionTypeLoading } from "../../redux/Loading/ActionType";

const Dispatcher: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypeLoading.ON_LOADING });
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
    CoinsData();
     }, 2500);
     return () => clearInterval(interval);
  }, []);

  const CoinsData = async () => {
    await axios
      .get("https://market-amm.herokuapp.com/api/Coins/Price")
      .then(async (res) => {
         const data: Array<CoinsInfo> = await res.data;
        //@ts-ignore
        let filterData = [];
        data.map((coin) => {
          if (Array.isArray(coin.price) && coin.price.length > 0) {
            filterData.push(coin);
          }
        });
        //@ts-ignore
        dispatch({ type: ActionTypeCoinsData.COINS_DATA, payload: filterData });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: ActionTypeLoading.END_LOADING });
        }, 3000);
      });
  };

  return null;
};

export default Dispatcher;
