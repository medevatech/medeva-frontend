import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const location = useLocation();

  if (!localStorage.getItem('token')) {
    return <Redirect to='../' state={{ from: location }} />
  }

  return children;
}

export default PrivateRoute;