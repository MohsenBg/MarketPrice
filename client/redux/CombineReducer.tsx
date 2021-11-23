import { combineReducers } from "redux";
import { ReducerCoinData } from "./CoinsData/Reducer";
import { ReducerLoading } from "./Loading/Reducer";
export const RootReducer = combineReducers({
  Coins: ReducerCoinData,
  loading: ReducerLoading,
});
