import styles from './aside.module.scss'
import {NavigationLink} from "./UI/NavigationLink";
import {Avatar} from "./UI/Avatar";
import home from '../assets/home.svg'
import socials from '../assets/users-alt.svg'
import title from '../assets/board.svg'
import settings from '../assets/settings-sliders.svg'
import archive from '../assets/archive.svg'
import leftArrow from '../assets/angle-small-left.svg'
import rightArrow from '../assets/angle-small-right.svg'
import logo from '../assets/logo.png'
import book from '../assets/book.svg'
import {PlayButton} from "./UI/PlayButton";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCircleStatus, setBarStatus} from "../store/slices/playButtonSlice";

export const Aside = () => {

    const [isHide, setIsHide] = useState(false);
    const playButton = useSelector(state => state.playButtonStatus)
    const dispatch = useDispatch()

    function handleClick(state) {
        isHide ? setIsHide(false) : setIsHide(true)

        if (!isHide) return

        if (state === 'showBarOpening' || state === 'showBarActive') {
            dispatch(setBarStatus('showBarActive'))
            dispatch(setCircleStatus('showCircleActive'))
        } else {
            dispatch(setBarStatus('showBarStatic'))
            dispatch(setCircleStatus('showCircleStatic'))
        }
    }

    return (
        <div className={isHide ? styles.hideContainer : styles.showContainer}>
            <div className={ isHide ? styles.hideWrapper : styles.wrapper}>
                <div>
                    {isHide && <img alt='logo' src={logo} />}
                    {!isHide && <div className={styles.top}>Chess</div>}
                    {!isHide && <div className={styles.profile}>
                        <Avatar/>
                        <div className={styles.container}>
                            <div className={styles.info}>USERNAME</div>
                            <div className={styles.info}> ELO</div>
                        </div>
                    </div>}
                    {!isHide && <div className={styles.play}>Play</div>}
                    <PlayButton isHide={isHide}/>
                </div>
                <div>
                    <NavigationLink to='/home' url={home} isHide={isHide}>Home</NavigationLink>
                    <NavigationLink to='/socials' url={socials} isHide={isHide}>Socials</NavigationLink>
                    <NavigationLink to='/board' url={title} isHide={isHide}>Board</NavigationLink>
                    <NavigationLink to='/archive' url={archive} isHide={isHide}>Archive</NavigationLink>
                    <NavigationLink to='/news' url={book} isHide={isHide}>News</NavigationLink>
                </div>
                <div>
                    <NavigationLink to='/settings' url={settings} isHide={isHide}>Settings</NavigationLink>
                    <div className={styles.collapse}
                         onClick={() => handleClick(playButton.barStatus)}>
                        {!isHide && <img className={styles.img} alt='collapse' src={leftArrow}/>}
                        {isHide && <img className={styles.img} alt='collapse' src={rightArrow}/>}
                        {!isHide && <span>Hide</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

