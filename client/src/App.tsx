import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/store';
import { auth } from './redux/actions/user';

import Header from './components/header';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';

const App = () => {
  const isAuthorized = useSelector(({ user }: RootState) => user.isAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

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
