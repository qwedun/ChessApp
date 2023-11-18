import GameTypeTitle from '../../components/GameTypeTitle/GameTypeTitle'
import styles from './playPage.module.scss'

const PlayPage = () => {
    return (
        <div className={styles.titlesWrapper}>
            <GameTypeTitle time='1 + 0' type='Bullet'/>
            <GameTypeTitle time='2 + 1' type='Bullet'/>
            <GameTypeTitle time='3 + 0' type='Blitz'/>
            <GameTypeTitle time='3 + 2' type='Blitz'/>
            <GameTypeTitle time='5 + 0' type='Blitz'/>
            <GameTypeTitle time='5 + 3' type='Blitz'/>
            <GameTypeTitle time='10 + 0' type='Rapid'/>
            <GameTypeTitle time='10 + 5' type='Rapid'/>
            <GameTypeTitle time='15 + 10' type='Rapid'/>
        </div>
    );
};

export default PlayPage;