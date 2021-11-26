import React, { useEffect, FunctionComponent, useState } from "react";
import { CoinsInfo } from "../../../interface/I-coins";
import styles from "./CardPrice.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretUp, AiOutlineCaretDown } from "react-icons/ai";
interface props {
  coins: Array<CoinsInfo>;

  pageNumber: number;
}

const CardPrice: FunctionComponent<props> = ({ coins, pageNumber }) => {
  const tabs = ["USDT", "BUSD"];
  const [baseAsset, setBaseAsset] = useState("USDT");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}></h1>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => {
          return (
            <div className={styles.tab} key={tab}>
              <span
                style={tab === baseAsset ? { color: "white" } : {}}
                onClick={() => setBaseAsset(tab)}
              >
                {tab}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.firstRow}>
        <div className={styles.firstColum}>Name</div>
        <div className={styles.secondColum}>
          Price
          <span className={styles.unit}>{baseAsset}</span>
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

      {coins.slice((pageNumber - 1) * 10, pageNumber * 10).map((coin) => {
        return (
          <Link href={`/${coin.coinName}`} key={coin.symbol}>
            <div className={styles.CardPriceContainer}>
              <div className={styles.firstColum}>
                <div className={styles.image}>
                  <Image
                    src={coin.image}
                    width="50px"
                    alt={`${coin.coinName} icon`}
                    height="50px"
                    loading="eager"
                  />
                </div>
                <div className={styles.inline}>
                  <div className={styles.coinName}>{coin.coinName}</div>
                  <div className={styles.symbol}>{coin.symbol}</div>
                </div>
              </div>
              <div className={styles.secondColum}>
                {coin.price.map((item) => {
                  if (item.symbol === `${coin.symbol}${baseAsset}`) {
                    return (
                      <div className={styles.priceContainer} key={item.symbol}>
                        <div>
                          {parseFloat(item.lastPrice) > 1
                            ? parseFloat(item.lastPrice).toLocaleString()
                            : parseFloat(item.lastPrice)}
                        </div>
                        <div
                          className={styles.priceChangePercent}
                          style={
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
                      </div>
                    );
                  }
                })}
              </div>
              <div className={styles.thirdColum}>
                {coin.price.map((item) => {
                  if (item.symbol === `${coin.symbol}${baseAsset}`) {
                    return (
                      <div
                        className={styles.priceChangeContainer}
                        key={item.symbol}
                      >
                        <div className={styles.priceChange}>
                          {parseFloat(item.priceChange) > 1
                            ? parseFloat(item.priceChange).toLocaleString()
                            : parseFloat(item.priceChange)}
                        </div>
                        <div
                          className={styles.priceChangePercent}
                          style={
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
                      </div>
                    );
                  }
                })}
              </div>
              <div className={styles.fourthColum}>
                {coin.price.map((item) => {
                  if (item.symbol === `${coin.symbol}${baseAsset}`) {
                    return (
                      <div key={item.symbol} className={styles.priceLowHigh}>
                        <div>
                          {parseFloat(item.lowPrice) > 1
                            ? parseFloat(item.lowPrice).toLocaleString()
                            : parseFloat(item.lowPrice)}
                        </div>
                        <span> / </span>
                        <div>
                          {parseFloat(item.highPrice) > 1
                            ? parseFloat(item.highPrice).toLocaleString()
                            : parseFloat(item.highPrice)}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CardPrice;
