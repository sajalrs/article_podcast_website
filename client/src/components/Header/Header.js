import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
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

  const renderOnceNavbar = <Navbar/>;

  return (
    <header>
      <div className={styles["header"]} ref={headerBoxRef}>
        <h1 id={styles["header-title"]}>THE FALSE 9</h1>
      </div>

      {navFixed ? (
        <div>
          <div style={{ width: "100%", height: "66px" }}></div>
          <div style={{ position: "fixed", width: "100%", top: "0px" }}>
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
};

export default Header;
