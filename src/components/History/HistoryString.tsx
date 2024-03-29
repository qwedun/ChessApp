import { chessNotationString } from "../../helpers/helpers";
import styles from './historyString.module.scss'
import { FC } from 'react'
import { IFirestoreData } from "../../types/types";

interface HistoryStringProps {
    data: IFirestoreData;
    handleClick: () => void;
}

const HistoryString: FC<HistoryStringProps> = ({data, handleClick}) => {
    if (!data.currentFigure) return <div></div>

    const figure = JSON.parse(data.currentFigure)
    const name = figure.name.charAt(0).toUpperCase() + figure.name.slice(1)
    const src = require(`../../board/assets/${figure.color}${name}.svg`)
    const pos = chessNotationString(figure.y, figure.x, figure.color)
    const previewName = (name === 'Pawn' ? '' : (name === 'Knight' ? 'N' : name[0]))

    return (
        <div className={styles.container} onClick={() => handleClick()}>
            <img className={styles.img} src={src} width='20px' height='20px' alt={name}/>
            <span className={styles.text}>{previewName + pos}</span>
        </div>
    );
};

export default HistoryString;