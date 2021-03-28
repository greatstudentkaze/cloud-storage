import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../constants';

import { RootState } from '../../redux/store';
import { logOut } from '../../redux/actions/user';
import { getFiles, searchFiles } from '../../redux/actions/file';
import { showLoader } from '../../redux/actions/app';

import Input from '../input';

import './css/logo.css';
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
  const avatar = currentUser && currentUser.avatar ? `${API_URL}${currentUser.avatar}` : userAvatar;

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

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
      <div className="page-header__container container">
        <Link className="logo" to="/">MERN CLOUD STORAGE</Link>
        <nav className="main-nav">
          <ul className="main-nav__list user-list">
            {
              isAuthorized
                ? <>
                  <li className="user-list__item">
                    <Input className="user-list__search" type="text" placeholder="Название файла..." value={searchQuery} setValue={setSearchQuery} />
                  </li>
                  <li className="user-list__item">
                    <NavLink className="user-list__profile" to="/profile"><img src={avatar} width="37" height="37" alt="Аватар" /></NavLink>
                  </li>
                  <li className="user-list__item">
                    <button className="user-list__logout button" type="button" onClick={handleLogOutClick}>Выйти</button>
                  </li>
                </>
              : <>
                <li className="user-list__item">
                  <NavLink className="user-list__login button" to="/login">Войти</NavLink>
                </li>
                <li className="user-list__item">
                  <NavLink className="user-list__registration button" to="/registration">Зарегистрироваться</NavLink>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
