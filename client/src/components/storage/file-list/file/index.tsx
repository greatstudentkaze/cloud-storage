import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushDirToStack, setCurrentDirectory } from '../../../../redux/reducer/file';
import { RootState } from '../../../../redux/store';
import { downloadFile, deleteFile } from '../../../../redux/actions/file';
import formatSize from '../../../../utils/formatSize';

import './css/file.css';

type Props = {
  file: any
};

const File = ({ file }: Props) => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);
  const filesView = useSelector(({ file }: RootState) => file.view);

  const handleOpenDirectory = () => {
    if (file.type !== 'dir') {
      return;
    }

    dispatch(pushDirToStack(currentDirectory));
    dispatch(setCurrentDirectory(file._id));
  };

  const handleDownloadClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    downloadFile(file);
  };

  const handleDeleteClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();

    dispatch(deleteFile(file));
  };

  if (filesView === 'plate') {
    return (
      <div className="file file--plate" onClick={handleOpenDirectory}>
        <img className="file__img" src="" alt="" />
        <div className="file__name">{file.name}</div>
        <div className="file__actions">
          {file.type !== 'dir' && <button type="button" onClick={handleDownloadClick}>Загрузить</button>}
          <button type="button" onClick={handleDeleteClick}>Удалить</button>
        </div>
      </div>
    );
  }

  if (filesView === 'list') {
    return (
      <div className="file" onClick={handleOpenDirectory}>
        <img className="file__img" src="" alt="" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{formatSize(file.size)}</div>
        {file.type !== 'dir' && <button type="button" onClick={handleDownloadClick}>Загрузить</button>}
        <button type="button" onClick={handleDeleteClick}>Удалить</button>
      </div>
    );
  }

  return null;
};

export default File;
