import styles from './pawnPassedMenu.module.scss'
import { useCurrentPlayer } from "../../hooks/hooks";
const PawnPassedMenu = ({setCreatedFigure, passedPawn}) => {
    const currentPlayer = useCurrentPlayer();

    const figures = [
        {figure: 'Queen'},
        {figure: 'Knight'},
        {figure: 'Bishop'},
        {figure: 'Rook'}
    ];
    const left = 70 * passedPawn.x + 'px';

    const handleClick = (index) => setCreatedFigure(figures[index].figure);

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