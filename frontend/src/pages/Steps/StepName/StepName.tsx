import React from 'react'

interface StepNameProps {
  onNext: () => void;
};

const StepName:React.FC<StepNameProps> = ({onNext}) => {
  return (
    <>
    <div>username component</div>
    <button onClick={onNext}>Next</button>
  </>
  )
}

export default StepName;