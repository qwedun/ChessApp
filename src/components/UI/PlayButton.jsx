import styles from './playButton.module.scss'
import arrow from '../../assets/angle-right.svg'
import {NavLink} from "react-router-dom";
import {useState} from "react";

export const PlayButton = () => {



    return (
            <div className={styles.bar}>
                <div className={styles.circle}>
                    <img className={styles.img} src={arrow}/>
                </div>
            </div>

    );
};