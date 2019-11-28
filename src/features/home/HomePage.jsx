import React, { Component } from 'react';
import TopSellers from './Categories/TopSellers';
import BestOffer from './Categories/BestOffer';
import styles from './HomePage.module.css';
import bag from '../../assets/Layer5.png';
import bell from '../../assets/Vector Smart Object.png';
import gift from '../../assets/Vector Smart Object-2.png';
import quality from '../../assets/Vector Smart Object-3.png';
import delivery from '../../assets/Vector Smart Object-4.png';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className={styles.banner}>
          <div>
            <h2>
              Special
              <br /> Offer %
            </h2>
            <button>view more</button>
          </div>
          <div>
            <img src={bag} alt='' />
          </div>
        </div>
        <TopSellers />
        <div className={styles.benefits}>
          <div className={styles.icond}>
            <div className={styles.outer}>
              <img src={delivery} alt='free delivery' />
            </div>
            <h4 style={{marginBottom: '0px'}}>Free Delivery</h4><span style={{color: '#939292'}}>Orders over 1000 KSH</span>
          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img src={gift} alt='gift voucher' />
            </div>
            <h4>Gift Voucher</h4>

          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img style={{transform: 'translateX(-1px)'}} src={quality} alt='quality assurace' />
            </div>
            <h4>Quality Assurance</h4>
          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img style={{transform: 'translateX(-1px)'}}src={bell} alt='delivery notifications' />
            </div>
            <h4>Delivery Notifications</h4>
          </div>
        </div>
        <BestOffer />
      </div>
    );
  }
}

export default HomePage;
