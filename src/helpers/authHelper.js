import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { store } from '../redux/store';
const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const state = store.getState();
      const currentUser =state.authUser.currentUser;
      if (currentUser&&currentUser.name!='') {
        // if (roles) {
        //   if (roles.includes(currentUser.role)) {
            // return <Component {...props} />;
          // }
          // return (
          //   <Redirect
          //     to={{
          //       pathname: '/unauthorized',
          //       state: { from: props.location },
          //     }}
          //   />
          // );
        // }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
