import React from 'react';

import './css/loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
