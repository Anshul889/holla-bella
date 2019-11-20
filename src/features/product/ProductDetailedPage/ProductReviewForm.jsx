import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import StarRating from '../../../app/common/form/StarRating';
import TextArea from '../../../app/common/form/TextArea';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';

const validate = combineValidators({
  rating: composeValidators(
    isRequired('rating'),
    )(),
  comment: composeValidators(
    isRequired({ message: 'Please enter a review' }),
    hasLengthGreaterThan(10)({
      message: 'The review needs to be at least 10 characters long'
    })
  )(),
});

 class ProductReviewForm extends Component {

  handleReviewSubmit = async values => {
    const {addReview, product, reset} = this.props;
    addReview(product, values);
    reset();
  }
  render() {
    const { invalid, submitting, pristine, isReviewer} = this.props;
    return (
      <div>{isReviewer ? <h1>Edit your Review</h1> : <h1>Add a review</h1>}
      <Form onSubmit={this.props.handleSubmit(this.handleReviewSubmit)}>
        <span>Please select a rating</span>
        <Field name='rating' type='text' component={StarRating} />
        <Field placeholder="Review" name='comment' type='text' component={TextArea} rows={2} />
        <Button disabled={invalid || submitting || pristine} content={isReviewer ? 'Edit Review' : 'Add Review'} labelPosition='left' icon='edit' primary />
      </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'productReview', validate })(ProductReviewForm);