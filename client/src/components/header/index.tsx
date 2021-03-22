import React from 'react';

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
            <a className="page-header__login" href="/">Войти</a>
          </li>
          <li className="user-list__item">
      <a className="page-header__registration" href="/">Зарегистрироваться</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
