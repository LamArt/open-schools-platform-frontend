import React from "react";
import styles from "./AboutEmplyee.module.css";

function AboutEmployee(props) {
    const employeeData = Object.entries(props.data);
    return (
        <>
            <div className={styles.container}>
                {employeeData.map((title) => (
                    <p key={title[0]} className={styles.title_container}>
                        <span className={styles.title}>{title[0]}:</span>
                        {title[1]}
                    </p>
                ))}
            </div>
        </>
    );
}

export default AboutEmployee;
