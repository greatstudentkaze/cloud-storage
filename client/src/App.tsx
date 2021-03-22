import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Registration from './components/registration';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/registration" component={Registration} />
      </Switch>
    </>
  );
};

export default App;
