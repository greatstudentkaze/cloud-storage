import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushDirToStack, setCurrentDirectory } from '../../../../redux/actions/file';
import { RootState } from '../../../../redux/store';
import { downloadFile, deleteFile } from '../../../../redux/actions/file';
import formatSize from '../../../../utils/formatSize';

import { IFile } from '../../../../interfaces';

import './css/file.css';
import fileIconSrc from '../../../../assets/img/file.svg';
import dirIconSrc from '../../../../assets/img/directory.svg';

type Props = {
  file: IFile
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
        <img className="file__img" src={file.type === 'dir' ? dirIconSrc : fileIconSrc} alt="" />
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
        <img className="file__img" src={file.type === 'dir' ? dirIconSrc : fileIconSrc} width="70" height="70" alt="" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.toString().slice(0, 10)}</div>
        <div className="file__size">{formatSize(file.size)}</div>
        {file.type !== 'dir' && <button className="file__button" type="button" onClick={handleDownloadClick} aria-label="Загрузить">
          <svg width="50" height="50" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M348.945 221.64v-96.894c0-2.773-1.28-5.336-3.093-7.363L237.219 3.309C235.19 1.176 232.309 0 229.429 0H57.196C25.398 0 0 25.93 0 57.73v325.684c0 31.8 25.398 57.305 57.195 57.305h135.953C218.863 483.402 265.605 512 318.852 512c80.886 0 146.941-65.734 146.941-146.727.11-70.75-50.688-129.867-116.848-143.632zM240.102 37.458l72.882 76.723h-47.273c-14.086 0-25.61-11.63-25.61-25.715zM57.195 419.375c-19.953 0-35.851-16.008-35.851-35.96V57.73c0-20.062 15.898-36.386 35.851-36.386h161.563v67.12c0 25.93 21.023 47.06 46.953 47.06h61.89v83.34c-3.199-.106-5.761-.427-8.535-.427-37.242 0-71.496 14.301-97.32 36.711H86.223c-5.871 0-10.672 4.801-10.672 10.668 0 5.872 4.8 10.672 10.672 10.672h115.675c-7.578 10.672-13.875 21.344-18.78 33.082H86.222c-5.871 0-10.672 4.801-10.672 10.672 0 5.867 4.8 10.672 10.672 10.672h89.957c-2.668 10.672-4.055 22.516-4.055 34.36 0 19.206 3.734 38.203 10.457 54.21H57.195zm261.766 71.39c-69.149 0-125.387-56.238-125.387-125.386 0-69.149 56.13-125.387 125.387-125.387 69.254 0 125.383 56.238 125.383 125.387 0 69.148-56.235 125.387-125.383 125.387zm0 0"/>
            <path d="M86.223 223.027H194.32c5.871 0 10.672-4.804 10.672-10.672 0-5.87-4.8-10.671-10.672-10.671H86.223c-5.871 0-10.672 4.8-10.672 10.671 0 5.868 4.8 10.672 10.672 10.672zm0 0M373.594 363.137l-43.856 47.273V293.883c0-5.871-4.804-10.672-10.672-10.672-5.87 0-10.671 4.8-10.671 10.672V410.41l-44.18-47.273c-4.055-4.266-10.883-4.586-15.152-.532-4.27 4.055-4.59 10.778-.532 15.047l62.426 67.121c2.027 2.133 4.8 3.414 7.79 3.414 2.987 0 5.76-1.28 7.788-3.414l62.535-67.12c4.055-4.27 3.84-11.098-.43-15.048-4.374-4.054-10.988-3.734-15.046.532zm0 0"/>
          </svg>
        </button>}
        <button className="file__button file__button--delete" type="button" onClick={handleDeleteClick} aria-label="Удалить">
          <svg width="50" height="50" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M348.945 221.64v-96.894c0-2.773-1.28-5.336-3.093-7.363L237.219 3.309C235.19 1.176 232.309 0 229.429 0H57.196C25.398 0 0 25.93 0 57.73v325.684c0 31.8 25.398 57.305 57.195 57.305h135.953C218.863 483.402 265.605 512 318.852 512c80.886 0 146.941-65.734 146.941-146.727.11-70.75-50.688-129.867-116.848-143.632zM240.102 37.458l72.882 76.723h-47.273c-14.086 0-25.61-11.63-25.61-25.715zM57.195 419.375c-19.953 0-35.851-16.008-35.851-35.96V57.73c0-20.062 15.898-36.386 35.851-36.386h161.563v67.12c0 25.93 21.023 47.06 46.953 47.06h61.89v83.34c-3.199-.106-5.761-.427-8.535-.427-37.242 0-71.496 14.301-97.32 36.711H86.223c-5.871 0-10.672 4.801-10.672 10.668 0 5.872 4.8 10.672 10.672 10.672h115.675c-7.578 10.672-13.875 21.344-18.78 33.082H86.222c-5.871 0-10.672 4.801-10.672 10.672 0 5.867 4.8 10.672 10.672 10.672h89.957c-2.668 10.672-4.055 22.516-4.055 34.36 0 19.206 3.734 38.203 10.457 54.21H57.195zm261.766 71.39c-69.149 0-125.387-56.238-125.387-125.386 0-69.149 56.13-125.387 125.387-125.387 69.254 0 125.383 56.238 125.383 125.387 0 69.148-56.235 125.387-125.383 125.387zm0 0"/>
            <path d="M86.223 223.027H194.32c5.871 0 10.672-4.804 10.672-10.672 0-5.87-4.8-10.671-10.672-10.671H86.223c-5.871 0-10.672 4.8-10.672 10.671 0 5.868 4.8 10.672 10.672 10.672zm0 0M361.75 299.86v-7.153c0-11.738-9.922-21.66-21.66-21.66h-42.688c-11.738 0-21.02 9.922-21.02 21.66v7.152h-41.296c-5.871 0-10.672 4.801-10.672 10.672 0 5.867 4.8 10.668 10.672 10.668h12.375l11.418 129.23c.535 5.548 5.125 9.497 10.672 9.497h98.496c5.547 0 10.137-4.055 10.672-9.496l11.418-129.23h12.379c5.867 0 10.671-4.802 10.671-10.669 0-5.87-4.804-10.672-10.671-10.672zm-64.027-7.47h42.687v7.47h-42.687zm60.507 146.192h-78.968L268.91 321.199h99.777zm0 0"/>
          </svg>
        </button>
      </div>
    );
  }

  return null;
};

export default File;
