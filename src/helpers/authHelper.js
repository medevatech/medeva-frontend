import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { getCurrentUser } from './Utils';

const userData = JSON.parse(localStorage.getItem('user_data'));

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
          // if (roles.filter(element => currentUser.roles.includes(element))) {

          // console.log('roles', roles);
          // // console.log('userData', userData.roles);
          // console.log('currentUser.roles', currentUser.roles);
          // console.log('compare', roles.includes(currentUser.roles));
          
          // if (roles.includes(currentUser.roles.toString())) {
          //   return <Component {...props} />;
          // }

          let rolesLoop = 0; let rolesStart, rolesCompare = "";
          if(currentUser.roles.length > roles.length) {
            rolesLoop = currentUser.roles.length;

            rolesStart = currentUser.roles;
            rolesCompare = roles;
          } else {
            rolesLoop = roles.length
            
            rolesStart = roles;
            rolesCompare = currentUser.roles;
          }

          let authorized = false;

          for(var i = 0; i < rolesLoop; i++){
            for(var j = 0; j < rolesLoop; j++){
              // console.log('compare', rolesStart[i], rolesCompare[j]);
              if(rolesStart[i] === rolesCompare[j]){
                authorized = true;
              }
            }
          }

          if(authorized === true){
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
