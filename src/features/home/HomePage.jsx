import React, { Component } from 'react';
import BookCategory from './Categories/BookCategory';
import ElectronicsCategory from './Categories/ElectronicsCategory';

class HomePage extends Component {
  render() {
    return (
      <div>
        <BookCategory />
        <ElectronicsCategory/>
      </div>
    )
  }
}

export default  HomePage;