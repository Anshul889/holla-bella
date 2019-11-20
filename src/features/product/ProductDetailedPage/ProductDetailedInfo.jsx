import React from "react";
import styles from "./ProductDetailedInfo.module.css";
import { Button, Form, Rating } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import SelectInput from "../../../app/common/form/SelectInput";
import { objectToArray } from "../../../app/common/util/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";


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
    const { addToCart, product} = this.props;
    addToCart(product, values);
  };

  render() {
    const {
      product,
      addToWishlist,
      isWishLister,
      isCarter,
      removeFromWishlist
    } = this.props;
    const totalReviews = product.reviews && objectToArray(product.reviews);
    const totalRating = totalReviews && totalReviews.length !==0 && totalReviews.map(review => review.rating).reduce((prev, next) => prev + next);
    const averageRating = totalReviews && (totalRating / (totalReviews.length));
    const roundAverage = Math.round(averageRating * 10) / 10;
    const starRating = Math.round(roundAverage);
    return (
      <React.Fragment>
        <div className={styles.product}>
          <div className={styles.image}>
            {/* <img src={product.photoURL} alt={product.description} />{" "} */}
            <LazyLoadImage
            effect="blur"
                      src={product.photoURL}
                      width={'100%'}
                    />
          </div>
          <div className={styles.content}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Rs {product.price}</p>
            <p>Average Rating : {roundAverage ? roundAverage : 'No Reviews Yet'}</p>
            <Rating icon='star' rating={starRating} maxRating={5}/>
            <Form
              onSubmit={this.props.handleSubmit(this.onCartSubmit)}
              style={{ width: "40%", paddingBottom: "10px" }}
            >
              <Field
                name="quantity"
                type="text"
                component={SelectInput}
                options={quantity}
                placeholder="Quantity"
              />
              {isCarter ? (
                <Button type="submit">Update Cart</Button>
              ) : (
                <Button type="submit">Add To Cart</Button>
              )}
            </Form>
            {isWishLister ? (
              <Button onClick={() => removeFromWishlist(product)}>
                Remove from WishList
              </Button>
            ) : (
              <Button onClick={() => addToWishlist(product)}>
                Add To WishList
              </Button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default reduxForm({ form: "cartForm", initalValues:  {quantity: 1}  })(ProductDetailedInfo);
