import React,{useRef, useState, useEffect} from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import {useHistory} from 'react-router-dom'

const Home = (props) => {
  const history = useHistory();
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
      const response = await fetch("/articles/pages");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };


    getHomepageLinks().then((res) => {
      setHomePageLinks({links: res["links"]})
    });
    }, []);

    const getLinkFunction = (linkType) => {
      switch (linkType) {
        case Card.LinkType["video-youtube"]:
          return props.playVideo;
        case Card.LinkType["article-internal"]:
          return ((articleLink) => {
            history.push(articleLink);
          });
        default:
          break;
      }
    };


  const renderOnceSidePanel =  (<SidePanel
  sideBarClicked={props.sideBarClicked}
  setSideBarClicked={props.setSideBarClicked}
   vidArray={[
     {
       title: "Podcast 1",
       image: props.getImageLink("jbG9LJs_Npg"),
       LinkType: Card.LinkType["video-youtube"],
       onClick: getLinkFunction(Card.LinkType["video-youtube"]),
       link: props.getHyperLink(Card.LinkType["video-youtube"])("jbG9LJs_Npg"),
     },
     {
       title: "Podcast 2",
       image: props.getImageLink("g-4UdaC2-F8"),
       LinkType: Card.LinkType["video-youtube"],
       onClick: getLinkFunction(Card.LinkType["video-youtube"]),
       link: props.getHyperLink(Card.LinkType["video-youtube"])("g-4UdaC2-F8"),
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
                      link={props.getHyperLink(item.LinkType)(item.to)}
                      onClick={getLinkFunction(item.LinkType)}/>
                 </div>)
            })}
         
     
        </div>
        <div className={styles["side-pane"]}>
         
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
