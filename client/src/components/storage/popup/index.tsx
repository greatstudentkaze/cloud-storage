import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { setPopupDisplay } from '../../../redux/actions/file';
import { createDirectory } from '../../../redux/actions/file';

import Input from '../../input';

import './css/popup.css';

const Popup = () => {
  const isShowPopup = useSelector(({ file }: RootState) => file.isShowPopup);
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const dispatch = useDispatch();
  const [dirName, setDirName] = useState('');

  const handleCloseClick = () => {
    dispatch(setPopupDisplay(false));
  };

  const handleCreateClick = () => {
    dispatch(createDirectory(currentDirectory, dirName));
    setDirName('');
    dispatch(setPopupDisplay(false));
  };

  return (
    <div className="popup" onClick={handleCloseClick} style={{ display: isShowPopup ? 'flex' : 'none' }}>
      <section className="popup__content" onClick={(evt) => evt.stopPropagation()}>
        <header className="popup__header">
          <h2 className="popup__title">Создать новую папку</h2>
          <button type="button" className="popup__close" onClick={handleCloseClick}>x</button>
        </header>
        <Input className="popup__input" type="text" placeholder="Введите название папки" value={dirName} setValue={setDirName} />
        <button className="popup__create" onClick={handleCreateClick}>Создать</button>
      </section>
    </div>
  );
};

export default Popup;
