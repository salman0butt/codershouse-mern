import React from 'react'
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    icon?: string;
    onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, icon = '', onClick }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{text}</span>
            <img className={styles.arrow} src={`/images/${icon}.png`} alt={icon} />
        </button>
    )
}

export default Button