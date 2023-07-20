import React, { useState, useEffect, ChangeEvent } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store'; // Assuming you have a store set up
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
interface StepAvatarProps {
  onNext: () => void;
};

const StepAvatar: React.FC<StepAvatarProps> = ({ onNext }) => {
  const dispatch: AppDispatch = useDispatch();
  const { name, avatar } = useSelector((state: RootState) => state.activate);
  const [image, setImage] = useState<string>('/images/monkey-avatar.png');

  function captureImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result as string);
        dispatch(setAvatar(reader.result as string));
      };
    }
  }

  async function submit() {
    if (!name || !avatar) return;
    setLoading(true);
    try {
        const { data } = await activate({ name, avatar });
        if (data.auth) {
            // if (!unMounted) {
            //     dispatch(setAuth(data));
            // }
        }
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
}

  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input id="avatarInput" type="file" onChange={captureImage} className={styles.avatarInput} />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={onNext} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

