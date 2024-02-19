import styles from './recentMatches.module.scss';
import RecentMatch from "../RecentMatch/RecentMatch";
import {useSelector} from "react-redux";

const RecentMatches = () => {
    const login = useSelector(state => state.user.login)

    const data = [{
        type: 'rapid',
        blackPlayer: login,
        whitePlayer: 'enemy',
        winColor: 'white',
        winPlayer: 'kachok',
        blackPlayerElo: '801',
        whitePlayerElo: '832'
    }, {
        type: 'blitz',
        blackPlayer: 'enemy',
        whitePlayer: login,
        winColor: 'black',
        winPlayer: 'rustam',
        blackPlayerElo: '821',
        whitePlayerElo: '788'
    }, {
        type: 'bullet',
        blackPlayer: 'enemy',
        whitePlayer: login,
        winPlayer: login,
        winColor: 'white',
        blackPlayerElo: '821',
        whitePlayerElo: '788'
    }]

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div></div>
                <div>Players</div>
                <div>Result</div>
                <div>Accuracy</div>
                <div>Turns</div>
                <div>Date</div>
            </div>
            <div className={styles.wrapper}>
                {data.map(data => <RecentMatch data={data} login={login}/>)}
            </div>
        </div>
    );
};

export default RecentMatches;