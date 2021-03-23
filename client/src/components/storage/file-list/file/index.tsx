import React from 'react';

type Props = {
  file: any
};

const File = ({ file }: Props) => {
  return (
    <div className="file">
      <img className="file__img" src="" alt="" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;
