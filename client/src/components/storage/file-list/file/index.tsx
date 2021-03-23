import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushDirToStack, setCurrentDirectory } from '../../../../redux/reducer/file';
import { RootState } from '../../../../redux/store';

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

  return (
    <div className="file" onClick={handleOpenDirectory}>
      <img className="file__img" src="" alt="" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;
