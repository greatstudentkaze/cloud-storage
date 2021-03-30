import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { RootState } from '../../../redux/store';
import { IFile } from '../../../interfaces';

import File from './file';
import Loader from '../../loader';
import NoFilesFound from './no-files-found';

import './css/file-list.css';

const FileList = () => {
  const files = useSelector(({ file }: RootState) => file.files);
  const filesView = useSelector(({ file }: RootState) => file.view);
  const isShowLoader = useSelector(({ app }: RootState) => app.isShowLoader);

  if (isShowLoader) {
    return <Loader />
  }

  if (!files.length) {
    return <NoFilesFound />;
  }

  if (filesView === 'plate') {
    return (
      <div className="file-plate">
        {
          files.map((file: IFile) => (<File key={file._id} file={file} />)
          )
        }
      </div>
    );
  }

  if (filesView === 'list') {
    return (
      <div className="files files--list">
        <header className="files__header">
          <div className="files__name">Название</div>
          <div className="files__date">Дата</div>
          <div className="files__size">Размер</div>
        </header>
        <ul className="files__list">
          <TransitionGroup>
            {
              files.map((file: IFile) => (
                <CSSTransition
                  key={file._id}
                  timeout={400}
                  classNames={'file'}
                  exit={false}
                ><li className="files__item"><File file={file} /></li>
                </CSSTransition>)
              )
            }
          </TransitionGroup>
        </ul>
      </div>
    );
  }

  return null;
};

export default FileList;
