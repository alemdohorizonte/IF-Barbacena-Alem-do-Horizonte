import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home';

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/categorias" component={()=><Home />} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;