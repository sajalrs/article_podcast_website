import React from "react"
import styles from './TextEditor.module.css'
const FormatToolbar = (props) => (
    <div className={styles["format-toolbar"]}>
        {props.children}
    </div>
)

export default FormatToolbar;