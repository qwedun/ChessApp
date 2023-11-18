import styles from './input.module.scss'

const Input = ({children, focus, value, ...props}) => {

    const style = (focus ? styles.labelEnd : (value ? styles.labelEndStatic : styles.labelStart))

    return (
        <div className={styles.inputBox}>
            <label className={`${styles.label} ${style}`}> {children} </label>
            <input className={styles.input} {...props}/>
        </div>
    );
};

export default Input;