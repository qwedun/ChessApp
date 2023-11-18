import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import styles from './partiesChart.module.scss'

export const PartiesChart = () => {
    const data = {
        labels: ['Wins', 'Loses', 'Ties'],
        datasets: [{
            data: [20, 14, 3],
            borderWidth: 0,
                backgroundColor: ['#81B34A', '#b54a4a', 'grey', ]
        }]
    }
    const options = {
        plugins: {
            legend: false,
        },
        cutout: '70%',
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div>All Games</div>
                <div className={styles.info}>
                    <div className={styles.won}>
                        <div className={styles.circle + ' ' + styles.green}></div>
                        Won
                    </div>
                    <div className={styles.drawn}>
                        <div className={styles.circle + ' ' + styles.grey}></div>
                        Drawn
                    </div>
                    <div className={styles.lost}>
                        <div className={styles.circle + ' ' + styles.red}></div>
                        Lost
                    </div>
                </div>
            </div>
            <div className={styles.pie}>
                <Doughnut data={data} options={options}/>
            </div>
        </div>
    );
};

