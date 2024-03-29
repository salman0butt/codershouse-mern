import React, { ChangeEvent, useState } from 'react'
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const StepOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const { phone, hash } = useSelector((state: any) => state.auth.otp);
  const dispatch = useDispatch();

  const handleNext = async () => {
    if(!otp || !phone || !hash) return;
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just text you" icon="phone">
          <TextInput
            value={otp}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
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
      </div>
    </>
  )
}

export default StepOtp