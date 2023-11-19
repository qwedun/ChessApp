import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import styles from './registerForm.module.scss'
import { Link } from "react-router-dom";
import { useState } from "react";
import { checkPassword, validateEmail } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { register, setError } from "../../store/slices/userSlice";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp";

const LoginForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [email, setEmail] = useState({
        value: null,
        isValid: false,
        isError: false
    });

    const [password, setPassword] = useState({
        value: null,
        isValid: false,
        isError: false,
    });

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    function handleChange(e, state, setState, validateFunction) {
        if (validateFunction(e.target.value))
            setState({
                ...state,
                isValid: true,
                value: e.target.value,
            })
        else setState({
            ...state,
            value: e.target.value,
            isValid: false,
        })
    }


    function handleBlur(state, setState, setFocus) {
        setFocus(false)
        if (state.isValid)
            setState({
                ...state,
                isError: false,
            })
        else setState({
            ...state,
            isError: true,
        })
    }

    function handleFocus(state, setState, setFocus) {
        setFocus(true)
        setState({
            ...state,
            isError:false,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(register({password: password.value, email: email.value}))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}>

            <span className={styles.title}>Register</span>
            <ErrorPopUp/>

            <div style={{position: "relative"}}>
                <Input
                    value={email.value}
                    focus={emailFocus}
                    type = 'email'
                    onChange={(e) => handleChange(e, email, setEmail, validateEmail)}
                    onBlur={() => handleBlur(email, setEmail, setEmailFocus)}
                    onFocus={() => handleFocus(email, setEmail, setEmailFocus)}
                    autoComplete = "false"
                >Input your email
                </Input>
                {email.isError && <div className={styles.popUp}>Email is not valid!</div>}
            </div>

            <div style={{position: "relative"}}>
            <Input
                value={password.value}
                focus={passwordFocus}
                type='password'
                onChange={(e) => handleChange(e, password, setPassword, checkPassword)}
                onBlur={() => handleBlur(password, setPassword, setPasswordFocus)}
                onFocus={() => handleFocus(password, setPassword, setPasswordFocus)}
                autoComplete = "false"
            >Create your password
            </Input>
            {password.isError && <div className={styles.popUp}>Password is not valid!</div>}
            </div>

            <ul className={styles.list}>
                Password must
                <li>Contain lowercase, uppercase letters and numbers</li>
                <li>Contain special characters</li>
                <li>Be at least 8 characters long</li>
                <div className={styles.buttonWrapper}>
                    <Button
                        type='submit'
                        disabled={(!(email.isValid && password.isValid) || user.isLoading) }>Register
                    </Button>
                </div>
            </ul>

            <span className={styles.register}>Already have an account?&nbsp;
                <Link
                    onClick={() => dispatch(setError(0))}
                    to={'/login'}>Login</Link></span>
        </form>
    );
};

export default LoginForm;