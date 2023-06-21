import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';


const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-dashboard" */ './dashboard')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-data" */ './data')
);
const Partnership = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance-partnership" */ './partnership')
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
              path={`${match.url}/list`}
              component={Data}
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