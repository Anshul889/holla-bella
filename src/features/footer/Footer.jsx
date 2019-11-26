import React from 'react';
import styles from './Footer.module.css'
import logo from '../../assets/logotypedark.svg'

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.sec1}>
        <img src={logo} alt='logo'></img>
        <p>Exclusive accessories in affordable prices just for you!</p>
      </div>
      <div className={styles.sec2}>
        <h3>Contact Us</h3>
        <p>info@hollabella.com</p>
      </div>
      <div className={styles.info}>
        <h3>Information</h3>
        <p>Privacy Policy</p>
        <p>FAQ's</p>
      </div>
      <div className={styles.copyright}>
        <p>© 2019 hola-bella.com</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};