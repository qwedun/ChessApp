import styles from './pawnPassedMenu.module.scss'

const PawnPassedMenu = ({currentPlayer, setPawnPassed, pawnIndex}) => {
    const figures = [
        {figure: 'Queen'},
        {figure: 'Knight'},
        {figure: 'Bishop'},
        {figure: 'Rook'}
    ];
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
                        src={require(`../../board/assets/${currentPlayer + value.figure + '.svg'}`)}/>
                    </div>
                )
            })}
        </div>
    );
};

export default PawnPassedMenu;