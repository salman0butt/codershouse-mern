import React, { ChangeEvent, useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

interface StepPhoneEmailProps {
  onNext: () => void;
};

const Phone: React.FC<StepPhoneEmailProps> = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  const handleNext = async () => {
    if(!phoneNumber) return;
    const { data } = await sendOtp({ phone: phoneNumber });
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <Card title="Enter you phone number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" icon={''} onClick={handleNext} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of
          Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  )
}

export default Phone;