import React, { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { CoinsInfo } from "../../../interface/I-coins";
import { ActionTypeCoinsData } from "../../../redux/CoinsData/ActionType";
import { initialState } from "../../../redux/store";
import styles from "./Search.module.scss";
const Search = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const coinInfo: Array<CoinsInfo> = useSelector(
    (state: initialState) => state.Coins.coinsInfo
  );

  useEffect(() => {
    handelChangeValue();
  }, [coinInfo, searchInputValue]);

  const handelChangeValue = () => {
    if (searchInputValue !== "") {
      let data = coinInfo.filter(
        (coin) =>
          coin.symbol.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          coin.coinName.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      dispatch({
        type: ActionTypeCoinsData.SEARCH,
        payload: {
          active: true,
          filter: data,
        },
      });
    } else {
      dispatch({
        type: ActionTypeCoinsData.SEARCH,
        payload: {
          active: false,
          filter: [],
        },
      });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputSearch}
        contentEditable="true"
        placeholder="Search"
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <div className={styles.iconSearch}>
        <BiSearchAlt />
      </div>
    </div>
  );
};

export default Search;
