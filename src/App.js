import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { NotificationContainer } from './components/common/react-notifications';
// import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute } from './helpers/authHelper';

const Error = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const Unauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './views/authorization/login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-registration" */ './views/authorization/register')
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ './views/dashboard')
);
const Patient = React.lazy(() =>
  import(/* webpackChunkName: "views-patient" */ './views/patient')
);
const Record = React.lazy(() =>
  import(/* webpackChunkName: "views-record" */ './views/record')
);
const Employee = React.lazy(() =>
  import(/* webpackChunkName: "views-employee-developer" */ './views/employee')
);
const Schedule = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule" */ './views/schedule')
);

class App extends React.Component {
  render() {
    return (
      <div className="h-100">
        <React.Fragment>
          <>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <ProtectedRoute
                    path="/dashboard"
                    component={Dashboard}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <ProtectedRoute
                    path="/patient"
                    component={Patient}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <ProtectedRoute
                    path="/record"
                    component={Record}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <ProtectedRoute
                    path="/employee"
                    component={Employee}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <ProtectedRoute
                    path="/schedule"
                    component={Schedule}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <Error {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <Unauthorized {...props} />}
                  />
                  <Route
                    path="/register"
                    render={(props) => <Register {...props} />}
                  />
                  <Route
                    path="/"
                    render={(props) => <Login {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  // const { currentUser } = authUser;
  const { currentUser } = "";
  return { currentUser };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
