import styles from './recentMatch.module.scss'
import redMinus from '../../assets/redMinus.svg'
import greenPlus from '../../assets/greenPlus.svg'
import rapid from '../../assets/rapid.svg'
import blitz from '../../assets/blitz.svg'
import bullet from '../../assets/bullet.svg'
const RecentMatch = ({data}) => {
    const types = {
        'rapid': rapid,
        'blitz': blitz,

    }


    return (
        <div className={styles.main}>
            <div className={`${styles.title}`}><img/></div>
            <div className={styles.players}>
                <div>{data.whitePlayer}({data.whitePlayerElo})</div>
                <div>{data.blackPlayer}({data.blackPlayerElo})</div>
            </div>
            <div className={`${styles.title}`}>
                <div className={styles.flex}>
                    <div className={styles.flexColumn}>
                        <div>0</div>
                        <div>1</div>
                    </div>
                    <img/>
                </div>
            </div>
            <div className={`${styles.title}`}>2</div>
            <div className={`${styles.title}`}>2</div>
            <div className={`${styles.title}`}>2</div>
        </div>
    );
};

export default RecentMatch;