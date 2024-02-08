import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import passwordHide from '../../assets/passwordHide.svg'
import passwordShow from '../../assets/passwordShow.svg'
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

    const [confirmPassword, setConfirmPassword] = useState({
        value: null,
        isValid: false,
        isError: false,
    });

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [isPasswordHidden, setPasswordHidden] = useState(true)

    function handleEmailChange(e) {
        if (validateEmail(e.target.value))
            setEmail({
                ...email,
                isValid: true,
                value: e.target.value
            })
        else setEmail({
            ...email,
            isValid: false,
            value: e.target.value
        })
    }

    function handlePasswordChange(e) {
        if (checkPassword(e.target.value))
            setPassword({
                ...password,
                isValid: true,
                value: e.target.value
            })
        else setPassword({
            ...password,
            isValid: false,
            value: e.target.value
        })
    }
    function checkConfirmPassword(passwordToConfirm) {
        return (passwordToConfirm === password.value);
    }
    function handlePasswordConfirmChange(e) {
        if (checkConfirmPassword(e.target.value))
            setConfirmPassword({
                value: e.target.value,
                isValid: true,
                isError: false,
            })
        else setConfirmPassword({
            value: e.target.value,
            isValid: false,
            isError: true,
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

    function toggleVisibility() {
        if (isPasswordHidden) setPasswordHidden(false);
        else setPasswordHidden(true);
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
                    onChange={(e) => handleEmailChange(e)}
                    onBlur={() => handleBlur(email, setEmail, setEmailFocus)}
                    onFocus={() => handleFocus(email, setEmail, setEmailFocus)}
                    maxlength={100}
                    autoComplete = "false"
                >Input your email
                </Input>
                {email.isError && <div className={styles.popUp}>Email is not valid!</div>}
            </div>

            <div style={{position: "relative"}}>
            <Input
                value={password.value}
                focus={passwordFocus}
                type={isPasswordHidden ? 'password' : 'text'}
                onChange={(e) => handlePasswordChange(e)}
                onBlur={() => handleBlur(password, setPassword, setPasswordFocus)}
                onFocus={() => handleFocus(password, setPassword, setPasswordFocus)}
                maxlength={32}
                autoComplete = "false"
            >Create your password
            </Input>
                <img src={isPasswordHidden ? passwordShow : passwordHide} className={styles.passwordEye} onClick={toggleVisibility}/>
                {password.isError && <div className={styles.popUp}>Password is not valid!</div>}
            </div>

            <div style={{position: "relative"}}>
                <Input
                    value={confirmPassword.value}
                    focus={confirmPasswordFocus}
                    type={isPasswordHidden ? 'password' : 'text'}
                    onChange={(e) => handlePasswordConfirmChange(e)}
                    onBlur={() => handleBlur(confirmPassword, setConfirmPassword, setConfirmPasswordFocus)}
                    onFocus={() => handleFocus(confirmPassword, setConfirmPassword, setConfirmPasswordFocus)}
                    maxlength={32}
                    autoComplete = "false"
                >Confirm your password
                </Input>
                {confirmPassword.isError && <div className={styles.popUp}>Passwords don't match!</div>}
            </div>

            <ul className={styles.list}>
                Password must
                <li>Contain lowercase, uppercase letters and numbers</li>
                <li>Contain special characters</li>
                <li>Be at least 8 characters long</li>
                <div className={styles.buttonWrapper}>
                    <Button
                        type='submit'
                        disabled={(!(email.isValid && password.isValid && confirmPassword.isValid) || user.isLoading) }>Register
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