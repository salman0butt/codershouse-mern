import React, { ChangeEvent, useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';

interface StepPhoneEmailProps {
  onNext: () => void;
};

const Phone: React.FC<StepPhoneEmailProps> = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Card title="Enter you phone number" icon="phone">
    <TextInput
        value={phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
    />
    <div>
        <div className={styles.actionButtonWrap}>
            <Button text="Next" icon={''} />
        </div>
        <p className={styles.bottomParagraph}>
            By entering your number, you're agreeing to our Terms of
            Service and Privacy Policy. Thanks!
        </p>
    </div>
</Card>
  )
}

export default Phone