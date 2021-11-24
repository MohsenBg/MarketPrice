import { CoinsInfo } from "../../interface/I-coins";
import { ActionTypeCoinsData as ActionType } from "./ActionType";

interface getValue {
  type: ActionType.INPUT_VALUE;
  payload: object;
}
interface getCoinData {
  type: ActionType.COINS_DATA;
  payload: CoinsInfo;
}
export type ActionsCoinsData = getValue | getCoinData;
