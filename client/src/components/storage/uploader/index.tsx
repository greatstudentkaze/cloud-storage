import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { hideUploader } from '../../../redux/reducer/upload';
import { IUploadFile } from '../../../interfaces';

import UploadFile from './upload-file';

import './css/uploader.css';

const Uploader = () => {
  const isVisible = useSelector(({ upload }: RootState) => upload.isVisible);
  const files = useSelector(({ upload }: RootState) => upload.files);
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(hideUploader());
  };

  return (isVisible &&
    <section className="uploader">
      <header className="uploader__header">
        <h2 className="uploader__title">Загрузки</h2>
        <button className="uploader__close" type="button" onClick={handleCloseClick}>X</button>
      </header>
      {files.map((file: IUploadFile) => <UploadFile key={file.id} file={file} />)}
    </section>
  );
};

export default Uploader;
