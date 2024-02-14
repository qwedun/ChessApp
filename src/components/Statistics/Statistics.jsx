import {useState} from 'react';
import styles from './statistics.module.scss';
import bullet from '../../assets/bullet.svg';
import rapid from '../../assets/rapid.svg';
import blitz from '../../assets/blitz.svg';
import StatisticsTitle from "../StatisticsTitle/StatisticsTitle";

const Statistics = () => {

    const objs = [{
        elos: [100, 200, 300, 400],
        highest: 942,
        total: '400/130/220',
        lastUpdate: '+16',
        img: rapid,
        type: 'Rapid',
        current: 442,
        games: 600,
    },{
        elos: [100, 200, 300, 400],
        highest: 142,
        total: '201/120/210',
        lastUpdate: '-15',
        img: blitz,
        type: 'Blitz',
        current: 542,
        games: 600,
    },{
        elos: [100, 200, 300, 400],
        highest: 404,
        total: '301/102/254',
        lastUpdate: '+21',
        img: bullet,
        type: 'Bullet',
        current: 642,
        games: 600,
    }]

    return (
        <div className={styles.main}>
            <div className={styles.title}>Statistics</div>
            {objs.map((data) => (
                <StatisticsTitle data={data}/>
            ))}
        </div>
    );
};

export default Statistics;