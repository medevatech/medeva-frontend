/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';

const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div className={`wizard-buttons ${className}`}>
          <Button
            color="secondary"
            className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
            onClick={() => {
              onClickPrev(previous, steps, step);
            }}
          >
            {prevLabel}
          </Button>

          <Button
            color="secondary"
            className={
              steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''
            }
            onClick={() => {
              onClickNext(next, steps, step);
            }}
          >
            {nextLabel}
          </Button>
        </div>
      )}
    />
  );
};
export default BottomNavigation;
