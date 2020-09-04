import React,{useState, useEffect} from 'react'
import MenuItems from './MenuItems.js'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
    const [clicked, setClicked] = useState(false); 
    useEffect(() => {
        const updateDropDown = () =>{
            if(window.innerWidth > 1250 && clicked){
                setClicked(window.innerWidth < 1250);
            } 
        }
        window.addEventListener("resize", updateDropDown);
        return () => {
            window.addEventListener("resize", updateDropDown);
        }
    },[clicked])


    

    return(
        <div className={styles["Navbar"]}>
            <label className={styles["navbar-title"]}>THE FALSE 9</label>
            <nav>
                <div className={styles["navigation"]}>
                <ul className={clicked?`${styles["nav-links-list"]} ${styles["nav-links-list-active"]}`:`${styles["nav-links-list"]} ${styles["nav-links-list-inactive"]}`}>
    {MenuItems.map((item, index) => {return <li key={index} className={index%2===0?`${styles["list-item"]} ${styles["list-item-even"]}`:`${styles["list-item"]} ${styles["list-item-odd"]}`}><Link to={item.url} className={styles[item.className]}><label className={styles["link-text"]}>{item.title.toUpperCase()}</label></Link></li>;})}
                </ul>
                <ul className={styles["social-links"]}>
                    <li><i className={clicked?`${styles["fas"]} ${styles["fa-times"]} fas fa-times`:`${styles["fas"]} ${styles["fa-bars"]} fas fa-bars`} onClick={()=> {setClicked(!clicked);}}/></li>
                    <li><a href=""><i className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}/></a></li>
                    <li><a href=""><i className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}/></a></li>
                    <li><a href=""><i className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}/></a></li>
                </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;