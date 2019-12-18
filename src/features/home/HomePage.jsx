import React, { Component } from 'react';
import TopSellers from './Categories/TopSellers';
import BestOffer from './Categories/BestOffer';
import styles from './HomePage.module.css';
import bag from '../../assets/Layer5.png';
import bell from '../../assets/icons-hb-notification.svg';
import gift from '../../assets/icons-hb-gift.svg';
import quality from '../../assets/icons-hb-quality.svg';
import delivery from '../../assets/icons-hb-delivery.svg';
import { Button } from 'semantic-ui-react';
import bags from '../../assets/bags2.jpg';
import beauty from '../../assets/makeup2.jpg';
import jewellery from '../../assets/Layer9.png';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className={styles.banner}>
          <div className={styles.inner}>
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
        </div>
        <div className={styles.categories}>
        <div style={{backgroundImage: `url(${jewellery})`}} className={styles.category}>
            <h5>Jewellery</h5>
            <div></div>
            <Link to='/jewellery'><Button>SHOP NOW</Button></Link>
          </div>
          <div style={{backgroundImage: `url(${beauty})`}} className={styles.category}>
            <h5 >Beauty</h5>
            <div></div>
            <Link to='/beauty'><Button>SHOP NOW</Button></Link>
          </div>
          <div style={{backgroundImage: `url(${bags})`}} className={styles.category}>
            <h5>Bags</h5>
            <div></div>
            <Link to='/bags'><Button>SHOP NOW</Button></Link>
          </div>
        </div>
        <div className={styles.benefits}>
          <div className={styles.icon}>
            <div className={styles.outer}>
              <img src={delivery} alt='free delivery' />
            </div>
            <h4 style={{marginBottom: '0px'}}>Free Delivery</h4><span style={{color: '#939292'}}>Orders over 1000 KSH</span>
          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img src={gift} alt='gift voucher' />
            </div>
            <h4>Gift<br /> Voucher</h4>
          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img style={{transform: 'translateX(-1px)'}} src={quality} alt='quality assurace' />
            </div>
            <h4>Quality<br /> Assurance</h4>
          </div>
          <div className={styles.icon}>
          <div className={styles.outer}>
            <img style={{transform: 'translateX(-1px)'}}src={bell} alt='delivery notifications' />
            </div>
            <h4>Delivery Notifications</h4>
          </div>
        </div> 
        <TopSellers />
        <BestOffer />
      </div>
    );
  }
}

export default HomePage;
