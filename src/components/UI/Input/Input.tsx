import styles from './input.module.scss'
import { useState, FC, FocusEvent } from "react";

interface InputProps {
    children: string;
    setFocus?: (focus: boolean) => void;
    [key: string]: any;
}

const Input: FC<InputProps> = ({children, setFocus, ...props}) => {

    const [style, setStyle] = useState<string>(styles.labelStart)

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value) setStyle(styles.labelEndStatic);
        else setStyle(styles.labelEnd);

        if (setFocus) setFocus(true)
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {

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