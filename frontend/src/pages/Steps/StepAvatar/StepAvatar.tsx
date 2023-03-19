import React from 'react'

interface StepAvatarProps {
  onNext: () => void;
};


const StepAvatar:React.FC<StepAvatarProps> = ({onNext}) => {
  return (
    <>
    <div>Avatar component</div>
    <button onClick={onNext}>Next</button>
  </>
  )
}

export default StepAvatar;