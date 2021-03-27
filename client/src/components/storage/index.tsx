import React, { ChangeEvent, DragEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getFiles, uploadFile } from '../../redux/actions/file';
import { popDirFromStack, setCurrentDirectory, setPopupDisplay, setView } from '../../redux/reducer/file';

import FileList from './file-list';
import Popup from './popup';
import Uploader from './uploader';

import './css/storage.css';
import './css/display-selection.css';
import DropArea from './drop-area';

const Storage = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const view = useSelector(({ file }: RootState) => file.view);
  const dirStack = useSelector(({ file }: RootState) => file.dirStack);
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

    dispatch(setView(currentTarget.dataset.view ?? 'list'));
  };

  return (
    dragEnter
      ? <DropArea handleDrop={handleDrop} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave} />
      : (
        <section className="storage" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter} >
          <h2 className="visually-hidden">Хранилище</h2>
          <div className="storage__actions">
            {currentDirectory && <button className="storage__button storage__button--back button" type="button" onClick={handleBackButtonClick}>Назад</button>}
            <button className="storage__button storage__button--create button" type="button" onClick={handleCreateClick}>Создать папку</button>
            <div className="storage__upload">
              <input type="file" id="upload" onChange={handleFileUploadChange} multiple={true} />
              <label htmlFor="upload" className="storage__upload-label button">Загрузить файл</label>
            </div>
            <select className="storage__select" value={sort} onChange={handleSortChange}>
              <option value="name">По имени</option>
              <option value="type">По типу</option>
              <option value="date">По дате</option>
            </select>
            <div className="storage__display-selection display-selection">
              <button className={`display-selection__item ${view === 'plate' ? 'display-selection__item--active' : ''}`} type="button" data-view="plate" onClick={handleDisplaySelectionClick}>
                <svg width="40" height="40" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0C0.447715 0 0 0.447715 0 1V5C0 5.55228 0.447715 6 1 6H5C5.55228 6 6 5.55228 6 5V1C6 0.447715 5.55228 0 5 0H1Z" />
                  <path d="M1 7C0.447715 7 0 7.44772 0 8V12C0 12.5523 0.447715 13 1 13H5C5.55228 13 6 12.5523 6 12V8C6 7.44772 5.55228 7 5 7H1Z" />
                  <path d="M7 1C7 0.447715 7.44772 0 8 0H12C12.5523 0 13 0.447715 13 1V5C13 5.55228 12.5523 6 12 6H8C7.44772 6 7 5.55228 7 5V1Z" />
                  <path d="M8 7C7.44772 7 7 7.44772 7 8V12C7 12.5523 7.44772 13 8 13H12C12.5523 13 13 12.5523 13 12V8C13 7.44772 12.5523 7 12 7H8Z" />
                </svg>
                <span className="visually-hidden">Плитка</span>
              </button>
              <button className={`display-selection__item ${view === 'list' ? 'display-selection__item--active' : ''}`} type="button" data-view="list" onClick={handleDisplaySelectionClick}>
                <svg width="40" height="40" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.08571 0.927599C4.08572 0.4153 4.50102 0 5.01332 0H12.0724C12.5847 0 13 0.415302 13 0.927602C13 1.4399 12.5847 1.8552 12.0724 1.8552H5.01332C4.50102 1.8552 4.08571 1.4399 4.08571 0.927599ZM1.91901e-06 0.940117C2.96784e-06 0.43004 0.411849 0.0156702 0.921917 0.012553L2.03818 0.00573116C2.55267 0.0025869 2.97143 0.418793 2.97143 0.933299C2.97143 1.44338 2.55958 1.85775 2.04951 1.86086L0.933254 1.86768C0.418758 1.87083 8.61079e-07 1.45462 1.91901e-06 0.940117Z" />
                  <path d="M4.08571 6.4932C4.08571 5.9809 4.4215 5.5656 4.83571 5.5656H12.25C12.6642 5.5656 13 5.98091 13 6.49321C13 7.0055 12.6642 7.4208 12.25 7.4208H4.83571C4.4215 7.4208 4.08571 7.0055 4.08571 6.4932ZM0 6.5068C1.04971e-06 5.9963 0.333529 5.58175 0.746285 5.57923L2.21773 5.57024C2.63338 5.5677 2.97143 5.98373 2.97143 6.49782C2.97143 7.00832 2.6379 7.42287 2.22514 7.42539L0.753696 7.43439C0.338044 7.43693 -1.05706e-06 7.02089 0 6.5068Z" />
                  <path d="M4.08571 12.0588C4.08571 11.5465 4.4215 11.1312 4.83571 11.1312H12.25C12.6642 11.1312 13 11.5465 13 12.0588C13 12.5711 12.6642 12.9864 12.25 12.9864H4.83571C4.4215 12.9864 4.08571 12.5711 4.08571 12.0588ZM0 12.0724C1.04971e-06 11.5619 0.333529 11.1474 0.746285 11.1448L2.21773 11.1358C2.63338 11.1333 2.97143 11.5493 2.97143 12.0634C2.97143 12.5739 2.6379 12.9885 2.22514 12.991L0.753696 13C0.338044 13.0025 -1.05707e-06 12.5865 0 12.0724Z" />
                </svg>
                <span className="visually-hidden">Список</span>
              </button>
            </div>
          </div>
          <FileList />
          <Popup />
          <Uploader />
        </section>
      )
  );
};

export default Storage;
