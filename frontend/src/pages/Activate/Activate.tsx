import React, { useState } from 'react'
import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import StepName from '../Steps/StepName/StepName';

interface StepProps {
  onNext: () => void;
};

interface StepsMap {
  [key: number]: React.FC<StepProps>;
};

const steps: StepsMap = {
  1: StepName,
  2: StepAvatar
};


const Activate: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const Step: React.FC<StepProps> = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div className='cardWrapper'>
      <Step onNext={ onNext } />
    </div>
  )
}

export default Activate