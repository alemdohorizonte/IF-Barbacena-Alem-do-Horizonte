import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/home/Home';
import Category from './pages/category/Category';
import Work from './pages/work/Work';
import NotFound from './pages/error/404';

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={()=>Home()} />
            <Route path="/categoria/:categoria" exact component={()=><Category />} />
            <Route path="/categoria/:categoria/:index" component={()=> <Work />} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;