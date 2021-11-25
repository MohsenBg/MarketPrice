import { routerReducer } from "connected-next-router";
import { combineReducers } from "redux";
import { ReducerCoinData } from "./CoinsData/Reducer";
import { ReducerLoading } from "./Loading/Reducer";
export const RootReducer = combineReducers({
  router: routerReducer,
  Coins: ReducerCoinData,
  loading: ReducerLoading,
});
