import React from 'react';
import styles from './CurrentGames.module.scss';
import rapid from '../../assets/rapid.svg';
import blitz from '../../assets/blitz.svg';
import bullet from '../../assets/bullet.svg'
const CurrentGames = () => {

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
        <div className={styles.wrapper}>
            {data.map(value => {
                    const {type, white, whiteElo, black, blackElo, time} = value;
                    return (
                        <div className={styles.container}>
                            <div className={styles.players}>
                                <div>{white} ({whiteElo})</div>
                                <div>{black} ({blackElo})</div>
                            </div>
                            <img width='32px' alt='type' src={types[type]} />
                            <div>
                                {time}
                            </div>
                        </div>
                    )
                })}
        </div>
    );
};

export default CurrentGames;