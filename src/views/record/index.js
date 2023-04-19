import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const VitalSigns = React.lazy(() =>
  import(/* webpackChunkName: "views-record-vital-signs" */ './vital-signs')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-record-data" */ './data')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/vital-signs`} />
            {/* <Route
              path={`${match.url}/vital-signs`}
              render={(props) => <VitalSigns {...props} />}
            />
            <Route
              path={`${match.url}/data`}
              render={(props) => <Data {...props} />}
            />
            <Route
              path={`${match.url}/screening`}
              render={(props) => <Screening {...props} />}
            /> */}
            <ProtectedRoute
              path={`${match.url}/vital-signs`}
              component={VitalSigns}
              roles={[ "isDev", "isPerawat" ]}
            />
            <ProtectedRoute
              path={`${match.url}/data`}
              component={Data}
              roles={[ "isDev", "isDokter" ]}
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