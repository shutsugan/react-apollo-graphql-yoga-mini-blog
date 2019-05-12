import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Head from '../Head';

import './index.css';

const pages = ['Home', 'Signup', 'Login', 'CreatePost', 'UpdatePost', 'Manage'];
const [
  Home, Signup, Login, CreatePost, UpdatePost, Manage
] = pages.map(page => lazy(_ => import(`../../pages/${page}`)));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Head />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={_ => <Home />} />
            <Route exact path="/manage" component={_ => <Manage />} />
            <Route exact path="/create" component={props => <CreatePost {...props} />} />
            <Route exact path="/update/:id" component={props => <UpdatePost {...props} />} />
            <Route exact path="/signup" component={props => <Signup {...props} />} />
            <Route exact path="/login" component={props => <Login {...props} />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
