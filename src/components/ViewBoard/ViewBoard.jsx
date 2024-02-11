import styles from './viewBoard.module.scss'


const ViewBoard = ({board}) => {
    return (
        <div className={styles.chessboard}>
            <div className={styles.arrow}></div>
            {board.map((row, yIndex) => {
                return row.map((figure, xIndex) => {
                    const cellColor = ((xIndex + yIndex) % 2) ? styles.black : styles.white;
                    return (
                        <div className={cellColor}>
                            {figure.src &&
                                <img
                                    className={styles.img}
                                    src={require('../../board' + figure.src)}
                                    alt={figure.color + figure.name}/>}
                        </div>
                    )
                })
            })}
        </div>
    );
};

export default ViewBoard;