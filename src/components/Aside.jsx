import styles from './aside.module.scss'
import {Navlink} from "./UI/Navlink";
import {Avatar} from "./UI/Avatar";
import home from '../assets/home.svg'
import socials from '../assets/users-alt.svg'
import title from '../assets/board.svg'
import settings from '../assets/settings-sliders.svg'
import {PlayButton} from "./UI/PlayButton";

export const Aside = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>Chess</div>
            <div className={styles.profile}>
                <Avatar/>
                <div className={styles.container}>
                    <div className={styles.info}>USERNAME</div>
                    <div className={styles.info}> ELO</div>
                </div>
            </div>
            <PlayButton/>
            <Navlink to='/home' url={home}>Home</Navlink>
            <Navlink to='/socials' url={socials}>Socials</Navlink>
            <Navlink to='/board' url={title}>Board</Navlink>
            <Navlink to='/settings' url={settings}>Settings</Navlink>
        </div>
    )
}

