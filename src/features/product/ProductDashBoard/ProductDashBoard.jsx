import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getProductsForDashboard } from '../productActions';
import ProductList from '../ProductList/ProductList';
import { Loader } from 'semantic-ui-react';

const mapState = state => ({
  products: state.products,
  loading: state.async.loading
});

const actions = {
  getProductsForDashboard
};

class ProductDashBoard extends Component {
  state = {
    moreProducts: false,
    loadingInitial: true,
    loadedProducts: []
  };

  async componentDidMount() {
    let next = await this.props.getProductsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreProducts: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.products !== prevProps.products) {
      this.setState({
        loadedProducts: [...this.state.loadedProducts, ...this.props.products]
      });
    }
  };

  getNextProducts = async () => {
    const { products } = this.props;
    let lastProduct = products && products[products.length - 1];
    let next = await this.props.getProductsForDashboard(lastProduct);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreProducts: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreProducts, loadedProducts } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Fragment>
        <ProductList
          loading={loading}
          products={loadedProducts}
          moreProducts={moreProducts}
          getNextProducts={this.getNextProducts}
        />
        <Loader active={loading} style={{paddingBottom : '50px'}}/>
      </Fragment>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'products' }])(ProductDashBoard));
