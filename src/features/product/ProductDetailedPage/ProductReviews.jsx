import React from 'react'
import styles from './ProductReviews.module.css'
import { Rating } from 'semantic-ui-react'
import format from 'date-fns/format'

const ProductReviews = ({reviews, removeReview, isReviewer, product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {reviews && reviews.map(review => 

          <div className={styles.review} key={review.id}>
            <div className={styles.image}>
              <img src={review.photoURL} alt=''/>
            </div>
            <div>{review.comment}</div>
            <div>
            <Rating size='tiny' disabled icon='star' rating={review.rating} maxRating={5}/>
            {isReviewer && <div>
              {review.addDate && <div style={{fontSize: '10px', paddingLeft: '2px'}}>{format(review.addDate.toDate(), 'do LLL yyyy')}</div>}
              <div style={{ fontSize: '10px', color: 'red', textTransform: 'underline', paddingLeft: '2px'}} onClick={() =>removeReview(product)}>delete</div>
            </div>}
            </div>
          </div>     
          )}
      </div>
    </div>
  )
}

export default ProductReviews
