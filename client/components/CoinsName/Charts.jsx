import React from "react";
import { useSelector } from "react-redux";
import TradingViewWidget,{ Themes } from 'react-tradingview-widget';
import styles from "./Charts.module.scss"


const Charts = ({ coin }) => {

  const selectedInputValue = useSelector(state => state.Coins.value)
  return (
      <>
      {typeof selectedInputValue.label !== "undefined" ?
    <div className={styles.chartsContainer}>
      <h2>
        {coin.coinName} to {selectedInputValue.label} Chart
      </h2>
      <div
      className={styles.chart}
      >
    <TradingViewWidget  symbol={`${coin.symbol}${selectedInputValue.label}`} 
     theme={Themes.DARK}
     locale="UTC"
     autosize
     />
     </div>
    </div>
    :null}
     </>
  );
};

export default Charts;
