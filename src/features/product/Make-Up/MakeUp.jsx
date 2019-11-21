import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getMakeUp} from './MakeUpActions';
import styles from './MakeUp.module.css'
import { Link } from 'react-router-dom';

const mapState = (state) => ({
  makeUp : state.makeUp
})

const actions = {
  getMakeUp
}

class MakeUp extends Component {

  state ={
    products : []
  };
  
  // function myFunction() {
  //   cars.sort(function(a, b){
  //     var x = a.type.toLowerCase();
  //     var y = b.type.toLowerCase();
  //     if (x < y) {return -1;}
  //     if (x > y) {return 1;}
  //     return 0;
  //   });
  //   displayCars();
  // }
  
  async componentDidMount() {
    if (this.props.makeUp && this.props.makeUp.length === 0) {
      await this.props.getMakeUp();
      this.setState({products : this.props.makeUp})
    }
  }

  render() {
    const {products} = this.state;
    return (
      <div className={styles.container}>
        <h2>Make Up</h2>
        <div className={styles.inner}>
          {products &&
            products.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.photoURL} alt={product.title} loading={'lazy'}/>
                  </Link>
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </div>
                  <div className={styles.price}>
                  {product.discount > 0 && (
                      <span style={{ paddingRight: "5px", fontWeight: '100', color: 'gray'}}>
                        <strike>{product.price} KSH</strike>
                      </span>
                    )}
                    <Link to={`/product/${product.id}`}>
                      {product.price - (product.price * product.discount) / 100}{" "}
                      KSH
                    </Link>
                    <br />
                    {product.discount > 0 &&<span className={styles.blink} style={{ color :'green'}}>{product.discount}% OFF </span>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(MakeUp)