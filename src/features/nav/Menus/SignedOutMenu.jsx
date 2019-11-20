import React from 'react';
import styles from './SignedOutMenu.module.css';
import contact from '../../../assets/icons/contact.svg'

const SignedOutMenu = ({ signIn }) => {
  return (
    <div
      className={styles.glogin}
      onClick={signIn}
      style={{ cursor: 'pointer' }}>
      <img className={styles.mnavimgout} src={contact} alt='user'/>
      <div className={styles.authOuttext}>Login</div>
    </div>
  );
};

export default SignedOutMenu;
