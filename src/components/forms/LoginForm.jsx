import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from './loginForm.module.scss'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeError, setError} from "../../store/slices/userSlice";





const LoginForm = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [isEntered, setEnter] = useState({email: false, password:false})

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
        dispatch(setError(user))
    }

    return (
        <form
                className={styles.form}
            onSubmit={handleSubmit}>
            <span className={styles.title}>Login</span>
            <div className={styles.inputWrapper}>
                Email:
                <Input
                    type = 'email'
                    autoComplete
                    onChange={(e) => handleChange(e, isEntered, setEnter)}
                >Input your email
                </Input>
            </div>
            <div className={styles.inputWrapper}>
                Password:
                <Input
                    onChange={(e) => handleChange(e, isEntered, setEnter)}
                    type='password'
                    autoComplete
                >Input your password
                </Input>
            </div>
            <div className={styles.buttonWrapper}>
                <Button
                    disabled={!(isEntered.email && isEntered.password)}
                >Login
                </Button>
            </div>
            <div className={styles.register}>Dont have an account?&nbsp; <Link to={'/register'}>Register</Link></div>
        </form>
    );
};

export default LoginForm;