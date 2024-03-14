// @ts-nocheck
import { useState, FC} from 'react';
import {Line} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import styles from './statisticsTitle.module.scss';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.svg';
import bullet from "../../assets/bullet.svg";


interface StatisticsTitleProps {
    data: {
    elos: number[];
    highest: number;
    total: string;
    lastUpdate: string;
    img: string;
    type: string;
    current: number;
    games: number;
}}

const StatisticsTitle: FC<StatisticsTitleProps> = ({data}) => {

    const [showStats, setShowStats] = useState(false);
    const ratingData = {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            data: data.elos,
            backgroundColor: 'transparent',
            borderColor: '#81B34A',
            pointBorderColor: 'transparent',
            tension: 0,
            animation: false,
        }],
    }

    const options = {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                min: 0,
                max: 800,
            }
        }
    }

    const handleClick = () => {
        showStats ? setShowStats(false) : setShowStats(true);
    }

    return (
        <>
            <div className={styles.container}
             onClick={handleClick}>
            <div className={styles.flex}>
                <img src={data.img}/>
                <span>{data.type}</span>
            </div>
            <div className={styles.flexWrap}>
                <div className={styles.info}>{data.current}</div>
                <img src={showStats ? arrowUp : arrowDown} width='32px'/>
            </div>
            </div>
        {showStats &&
            <>
                <div className={styles.chart}>
                    <Line data={ratingData} options={options}/>
                </div>
                <div className={styles.flexContainer}>
                    <div>Highest</div>
                    <div>{data.highest} DATE</div>
                </div>
                <div className={styles.flexContainer}>
                    <div>Games</div>
                    <div>{data.games}</div>
                </div>
                <div className={styles.flexContainer}>
                    <div>W/D/L</div>
                    <div>{data.total}</div>
                </div>
                <div className={styles.flexContainer}>
                    <div>Rating Change (30 days)</div>
                    <div>{data.lastUpdate}</div>
                </div>

            </>
        }
        </>
    )};

export default StatisticsTitle;