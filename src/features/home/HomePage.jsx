import React, { Component } from 'react';
import TopSellers from './Categories/TopSellers';
import BestOffer from './Categories/BestOffer';

class HomePage extends Component {
  render() {
    return (
      <div>
        <TopSellers />
        <BestOffer />
      </div>
    )
  }
}

export default  HomePage;