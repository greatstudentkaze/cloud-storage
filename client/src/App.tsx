import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
