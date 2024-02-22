import Button from "../UI/Button/Button.jsx";
import Input from "../UI/Input/Input.jsx";
import styles from './loginForm.module.scss'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthLogin } from "../../store/slices/userSlice.js";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp.jsx";
import { useLoginMutation } from "../../store/slices/authApi";

const LoginForm = () => {

    const [setLogin, {isError, isLoading, error}] = useLoginMutation();

    const dispatch = useDispatch()
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const { data } = await setLogin({email: email, password: password})
        if (data)
            dispatch(setAuthLogin(data))
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}>
            {isError && <ErrorPopUp>{error?.data.detail || error?.data.message}</ErrorPopUp>}
            <span className={styles.title}>Login</span>
            <Input
                type = 'email'
                autoComplete
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => {setEmailFocus(false)}}
                maxlength={100}
                focus={emailFocus}
                value={email}
            >Input your email
            </Input>

            <Input
                type='password'
                autoComplete
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                maxlength={32}
                focus={passwordFocus}
                value={password}
            >Input your password
            </Input>

            <div className={styles.buttonWrapper}>
                <Button disabled={(!(email && password) || isLoading)}>Login</Button>
            </div>
            <div className={styles.register}>Dont have an account?&nbsp;
                <Link to={'/register'}>Register</Link>
            </div>
        </form>
    );
};

export default LoginForm;