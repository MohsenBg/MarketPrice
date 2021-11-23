import React, { useState, useEffect } from "react";
import LoadingImage from "../../public/Loading/Cube-1.5s-200px.svg";
import Image from "next/image";
import styles from "./Loading.module.scss";
import { useSelector } from "react-redux";
const Loading = () => {
  const [dot, setDot] = useState("...");
  const LoadingStatus = useSelector((state: any) => state.loading.loading);
  useEffect(() => {
    setTimeout(() => {
      if (dot === "...") {
        setDot("");
      }
      if (dot === "..") {
        setDot("...");
      }
      if (dot === ".") {
        setDot("..");
      }
      if (dot === "") {
        setDot(".");
      }
    }, 1000);
  }, [dot]);

  return (
    <>
      {LoadingStatus ? (
        <div className={styles.container}>
          <div className={styles.loading}>
            <Image src={LoadingImage} />
          </div>
          <div className={styles.text}>Loading{dot}</div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
