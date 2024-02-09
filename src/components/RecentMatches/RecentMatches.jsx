import styles from './recentMatches.module.scss';
import RecentMatch from "../RecentMatch/RecentMatch";

const RecentMatches = () => {

    const data = [{
        type: 'rapid',
        blackPlayer: 'qwedun',
        whitePlayer: 'kachok',
        winColor: 'white',
        winPlayer: 'kachok',
        blackPlayerElo: '801',
        whitePlayerElo: '832'
    }, {
        type: 'blitz',
        blackPlayer: 'rustam',
        whitePlayer: 'qwedun',
        winColor: 'black',
        winPlayer: 'rustam',
        blackPlayerElo: '821',
        whitePlayerElo: '788'
    }, {
        type: 'bullet',
        blackPlayer: 'qwedun',
        whitePlayer: 'canek',
        winPlayer: 'canek',
        winColor: 'white',
        blackPlayerElo: '821',
        whitePlayerElo: '788'
    }]

    return (
        <div className={styles.main}>
            <div className={styles.flex}>
                <div className={styles.title}></div>
                <div className={styles.playersTitle}>Players</div>
                <div className={styles.title}>Result</div>
                <div className={styles.title}>Accuracy</div>
                <div className={styles.title}>Turns</div>
                <div className={styles.title}>Date</div>
            </div>
            <div className={styles.wrapper}>
                {data.map(data => <RecentMatch data={data}/>)}
            </div>
        </div>
    );
};

export default RecentMatches;