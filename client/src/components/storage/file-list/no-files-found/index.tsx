import React from 'react';

import './css/no-files-found.css';
import files from '../../../../assets/img/files.svg';

const NoFilesFound = () => {
  return (
    <div className="no-files-found-wrapper">
      <div className="no-files-found">
        <div className="no-files-found__image">
          <img src={files} width="150" height="150" alt="" />
        </div>
        <h2 className="no-files-found__lead">Файлы не найдены</h2>
        <p className="no-files-found__hint">Перетащите файл или&nbsp;воспользуйтесь кнопками выше</p>
      </div>
    </div>
  );
};

export default NoFilesFound;
