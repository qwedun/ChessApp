import React from 'react';
import styles from "./archivePreview.module.scss";
import {Link} from "react-router-dom";
import rapid from "../../assets/rapid.svg";
import blitz from "../../assets/blitz.svg";
import bullet from "../../assets/bullet.svg";
import {useSelector} from "react-redux";

const ArchivePreview = () => {
    
    const login = useSelector(state => state.user.login)

    const types = {
        rapid: rapid,
        blitz: blitz,
        bullet: bullet,
    }

    const data = [{
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: login,
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: login,
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: login,
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: login,
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }];

    return (
        <>
            <div className={styles.wrapper}>
                {data.map(value => {
                    const {type, white, black, winPlayer, time, whiteElo, blackElo} = value;
                    return (
                        <div className={styles.container}>
                            <img alt='type' width='24px' height='24px' src={types[type]}/>
                            <div className={styles.player}>{white} ({whiteElo})</div>
                            <div className={styles.player}>{black} ({blackElo})</div>
                            <div className={winPlayer === login ? styles.win : styles.lose}>
                                {winPlayer === white ? '1-0' : '0-1'}
                            </div>
                            <div>{time}</div>
                        </div>
                    )})}
            </div>
            <Link className={styles.link} to={'/archive'}>See full archive</Link>
        </>
    );
};

export default ArchivePreview;