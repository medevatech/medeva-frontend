import React from 'react';
import { components } from 'react-select';

const CustomSelectInput = (props) => {
  const customProps = { ...props };
  delete customProps.autoCorrect;
  delete customProps.autoCapitalize;
  delete customProps.onMouseMove;
  delete customProps.onMouseOver;
  return <components.Input {...customProps} />;
};

export default CustomSelectInput;
