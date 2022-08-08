import React from 'react';
import spinner from './load.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '340px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;