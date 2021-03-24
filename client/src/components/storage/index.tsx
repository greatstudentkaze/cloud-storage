import React, { ChangeEvent, DragEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getFiles, uploadFile } from '../../redux/actions/file';
import { popDirFromStack, setCurrentDirectory, setPopupDisplay, setView } from '../../redux/reducer/file';

import FileList from './file-list';
import Popup from './popup';
import Uploader from './uploader';
import Loader from '../loader';

const Storage = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const dirStack = useSelector(({ file }: RootState) => file.dirStack);
  const isShowLoader = useSelector(({ app }: RootState) => app.isShowLoader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDirectory, sort));
  }, [currentDirectory, sort]);

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

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    setDragEnter(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    setDragEnter(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const fileList = evt.dataTransfer.files;

    const files = fileList ? [...Array.from(fileList)] : [];
    files.forEach(file => dispatch(uploadFile(file, currentDirectory)));

    setDragEnter(false);
  };

  const handleSortChange = (evt: ChangeEvent<HTMLSelectElement>) => setSort(evt.target.value);

  const handleDisplaySelectionClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const { currentTarget } = evt;

    dispatch(setView(currentTarget.dataset.view ?? ''));
  };

  if (isShowLoader) {
    return <Loader />;
  }

  return (
    dragEnter
      ? (
      <div className="drop-area" onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter}>
        Перетащите файлы сюда
      </div>
      )
      : (
        <div className="storage" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter} >
          <div className="storage__buttons">
            {
              currentDirectory && <button className="storage__button storage__button--back" type="button" onClick={handleBackButtonClick}>Назад</button>
            }
            <button className="storage__button storage__button--create" type="button" onClick={handleCreateClick}>Создать папку</button>
            <div className="storage__upload">
              <label htmlFor="upload" className="storage__upload-label">Загрузить файл</label>
              <input className="storage__upload-input" type="file" id="upload" onChange={handleFileUploadChange} multiple={true} />
            </div>
            <select className="storage__select" value={sort} onChange={handleSortChange}>
              <option value="name">По имени</option>
              <option value="type">По типу</option>
              <option value="date">По дате</option>
            </select>
            <div className="storage__display-selection display-selection">
              <button className="display-selection__plate" type="button" data-view="plate" onClick={handleDisplaySelectionClick}>Плитка</button>
              <button className="display-selection__list" type="button" data-view="list" onClick={handleDisplaySelectionClick}>Список</button>
            </div>
          </div>
          <FileList />
          <Popup />
          <Uploader />
        </div>
      )
  );
};

export default Storage;
