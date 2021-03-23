import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getFiles } from '../../redux/actions/file';
import FileList from './file-list';

const Storage = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);

  useEffect(() => {
    dispatch(getFiles(currentDirectory));
  }, [currentDirectory]);

  return (
    <div className="storage">
      <div className="storage__buttons">
        <button className="storage__button storage__button--back" type="button">Назад</button>
        <button className="storage__button storage__button--create" type="button">Создать папку</button>
      </div>
      <FileList />
    </div>
  );
};

export default Storage;
