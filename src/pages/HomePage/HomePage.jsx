import styles from './homePage.module.scss'
import {RatingChart} from "../../components/UI/RatingChart";
import {PartiesChart} from "../../components/UI/PartiesChart";

const HomePage = () => {
    return (
        <>
            <div className={styles.title}>
                Stats and Games
            </div>
            <div className={styles.chartsContainer}>
                <RatingChart/>
                <PartiesChart/>
            </div>
        </>
    );
};
export default HomePage

