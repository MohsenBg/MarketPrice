import { ActionsCoinsData as Actions } from "./Actions";
import { ActionTypeCoinsData as ActionType } from "./ActionType";

const initialState = {
  value: {},
  coinsInfo: [],
  searchValue: {
    active: false,
    filter: [],
  },
};

export const ReducerCoinData = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case ActionType.INPUT_VALUE:
      return { ...state, value: actions.payload };
    case ActionType.SEARCH:
      return { ...state, searchValue: actions.payload };
    case ActionType.COINS_DATA:
      return { ...state, coinsInfo: actions.payload };

    default:
      return state;
  }
};
