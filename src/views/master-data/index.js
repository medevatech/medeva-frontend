import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';

const Insurance = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance" */ '../insurance/data')
);
const Service = React.lazy(() =>
  import(/* webpackChunkName: "views-service" */ '../service/data')
);
const Treatment = React.lazy(() =>
  import(/* webpackChunkName: "views-treatment" */ '../treatment/data')
);
const Medicine = React.lazy(() =>
  import(/* webpackChunkName: "views-medicine" */ '../medicine/data')
);
const Inspect = React.lazy(() =>
  import(/* webpackChunkName: "views-vendor" */ '../laboratorium/inspect')
);
const Vendor = React.lazy(() =>
  import(/* webpackChunkName: "views-vendor" */ '../vendor/data')
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
              path={`${match.url}/insurance`}
              component={Insurance}
              roles={[ "isDev" ]}
            />
            <ProtectedRoute
              path={`${match.url}/service`}
              component={Service}
              roles={[ "isDev" ]}
            />
            <ProtectedRoute
              path={`${match.url}/treatment`}
              component={Treatment}
              roles={[ "isDev" ]}
            />
            <ProtectedRoute
              path={`${match.url}/medicine`}
              component={Medicine}
              roles={[ "isDev" ]}
            />
            <ProtectedRoute
              path={`${match.url}/inspect`}
              component={Inspect}
              roles={[ "isDev" ]}
            />
            <ProtectedRoute
              path={`${match.url}/vendor`}
              component={Vendor}
              roles={[ "isDev" ]}
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