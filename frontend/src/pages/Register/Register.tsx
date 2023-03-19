import React, { useState } from 'react'
import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import StepName from '../Steps/StepName/StepName';
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepUsername from '../Steps/StepUsername/StepUsername';
import styles from './Register.module.css';

interface StepProps {
    onNext: () => void;
};


interface StepsMap {
    [key: number]: React.FC<StepProps>;
};


const steps: StepsMap = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername
};


const Register: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const Step: React.FC<StepProps> = steps[step];

    const handleNext = () => {
        setStep(step + 1);
    };

    return (
        <>
            <Step onNext={handleNext} />
        </>
    )
}

export default Register;