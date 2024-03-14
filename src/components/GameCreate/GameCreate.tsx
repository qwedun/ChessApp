import { useState, FC } from 'react';
import styles from './gameCreate.module.scss';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.svg';
import rapid from '../../assets/rapid.svg';
import GameTypes from "../GameTypes/GameTypes";
import LinkCreateModal from "../LinkCreateModal/LinkCreateModal";

const GameCreate: FC = () => {

    const [showTypes, setShowTypes] = useState(false);
    const [game, setGame] = useState({time: '10', type: rapid})
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.main}>
            <div className={styles.flex}>
                <div className={styles.options}
                     onClick={() => showTypes ? setShowTypes(false) : setShowTypes(true)}>
                    <img className={styles.type} src={game.type} width='32px' height='32px'/>
                    <div>{game.time}</div>
                    <img alt='arrow' src={showTypes ? arrowUp : arrowDown} height='32px' width='32px' className={styles.img}/>
                </div>
                {showTypes && <GameTypes setGame={setGame} setShowTypes={setShowTypes}/>}
                <div className={styles.play}>Play</div>
            </div>
            <div className={styles.flex}>
                <div className={styles.content}><span className={styles.friend}>Play with friend</span></div>
                <div className={styles.content}
                     onClick={() => setShowModal(true)}>Create a link to play</div>
            </div>
            <div>
                <div>0 plays</div>
                <div>0 games</div>
            </div>
            {showModal && <LinkCreateModal setShowModal={setShowModal}/>}
        </div>
    );
};

export default GameCreate;