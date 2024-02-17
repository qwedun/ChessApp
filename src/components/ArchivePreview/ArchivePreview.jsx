import React from 'react';
import styles from "./archivePreview.module.scss";
import {Link} from "react-router-dom";
import rapid from "../../assets/rapid.svg";
import blitz from "../../assets/blitz.svg";
import bullet from "../../assets/bullet.svg";

const ArchivePreview = () => {

    const types = {
        rapid: rapid,
        blitz: blitz,
        bullet: bullet,
    }

    const data = [{
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
        whiteElo: '804',
        black: 'twty',
        blackElo: '490',
        time: '1|2',
        winPlayer: 'twty',
    }, {
        type: 'rapid',
        white: 'qwedun',
        whiteElo: '800',
        black: 'ttet',
        blackElo: '500',
        time: 10,
        winPlayer: 'qwedun',
    }, {
        type: 'blitz',
        white: 'bbfr',
        whiteElo: '814',
        black: 'qwedun',
        blackElo: '890',
        time: 3,
        winPlayer: 'bbfr',
    }, {
        type: 'bullet',
        white: 'qwedun',
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
                            <div className={winPlayer === 'qwedun' ? styles.win : styles.lose}>
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