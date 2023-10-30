import styles from  './input.module.scss'

const Input = ({children, ...props}) => {
    return (
        <input className={styles.input} placeholder={children} {...props}/>
    );
};

export default Input;