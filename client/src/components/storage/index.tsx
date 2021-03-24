import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getFiles, uploadFile } from '../../redux/actions/file';
import { popDirFromStack, setCurrentDirectory, setPopupDisplay } from '../../redux/reducer/file';

import FileList from './file-list';
import Popup from './popup';

const Storage = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const dirStack = useSelector(({ file }: RootState) => file.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDirectory));
  }, [currentDirectory]);

  const handleCreateClick = () => {
    dispatch(setPopupDisplay(true));
  };

  const handleBackButtonClick = () => {
    const backDirId = dirStack[dirStack.length - 1];
    dispatch(popDirFromStack());
    dispatch(setCurrentDirectory(backDirId));
  };

  const handleFileUploadChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;

    const files = fileList ? [...Array.from(fileList)] : [];
    files.forEach(file => dispatch(uploadFile(file, currentDirectory)));
  }

  return (
    <div className="storage">
      <div className="storage__buttons">
        {
          currentDirectory && <button className="storage__button storage__button--back" type="button" onClick={handleBackButtonClick}>Назад</button>
        }
        <button className="storage__button storage__button--create" type="button" onClick={handleCreateClick}>Создать папку</button>
        <div className="storage__upload">
          <label htmlFor="upload" className="storage__upload-label">Загрузить файл</label>
          <input className="storage__upload-input" type="file" id="upload" onChange={handleFileUploadChange} multiple={true} />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Storage;
