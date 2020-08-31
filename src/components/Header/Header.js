import React, {useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
    const [navFixed, changeNavFix] = useState(false);
    useEffect(() => {
    const fixNavbar = (e) => {
        const curWidth = window.innerWidth;
        if(curWidth > 1350){
            
            if(window.scrollY > 379.59){
                changeNavFix(true)
            } else {
                changeNavFix(false)
            }
        }
    };

    window.addEventListener('scroll', fixNavbar);
    return () => {
      window.removeEventListener('scroll', fixNavbar) ;
    };
  });
 
    
  const renderOnceNavbar = <Navbar />;

  // window.onscroll = () => {
  //     let currentScrollPos = window.pageYOffset;
  //     if(currentScrollPos > 379){
  //        navFixed=true;
  //     } else {
  //         navFixed=false;
  //     }
  // }

  return (
    <header>
      <div className={styles["header"]}>
        <h1 id={styles["header-title"]}>THE FALSE 9</h1>
      </div>
      {navFixed ? (
        <div style={{ position: "fixed", width: "100%", top: "0px" }}>
          {renderOnceNavbar}
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
