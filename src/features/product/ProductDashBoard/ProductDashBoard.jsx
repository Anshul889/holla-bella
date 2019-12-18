import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ProductList from '../ProductList/ProductList';
import { Loader } from 'semantic-ui-react';

const mapState = state => ({
  products: state.firestore.ordered.products,
  loading: state.async.loading
});

class ProductDashBoard extends Component {

  render() {
    const { products, loading } = this.props;
    return (
      <Fragment>
        <ProductList
          loading={loading}
          products={products}
        />
        <Loader active={loading} style={{paddingBottom : '50px'}}/>
      </Fragment>
    );
  }
}

export default connect(
  mapState,
  null
)(firestoreConnect([{ collection: 'products' }])(ProductDashBoard));
