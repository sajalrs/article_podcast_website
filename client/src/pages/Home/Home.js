import React,{useRef, useState, useEffect} from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";

const Home = (props) => {
  const [sidePanelFixed, setSidePanelFix] = useState(false);
  const headerBoxRef = useRef()
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  useEffect(() => {
    const fixNavbar = (e) => {
      if (window.scrollY >  (headerBoxRef.current.clientHeight-66)) {
       
        setSidePanelFix(true);
      } else {
        setSidePanelFix(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);
    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  },[sidePanelFixed]);
  const [homepageLinks, setHomePageLinks] = useState({
    links: []
  })
  useEffect(() => {
    console.log(React.version);
    const getHomepageLinks = async () => {
      const response = await fetch("/articles");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };


    getHomepageLinks().then((res) => {
      setHomePageLinks({links: res["links"]})
    });
    }, []);



  const renderOnceSidePanel =  (<SidePanel
  sideBarClicked={props.sideBarClicked}
  setSideBarClicked={props.setSideBarClicked}
   vidArray={[
     {
       title: "Podcast 1",
       image: props.getImageLink("jbG9LJs_Npg"),
       LinkType: Card.LinkType["video-youtube"],
       onClick: props.getLinkFunction(Card.LinkType["video-youtube"]),
       link: props.getEmbedPlayerLink("jbG9LJs_Npg"),
     },
     {
       title: "Podcast 2",
       image: props.getImageLink("g-4UdaC2-F8"),
       LinkType: Card.LinkType["video-youtube"],
       onClick: props.getLinkFunction(Card.LinkType["video-youtube"]),
       link: props.getEmbedPlayerLink("g-4UdaC2-F8"),
     },
   ]}
 />)
  return (
    
    <div className={styles["Home"]}>
    <Header ref={headerBoxRef} className={styles["Header"]} navbarClicked={props.navbarClicked} setNavbarClicked={props.setNavbarClicked}/>
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
            {homepageLinks.links.map((item) => {
                 return (<div className={`${styles["main-pane-item"]}`}>
                    <LargeCard
                      image={item.image}
                      date={item.date}
                      title={item.title}
                      text={item.description}
                      author={item.author}
                      LinkType={item.LinkType}
                      link={"article?page=" + item.to}
                      onClick={props.getLinkFunction(item.LinkType)}/>
                 </div>)
            })}
         

          {/* {props.fitLarge ? ( */}
            <div className={`${styles["main-pane-item"]} ${styles["l"]}`}>
              <LargeCard
                image="https://cdn.vox-cdn.com/thumbor/Iqe-7rOwNq_9R1DTTI1IBV9U-b4=/0x152:3840x2312/850x479/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67302945/Halo_App_and_Halo_Band.0.jpg"
                date="March 15, 2020"
                title="Youtubers Partying During Pandemic"
                text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                author="Ishan Sharma"
                LinkType={Card.LinkType["video-external"]}
                onClick={props.playVideo}
                link={props.getEmbedPlayerLink("g-4UdaC2-F8")}
              />
            </div>
            {/* <div className={`${styles["main-pane-item"]} ${styles["m"]}`}>
             </div>  <MediumCard
          //       image="https://cdn.vox-cdn.com/thumbor/Iqe-7rOwNq_9R1DTTI1IBV9U-b4=/0x152:3840x2312/850x479/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67302945/Halo_App_and_Halo_Band.0.jpg"
          //       date="March 15, 2020"
          //       title="Youtubers Partying During Pandemic"
          //       text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
          //       author="Ishan Sharma"
          //       LinkType={Card.LinkType["video-external"]}
          //       onClick={props.playVideo}
          //       link={props.getEmbedPlayerLink("g-4UdaC2-F8")}
          //     />
          //   </div>
          // )} */}
          <div className={`${styles["main-pane-item"]} ${styles["m"]}`}>
            <MediumCard
              image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
              date="March 15, 2020"
              title="Youtubers Partying During Pandemic"
              text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
              author="Ishan Sharma"
              LinkType={Card.LinkType["article-external"]}
              onClick={props.playVideo}
              link={props.getEmbedPlayerLink("g-4UdaC2-F8")}
            />
          </div>

          <div className={`${styles["main-pane-item"]} ${styles["m"]}`}>
            <MediumCard
              image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
              date="March 15, 2020"
              title="Youtubers Partying During Pandemic"
              text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
              author="Ishan Sharma"
              LinkType={Card.LinkType["article-external"]}
              onClick={props.playVideo}
              link={props.getEmbedPlayerLink("g-4UdaC2-F8")}
            />
          </div>
          <div className={`${styles["main-pane-item"]} ${styles["m"]}`}>
            <MediumCard
              // image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
              date="March 15, 2020"
              title="Youtubers Partying During Pandemic"
              text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
              author="Ishan Sharma"
              LinkType={Card.LinkType["video-youtube"]}
              onClick={props.getLinkFunction(Card.LinkType["video-youtube"])}
              link={props.getEmbedPlayerLink("g-4UdaC2-F8")}
            />
          </div>
        </div>
        <div className={styles["side-pane"]}>
         
          <SmallCard
              title="Podcast 1"
              image={props.getImageLink("jbG9LJs_Npg")}
              />
        </div>
        {sidePanelFixed ? (
          <div style={{ position: "fixed", top: (props.topOffset), right: "0px"}}>
            {renderOnceSidePanel}
          </div>
        
      ) : (
        <div style={{marginTop: (props.topOffset)}}>
          {renderOnceSidePanel}
        </div>
      )}
       
      </div>
    
      <div className={styles["footer-container"]}> 
          <Footer />
        </div>
    </div>
    
  );
};

export default Home;
