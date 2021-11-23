import React,{useState} from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import TradingViewWidget,{ Themes } from 'react-tradingview-widget';
import styles from "./Charts.module.scss"


const Charts = ({ coin }) => {

const [fullScreenChart, setFullScreenChart] = useState(false)

  const selectedInputValue = useSelector(state => state.Coins.value)
  return (
      <>
      {typeof selectedInputValue.label !== "undefined" ?
    <div className={styles.chartsContainer}>
      <h2>
        {coin.coinName} to {selectedInputValue.label} Chart
      </h2>
      <div className={fullScreenChart ? styles.fullScreenButton: styles.normalScreenButton}
     
      >
        <div
         onClick={()=>setFullScreenChart(!fullScreenChart)}
        >{fullScreenChart ? <AiOutlineArrowRight /> : "Full Screen" }</div>
      </div>
      <div
      className={fullScreenChart ? styles.chartFullScreen: styles.chartNormal}
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
