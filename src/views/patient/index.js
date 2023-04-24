import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';

const Data = React.lazy(() =>
  import(/* webpackChunkName: "views-patient-data" */ './data')
);
const DataSingleState = React.lazy(() =>
  import(/* webpackChunkName: "views-patient-data-singlestate" */ './data-singlestate')
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
              component={DataSingleState}
              roles={[ "isDev", "isResepsionis", "isPerawat", "isDokter" ]}
            />
            <ProtectedRoute
              path={`${match.url}/data`}
              component={Data}
              roles={[ "isDev", "isResepsionis", "isPerawat", "isDokter" ]}
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