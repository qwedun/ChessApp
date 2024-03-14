import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import styles from './loginForm.module.scss'
import { Link } from "react-router-dom";
import { useState, FC, FormEvent } from "react";
import { setAuthLogin } from "../../store/slices/userSlice";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp";
import { useLoginMutation } from "../../store/slices/authApi";
import { useAppDispatch } from "../../hooks/hooks";

const LoginForm: FC = () => {

    const [setLogin, {isError, isLoading, error}] = useLoginMutation();

    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const res = await setLogin({email: email, password: password})
        if ('data' in res)
            dispatch(setAuthLogin(res.data))
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}>
            {isError && <ErrorPopUp>ERROR</ErrorPopUp>}
            <span className={styles.title}>Login</span>
            <Input
                type = 'email'
                onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
            >Input your email
            </Input>

            <Input
                type='password'
                onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
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