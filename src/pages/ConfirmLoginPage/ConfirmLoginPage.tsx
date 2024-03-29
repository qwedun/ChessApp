import Input from "../../components/UI/Input/Input";
import styles from './confirmPage.module.scss'
import King from '../../assets/king.svg'
import Pawn from '../../assets/pawn.svg'
import Queen from '../../assets/queen.svg'
import Knight from '../../assets/knight.svg'
import {FormEvent, useState} from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/UI/Button/Button";
import { ErrorPopUp } from "../../components/UI/ErrorPopUp/ErrorPopUp";
import { useConfirmLoginMutation } from "../../store/slices/authApi";
import { setAuthConfirmLogin } from "../../store/slices/userSlice";

const ConfirmLoginPage = () => {

    const [login, setLogin] = useState<string>('')
    const [loginFocus, setLoginFocus] = useState<boolean>(false)
    const [elo, setElo] = useState<number>(0)

    const elos = [400, 600, 800, 1000];

    const [setConfirmLogin, { isLoading, isError, error}] = useConfirmLoginMutation();
    const dispatch = useDispatch();

    const handleConfirmLogin = async() => {
        const result = await setConfirmLogin({login: login});
        if ('data' in result)
            dispatch(setAuthConfirmLogin({login: result.data.login}))
    }

    return (
        <>
        {isError && <ErrorPopUp>ERROR</ErrorPopUp>}
            <div className={styles.title}>Create your login</div>
            <div>
                <Input
                    type = 'login'
                    onFocus={() => setLoginFocus(true)}
                    onBlur={() => setLoginFocus(false)}
                    onChange={(e: FormEvent<HTMLInputElement>) => setLogin(e.currentTarget.value)}
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
                <img alt='new' width='30px' height='30px' src={Pawn}/>
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
                    onClick={() => handleConfirmLogin()}
                    disabled={(!(elo && login) || isLoading)}>Confirm</Button>
            </div>
        </>
    );
};

export default ConfirmLoginPage;
