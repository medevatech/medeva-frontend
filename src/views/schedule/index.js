import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';

const Shift = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-shift" */ './shift')
);
const Manage = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-manage" */ './manage')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-data" */ './data')
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
              path={`${match.url}`}
              component={Manage}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
            />
            {/* <ProtectedRoute
              path={`${match.url}/shift`}
              component={Shift}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
            />
            <ProtectedRoute
              path={`${match.url}/data`}
              component={Data}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
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