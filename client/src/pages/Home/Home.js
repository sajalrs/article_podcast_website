import React, { useRef, useEffect } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useSelector} from 'react-redux'
const Home = (props) => {
  const headerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
  const articles = useSelector(state => state.blog.articles)
  const topOffset = useSelector(state => state.sidebar.topOffset);

  const renderOnceSidePanel = (
    <SidePanel
      headerBoxRef={headerBoxRef}
      sidebarFixTopOffset={0}
    />
  );
  return (
    <div className={styles["Home"]}>
      <Header
        ref={headerBoxRef}
        className={styles["Header"]}
      />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {articles.map((item) => {
            return (
              <div className={`${styles["main-pane-item"]}`}>
                <LargeCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  text={item.description}
                  author={item.author}
                  contentType={item.contentType}
                  link={item.link}
               />
              </div>
            );
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
          <div style={{ marginTop: topOffset }}>
            {renderOnceSidePanel}
          </div>
        )}
      </div>

      <div className={styles["footer-container"]}>
        <Footer
          headerBoxRef={headerBoxRef}
          sidebarFixTopOffset={0}
        />
      </div>
    </div>
  );
};

export default Home;
