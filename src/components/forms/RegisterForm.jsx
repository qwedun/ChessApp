import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import passwordHide from '../../assets/passwordHide.svg'
import passwordShow from '../../assets/passwordShow.svg'
import styles from './registerForm.module.scss'
import { Link } from "react-router-dom";
import { useState } from "react";
import { checkPassword, validateEmail } from "../../helpers/helpers";
import { ErrorPopUp } from "../UI/ErrorPopUp/ErrorPopUp";
import { useRegisterMutation } from "../../store/slices/authApi";

const RegisterForm = () => {

    const [setRegister, {isLoading, isError, error}] = useRegisterMutation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const [emailFocus, setEmailFocus] = useState(true);
    const [passwordFocus, setPasswordFocus] = useState(true);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(true);

    const [isPasswordHidden, setPasswordHidden] = useState(true)

    async function handleSubmit(e) {
        e.preventDefault();
        await setRegister({password: password.value, email: email.value});
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(validateEmail(e.target.value));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setConfirmPasswordValid(e.target.value === confirmPassword);
        setPasswordValid(checkPassword(e.target.value));
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordValid(password === e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            <span className={styles.title}>Register</span>
            {isError && <ErrorPopUp>{error.data.email[0]}</ErrorPopUp>}

            <div className={styles.relative}>
                <Input
                    setFocus={setEmailFocus}
                    type = 'email'
                    onChange={(e) => handleEmailChange(e)}
                >Input your email
                </Input>
                {(!emailValid && !emailFocus) && <div className={styles.popUp}>Email is not valid!</div>}
            </div>

            <div className={styles.relative}>
            <Input
                setFocus={setPasswordFocus}
                type={isPasswordHidden ? 'password' : 'text'}
                onChange={(e) => handlePasswordChange(e)}
            >Create your password
            </Input>
                <img src={isPasswordHidden ? passwordShow : passwordHide} alt='eye'
                     className={styles.passwordEye}
                     onClick={() => setPasswordHidden(!isPasswordHidden)}/>
                {(!passwordValid && !passwordFocus) && <div className={styles.popUp}>Password is not valid!</div>}
            </div>

            <div className={styles.relative}>
                <Input
                    setFocus={setConfirmPasswordFocus}
                    type={isPasswordHidden ? 'password' : 'text'}
                    onChange={(e) => handleConfirmPasswordChange(e)}
                >Confirm your password
                </Input>
                {(!confirmPasswordValid && !confirmPasswordFocus) && <div className={styles.popUp}>Passwords don't match!</div>}
            </div>

            <ul className={styles.list}>
                Password must
                <li>Contain lowercase, uppercase letters and numbers</li>
                <li>Contain special characters</li>
                <li>Be at least 8 characters long</li>
                <div className={styles.buttonWrapper}>
                    <Button type='submit'
                        disabled={(!(emailValid && passwordValid && confirmPasswordValid) || isLoading) }>Register
                    </Button>
                </div>
            </ul>

            <span className={styles.register}>Already have an account?&nbsp;
                <Link to={'/login'}>Login</Link></span>
        </form>
    );
};

export default RegisterForm;