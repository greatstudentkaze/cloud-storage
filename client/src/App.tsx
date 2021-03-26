import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/store';
import { auth } from './redux/actions/user';

import 'normalize.css';
import './css/visually-hidden.css';
import './css/index.css';
import './css/container.css';
import './css/button.css';

import Header from './components/header';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';
import Storage from './components/storage';
import Profile from './components/profile';
import withContainer from './hoc/withContainer';

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
          ? (
            <Switch>
              <Route exact path="/" render={() => withContainer(Storage)} />
              <Route exact path="/profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          )
          : (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          )
      }
    </>
  );
};

export default App;
