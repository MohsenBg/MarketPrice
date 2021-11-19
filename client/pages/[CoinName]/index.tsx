import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { BasicCoinsInfo } from "../../interface/I-coins";
import { URL } from "../../URL";
import Head from "next/head";
import Header from "../../components/CoinsName/Header";
interface props {
  coinInfo: BasicCoinsInfo;
}

const CoinsName: NextPage<props> = ({ coinInfo }) => {
  useEffect(() => {
    console.log(coinInfo);
  }, []);
  return (
    <div>
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
      <div>
        <Header coin={coinInfo} />
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
