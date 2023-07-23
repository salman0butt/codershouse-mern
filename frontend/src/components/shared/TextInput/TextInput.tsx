import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
    value: string;
    fullwidth?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <div>
            <input className={styles.input} type="text" {...props} />
        </div>
    );
};

export default TextInput;