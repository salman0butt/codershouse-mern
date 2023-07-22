import React, { ReactNode } from 'react'
import styles from './Card.module.css';

interface CardProps {
    title?: string;
    icon?: string;
    children?: ReactNode;
}
const Card: React.FC<CardProps> = ({ title = '', icon = '', children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headingWrapper}>
                {icon && <img src={`/images/${icon}.png`} alt={icon} />}
                {title && <h1 className={styles.heading}>{title}</h1>}
            </div>
            {children}
        </div>
    )
}

export default Card;