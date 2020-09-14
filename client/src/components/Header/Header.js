import React, { useEffect, useState, useRef, forwardRef } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";
import FalseNineIcon from '../../Icons/FalseNineFitting'
import FIcon from '../../Icons/F'
import NineIcon from '../../Icons/Nine'
const Header = forwardRef((props, ref) => {
  const [navFixed, changeNavFix] = useState(false);
  const headerBoxRef = useRef();
  useEffect(() => {
    const fixNavbar = (e) => {
      if (window.scrollY > headerBoxRef.current.clientHeight) {
        changeNavFix(true);
      } else {
        changeNavFix(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);
    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  });

  const renderOnceNavbar = (
    <Navbar navbarClicked={props.navbarClicked} setNavbarClicked={props.setNavbarClicked} sideBarClicked={props.sideBarClicked} setSideBarClicked={props.setSideBarClicked} />
  );

  return (
    <header ref={ref}>
      <div className={styles["header"]} ref={headerBoxRef}>
        <h1 id={styles["header-title"]}><span className={styles["title-word"]}>The</span><span className={styles["title-word"]}> <FIcon height="9vw" width="7vw"/>alse</span><span className={styles["title-word"]}><NineIcon  height="9vw" width="8vw"/></span></h1>
      </div>

      {navFixed ? (
        <div>
          <div style={{ width: "100%", height: "66px" }}></div>
          <div style={{ position: "fixed", width: "100%", top: "0px", zIndex: 1 }}>
            {renderOnceNavbar}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%" }}>
          {renderOnceNavbar}
        </div>
      )}
    </header>
  );
});

export default Header;
