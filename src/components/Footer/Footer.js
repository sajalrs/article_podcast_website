import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
    return(
       <div className={styles["footer-container"]}>
           <section className={styles["footer-subscription"]}>
               <p className={styles["footer-subscription-heading"]}>
                   Join our weekly newsletter
               </p>

               <div className={styles["input-area"]}>
                    <form>
                        <input type="email" name="email" placeholder="Enter your email" className={styles["footer-input"]}/>
                        <input type="submit" className={styles["submit-btn"]} value="Subscribe"/>
                    </form>
               </div>
           </section>

            <div className={styles["footer-links"]}>
                <div className={styles["footer-link-wrapper"]}>
                    <div className={styles["footer-link-items"]}>
                        <h2>About Us</h2>
                        <a href="">Team</a>
                        <a href="">Contact</a>
                        <a href="">Support</a>
                        <a href="">Advertisements</a> 
                    </div>
                    <div className={styles["footer-link-items"]}>
                     <h2>Podcasts</h2>
                        <a href="">Anchor</a>
                        <a href="">Spotify</a>
                        <a href="">Apple Music</a>
                        <a href="">Hamro Patro</a>
                    </div>
                </div>

       

                <div className={styles["footer-link-wrapper"]}>
                    <div className={styles["footer-link-items"]}>
                    <h2>Social</h2>
                        <a href="">Facebook</a>
                        <a href="">Twitter</a>
                        <a href="">Instagram</a> 
                        <a href="">YouTube</a>   
                    </div>
                    <div className={styles["footer-link-items"]}>
                    <h2>Legal</h2>
                        <a href="">Privacy</a>
                        <a href="">Terms of Service</a>
  
                </div>
                </div>

         
            </div>



           <small className={styles["website-rights"]}>The False 9 Podcast ©</small>
           <section className={styles["social-media"]}>
                <div className={styles["social-media-wrap"]}>
                    <div className={styles["social-icons"]}>
                    <a href="" className={styles["social-icon-link"]}><i className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}/></a>
                    <a href="" className={styles["social-icon-link"]}><i className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}/></a>
                    <a href="" className={styles["social-icon-link"]}><i className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}/></a>
                    </div>
                </div>

           </section>
       </div>
    );

};

export default Footer;