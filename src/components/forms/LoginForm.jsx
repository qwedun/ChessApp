import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from './loginForm.module.scss'
import {Link} from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {

    const [isEntered, setEnter] = useState({email: false, password:false})

    function handleChange(e, state, setState) {
        setState({
            ...state,
            [e.target.type]: e.target.value,
        })
    }
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <span className={styles.title}>Login</span>
                <div className={styles.inputWrapper}>
                    Email:
                    <Input
                        type = 'email'
                        onChange={(e) => handleChange(e, isEntered, setEnter)}>
                        Input your email
                    </Input>
                </div>
                <div className={styles.inputWrapper}>
                    Password:
                    <Input
                        onChange={(e) => handleChange(e, isEntered, setEnter)}
                        type='password'>
                        Input your password
                    </Input>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button disabled={!(isEntered.email && isEntered.password)}>Login</Button>
                </div>
                <span className={styles.register}>Dont have an account?&nbsp; <Link to={'/register'}>Register</Link></span>
            </form>
        </div>
    );
};

export default LoginForm;