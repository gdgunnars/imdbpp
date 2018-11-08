/**
 * ToDo get view from SpinnerType obj
 * Set animation to loop
 * Stop animation on demend
 */

import React from 'react';
import CircleSpinner from './circleSpinner.component';

const Spinners = ({ spinnerType }) => {
  let spinner;
  switch (spinnerType.toLowerCase()) {
    case 'circle':
      spinner = <CircleSpinner />;
      break;
    default:
      spinner = <CircleSpinner />;
      break;
  }

  return (spinner);
}

export default Spinners;
