import { RootReducer } from "./CombineReducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const initialState = store.getState();
