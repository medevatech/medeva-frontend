import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const location = useLocation();

  if (!JSON.parse(localStorage.getItem('user_data')).token) {
    return <Redirect to='../' state={{ from: location }} />
  }

  return children;
}

export default PrivateRoute;