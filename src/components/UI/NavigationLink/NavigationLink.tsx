import React from 'react';
import styles from './navlink.module.scss';
import { NavLink } from "react-router-dom";
import { FC } from 'react';

interface NavigationLinkProps {
    url: string;
    children: string;
    to: string;
    isHide: boolean;
}

export const NavigationLink: FC<NavigationLinkProps> = ({url, children, to, isHide}) => {
    return (
        <NavLink to={to} className={({isActive}) => isActive ? styles.active : styles.common}>
                <img alt={to} src={url}/>
            {!isHide && <div className={styles.text}>{children}</div>}
        </NavLink>
    );
}
