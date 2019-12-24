import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../modals/modalActions';
import { Link } from "react-router-dom";
import { objectToArray } from "../../app/common/util/helpers";
import ProductReviewForm from '../product/ProductDetailedPage/ProductReviewForm';
import { addReview } from '../../user/userActions';

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
})

const actions = { 
  closeModal,
  addReview,
 };

class ReviewModal extends Component {
  render() {
    const {profile, auth} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Modal size='mini' open={true} onClose={this.props.closeModal}>
        <Modal.Header style={{textAlign: 'center'}}>User Review</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>We appreciate your feedback</div>
            <div>{objectToArray(profile.previousOrder).map(product => (
              <div key={product.id}>
               <Link to={`product/product.id`}>{product.title}</Link>
               <ProductReviewForm addReview={addReview} product={product} authenticated={authenticated}/>
              </div>
            ))}</div>
            <Button negative fluid content='Cancel'  onClick={closeModal}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  mapState,
  actions
)(ReviewModal);