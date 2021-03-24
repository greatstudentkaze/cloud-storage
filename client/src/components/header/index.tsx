import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { logOut } from '../../redux/reducer/user';
import { getFiles, searchFiles } from '../../redux/actions/file';
import { showLoader } from '../../redux/reducer/app';

import Input from '../input';

import './css/user-list.css';
import './css/main-nav.css';
import './css/page-header.css';
import userAvatar from '../../assets/img/user-avatar.svg';

const SEARCH_TIMEOUT = 500;

const Header = () => {
  const isAuthorized = useSelector(({ user }: RootState) => user.isAuthorized);
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const currentUser = useSelector(({ user }: RootState) => user.currentUser);
  const sort = useSelector(({ file }: RootState) => file.sort);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>(null as unknown as NodeJS.Timeout);
  const avatar = currentUser.avatar ? `http://localhost:9111/${currentUser.avatar}` : userAvatar;

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    dispatch(showLoader());
    if (searchQuery) {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value));
      }, SEARCH_TIMEOUT, searchQuery));
    } else {
      dispatch(getFiles(currentDirectory, sort));
    }
  }, [searchQuery]);

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
              <Input className="user-list__search" type="text" placeholder="Название файла..." value={searchQuery} setValue={setSearchQuery} />
            </li>
          }
          {
            isAuthorized && <li className="user-list__item">
              <NavLink className="user-list__profile" to="/profile"><img src={avatar} width="30" height="30" alt="Аватар" /></NavLink>
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
