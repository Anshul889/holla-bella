import React, { Component } from 'react';
import { getNotify } from './notifypeopleActions.js';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { objectToArray } from "../../app/common/util/helpers";

const mapState = state => ({
  products: state.notify
});

const actions = {
  getNotify
}

 class NotifyPeople extends Component {

  componentDidMount(){
    this.props.getNotify()
  }

  render() {
    const {products} = this.props;
    return (
      <div style={{marginBottom: '30px'}}>
        {products && products.map(product => (
          <div key={product.id}>
            <div>{product.model}</div>
            <div>{objectToArray(product.notify).map(pro => (
              <div>{pro.email}</div>
            ))}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapState, actions)(NotifyPeople);
