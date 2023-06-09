import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';

const Shift = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-shift" */ './shift')
);
const ManageDoctor = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-manage" */ './manage-doctor')
);
const ManageEmployee = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule-manage" */ './manage-employee')
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
            {/* <Redirect exact from={`${match.url}`} to={`${match.url}/manage-doctor`} /> */}
            {/* <Route
              path={`${match.url}/data`}
              render={(props) => <Data {...props} />}
            /> */}
            {/* <ProtectedRoute
              path={`${match.url}`}
              component={Manage}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
            /> */}
            <ProtectedRoute
              path={`${match.url}/shift`}
              component={Shift}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
            />
            <ProtectedRoute
              path={`${match.url}/manage-employee`}
              component={ManageEmployee}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ]}
            />
            <ProtectedRoute
              path={`${match.url}/manage-doctor`}
              component={ManageDoctor}
              roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
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