import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { logOut } from '../../redux/reducer/user';

import './css/user-list.css';
import './css/main-nav.css';
import './css/page-header.css';

const Header = () => {
  const isAuthorized = useSelector(({ user }: RootState) => user.isAuthorized);
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
  }

  return (
    <header className="page-header">
      <a className="logo" href="/">MERN CLOUD STORAGE</a>
      <nav className="main-nav">
        <ul className="main-nav__list user-list">
          {
            !isAuthorized && <li className="user-list__item">
              <NavLink className="page-header__login" to="/login">Войти</NavLink>
            </li>
          }
          {
            !isAuthorized && <li className="user-list__item">
              <NavLink className="page-header__registration" to="/registration">Зарегистрироваться</NavLink>
            </li>
          }
          {
            isAuthorized && <li className="user-list__item">
              <button className="page-header__logout" type="button" onClick={handleLogOutClick}>Выйти</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
