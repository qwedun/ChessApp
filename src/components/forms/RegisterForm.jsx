import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from './registerForm.module.scss'
import {Link} from "react-router-dom";
import { useState } from "react";
import {checkPassword, validateEmail} from "../../helpers/helpers";

const LoginForm = () => {

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

    function handleChange(e, state, setState, validateFunction) {
        if (validateFunction(e.target.value))
            setState({
                ...state,
                isValid: true,
                value: e.target.value,
            })
        else setState({
            ...state,
            isValid: false,
            value: null,
        })
    }


    function handleBlur(state, setState) {
        if (!state.value)
            setState({
                ...state,
                isError: true,
            })
        else setState({
            ...state,
            isError: false,
        })
    }

    function handleFocus(state, setState) {
        setState({
            ...state,
            isError:false,
        })
    }


    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>

                <span className={styles.title}>Register</span>

                <div className={styles.inputWrapper}>Email:
                    <Input
                        type = 'email'
                        onChange={(e) => handleChange(e, email, setEmail, validateEmail)}
                        onBlur={() => handleBlur(email, setEmail)}
                        onFocus={() => handleFocus(email, setEmail)}
                        autoComplete = "false"
                    >Input your email
                    </Input>

                    {email.isError && <span className={styles.popUp}>Email is not valid!</span>}

                </div>

                <div className={styles.inputWrapper}>Password:
                    <Input
                        type='password'
                        onChange={(e) => handleChange(e, password, setPassword, checkPassword)}
                        onBlur={() => handleBlur(password, setPassword)}
                        onFocus={() => handleFocus(password, setPassword)}
                        autoComplete = "false"
                    >Create your password
                    </Input>

                    {password.isError && <span className={styles.popUp}>Password is not valid!</span>}
                </div>

                <div className={styles.buttonWrapper}>
                    <Button disabled={!(email.isValid && password.isValid)}>Register</Button>
                    <ul className={styles.list}>
                        Password must
                        <li>contain lowercase, uppercase letters and numbers</li>
                        <li>contain special characters</li>
                        <li>be at least 8 characters long</li>
                    </ul>

                </div>
                <span className={styles.register}>Already have an account?&nbsp; <Link to={'/login'}>Login</Link></span>
            </form>
        </div>
    );
};

export default LoginForm;