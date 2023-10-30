import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from './loginForm.module.scss'
import {Link} from "react-router-dom";

const LoginForm = () => {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <span className={styles.title}>Login</span>
                <div className={styles.inputWrapper}>
                    <Input type = 'email'>Input your email</Input>
                </div>
                <div className={styles.inputWrapper}>
                    <Input type='password'>Input your password</Input>
                </div>
                <div className={styles.inputWrapper}>
                    <Button>Login</Button>
                </div>
                <span className={styles.register}>Dont have an account? <Link to={'/register'}>Register</Link></span>
            </form>

        </div>
    );
};

export default LoginForm;