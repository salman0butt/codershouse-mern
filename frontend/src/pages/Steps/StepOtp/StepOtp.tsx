import React from 'react'

interface StepOtpProps {
  onNext: () => void;
};


const StepOtp: React.FC<StepOtpProps> = ({ onNext }) => {
  return (
    <>
      <div>OTP component</div>
      <button onClick={onNext}>Next</button>
    </>
  )
}

export default StepOtp