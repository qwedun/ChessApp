import React from 'react';
import styles from './navlink.module.scss'
import {NavLink} from "react-router-dom";

export const Navlink = ({url, children, to}) => {

    return (

        <NavLink to={to}>
            {({isActive}) => (
                <div className={isActive ? styles.active : styles.common}>
                    <img className={styles.img} alt={to} src={url}/> {children}
                </div>
            )}
        </NavLink>
    );
};
