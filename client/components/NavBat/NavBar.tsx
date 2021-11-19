import React from "react";
import styles from "./NavBar.module.scss";
const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.backGround}>
        <h1>Mr.Fox</h1>
      </div>
    </div>
  );
};

export default NavBar;
