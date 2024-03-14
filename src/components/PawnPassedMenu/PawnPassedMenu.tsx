import styles from './pawnPassedMenu.module.scss';
import { useCurrentPlayer } from "../../hooks/hooks";
import { IFigure } from "../../types/types";
import { FC } from 'react';
import { FIGURES } from "../../constants/constants";

interface PawnPassedMenuProps {
    setCreatedFigure: (value: string) => void;
    passedPawn: IFigure | null;
}
const PawnPassedMenu: FC<PawnPassedMenuProps>  = ({setCreatedFigure, passedPawn}) => {
    const currentPlayer = useCurrentPlayer();

    const left = 70 * passedPawn!.x + 'px';

    const handleClick = (index: number) => setCreatedFigure(FIGURES[index].figure);

    return (
        <div className={styles.menu} style={{left: left}}>
            {FIGURES.map((value, index) => {
                return (
                    <div
                        className={styles.wrapper}
                        onClick={() => handleClick(index)}>
                        <img
                        className={styles.img}
                        alt={value.figure}
                        src={require(`../../board/assets/${currentPlayer + value.figure + '.svg'}`)}/>
                    </div>
                )
            })}
        </div>
    );
};

export default PawnPassedMenu;