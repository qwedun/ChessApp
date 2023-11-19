import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import styles from './loginForm.module.scss'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/slices/userSlice";
import { login } from "../../store/slices/userSlice";
import axios from "axios";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp";





const LoginForm = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const user = useSelector(state => state.user)
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login({password: password, email: email}))
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}>
            <ErrorPopUp/>
            <span className={styles.title}>Login</span>
            <Input
                type = 'email'
                autoComplete
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => {setEmailFocus(false)}}
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
                focus={passwordFocus}
                value={password}
            >Input your password
            </Input>

            <div className={styles.buttonWrapper}>
                <Button disabled={(!(email && password) || user.isLoading)}>Login</Button>
            </div>
            <div className={styles.register}>Dont have an account?&nbsp;
                <Link
                    onClick={() => dispatch(setError(0))}
                    to={'/register'}>Register</Link></div>
        </form>
    );
};

export default LoginForm;