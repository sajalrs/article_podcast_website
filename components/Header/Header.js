import React, { useEffect, forwardRef, useContext } from "react";
import styles from "./Header.module.css";
import FIcon from "../../Icons/F";
import NineIcon from "../../Icons/Nine";
import { HeaderContext } from "../../contexts/reducers/headerContext";
import { DeviceContext } from "../../contexts/reducers/deviceContext";
import { setHeaderBoxRefAction } from "../../contexts/actions";

const Header = forwardRef((props, ref) => {
  const [headerState, headerDispatch] = useContext(HeaderContext);
  const [deviceState, deviceDispatch] = useContext(DeviceContext);

  const screen = deviceState.screen;
  const setHeaderBoxRef = (setTo) => headerDispatch(setHeaderBoxRefAction(setTo));

  useEffect(() => {
    setHeaderBoxRef(ref);
  }, [screen]);
  return (
    <header ref={ref}>
      <div className={styles["header"]}>
        <h1 id={styles["header-title"]}>
          <span className={styles["title-word"]}>The</span>
          <span className={styles["title-word"]}>
            {" "}
            <FIcon height="9vw" width="7vw" />
            alse
          </span>
          <span className={styles["title-word"]}>
            <NineIcon height="9vw" width="8vw" />
          </span>
        </h1>
      </div>
    </header>
  );
});

export default Header;
