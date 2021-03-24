import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushDirToStack, setCurrentDirectory } from '../../../../redux/reducer/file';
import { RootState } from '../../../../redux/store';
import { downloadFile } from '../../../../redux/actions/file';

type Props = {
  file: any
};

const File = ({ file }: Props) => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(({ file }: RootState) => file.currentDirectory);

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

  return (
    <div className="file" onClick={handleOpenDirectory}>
      <img className="file__img" src="" alt="" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== 'dir' && <button type="button" onClick={handleDownloadClick}>Загрузить</button>}
      <button type="button">Удалить</button>
    </div>
  );
};

export default File;
