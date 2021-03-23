import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getFiles } from '../../redux/actions/file';
import { setPopupDisplay } from '../../redux/reducer/file';

import FileList from './file-list';
import Popup from './popup';

const Storage = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);

  useEffect(() => {
    dispatch(getFiles(currentDirectory));
  }, [currentDirectory]);

  const handleCreateClick = () => {
    dispatch(setPopupDisplay(true));
  };

  return (
    <div className="storage">
      <div className="storage__buttons">
        <button className="storage__button storage__button--back" type="button">Назад</button>
        <button className="storage__button storage__button--create" type="button" onClick={handleCreateClick}>Создать папку</button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Storage;
