import React from 'react'

interface StepUsernameProps {
  onNext: () => void;
};


const StepUsername: React.FC<StepUsernameProps> = ({ onNext }) => {
  return (
    <>
      <div>Username component</div>
      <button onClick={onNext}>Next</button>
    </>
  )
}

export default StepUsername