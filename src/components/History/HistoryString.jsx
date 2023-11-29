import { chessNotationString } from "../../helpers/helpers";
import styles from './historyString.module.scss'

const HistoryString = ({data, prevData, currentPlayer}) => {
    const figure = JSON.parse(data.currentFigure)
    let pos;

    const name = figure.name.charAt(0).toUpperCase() + figure.name.slice(1)

    const src = require(`../../board/assets/${figure.color}${name}.svg`)

    pos = chessNotationString(figure.y, figure.x, figure.color)

    //else pos = chessNotationString(7 - figure.y, 7 - figure.x)
    const previewName = (name === 'Pawn' ? '' : (name === 'Knight' ? 'N' : name[0]))



    return (
        <div>
            <img src={src} width='20px' height='20px'/>
            <span className={styles.text}>{previewName + pos}</span>
        </div>
    );
};

export default HistoryString;