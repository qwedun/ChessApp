import styles from './eatenPieces.module.scss'

const EatenPieces = ({board, currentPlayer}) => {
    if (!board) return;

    const colors = {
        black: 'white',
        white: 'black'
    }

    const figuresCount = {
        queen: {count:1, grade: 9},
        rook: {count:2, grade: 5},
        bishop: {count:2, grade: 3},
        knight: {count:2, grade: 3},
        pawn: {count:8, grade:1},
    }
    let grade = 0;
    const figures = [];

    board.forEach(row => row.forEach(title => {
        const {color, name} = title;

        if (!name || name === 'king') return;

        if (color !== currentPlayer) {
            figuresCount[name].count -= 1;
            grade -= figuresCount[name].grade;
        } else grade += figuresCount[name].grade;
    }))

    for (let key of Object.keys(figuresCount)) {
        if (!figuresCount[key].count) continue;

        figures.push([]);
        for (let j = 0; j < figuresCount[key].count; j++) {
            figures[figures.length - 1].push(key[0].toUpperCase() + key.slice(1));
        }
    }

    return (
        <>
            <div className={styles.flex}>
                {grade > 0 && <div className={styles.grade}>+{grade}</div>}
                {figures.map((value, index) => {
                    const marginLeft = (index === 0) ? '0px' : 30 * index + 'px';

                    return (
                        <div className={styles.container} style={{left: marginLeft}} key={index}>
                            {value.map((name, index) => {
                                return <img className={styles.img} alt='img' key={index}
                                            style={{left: 8 * index + 'px'}}
                                            src={require(`../../../board/assets/${colors[currentPlayer]}${name}.svg`)}/>
                            })}
                        </div>
                    )
                })}
            </div>
    </>);
};

export default EatenPieces;