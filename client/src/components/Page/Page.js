import React, {useEffect, useRef} from "react";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import styles from "./Page.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";

const Page = (props) => {
  const headerBoxRef = useRef();
  const sidebarFixed = useSelector((state) => state.sidebar.fixed);
  const topOffset = useSelector((state) => state.sidebar.topOffset);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderOnceSidePanel = (
    <SidePanel headerBoxRef={headerBoxRef} sidebarFixTopOffset={0} />
  );
  return (
    <div className={styles["Page"]}>
      <Header ref={headerBoxRef} className={styles["Header"]} />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {props.mainPane.map((item) => {
            return <div className={`${styles["main-pane-item"]}`}>{item}</div>;
          })}
        </div>
        <div className={styles["side-pane"]}></div>
        {sidebarFixed ? (
          <div
            style={{
              position: "fixed",
              top: topOffset,
              right: "0px",
              zIndex: 1,
            }}
          >
            {renderOnceSidePanel}
          </div>
        ) : (
          <div style={{ marginTop: topOffset }}>{renderOnceSidePanel}</div>
        )}
      </div>

      <div className={styles["footer-container"]}>
        <Footer />
      </div>
    </div>
  );
};

export default Page;