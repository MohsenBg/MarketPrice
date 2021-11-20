import { combineReducers } from "redux";
import { ReducerCoinData } from "./CoinsData/Reducer";

export const RootReducer = combineReducers({
  Coins: ReducerCoinData,
});
