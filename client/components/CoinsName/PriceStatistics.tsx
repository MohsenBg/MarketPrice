import { FunctionComponent } from "hoist-non-react-statics/node_modules/@types/react";
import React from "react";
import { AiFillCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BasicCoinsInfo, CoinsInfo } from "../../interface/I-coins";
import { initialState } from "../../redux/store";
import styles from "./PriceStatistics.module.scss";
interface props {
  coin: BasicCoinsInfo;
}
interface SelectedInputValue {
  value: string;
  label: string;
}
const PriceStatistics: FunctionComponent<props> = () => {
  //@ts-ignore
  const selectedInputValue: SelectedInputValue = useSelector(
    //@ts-ignore
    (state: typeof initialState) => state.Coins.value
  );
  //@ts-ignore
  const coinInfo: CoinsInfo = useSelector(
    //@ts-ignore
    (state: typeof initialState) => state.Coins.coinInfo
  );
  return (
    <div className={styles.PriceStatisticsContainer}>
      {typeof coinInfo.coinName !== "undefined" &&
      typeof selectedInputValue.value !== "undefined" ? (
        <>
          <h1 className={styles.title}>{coinInfo.coinName} Price Statistics</h1>
          <span className={styles.span}>{coinInfo.coinName} Price Today</span>
          <div className={styles.InfoContainer}>
            {coinInfo.price.map((item) => {
              if (item.symbol === selectedInputValue.value) {
                return (
                  <div className={styles.row} key={item.symbol}>
                    <span className={styles.parameterName}>
                      {coinInfo.coinName} Price
                    </span>
                    <div className={styles.parameter}>
                      <span>
                        {parseFloat(item.lastPrice) > 1
                          ? parseFloat(item.lastPrice).toLocaleString()
                          : parseFloat(item.lastPrice)}
                        <span className={styles.unit}>
                          {selectedInputValue.label}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              }
            })}
            {coinInfo.price.map((item) => {
              if (item.symbol === selectedInputValue.value) {
                return (
                  <div className={styles.row} key={item.symbol}>
                    <span className={styles.parameterName}>
                      Price Change<span className={styles.unit}> 24h</span>
                    </span>
                    <span className={styles.parameter}>
                      <div>
                        {parseFloat(item.priceChange) > 1
                          ? parseFloat(item.priceChange).toLocaleString()
                          : parseFloat(item.priceChange)}
                        <span className={styles.unit}>
                          {selectedInputValue.label}
                        </span>
                      </div>
                      <div
                        className={styles.pricePercentChange}
                        style={
                          parseFloat(item.priceChangePercent) > 0
                            ? { color: "rgb(22,199,132)" }
                            : { color: "rgb(234,57,67)" }
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
                        <span className={styles.percent}>
                          {Math.abs(
                            //@ts-ignore
                            parseFloat(item.priceChangePercent).toFixed(2)
                          )}
                          %
                        </span>
                      </div>
                    </span>
                  </div>
                );
              }
            })}
            {coinInfo.price.map((item) => {
              if (item.symbol === selectedInputValue.value) {
                return (
                  <div className={styles.row} key={item.symbol}>
                    <span className={styles.parameterName}>
                      <div className={styles.multiParameterName}>24h Low</div>
                      <div className={styles.multiParameterName}>24h High</div>
                    </span>
                    <div className={styles.parameter}>
                      <div className={styles.multiParameter}>
                        {parseFloat(item.lowPrice) > 1
                          ? parseFloat(item.lowPrice).toLocaleString()
                          : parseFloat(item.lowPrice)}
                        <span className={styles.unit}>
                          {selectedInputValue.label}
                        </span>
                      </div>
                      <div className={styles.multiParameter}>
                        {parseFloat(item.highPrice) > 1
                          ? parseFloat(item.highPrice).toLocaleString()
                          : parseFloat(item.highPrice)}
                        <span className={styles.unit}>
                          {selectedInputValue.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {coinInfo.price.map((item) => {
              if (item.symbol === selectedInputValue.value) {
                return (
                  <div className={styles.row} key={item.symbol}>
                    <span className={styles.parameterName}>Trading Volume</span>
                    <div className={styles.parameter}>
                      <span>
                        {parseFloat(item.quoteVolume) > 1
                          ? parseFloat(item.quoteVolume).toLocaleString()
                          : parseFloat(item.quoteVolume)}
                        <span className={styles.unit}>
                          {selectedInputValue.label}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PriceStatistics;
