import React, { useEffect, useState, useRef, forwardRef } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";
import FalseNineIcon from '../../Icons/FalseNineFitting'
import FIcon from '../../Icons/F'
import NineIcon from '../../Icons/Nine'
import {useDispatch, useSelector} from "react-redux";
import {setHeaderBoxRef} from "../../redux/actions"

const Header = forwardRef((props, ref) => {
  const isMobile = useSelector((state) => state.device.isMobile);
  const isTablet = useSelector((state) => state.device.isTablet);
  const isDesktop = useSelector((state) => state.device.isDesktop);
  const dispatch = useDispatch();
  useEffect(()=> {
    console.log("Set Header Box Ref")
    dispatch(setHeaderBoxRef(ref))
  }, [isMobile, isTablet, isDesktop])
  return (
    <header ref={ref}>
      <div className={styles["header"]}>
        <h1 id={styles["header-title"]}><span className={styles["title-word"]}>The</span><span className={styles["title-word"]}> <FIcon height="9vw" width="7vw"/>alse</span><span className={styles["title-word"]}><NineIcon  height="9vw" width="8vw"/></span></h1>
      </div>
    </header>
  );
});

export default Header;
