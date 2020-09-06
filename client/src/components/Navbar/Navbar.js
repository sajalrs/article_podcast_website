import React,{useState, useEffect} from 'react'
import MenuItems from './MenuItems.js'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = (props) => {


    

    return(
        <div className={styles["Navbar"]}>
            <label className={styles["navbar-title"]}>THE FALSE 9</label>
            <nav>
                <div className={styles["navigation"]}>
                <ul className={props.navbarClicked?`${styles["nav-links-list"]} ${styles["nav-links-list-active"]}`:`${styles["nav-links-list"]} ${styles["nav-links-list-inactive"]}`}>
    {MenuItems.map((item, index) => {return <li key={index} className={index%2===0?`${styles["list-item"]} ${styles["list-item-even"]}`:`${styles["list-item"]} ${styles["list-item-odd"]}`}><Link onClick={() => {if(props.sideBarClicked){props.setSideBarClicked(false)};props.setNavbarClicked(false);}} to={item.url} className={styles[item.className]}><label className={styles["link-text"]}>{item.title.toUpperCase()}</label></Link></li>;})}
                </ul>
                <ul className={styles["social-links"]}>
                    <li><i className={props.navbarClicked?`${styles["fas"]} ${styles["fa-times"]} fas fa-times`:`${styles["fas"]} ${styles["fa-bars"]} fas fa-bars`} onClick={()=> {props.setNavbarClicked(!props.navbarClicked);}}/></li>
                    <li><a href=""><i className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}/></a></li>
                    <li><a href="https://twitter.com/TFalse9podcast" target="_blank"><i className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}/></a></li>
                    <li><a href="https://www.youtube.com/channel/UCV2Y62okiOmoXzYIh_xAcGw" target="_blank"><i className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}/></a></li>
                </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;