import React from 'react';
import styles from './ProductDetailedInfo.module.css';
import { Form, Rating, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import SelectInput from '../../../app/common/form/SelectInput';
import { objectToArray } from '../../../app/common/util/helpers';
import { Link } from 'react-router-dom';
import heart from '../../../assets/heart.svg';
import heartlight from '../../../assets/heartlight.svg';
import ImageCarousel from './ImageCarousel';
import "pure-react-carousel/dist/react-carousel.es.css";

const quantity = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 },
  { key: 4, text: 4, value: 4 },
  { key: 5, text: 5, value: 5 },
  { key: 6, text: 6, value: 6 },
  { key: 7, text: 7, value: 7 },
  { key: 8, text: 8, value: 8 },
  { key: 9, text: 9, value: 9 },
  { key: 10, text: 10, value: 10 }
];

class ProductDetailedInfo extends React.Component {
  onCartSubmit = async values => {
    const { addToCart, product } = this.props;
    addToCart(product, values);
  };

  render() {
    const {
      product,
      addToWishlist,
      isWishLister,
      isCarter,
      authenticated,
      removeFromWishlist,
      openModal
    } = this.props;
    const totalReviews = product.reviews && objectToArray(product.reviews);
    const totalRating =
      totalReviews &&
      totalReviews.length !== 0 &&
      totalReviews
        .map(review => review.rating)
        .reduce((prev, next) => prev + next);
    const averageRating = totalReviews && totalReviews.length > 0 && totalRating / totalReviews.length;
    const roundAverage = Math.round(averageRating * 10) / 10;
    const starRating = Math.round(roundAverage);
    const discountedPrice =
      product.price - (product.price * product.discount) / 100;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>{product.title}</h1>
        <div className={styles.menu}>
          <div>
            <Link to='/'>Main Page</Link>
          </div>
          <div style={{ paddingLeft: '2px' }}>
            <Link to={`/${product.category}`}> { "> " + product.category} </Link>
          </div>
          <div style={{ paddingLeft: '2px' }}>{"> " + product.title}</div>
        </div>
        <div className={styles.product}>
         {/* <div className={styles.image}>
             <img src={product.photoURL} alt={product.description} />{" "} 
            <LazyLoadImage
              effect='blur'
              src={product.photoURL}
              width={'100%'}
            />
          </div>*/}
          <ImageCarousel photoURL={product.photoURL} photoURL2={product.photoURL2} photoURL3={product.photoURL3}/>
          <div className={styles.content}>
            <div className={styles.title}>
              <div>{product.title}</div>
            </div>
            <div className={styles.pricing}>
            {product.discount > 0 && (
              <strike style={{ fontWeight: '100', paddingRight: '5px' }}>
                {product.price} KSH{'  '}
              </strike>)}
              <span style={{ fontWeight: '800', paddingRight: '5px' }}>
                {Math.round(discountedPrice)} KSH{' '}
              </span>
              {product.discount > 0 && (
                <span
                  className={styles.blink}
                  style={{ color: 'green', fontWeight: 'bold' }}>
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className={styles.rating}>
            {averageRating && (<span style={{paddingRight: '3px'}}>
                ({averageRating})
            </span>)}
            <Rating
              style={{ transform: 'translateY(1px) translateX(-2px)' }}
              icon='star'
              rating={starRating}
              maxRating={5}
            />
            {totalReviews && totalReviews.length === 1 && (
              <span style={{ paddingLeft: '10px' }}>
                {totalReviews.length} Review
              </span>
            )}
            {totalReviews && totalReviews.length > 1 && (
              <span style={{ paddingLeft: '10px' }}>
                {totalReviews.length} Reviews
              </span>
            )}
            {!totalReviews && (
              <span style={{ paddingLeft: '10px' }}>
              No Reviews
            </span>
            )}
            </div>
            <div className={styles.cartwish}>
              <Form
                onSubmit={this.props.handleSubmit(this.onCartSubmit)}
                style={{
                  width: '100%',
                  display: 'grid',
                  'gridTemplateColumns': '100px max-content',
                  'gridTemplateRows': '38px',
                  'gridGap': '10px'
                }}>
                <Field
                  name='quantity'
                  type='text'
                  component={SelectInput}
                  options={quantity}
                  placeholder='Quantity'
                />
                {authenticated && isCarter && 
                <Button className={styles.cartbutton} type='submit'>
                    Update Cart
                  </Button> }
                {authenticated && !isCarter &&
                   <Button className={styles.cartbutton} type='submit'>
                   Add To Cart
                 </Button>
                 }
                 {!authenticated && 
                <Button className={styles.cartbutton} onClick={() => openModal('LoginModal')}>
                Add To Cart
              </Button>
                }  
              </Form>
              {authenticated && isWishLister && 
                <div>
                <img
                  alt='dislike'
                  src={heart}
                  onClick={() => removeFromWishlist(product)}
                />
              </div>}
              {authenticated && !isWishLister && 
                  <div>
                  <img
                    alt='like '
                    src={heartlight}
                    onClick={() => addToWishlist(product)}
                  />
                </div>
              }
              {!authenticated && 
                  <div>
                  <img
                    alt='like '
                    src={heartlight}
                    onClick={() => openModal('LoginModal')}
                  />
                </div>
              }
            </div>
            <div>
              <div className={styles.shippingdetails}>
                Free shipping for orders over 1000 ksh
              </div>
            </div>
            <div className={styles.description}>
              <h4 className={styles.descriptionhead}>Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default reduxForm({ form: 'cartForm', initalValues: { quantity: 1 } })(
  ProductDetailedInfo
);
