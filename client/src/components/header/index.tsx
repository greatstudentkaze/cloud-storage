import React from 'react';
import { NavLink } from 'react-router-dom';

import './css/user-list.css';
import './css/main-nav.css';
import './css/page-header.css';

const Header = () => {
  return (
    <header className="page-header">
      <a className="logo" href="/">MERN CLOUD STORAGE</a>
      <nav className="main-nav">
        <ul className="main-nav__list user-list">
          <li className="user-list__item">
            <NavLink className="page-header__login" to="/login">Войти</NavLink>
          </li>
          <li className="user-list__item">
            <NavLink className="page-header__registration" to="/registration">Зарегистрироваться</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
