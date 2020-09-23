import React, { useState, useEffect, useRef } from "react";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./AboutUs.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux"
const AboutUs = (props) => {
  const sidebarFixed =  useSelector(state => state.sidebar.fixed)
  const topOffset = useSelector(state => state.sidebar.topOffset);
  const headerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderOnceSidePanel = (
    <SidePanel
      youtubeVideos={props.youtubeVideos}
      getImageLink={props.getImageLink}
      playVideo={props.playVideo}
      getHyperLink={props.getHyperLink}
      headerBoxRef={headerBoxRef}
      sidebarFixTopOffset={0}
    />
  );

  return (
    <div className={styles["overarching"]}>
      <div className={styles["AboutUs"]}>
        <Header
          ref={headerBoxRef}
        />
        <div className={styles["content-pane"]}>
          <div className={styles["main-pane"]}>
            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading-special"]}>About Us</h1>
            </div>

            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading"]}>Ishan Sharma, Co-Founder </h1>
            </div>

            <div className={`${styles["main-pane-item"]} ${styles["odd"]} `}>
              <figure className={styles["image-container"]}>
                <img src="https://i.imgur.com/TqfhPSX.jpg" />
              </figure>

              <p>
                Ishan is a medical student, but like any football fanatic, his
                mind is half occupied by academics and half by football. He fell
                in love with Manchester United since 2006 and has never looked
                back. Ishan is passionate about football and keeps himself busy
                by learning and reading about football. He’s not only interested
                in the game but is also drawn to the tactical, statistical, and
                financial side of football. For the last 4 or 5 years, he has
                been analyzing these aspects and has written articles/tactical
                threads where football is cut wide open.
              </p>
            </div>

            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading"]}>
                Susajjan Dhungana, Co-Founder{" "}
              </h1>
            </div>

            <div className={`${styles["main-pane-item"]} ${styles["even"]} `}>
              <p>
                Susajjan is a medical student, born and bred in Kathmandu. He is
                a sports enthusiast, but football is still his one true love.
                From listening to football on the radio, during his high school
                days to watching Gareth Bale bicycle kick his CL dreams away
                while being surrounded by a group of Real Madrid supporters in a
                live screening, Susajjan has been through it all as a Liverpool
                fan. He is a ride or die fan of the club and will do anything to
                defend his team. Apart from worshiping Jurgen Klopp and
                Liverpool, he is an avid traveler and loves to explore different
                places, cuisines, and adventure sports. Susajjan and Ishan are
                classmates and their daily banter about clubs, and love for
                football brought them together.
              </p>
              <figure
                className={styles["image-container"]}
                style={{ maxWidth: "1200px" }}
              >
                <img src="https://i.imgur.com/csVqT8O.jpg" />
              </figure>
            </div>

            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading"]}>Ojash Dangal, Co-Founder </h1>
            </div>

            <div className={`${styles["main-pane-item"]} ${styles["odd"]} `}>
              <figure className={styles["image-container"]}>
                <img src="https://i.imgur.com/zGAKRsH.jpg" />
              </figure>
              <p>
                Also pursuing his career in medicine currently, Ojash is a
                skeptical, cynical Liverpool fan who’s been following the club
                since about the last decade. He probably possesses the most
                knowledge about Liverpool after Jurgen Klopp and the other club
                employees. He's also someone who’s very fond of the trend of
                quantifying football via the use of data and metrics. Ojash
                regularly interacted with Ishan and Susajjan on Twitter and came
                on board immediately after the idea of creating this podcast was
                suggested. He is the calm, knowledgable voice in the False 9
                Podcast and is known for his pages of research before recording
                an episode. Apart from football, he likes playing snooker and is
                a connoisseur of good music.
              </p>
            </div>

            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading"]}>Madhu Acharya, Producer </h1>
            </div>

            <div className={`${styles["main-pane-item"]} ${styles["even"]} `}>
              <p>
                Madhu Acharya is the co-founder, President, and CEO of Sharecast
                Initiative Nepal, a not for profit distributing company that
                focuses on audience data and digital media platforms. He has
                over two decades of experience in radio program production,
                training, and media management. Madhu has worked for Internews
                and the BBC World Service Trust. He started his radio career at
                Radio Sagarmatha as a producer back in 1996. Madhu is a John S.
                Knight Fellow at Stanford University (2010-11). He is the
                producer of the podcast. He is also responsible for all of their
                equipment, recording, editing, post-production, and release of
                the podcast. This podcast wouldn’t have been possible without
                him. The boys just come up with the content, but he is the
                brains behind the project and makes everything tick.
              </p>
              <figure className={styles["image-container"]}>
                <img src="https://i.imgur.com/S7gichq.jpg" />
              </figure>
            </div>

            <div className={styles["main-pane-item"]}>
              <h1 className={styles["heading"]}>
                Sajal Satyal, Webpage Developer{" "}
              </h1>
            </div>

            <div className={`${styles["main-pane-item"]} ${styles["odd"]} `}>
              <figure
                className={styles["image-container"]}
                style={{ maxWidth: "1000px" }}
              >
                <img src="https://i.imgur.com/VAt6ABq.jpg" />
              </figure>
              <p>
                Sajal has just finished his Bachelor's degree in Computer
                Science. He's a self proclaimed Barca fan. Sajal can't remember
                the last time he watched a football match but he probably knows
                more about Barca than Bartomeu. His interest however lies in
                all things technology. Sajal is a curious person and likes to learn about
                different things. His witty sense of humor and constant self
                criticism is the reason he repeatedly challenged himself to do
                better while making this website.
              </p>
            </div>
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
              {/* <div style={{ position: "fixed", top: "103.5px", right: "0px"}}> */}
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
            selectedTrack={props.selectedTrack}
            setSelectedTrack={props.setSelectedTrack}
      
            forwardPodcasts={props.forwardPodcasts}
            rewindPodcasts={props.rewindPodcasts}
           
            audioRef={props.audioRef}

          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
