import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';


const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-dashboard" */ './dashboard')
);
const DashboardPPS = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-dashboard-pps" */ './dashboard-pps')
);
const DashboardFFS = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-dashboard-ffs" */ './dashboard-ffs')
);
const TargetPPS = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-target-pps" */ './target-pps')
);
const TargetFFS = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-target-ffs" */ './target-ffs')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-data" */ './data')
);
const Partnership = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-partnership" */ './partnership')
);
const PartnershipBackup = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-partnership-backup" */ './partnership-backup')
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
              path={`${match.url}/dashboard`}
              component={Dashboard}
              roles={[ "isDev", "isFinance", "isManajemen" ]}
            />
            <ProtectedRoute
              path={`${match.url}/dashboard-pps`}
              component={DashboardPPS}
              roles={[ "isDev", "isFinance", "isManajemen" ]}
            />
            <ProtectedRoute
              path={`${match.url}/dashboard-ffs`}
              component={DashboardFFS}
              roles={[ "isDev", "isFinance", "isManajemen" ]}
            />
            <ProtectedRoute
              path={`${match.url}/target-pps`}
              component={TargetPPS}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
            <ProtectedRoute
              path={`${match.url}/target-ffs`}
              component={TargetFFS}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
            <ProtectedRoute
              path={`${match.url}/list`}
              component={Data}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
            <ProtectedRoute
              path={`${match.url}/partnership-backup`}
              component={PartnershipBackup}
              roles={[ "isDev", "isManager", "isAdmin" ]}
            />
            <ProtectedRoute
              path={`${match.url}/partnership`}
              component={Partnership}
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