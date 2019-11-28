import React, { Component, Fragment } from 'react';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import ModalManager from '../../features/modals/ModalManager';
import HomePage from '../../features/home/HomePage';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import ProductDashBoard from '../../features/product/ProductDashBoard/ProductDashBoard';
import ProductDetailedPage from '../../features/product/ProductDetailedPage/ProductDetailedPage';
import Cart from '../../features/cart/Cart';
import Wishlist from '../../features/wishlist/Wishlist';
import { Footer } from '../../features/footer/Footer';
import Beauty from '../../features/product/Beauty/Beauty';
import Jewellery from '../../features/product/Jewellery/Jewellery';

class App extends Component {
  render() {
    return (
      <Fragment>
      <ModalManager /> 
       <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/profile/:id' component={UserDetailedPage} />
          <Route exact path='/products' component={ProductDashBoard} />
          <Route exact path='/product/:id' component={ProductDetailedPage} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/wishlist' component={Wishlist} />
          <Route exact path='/beauty' component={Beauty}/>
          <Route exact path='/jewellery' component={Jewellery}/>
        </Switch>
        <Footer />
      </Fragment>
      
    );
  }
}
export default withRouter(App);
