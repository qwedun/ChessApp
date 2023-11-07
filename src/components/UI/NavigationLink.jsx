import React from 'react';
import styles from './navlink.module.scss'
import {NavLink, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {setCircleStatus, setBarStatus} from "../../store/slices/playButtonSlice";


export const NavigationLink = ({url, children, to, isHide}) => {
    const playButton = useSelector(state => state.playButtonStatus)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    function handleClick(state) {
        if (state === 'showBarOpening' || state === 'showBarActive') {
            dispatch(setBarStatus('showBarClosing'))
            dispatch(setCircleStatus('showCircleClosing'))
        }
    }

    return (

        <NavLink to={to}
                 onClick={() => handleClick(playButton.barStatus)}
                 className={({isActive}) => isActive ? styles.active : styles.common}>
                <img alt={to} src={url}/>
            {!isHide && children}
        </NavLink>
    );
};
