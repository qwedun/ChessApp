import styles from './errorPopUp.module.scss';
import { FC, ReactNode } from 'react'

export const ErrorPopUp:FC<{children: string}> = ({children}) => {
    return (
        <div className={styles.active}>
            {children}
        </div>
    );
};

