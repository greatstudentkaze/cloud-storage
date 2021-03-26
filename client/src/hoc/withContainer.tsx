import React, { FC } from 'react';

const withContainer = (Component: FC ) => {
  return (
    <div className="container">
      <Component />
    </div>
  );
};

export default withContainer;
