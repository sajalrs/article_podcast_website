import React,{useState, useEffect, useRef} from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./ArticlePage.module.css";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

const ArticlePage = (props) => {

  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    sections: [{title: "", text: ""}],
    images: [{src: "", caption: ""}]
  })

  const largeCardRef = useRef();
  useEffect(() => {
    const getArticle = async () => 
    {
      const response = await fetch('/articles');
      const body = await response.json();
      if(response.status !== 200) throw Error(body.message);
      
      return body;
    } 

    getArticle()
      .then(res => {setArticle({
        title: res.title,
        author: res.author,
        date: res.date,
        images: res.images,
        sections: res.sections})
      })

      console.log(article)
  },[article.title])


  return (
    <div className={styles["ArticlePage"]}>
      <Header />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          <div className={styles["main-pane-item"]}>
          <LargeCard
              title={article.title}
              author={article.author}
              date ={article.date}
              image={article.images[0].src}
              />
              
            {article.sections.map((item) => { return <p>{item.text}</p>})}
          </div>
            
          </div>
        </div>
 
        <div className={styles["side-pane"]}>
          <SidePanel
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
          />
        </div>
      <div className="footer-container"> 
          <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
