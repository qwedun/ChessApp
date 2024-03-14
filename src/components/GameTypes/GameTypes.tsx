import { FC } from 'react';
import styles from './gameTypes.module.scss';
import Bullet from '../../assets/bullet.svg';
import Rapid from '../../assets/rapid.svg';
import Blitz from '../../assets/blitz.svg';

interface GameTypesInterface {
    setGame: (game: {time: string; type: string}) => void;
    setShowTypes: (show: boolean) => void;
}

const GameTypes: FC<GameTypesInterface> = ({setGame, setShowTypes}) => {

    const handleClick = (time:string, type:string) => {
        setShowTypes(false);
        setGame({time: time, type: type});
    }

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={styles.container} onClick={() => handleClick('1', Bullet)}>1</div>
                <div className={styles.container} onClick={() => handleClick('1|1', Bullet)}>1|1</div>
                <div className={styles.container} onClick={() => handleClick('2|1', Bullet)}>2|1</div>
                <div className={styles.container} onClick={() => handleClick('3', Blitz)}>3</div>
                <div className={styles.container} onClick={() => handleClick('3|2', Blitz)}>3|2</div>
                <div className={styles.container} onClick={() => handleClick('5', Blitz)}>5</div>
                <div className={styles.container} onClick={() => handleClick('10', Rapid)}>10</div>
                <div className={styles.container} onClick={() => handleClick('15|10', Rapid)}>15|10</div>
                <div className={styles.container} onClick={() => handleClick('30', Rapid)}>30</div>
            </div>
        </div>
    );
};

export default GameTypes;