import React, { FunctionComponent, useState, useEffect } from "react";
import styles from "./PageCounter.module.scss";
interface props {
  countOfCoin: number;
  getPageNumber: any;
}
interface Count {
  id: number;
  page: number;
}

interface Counter {
  before: Array<Count>;
  selected: Array<Count>;
  after: Array<Count>;
}
const PageCounter: FunctionComponent<props> = ({
  countOfCoin,
  getPageNumber,
}) => {
  const [counter, setCounter] = useState<Counter>();
  const [selectedPage, setSelectedPage] = useState<any>(1);
  useEffect(() => {
    countPages();
  }, [selectedPage]);
  const countPages = () => {
    let newCounter = [];
    let countOfPage = Math.ceil(countOfCoin / 10);
    for (let i = 1; i <= countOfPage; i++) {
      let obj = {
        id: i,
        page: i,
      };
      newCounter.push(obj);
    }
    let before = newCounter.filter((item) => item.page === 1);
    let selected = newCounter.filter(
      (item) =>
        item.page === selectedPage - 1 ||
        item.page === selectedPage - 2 ||
        item.page === selectedPage ||
        item.page === selectedPage + 1 ||
        item.page === selectedPage + 2
    );
    selected = selected.filter((item) => item.page !== 1);
    selected = selected.filter((item) => item.page !== newCounter.length);
    let after = newCounter.filter((item) => item.page === newCounter.length);
    setCounter({
      before,
      selected,
      after,
    });
  };
  console.log(counter);

  const handelSelectPage = (page: number) => {
    setSelectedPage(page);
    getPageNumber(page);
  };

  return (
    <div className={styles.PageCounterContainer}>
      {typeof counter !== "undefined" ? (
        <div className={styles.numberContainer}>
          {counter.before.map((item) => (
            <div
              className={styles.number}
              onClick={() => handelSelectPage(item.page)}
            >
              <span
                key={item.id}
                style={selectedPage === item.page ? { color: "white" } : {}}
              >
                {item.page}
              </span>
            </div>
          ))}
          <div className={styles.numberContainer}>
            {selectedPage > 4 ? (
              <samp className={styles.threeDot}>...</samp>
            ) : null}
          </div>
          <div className={styles.numberContainer}>
            {counter.selected.map((item) => (
              <div
                className={styles.number}
                onClick={() => handelSelectPage(item.page)}
              >
                <span
                  key={item.id}
                  style={selectedPage === item.page ? { color: "white" } : {}}
                >
                  {item.page}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.numberContainer}>
            {selectedPage < Math.ceil(countOfCoin / 10) - 3 ? (
              <samp className={styles.threeDot}>...</samp>
            ) : null}
          </div>
          <div className={styles.numberContainer}>
            {counter.after.map((item) => (
              <div
                className={styles.number}
                onClick={() => handelSelectPage(item.page)}
              >
                <span
                  key={item.id}
                  style={selectedPage === item.page ? { color: "white" } : {}}
                >
                  {item.page}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PageCounter;
