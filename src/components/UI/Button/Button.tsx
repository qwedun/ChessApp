import { FC } from 'react';
import styles from './button.module.scss'

interface ButtonProps {
    children: string;
    [key: string]: any;
}

const Button:FC<ButtonProps> = ({children, ...props}) => {
    return (
            <button {...props} className={styles.button}>{children}</button>
    );
};

export default Button;