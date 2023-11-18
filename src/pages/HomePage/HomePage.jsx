import styles from './homePage.module.scss'
import {RatingChart} from "../../components/UI/Charts/RatingChart";
import {PartiesChart} from "../../components/UI/Charts/PartiesChart";

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

