import React from "react";
import TradingViewWidget,{ Themes } from 'react-tradingview-widget';
import styles from "./Charts.module.scss"


const Charts = ({ coin }) => {
  return (
    <div className={styles.chartsContainer}>
      <h2>
        {coin.coinName} to {""}Chart
      </h2>
      <div
      className={styles.chart}
      >
    <TradingViewWidget  symbol={`${coin.symbol}USDT`} 
     theme={Themes.DARK}
     locale="UTC"
     autosize
     />
     </div>
    </div>
  );
};

export default Charts;
