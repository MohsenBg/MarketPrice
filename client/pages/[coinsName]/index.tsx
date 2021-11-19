import React from "react";
import { GetStaticPaths } from "next";
import { GetServerSideProps } from "next";
import axios from "axios";
import { URL } from "../../URL";
import { BasicCoinsInfo } from "../../interface/I-coins";
export const index = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let path: any = [];
  await axios.get(`${URL}/api/Coins`).then((res) => {
    path = res.data.map((info: BasicCoinsInfo) => {
      return {
        params: { coinsName: info.coinName },
      };
    });
  });
  return {
    paths: path,
    fallback: "blocking",
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { coinsName }: any = context.params;
  let props: any;
  await axios.get(`market-amm.herokuapp.com/api/${coinsName}`).then((res) => {
    props = res.data;
  });
  if (props.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props,
  };
};
