import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Main = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ './main')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/main`} />
            <Route
              path={`${match.url}/`}
              render={(props) => <Main {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/patient`}
                    component={Patient}
                    // roles={[UserRole.Admin]}
            />
            <ProtectedRoute
                    path={`${match.url}/employee`}
                    component={Employee}
                    // roles={[UserRole.Admin]}
            /> */}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));