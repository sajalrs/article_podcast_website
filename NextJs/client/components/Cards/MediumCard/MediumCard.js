import React from "react";
import styles from "./MediumCard.module.css";
import {CardComponent} from "../Card"

const MediumCard = (props) => {
 
  return (
    <CardComponent    
    image={props.image}
    index={props.index}
    date={props.date}
    title={props.title}
    text={props.description}
    author={props.author}
    isApproved={props.isApproved}
    isEditable={props.isEditable}
    contentType={props.contentType}
    link={props.link}
    styles={styles}/>
  );
};


export default MediumCard;
