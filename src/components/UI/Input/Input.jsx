import styles from './input.module.scss'
import { useState } from "react";

const Input = ({children, setFocus, ...props}) => {

    const [style, setStyle] = useState(styles.labelStart)

    const handleFocus = (e) => {
        if (e.target.value) setStyle(styles.labelEndStatic);
        else setStyle(styles.labelEnd);

        if (setFocus) setFocus(true)
    }

    const handleBlur = (e) => {

        if (e.target.value) setStyle(styles.labelEndStatic);
        else setStyle(styles.labelStart);

        if (setFocus) setFocus(false)
    }

    return (
        <div className={styles.inputBox}>
            <label className={`${styles.label} ${style}`}> {children} </label>
            <input className={styles.input} {...props} autoComplete='off' maxLength={32}
                   onFocus={(e) => handleFocus(e)}
                   onBlur={(e) => handleBlur(e)}/>
        </div>
    );
};

export default Input;