import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { BasicCoinsInfo } from "../../interface/I-coins";
import { URL } from "../../URL";
import Head from "next/head";
import { BiArrowBack } from "react-icons/bi";
import styles from "../../styles/CoinsName.module.scss";
import Header from "../../components/CoinsName/CN_Header/CN_Header";
import PriceStatistics from "../../components/CoinsName/PriceStatistics/PriceStatistics";
const Charts = dynamic(
  () => import("../../components/CoinsName/Chart/Charts"),
  {
    ssr: false,
  }
);

interface props {
  coinInfo: BasicCoinsInfo;
}

const CoinsName: NextPage<props> = ({ coinInfo }) => {
  return (
    <div className={styles.CoinsNamePageContainer}>
      <div>
        <Head>
          <title>{coinInfo.coinName}</title>
          <meta
            name="description"
            content={`Information like price and ... for  ${coinInfo.coinName}`}
          />
          <link rel="icon" href={coinInfo.image} />
        </Head>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.iconBack}>
          <Link href={"/"}>
            <BiArrowBack />
          </Link>
        </div>
        <div>
          <Header coin={coinInfo} />
        </div>
        <div className={styles.inline}>
          <div className={styles.componentCharts}>
            <Charts coin={coinInfo} />
          </div>
          <div className={styles.componentPriceStatistics}>
            <PriceStatistics coin={coinInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinsName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params }: any = context;
  const CoinName = params.CoinName;
  let coinInfo: any;
  await axios
    .get(`${URL}/api/${CoinName}`)
    .then(async (res) => {
      coinInfo = await res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  if (typeof coinInfo === "undefined") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      coinInfo,
    },
  };
};
