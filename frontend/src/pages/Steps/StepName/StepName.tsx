import React, { ChangeEvent, useState } from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import { AppDispatch, RootState } from '../../../store';
interface StepNameProps {
  onNext: () => void;
};

const StepName: React.FC<StepNameProps> = ({ onNext }) => {
  const { name } = useSelector((state: RootState) => state.activate);
  const dispatch: AppDispatch = useDispatch();

  const [fullname, setFullname] = useState<string>(name);

  function nextStep() {
    if (!fullname) return;
    dispatch(setName(fullname));
    onNext();
  }

  const handleFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  return (
    <>
      <Card title="What's your full name?" icon="goggle-emoji">
        <TextInput
          value={fullname}
          onChange={handleFullnameChange}
        />
        <p className={styles.paragraph}>
          People use real names at codershouse :) !
        </p>
        <div>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </>
  )
}

export default StepName;