import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { RootState } from '../../../redux/store';

import File from './file';

import './css/file-list.css';

const FileList = () => {
  const files = useSelector(({ file }: RootState) => file.files);
  const filesView = useSelector(({ file }: RootState) => file.view);

  if (!files.length) {
    return (
      <div>
        Файлы не найдены
      </div>
    );
  }

  if (filesView === 'plate') {
    return (
      <div className="file-plate">
        {
          files.map((file: any) => (<File key={file._id} file={file} />)
          )
        }
      </div>
    );
  }

  if (filesView === 'list') {
    return (
      <div className="file-list">
        <header className="file-list__header">
          <div className="file-list__name">Название</div>
          <div className="file-list__date">Дата</div>
          <div className="file-list__size">Размер</div>
        </header>
        <TransitionGroup>
          {
            files.map((file: any) => (
              <CSSTransition
                key={file._id}
                timeout={400}
                classNames={'file'}
                exit={false}
              ><File file={file} />
              </CSSTransition>)
            )
          }

        </TransitionGroup>
      </div>
    );
  }

  return null;
};

export default FileList;
