import React, { Component, useState } from 'react'
import Email from './Email/Email';
import Phone from './Phone/Phone';
import styles from './StepPhoneEmail.module.css';

interface StepPhoneEmailProps {
  onNext: () => void;
};

interface phoneEmailMapProps {
  [key: string]: React.FC<StepPhoneEmailProps>;
};

const phoneEmailMap: phoneEmailMapProps = {
  phone: Phone,
  email: Email
}

const StepPhoneEmail: React.FC<StepPhoneEmailProps> = ({ onNext }) => {
  const [type, setType] = useState('phone');
  const Component = phoneEmailMap[type];

  const handleNext = () => {

  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button className={`${styles.tabButton} ${type === 'phone' ? styles.active : ''}`} onClick={() => setType('phone')}>
              <img src="./images/phone-white.png" alt="phone"/>
            </button>
            <button className={`${styles.tabButton} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
            <img src="./images/mail-white.png" alt="email"/>
            </button>
          </div>
          <Component onNext={handleNext} />
        </div>
      </div>
    </>
  );
}

export default StepPhoneEmail