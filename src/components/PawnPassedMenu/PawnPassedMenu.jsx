import styles from './pawnPassedMenu.module.scss'

const PawnPassedMenu = ({currentPlayer, setPawnPassed, pawnPassed, pawnIndex}) => {
    const figures = ['Queen', 'Knight', 'Bishop', 'Rook'];
    const left = 70 * pawnIndex + 'px';

    const handleClick = (index) => {
        setPawnPassed(figures[index]);
    }

    return (
        <div className={styles.menu} style={{left: left}}>
            {figures.map((value, index) => {
                return (
                    <div
                        className={styles.wrapper}
                        onClick={() => handleClick(index)}>
                        <img
                        className={styles.img}
                        alt={value}
                        src={require(`../../board/assets/${currentPlayer + value + '.svg'}`)}/>
                    </div>
                )
            })}
        </div>
    );
};

export default PawnPassedMenu;