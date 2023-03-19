import React, { useState } from 'react'
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';


interface StepProps {
    onNext: () => void;
};

interface StepsMap {
    [key: number]: React.FC<StepProps>;
};

const steps: StepsMap = {
    1: StepPhoneEmail,
    2: StepOtp
};


const Login: React.FC = () => {
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

export default Login