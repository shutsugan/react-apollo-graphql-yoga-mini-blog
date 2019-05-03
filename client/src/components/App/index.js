import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

const pages = ['Home', 'Signup', 'Login'];
const [
  Home, Signup, Login
] = pages.map(page => lazy(_ => import(`../../pages/${page}`)));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={_ => <Home />} />
            <Route exact path="/signup" component={_ => <Signup />} />
            <Route exact path="/login" component={_ => <Login />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
