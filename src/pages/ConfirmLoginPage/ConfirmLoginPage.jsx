import Input from "../../components/UI/Input/Input";
import styles from './confirmPage.module.scss'
import King from '../../assets/king.svg'
import Pawn from '../../assets/pawn.svg'
import Queen from '../../assets/queen.svg'
import Knight from '../../assets/knight.svg'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmLogin } from "../../store/slices/userSlice";
import Button from "../../components/UI/Button/Button";
import { ErrorPopUp } from "../../components/UI/ErrorPopUp/ErrorPopUp";

const ConfirmLoginPage = () => {

    const [login, setLogin] = useState(null)
    const [loginFocus, setLoginFocus] = useState(false)
    const [elo, setElo] = useState(null)

    const elos = [400, 600, 800, 1000];

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    return (
        <>
            <ErrorPopUp/>
            <div className={styles.title}>Create your login</div>
            <div>
                <Input
                    type = 'login'
                    onFocus={() => setLoginFocus(true)}
                    onBlur={() => setLoginFocus(false)}
                    onChange={(e) => setLogin(e.target.value)}
                    focus={loginFocus}
                    value={login}
                >Create your login
                </Input>
            </div>
            <span className={styles.level}>What is your level of chess?</span>
            <button
                onClick={() => setElo(elos[0])}
                className={styles.levelWrapper}>
                <div>
                    <div>New to chess</div>
                    <div className={styles.green}>Most Common</div>
                </div>
                <img alt='new' src={Pawn}/>
            </button>
            <button
                onClick={() => setElo(elos[1])}
                className={styles.levelWrapper}>
                <span>Beginner</span><img src={Knight} alt='beginner'/>
            </button>
            <button
                onClick={() => setElo(elos[2])}
                className={styles.levelWrapper}>
                <span>Intermediate</span><img src={King} alt='intermediate'/>
            </button>
            <button
                onClick={() => setElo(elos[3])}
                className={styles.levelWrapper}>
                <span>Advanced</span><img src={Queen} alt='advanced'/>
            </button>
            <div className={styles.buttonWrapper}>
                <Button
                    onClick={() => dispatch(confirmLogin({login: login}))}
                    disabled={(!(elo && login) || user.isLoading)}>Confirm</Button>
            </div>
        </>
    );
};

export default ConfirmLoginPage;
