import React, { Component } from 'react';
import ElectronicsCategory from './Categories/ElectronicsCategory';
import TopSellers from './Categories/TopSellers';

class HomePage extends Component {
  render() {
    return (
      <div>
        <TopSellers />
        <ElectronicsCategory/>
      </div>
    )
  }
}

export default  HomePage;