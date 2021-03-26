import React, { DragEventHandler } from 'react';

import './css/drop-area.css';

type Props = {
  handleDrop: DragEventHandler,
  handleDragEnter: DragEventHandler,
  handleDragLeave: DragEventHandler,
};

const DropArea = ({ handleDrop, handleDragEnter, handleDragLeave }: Props ) => {
  return (
    <div className="drop-area" onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter}>
      Перетащите файлы сюда
    </div>
  );
};

export default DropArea;
