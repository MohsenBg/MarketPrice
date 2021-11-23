import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CardPrice from "../components/Home/CardPrice";
import { CoinsInfo } from "../interface/I-coins";
import styles from "../styles/Home.module.scss";
import { useDispatch } from "react-redux";
import { ActionTypeLoading } from "../redux/Loading/ActionType";
import PageCounters from "../components/Home/PageCounters";

const tabs = ["USDT", "BUSD"];
const Home: NextPage = () => {
  const [coinsInfo, setCoinsInfo] = useState<Array<CoinsInfo>>();
  const [symbol, setSymbol] = useState("USDT");
  const [countRenderCoin, setCountRenderCoin] = useState(1);
  const [onLoad, setOnLoad] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ActionTypeLoading.ON_LOADING });
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      CoinsData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof coinsInfo !== "undefined" && onLoad) {
      setTimeout(() => {
        dispatch({ type: ActionTypeLoading.END_LOADING });
        setOnLoad(false);
      }, 2000);
    }
  }, [coinsInfo]);

  const CoinsData = async () => {
    await axios
      .get("https://market-amm.herokuapp.com/api/Coins/Price")
      .then(async (res) => {
        const data: Array<CoinsInfo> = await res.data;
        //@ts-ignore
        setCoinsInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelCountRenderCoin = (page: number) => [setCountRenderCoin(page)];

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {typeof coinsInfo !== "undefined" ? (
          <>
            <h1 className={styles.title}></h1>
            <div className={styles.tabContainer}>
              {tabs.map((tab) => {
                return (
                  <div className={styles.tab} key={tab}>
                    <span
                      style={tab === symbol ? { color: "white" } : {}}
                      onClick={() => setSymbol(tab)}
                    >
                      {tab}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              <div className={styles.firstRow}>
                <div className={styles.firstColum}>Name</div>
                <div className={styles.secondColum}>
                  Price
                  <span className={styles.unit}>{symbol}</span>
                </div>
                <div className={styles.thirdColum}>
                  PriceChange
                  <span className={styles.unit}>24h</span>
                </div>
                <div className={styles.fourthColum}>
                  Low <span className={styles.unit}>24h</span>
                  <span>/</span>
                  high <span className={styles.unit}>24h</span>
                </div>
              </div>
              <div>
                {coinsInfo
                  .slice((countRenderCoin - 1) * 10, countRenderCoin * 10)
                  .map((coin) => {
                    return (
                      <div key={coin.symbol} className={styles.cardsPrice}>
                        <CardPrice
                          //@ts-ignore
                          coin={coin}
                          baseAsset={symbol}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={styles.pageCounterComponent}>
              <PageCounters
                countOfCoin={coinsInfo.length}
                getPageNumber={handelCountRenderCoin}
              />
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Home;
