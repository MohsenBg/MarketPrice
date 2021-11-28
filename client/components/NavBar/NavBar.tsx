import React from "react";
import styles from "./NavBar.module.scss";
import Image from "next/image";
import LogoImage from "../../public/Logo/Logo.webp";
const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.backGround}>
        <div className={styles.ImageLogo}>
          <Image src={LogoImage} width="50px" height="50px" />
        </div>
        <h1>Mr.Fox</h1>
      </div>
    </div>
  );
};
export default NavBar;
