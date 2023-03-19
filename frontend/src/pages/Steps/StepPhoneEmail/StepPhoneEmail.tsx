import React from 'react'

interface StepPhoneEmailProps {
  onNext: () => void;
};

const StepPhoneEmail: React.FC<StepPhoneEmailProps> = ({ onNext }) => {
  return (
    <>
      <div>Phone or Email component</div>
      <button onClick={onNext}>Next</button>
    </>
  )
}

export default StepPhoneEmail