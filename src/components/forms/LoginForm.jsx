import Button from "../UI/Button/Button.jsx";
import Input from "../UI/Input/Input.jsx";
import styles from './loginForm.module.scss'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/slices/userSlice.js";
import { login } from "../../store/slices/userSlice.js";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp.jsx";

const LoginForm = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const isLoading = useSelector((state) => state.user.isLoading)

    function handleSubmit(e) {
        e.preventDefault()

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
                <Button disabled={(!(email && password) || isLoading)}>Login</Button>
            </div>
            <div className={styles.register}>Dont have an account?&nbsp;
                <Link
                    onClick={() => dispatch(setError(0))}
                    to={'/register'}>Register</Link></div>
        </form>
    );
};

export default LoginForm;