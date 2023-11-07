
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import styles from './charts.module.scss'
export const RatingChart = () => {

    const ratingData = {
        labels: ['31.11.23', '01.11.23','02.11.23','03.11.23','04.11.23','05.11.23','06.11.23',],
        datasets: [{
            data: [610, 630, 620, 640, 620, 650, 660],
            backgroundColor: 'transparent',
            borderColor: '#81B34A',
            pointBorderColor: 'transparent',
            tension: 0.5,
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
                min: 300,
                max: 800,
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <span>Highest</span><span>900</span>
                </div>
                <div className={styles.infoContainer}>
                    <span>Games</span><span>102</span>
                </div>
                <div className={styles.infoContainer}>
                    <span>W/D/L</span>
                    <span>
                        <span style={{color: '#81B34A'}}>50</span><span>/50/</span><span style={{color: '#b54a4a'}}>2</span>
                    </span>
                </div>
            </div>
            <Line data={ratingData} options={options} className={styles.chart}/>
        </div>
    );
};

