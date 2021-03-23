import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

import File from './file';

const FileList = () => {
  const files = useSelector(({ file }: RootState) => file.files)
    .map((file: any) => <File key={file._id} file={file} />);

  return (
    <div className="file-list">
      <header className="file-list__header">
        <div className="file-list__name">Название</div>
        <div className="file-list__date">Дата</div>
        <div className="file-list__size">Размер</div>
      </header>
      {files}
    </div>
  );
};

export default FileList;
