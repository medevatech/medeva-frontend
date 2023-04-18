import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';
// import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute } from '../helpers/authHelper';

import { Provider } from 'react-redux';
import store from '../store';

const Error = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const Unauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-unauthorized" */ '../views/unauthorized')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ '../views/authorization/login')
);
// const Login2 = React.lazy(() =>
//   import(/* webpackChunkName: "user-login2" */ '../views/authorization/login2')
// );
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-registration" */ '../views/authorization/register')
);
// const Register2 = React.lazy(() =>
//   import(/* webpackChunkName: "user-registration2" */ '../views/authorization/register2')
// );

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ '../views/dashboard')
);
const Patient = React.lazy(() =>
  import(/* webpackChunkName: "views-patient" */ '../views/patient')
);
const Record = React.lazy(() =>
  import(/* webpackChunkName: "views-record" */ '../views/record')
);
const Employee = React.lazy(() =>
  import(/* webpackChunkName: "views-employee-developer" */ '../views/employee')
);
const Schedule = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule" */ '../views/schedule')
);

const MainRouter = () => {
    return (
      // <Provider store={store}>
        <Router>
            <Switch>
                {/* <ProtectedRoute */}
                <Route
                    path="/dashboard"
                    component={Dashboard}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                />
                {/* <ProtectedRoute */}
                <Route
                    path="/patient"
                    component={Patient}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                />
                {/* <ProtectedRoute */}
                <Route
                    path="/record"
                    component={Record}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                />
                {/* <ProtectedRoute */}
                <Route
                    path="/employee"
                    component={Employee}
                    // roles={[UserRole.Admin, UserRole.Editor]}
                />
                {/* <ProtectedRoute */}
                <Route
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
      // </Provider>
    );
  };
  
  export default MainRouter;

