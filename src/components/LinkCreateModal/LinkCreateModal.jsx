import React, {useState} from 'react';
import styles from './linkCreateModal.module.scss'
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
import GameTypes from "../GameTypes/GameTypes";
import rapid from "../../assets/rapid.svg";
import pawn from '../../assets/pawn.svg'
import questionMark from '../../assets/questionMark.svg'

const LinkCreateModal = ({setShowModal}) => {

    const [showTypes, setShowTypes] = useState(false);
    const [game, setGame] = useState({time: '10', type: rapid});
    const [color, setColor] = useState('random');

    const handleClick = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    return (
        <div className={styles.modalWrapper} onClick={() => setShowModal(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.title}>
                    Link to the game
                    <div className={styles.close} onClick={() => setShowModal(false)}></div>
                </div>
                <div className={styles.subtitle}>Start a game with any enemy</div>
                <div className={styles.options}
                     onClick={() => showTypes ? setShowTypes(false) : setShowTypes(true)}>
                    <img className={styles.type} src={game.type} width='32px' height='32px'/>
                    <div>{game.time}</div>
                    <img alt='arrow' src={showTypes ? arrowUp : arrowDown} height='32px' width='32px' className={styles.img}/>
                </div>
                {showTypes && <GameTypes setGame={setGame} setShowTypes={setShowTypes}/>}
                <div className={styles.container}>
                    I play
                    <div className={styles.flex}>
                        <div className={`${styles.white} ${color === 'white' ? styles.active : ''}`}
                             onClick={() => setColor('white')}>
                            <img alt='pawn' width='30px' height='30px' src={pawn}/>
                        </div>
                        <div className={`${styles.random} ${color === 'random' ? styles.active : ''}`}
                             onClick={() => setColor('random')}>
                            <img className={styles.question} alt='pawn' width='30px' height='30px' src={questionMark}/>
                        </div>
                        <div className={`${styles.black} ${color === 'black' ? styles.active : ''}`}
                             onClick={() => setColor('black')}>
                            <img alt='pawn' width='30px' height='30px' src={pawn}/>
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    Create a link!
                </div>
            </div>
        </div>
    );
};

export default LinkCreateModal;