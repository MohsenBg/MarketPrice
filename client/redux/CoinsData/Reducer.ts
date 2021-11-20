import { ActionsCoinsData as Actions } from "./Actions";
import { ActionTypeCoinsData as ActionType } from "./ActionType";

const initialState = {
  value: {},
  coinInfo: {},
};

export const ReducerCoinData = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case ActionType.INPUT_VALUE:
      return { ...state, value: actions.payload };

    case ActionType.COIN_DATA:
      return { ...state, coinInfo: actions.payload };
    default:
      return state;
  }
};
