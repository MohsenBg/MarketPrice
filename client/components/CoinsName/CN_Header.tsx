import React, { FunctionComponent, useEffect, useState } from "react";
import { BasicCoinsInfo, CoinsInfo } from "../../interface/I-coins";
import styles from "./CN_Header.module.scss";
import Image from "next/image";
import Select from "react-select";
import { AiFillCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypeCoinsData } from "../../redux/CoinsData/ActionType";
import { initialState } from "../../redux/store";
interface props {
  coin: BasicCoinsInfo;
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "rgb(255, 255, 255,0.8)" : "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "20px",
    paddingLeft: "20px",
    cursor: "pointer",
    overflowX: "hidden",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "rgb(45,45,45)",
    color: "white",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: "rgb(30,30,30)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    width: "170px",
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),

  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const Header: FunctionComponent<props> = ({ coin }) => {
  const [coinsInfo, setCoinsInfo] = useState<CoinsInfo>();
  const [options, setOptions] = useState<any>();
  const [selectedInput, setSelectedInput] = useState<any>();
  const [onLoad, setOnLoad] = useState(true);
  const dispatch = useDispatch();

  const coinsData: Array<CoinsInfo> = useSelector(
    //@ts-ignore
    (state: typeof initialState) => state.Coins.coinsInfo
  );
  useEffect(() => {
    if (coinsData.length > 0) {
      const coinSelected = coinsData.filter(
        (Coin) => Coin.coinName === coin.coinName
      );
      setCoinsInfo(coinSelected[0]);
      optionsHandler(coinSelected[0]);
    }
  }, [coinsData]);

  const optionsHandler = (data: CoinsInfo) => {
    const symbols = data.price.map((item) => {
      return {
        value: item.symbol,
        label: item.symbol.replace(`${data.symbol}`, ""),
      };
    });
    setOptions(symbols);
  };

  useEffect(() => {
    if (coin.symbol === "USDT") {
      handelOnChange({ value: "USDTBUSD", label: "BUSD" });
    } else {
      handelOnChange({ value: `${coin.symbol}BUSD`, label: "USDT" });
    }
  }, []);

  const handelOnChange = (value: any) => {
    setSelectedInput(value);
    dispatch({ type: ActionTypeCoinsData.INPUT_VALUE, payload: value });
  };

  return (
    <div className={styles.headerContainer}>
      <>
        {typeof coinsInfo !== "undefined" &&
        typeof options !== "undefined" &&
        typeof selectedInput !== "undefined" ? (
          <div>
            <div className={styles.basicInfo}>
              <div className={styles.left}>
                <div className={styles.inline}>
                  <div className={styles.imageContainer}>
                    <Image src={coinsInfo.image} width="50px" height="50px" />
                  </div>
                  <div className={styles.coinName}>
                    {coinsInfo.coinName}
                    <span>({coinsInfo.symbol})</span>
                  </div>
                </div>
                <div>
                  {coinsInfo.price.map((item) => {
                    if (item.symbol === selectedInput.value) {
                      return (
                        <div key={item.symbol} className={styles.lastPrice}>
                          {parseFloat(item.lastPrice) > 1
                            ? parseFloat(item.lastPrice).toLocaleString()
                            : parseFloat(item.lastPrice)}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.selectContainer}>
                  <Select
                    onChange={(value) => handelOnChange(value)}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "rgb(255, 255, 255,0.185)",
                        neutral80: "white",
                      },
                    })}
                    options={options}
                    styles={customStyles}
                    defaultValue={
                      coinsInfo.symbol === "USDT"
                        ? options.filter((item: any) => item.label === "BUSD")
                        : options.filter((item: any) => item.label === "USDT")
                    }
                  />
                </div>
                {coinsInfo.price.map((item) => {
                  if (item.symbol === selectedInput.value) {
                    return (
                      <div
                        key={item.symbol}
                        className={styles.pricePercentChange}
                        style={
                          //@ts-ignore
                          parseFloat(item.priceChangePercent) > 0
                            ? { backgroundColor: "rgb(22,199,132)" }
                            : { backgroundColor: "rgb(234,57,67)" }
                        }
                      >
                        {
                          //@ts-ignore
                          parseFloat(item.priceChangePercent) > 0 ? (
                            <div className={styles.iconsCaret}>
                              <AiFillCaretUp />
                            </div>
                          ) : (
                            <div className={styles.iconsCaret}>
                              <AiOutlineCaretDown />
                            </div>
                          )
                        }
                        <span>
                          {Math.abs(
                            //@ts-ignore
                            parseFloat(item.priceChangePercent).toFixed(2)
                          )}
                          %
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div>
              {coinsInfo.price.map((item) => {
                if (item.symbol === selectedInput.value) {
                  return (
                    <div key={item.symbol} className={styles.infoPrice}>
                      <div className={styles.parameterContainer}>
                        <span className={styles.parameterName}>Low:</span>
                        <span className={styles.parameter}>
                          {parseFloat(item.lowPrice) > 1
                            ? parseFloat(item.lowPrice).toLocaleString()
                            : parseFloat(item.lowPrice)}
                        </span>
                      </div>
                      <div className={styles.parameterContainer}>
                        <span className={styles.parameterName}>High:</span>
                        <span className={styles.parameter}>
                          {parseFloat(item.highPrice) > 1
                            ? parseFloat(item.highPrice).toLocaleString()
                            : parseFloat(item.highPrice)}
                        </span>
                      </div>
                      <div className={styles.option}>24h</div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
};

export default Header;
