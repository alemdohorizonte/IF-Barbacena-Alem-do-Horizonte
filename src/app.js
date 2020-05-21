import React, { Component } from 'react';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    )
  }
}

export default App;