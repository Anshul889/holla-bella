import React, { Component } from 'react';
import styles from './TopSellers.module.css';
import { Link } from 'react-router-dom';
import {getElectronicsForHomepage} from './electronicsActions';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import { LazyLoadImage } from "react-lazy-load-image-component";


const mapState = state => ({
  electronics : state.electronics
})

const actions = {
  getElectronicsForHomepage
}

class ElectronicsCategory extends Component {
  

  async componentDidMount(){
    if(this.props.electronics && this.props.electronics.length === 0){
    this.props.getElectronicsForHomepage();
    }
  }

  render() {
    const {electronics} = this.props;
    if (electronics.length === 0) {
      return (
        <div className={styles.container}>
          <h2>Electronics</h2>
          <div className={styles.inner}>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder >
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h2>Electronics</h2>
        <div className={styles.inner}>
        {electronics &&
            electronics.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    {/* <img src={product.photoURL} alt={product.description} /> */}
                    <LazyLoadImage
                      alt={product.description}
                      src={product.photoURL}
                      width="100%"
                      effect="blur"
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default connect(mapState, actions) (ElectronicsCategory);
