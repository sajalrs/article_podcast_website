import React,{useState, useEffect} from 'react'
import MenuItems from './MenuItems.js'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import FalseNineIcon from '../../Icons/FalseNineFitting'
import {useSelector, useDispatch} from 'react-redux'
import {setNavbarClicked, setSidebarClicked, setTopOffset} from '../.././actions';

const Navbar = (props) => {
    const navbarClicked = useSelector(state => state.navbar.clicked)
    const sidebarClicked = useSelector(state => state.sidebar.clicked)
    const topOffset = useSelector(state => state.sidebar.topOffset)
    const dispatch = useDispatch();
    useEffect(() => {
    
            if (navbarClicked) {
                dispatch(setTopOffset(topOffset + 140));
              dispatch(setSidebarClicked(false));
            } else {
              if (topOffset != 100) {
                dispatch(setTopOffset(topOffset - 140));
              }
            }
   
    }, [navbarClicked])

    useEffect(() => {
        const updateDropDown = () => {
          if (window.innerWidth > 1250 && navbarClicked) {
            dispatch(setNavbarClicked(window.innerWidth < 1250));
          }
        };
        window.addEventListener("resize", updateDropDown);
        return () => {
          window.addEventListener("resize", updateDropDown);
        };
      }, [navbarClicked]);

    return(
        <div className={styles["Navbar"]}>
            <div className={styles["navbar-title-logo"]}><FalseNineIcon width="37px" height="37px"/><label className={styles["navbar-title"]}>THE FALSE 9</label></div>
            <nav>
                <div className={styles["navigation"]}>
                <ul className={navbarClicked?`${styles["nav-links-list"]} ${styles["nav-links-list-active"]}`:`${styles["nav-links-list"]} ${styles["nav-links-list-inactive"]}`}>
    {MenuItems.map((item, index) => {return <li key={index} className={index%2===0?`${styles["list-item"]} ${styles["list-item-even"]}`:`${styles["list-item"]} ${styles["list-item-odd"]}`}><Link onClick={() => {if(sidebarClicked){dispatch(setSidebarClicked(false))};dispatch(setNavbarClicked(false));}} to={item.url} className={styles[item.className]}><label className={styles["link-text"]}>{item.title.toUpperCase()}</label></Link></li>;})}
                </ul>
                <ul className={styles["social-links"]}>
                    <li><i className={navbarClicked?`${styles["fas"]} ${styles["fa-times"]} fas fa-times`:`${styles["fas"]} ${styles["fa-bars"]} fas fa-bars`} onClick={()=> {dispatch(setNavbarClicked(!navbarClicked));}}/></li>
                    <li><a href="https://www.facebook.com/False9Podcast" target="_blank"><i className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}/></a></li>
                    <li><a href="https://twitter.com/TFalse9podcast" target="_blank"><i className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}/></a></li>
                    <li><a href="https://www.youtube.com/channel/UCV2Y62okiOmoXzYIh_xAcGw" target="_blank"><i className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}/></a></li>
                    <li><a href="https://www.instagram.com/thefalse9podcast/" target="_blank"><i className={`${styles["fab"]} ${styles["fa-instagram"]} fab fa-instagram`}/></a></li>
                    <li><a href="https://hamroaudio.appspot.com/feed/podcast/5656298525818880?fbclid=IwAR1fGF-0jFifAl5MVsMAODjFWAcUTtyPTXQHpDCfKqx1Nr0zoLwGqGmZV2g" target="_blank"><i className={`${styles["fas"]} ${styles["fas-rss"]} fas fa-rss`}/></a></li>
           
                </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
