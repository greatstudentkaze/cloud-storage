import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './redux/store';

import Header from './components/header';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';

const App = () => {
  const isAuthorized = useSelector(({ user }: RootState) => user.isAuthorized);

  return (
    <>
      <Header />
      {
        isAuthorized
          ? 'Пользователь авторизован'
          : (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          )
      }
    </>
  );
};

export default App;
