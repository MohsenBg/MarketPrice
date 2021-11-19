import React, { FunctionComponent, useEffect, useState } from "react";
import { BasicCoinsInfo, CoinsInfo } from "../../interface/I-coins";
import styles from "./Header.module.scss";
import Image from "next/image";
import axios from "axios";
import Select from "react-select";
import { URL } from "../../URL";
interface props {
  coin: BasicCoinsInfo;
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "black" : "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "20px",
    paddingLeft: "20px",
    overflowX: "hidden",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "rgb(45,45,45)",
    color: "white",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "rgb(30,30,30)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    width: "170px",
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),

  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const Header: FunctionComponent<props> = ({ coin }) => {
  const [coinsInfo, setCoinsInfo] = useState<CoinsInfo>();
  const [options, setOptions] = useState<any>();
  const fetcher = async () => {
    await axios
      .get(`${URL}/api/${coin.coinName}/Price`)
      .then(async (res) => {
        setCoinsInfo(await res.data);
        optionsHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const optionsHandler = () => {
    const symbols = coinsInfo?.price.map((item) => {
      return {
        value: item.symbol,
        label: item.symbol.replace(`${coinsInfo.symbol}`, ""),
      };
    });
    setOptions(symbols);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className={styles.headerContainer}>
      <>
        {typeof coinsInfo !== "undefined" && typeof options !== "undefined" ? (
          <div className={styles.basicInfo}>
            <div className={styles.imageContainer}>
              <Image src={coinsInfo.image} width="50px" height="50px" />
            </div>
            <div>{coinsInfo.coinName}</div>
            <div className={styles.selectContainer}>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    neutral80: "white",
                  },
                })}
                options={options}
                styles={customStyles}
                defaultValue={
                  coinsInfo.symbol === "USDT"
                    ? options.filter((item: any) => item.label === "BUSD")
                    : options.filter((item: any) => item.label === "USDT")
                }
              />
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
};

export default Header;
