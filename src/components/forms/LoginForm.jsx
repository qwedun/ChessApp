import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import styles from './loginForm.module.scss'
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../store/slices/userSlice";
import { login } from "../../store/slices/userSlice";
import axios from "axios";





const LoginForm = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [isEntered, setEnter] = useState({email: false, password:false})
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const navigate = useNavigate()

    if (user.isAuth)
        navigate('/archive')
    function handleChange(e, state, setState) {
        setState({
            ...state,
            [e.target.type]: e.target.value,
        });
        if (user.error && user.error !==0)
            dispatch(removeError(user))
    }

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(login({password: password, email: email}))


        /*axios.post('https://api-jmjs.vercel.app/api/check_user', {
            email: email,
            password: password
        }).then(e => console.log(e))*/
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}>
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
                <Button>Login</Button>
            </div>
            <div className={styles.register}>Dont have an account?&nbsp; <Link to={'/register'}>Register</Link></div>
        </form>
    );
};

export default LoginForm;