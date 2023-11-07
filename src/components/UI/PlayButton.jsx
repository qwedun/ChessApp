import styles from './playButton.module.scss'
import arrow from '../../assets/angle-right.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import './playButtonStates.scss'
import {setBarStatus, setCircleStatus} from "../../store/slices/playButtonSlice";


export const PlayButton = ({isHide}) => {
    const state = useSelector(state => state.playButtonStatus)
    const dispatch = useDispatch()

    function handleClick(e) {
        if (state.barStatus === 'showBarOpening' || state.barStatus === 'showBarActive') return
        dispatch(setBarStatus('showBarOpening'))
        dispatch(setCircleStatus('showCircleOpening'))
    }

    return (
        <>
            <NavLink
                className={styles.link}
                onClick={handleClick}
                to='play'>
                <div className={isHide ? styles.hide : styles.show}>
                    <div
                        className={styles.bar}>
                        <div className={state.barStatus + ' progressBar'}></div>
                    </div>
                    <div className={state.circleStatus + ' circle'}>
                        <img className={styles.img} src={arrow}/>
                    </div>
                </div>
            </NavLink>
        {isHide &&
            <div className={styles.circleHide}>
                <img className={styles.img} src={arrow}/>
            </div>}
        </>
    );
};