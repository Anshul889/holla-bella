import React from 'react'
import styles from './ProductReviews.module.css'
import { Rating, Button } from 'semantic-ui-react'

const ProductReviews = ({reviews, removeReview, isReviewer, product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {reviews && reviews.map(review => 
          <div className={styles.review} key={review.id}>
            <div className={styles.image}>
              <img src={review.photoURL} alt=''/>
            </div>
            <p>{review.comment}</p>
            {isReviewer && <div>
              <Button icon="trash" onClick={() =>removeReview(product)}></Button>
            </div>}
            <Rating disabled icon='star' rating={review.rating} maxRating={5}/>
          </div>     
          )}
      </div>
    </div>
  )
}

export default ProductReviews
