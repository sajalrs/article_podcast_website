import React from "react";
import styles from "./LargeCard.module.css";
import {CardComponent} from "../Card"

const LargeCard = (props) => {
 
  return (
    <CardComponent    image={props.image}
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


export default LargeCard;
