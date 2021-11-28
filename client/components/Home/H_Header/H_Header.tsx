import React, { FunctionComponent, useState, useEffect } from "react";
import { CoinsInfo } from "../../../interface/I-coins";
import styles from "./H_Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretUp, AiOutlineCaretDown } from "react-icons/ai";
interface props {
  coins: Array<CoinsInfo>;
}

const H_Header: FunctionComponent<props> = ({ coins }) => {
  const [topGainer, setTopGainer] = useState<CoinsInfo>();
  const [topLoser, setTopLoser] = useState<CoinsInfo>();
  const [topVolume, setTopVolume] = useState<CoinsInfo>();

  useEffect(() => {
    const newCoins = coins.map((coin) => {
      return {
        ...coin,
        price: coin.price.filter(
          (item) => item.symbol === `${coin.symbol}USDT`
        ),
      };
    });

    //!TopGainer
    let newTopGainer = Math.max.apply(
      Math,
      newCoins.map(function (coin) {
        return parseFloat(coin.price[0].priceChangePercent);
      })
    );
    let FindTopGainer = newCoins.filter(
      (coin) => parseFloat(coin.price[0].priceChangePercent) === newTopGainer
    );

    //!TopLoser
    let newTopLoser = Math.min.apply(
      Math,
      newCoins.map(function (coin) {
        return parseFloat(coin.price[0].priceChangePercent);
      })
    );
    let FindTopLoser = newCoins.filter(
      (coin) => parseFloat(coin.price[0].priceChangePercent) === newTopLoser
    );

    //!TopVolume
    let newTopVolume = Math.max.apply(
      Math,
      newCoins.map(function (coin) {
        return parseFloat(coin.price[0].quoteVolume);
      })
    );
    let FindTopVolume = newCoins.filter(
      (coin) => parseFloat(coin.price[0].quoteVolume) === newTopVolume
    );

    setTopGainer(FindTopGainer[0]);
    setTopLoser(FindTopLoser[0]);
    setTopVolume(FindTopVolume[0]);
  }, [coins]);

  return (
    <div className={styles.containerHomeHeader}>
      {typeof topGainer !== "undefined" &&
      typeof topVolume !== "undefined" &&
      typeof topLoser !== "undefined" ? (
        <div className={styles.cards}>
          <Link href={`/${topGainer.coinName}`}>
            <div className={styles.card}>
              <h3 className={styles.title}>Top Gainer</h3>
              <div className={styles.mainContent}>
                <div className={styles.imageCoin}>
                  <Image
                    src={topGainer.image}
                    width="30px"
                    height="30px"
                    loading="eager"
                    alt={`${topGainer.coinName} icon`}
                  />
                </div>
                <div className={styles.coinName}>{topGainer.coinName}</div>
              </div>
              <div className={styles.price}>
                <div className={styles.lastPrice}>
                  {parseFloat(topGainer.price[0].lastPrice) > 1 ? (
                    <span>
                      {parseFloat(
                        topGainer.price[0].lastPrice
                      ).toLocaleString()}
                    </span>
                  ) : (
                    <span>{parseFloat(topGainer.price[0].lastPrice)}</span>
                  )}
                </div>
                <div
                  className={styles.priceChangePercent}
                  style={
                    parseFloat(topGainer.price[0].priceChangePercent) > 0
                      ? { color: "rgb(22,199,132)" }
                      : { color: "rgb(234,57,67)" }
                  }
                >
                  {
                    //@ts-ignore
                    parseFloat(topGainer.price[0].priceChangePercent) > 0 ? (
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
                      parseFloat(topGainer.price[0].priceChangePercent).toFixed(
                        2
                      )
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={`/${topVolume.coinName}`}>
            <div className={styles.card}>
              <h3 className={styles.title}>Top Volume</h3>
              <div className={styles.mainContent}>
                <div className={styles.imageCoin}>
                  <Image
                    src={topVolume.image}
                    width="30px"
                    height="30px"
                    loading="eager"
                    alt={`${topVolume.coinName} icon`}
                  />
                </div>
                <div className={styles.coinName}>{topVolume.coinName}</div>
              </div>
              <div className={styles.price}>
                <div className={styles.lastPrice}>
                  {parseFloat(topVolume.price[0].lastPrice) > 1 ? (
                    <span>
                      {parseFloat(
                        topVolume.price[0].lastPrice
                      ).toLocaleString()}
                    </span>
                  ) : (
                    <span>{parseFloat(topVolume.price[0].lastPrice)}</span>
                  )}
                </div>
                <div
                  className={styles.priceChangePercent}
                  style={
                    parseFloat(topVolume.price[0].priceChangePercent) > 0
                      ? { color: "rgb(22,199,132)" }
                      : { color: "rgb(234,57,67)" }
                  }
                >
                  {
                    //@ts-ignore
                    parseFloat(topVolume.price[0].priceChangePercent) > 0 ? (
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
                      parseFloat(topVolume.price[0].priceChangePercent).toFixed(
                        2
                      )
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={`/${topVolume.coinName}`}>
            <div className={styles.card}>
              <h3 className={styles.title}>Top Loser</h3>
              <div className={styles.mainContent}>
                <div className={styles.imageCoin}>
                  <Image
                    src={topLoser.image}
                    width="30px"
                    height="30px"
                    loading="eager"
                    alt={`${topLoser.coinName} icon`}
                  />
                </div>
                <div className={styles.coinName}>{topLoser.coinName}</div>
              </div>
              <div className={styles.price}>
                <div className={styles.lastPrice}>
                  {parseFloat(topLoser.price[0].lastPrice) > 1 ? (
                    <span>
                      {parseFloat(topLoser.price[0].lastPrice).toLocaleString()}
                    </span>
                  ) : (
                    <span>{parseFloat(topLoser.price[0].lastPrice)}</span>
                  )}
                </div>
                <div
                  className={styles.priceChangePercent}
                  style={
                    parseFloat(topLoser.price[0].priceChangePercent) > 0
                      ? { color: "rgb(22,199,132)" }
                      : { color: "rgb(234,57,67)" }
                  }
                >
                  {
                    //@ts-ignore
                    parseFloat(topLoser.price[0].priceChangePercent) > 0 ? (
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
                      parseFloat(topLoser.price[0].priceChangePercent).toFixed(
                        2
                      )
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default H_Header;
