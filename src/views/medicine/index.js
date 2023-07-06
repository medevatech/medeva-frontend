import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';

const Clinic = React.lazy(() =>
  import(/* webpackChunkName: "views-medicine-clinic" */ './clinic')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-medicine-data" */ './data')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
            {/* <Route
              path={`${match.url}/data`}
              render={(props) => <Data {...props} />}
            /> */}
            <ProtectedRoute
              path={`${match.url}/clinic`}
              component={Clinic}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
            <ProtectedRoute
              path={`${match.url}`}
              component={Data}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
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