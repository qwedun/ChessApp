import styles from './eatenPieces.module.scss';
import { COLORS } from '../../../constants/constants';
import { BoardType } from "../../../types/types";
import { FC } from 'react'
import { figuresEvaluation } from "../../../helpers/helpers";

interface EatenPiecesProps {
    board: BoardType;
    currentPlayer: string;
}

const EatenPieces: FC<EatenPiecesProps> = ({board, currentPlayer}) => {
    if (!board) return

    const {evaluation , figures} = figuresEvaluation(board, currentPlayer);

    return (
        <>
            <div className={styles.flex}>
                {evaluation > 0 && <div className={styles.grade}>+{evaluation}</div>}
                {figures.map((value, index) => {
                    const marginLeft = (index === 0) ? '0px' : 18 * index + 'px';

                    return (
                        <div className={styles.container} style={{left: marginLeft}} key={index}>
                            {value.map((name, index) => {
                                return <img className={styles.img} alt='img' key={index}
                                            style={{left: 8 * index + 'px'}}
                                            src={require(`../../../board/assets/${COLORS[currentPlayer]}${name}.svg`)}/>
                            })}
                        </div>
                    )
                })}
            </div>
    </>);
};

export default EatenPieces;