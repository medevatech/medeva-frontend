import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        if (roles) {
          // roles.filter(element => currentUser.roles.includes(element)) ? console.log(true) : console.log(false);
          // if (roles.includes(currentUser.roles)) {
          if (roles.filter(element => currentUser.roles.includes(element))) {
            return <Component {...props} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

export { ProtectedRoute };
