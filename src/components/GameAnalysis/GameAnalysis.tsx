import styles from './gameAnalysis.module.scss'
import { useState, FC} from "react";
import History from "../History/History";
import Evaluate from "../Evaluate/Evaluate";
import { IFirestoreData, BoardType } from "../../types/types";

interface GameAnalysisProps {
    data: IFirestoreData[];
    setBoard: (board: BoardType) => void;
}

const GameAnalysis: FC<GameAnalysisProps> = ({data, setBoard}) => {

    const [depth, setDepth] = useState('14');
    const [evaluation, setEvaluation] = useState(true);
    const [variation, setVariation] = useState(true);
    const [lines, setLines] = useState('3');

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.grid}>
                <label className={styles.checkboxWrapper}>
                    Evaluation
                    <input defaultChecked onChange={() => setEvaluation(!evaluation)} type='checkbox' className={styles.checkbox}/>
                </label>
                <label className={styles.checkboxWrapper}>
                    Variations
                    <input defaultChecked onChange={() => setVariation(!variation)} type='checkbox' className={styles.checkbox}/>
                </label>
                <div> <span className={styles.engineTitle}>Depth</span>
                    <select value={depth} onChange={(e) => setDepth(e.target.value)}>
                        <option value={14}>14</option>
                        <option value={16}>16</option>
                        <option value={18}>18</option>
                        <option value={20}>20</option>
                        <option value={22}>22</option>
                        <option value={25}>25</option>
                    </select>
                </div>
                <div> <span className={styles.engineTitle}>Lines</span>
                    <select value={lines} onChange={(e) => setLines(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>
            {evaluation &&  <Evaluate/>}
            <History data={data} setBoard={setBoard}/>
        </div>
    );
};

export default GameAnalysis;