import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
    const brandStyle: React.CSSProperties = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    };

    const logoTextStyle: React.CSSProperties = {
        marginLeft: '10px'  
    };

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoTextStyle}>Codershouse</span>
            </Link>
        </nav>
    )
}

export default Navigation