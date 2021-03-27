import React from 'react';
import { useDispatch } from 'react-redux';

import { removeUploadFile } from '../../../../redux/reducer/upload';
import { IUploadFile } from '../../../../interfaces';

import './css/upload-file.css';

type Props = {
  file: IUploadFile,
}

const UploadFile = ({ file }: Props) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeUploadFile(file.id));
  };

  return (
    <div className="upload-file">
      <header className="upload-file__header">
        <div className="upload-file__title">{file.name}</div>
        <button className="upload-file__remove" type="button" onClick={handleRemoveClick}>Х</button>
      </header>
      <div className="upload-file__progress">
        <div className="upload-file__upload-bar" style={{ width: file.progress + '%' }} />
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
