import { RootReducer } from "./CombineReducer";
import { applyMiddleware, createStore } from "redux";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Router from "next/router";
import { CoinsInfo } from "../interface/I-coins";

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (typeof window !== "undefined" && state?.router) {
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return RootReducer(state, action);
  }
};

export const initStore = (context: any) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware, thunk))
  );
};

export interface initialState {
  router: any;
  Coins: {
    value: any;
    coinsInfo: Array<any>;
    searchValue: {
      active: boolean;
      filter: Array<CoinsInfo>;
    };
  };
  loading: {
    loading: boolean;
  };
}

export const wrapper = createWrapper(initStore);
