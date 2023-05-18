import React from 'react'
import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home: React.FC = () => {

  const signInLinkStyle: React.CSSProperties = {
    color: '#0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px'
  };

  const history = useHistory();

  const startRegister = () => {
    history.push('/authenticate');
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Codershouse!" icon="logo">
        <p className={styles.text}>
          We're working hard to get Codershouse ready for everyone!
          While we wrap up the finishing youches, we're adding people
          gradually to make sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go" icon="arrow-forward" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  )
}

export default Home

// start from 4 hour 29 min
// https://www.youtube.com/watch?v=UZ0jBsHHkgM&list=PLXQpH_kZIxTVz45ifrI_gOqpo7AmdaHRp&index=5

// https://github.com/codersgyan/codershouse-mern