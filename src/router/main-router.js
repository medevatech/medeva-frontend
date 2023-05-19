import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';
// import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute } from '../helpers/authHelper';

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
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "user-profile" */ '../views/authorization/profile')
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ '../views/dashboard')
);
const Patient = React.lazy(() =>
  import(/* webpackChunkName: "views-patient" */ '../views/patient')
);
const Queue = React.lazy(() =>
  import(/* webpackChunkName: "views-queue" */ '../views/queue')
);
const Record = React.lazy(() =>
  import(/* webpackChunkName: "views-record" */ '../views/record')
);
const Employee = React.lazy(() =>
  import(/* webpackChunkName: "views-employee" */ '../views/employee')
);
const Division = React.lazy(() =>
  import(/* webpackChunkName: "views-division" */ '../views/division')
);
const Treatment = React.lazy(() =>
  import(/* webpackChunkName: "views-treatment" */ '../views/treatment')
);
const Schedule = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule" */ '../views/schedule')
);

const MainRouter = () => {
    return (
      // <Provider store={store}>
        <Router>
            <Switch>
                <ProtectedRoute
                // <Route
                    path="/dashboard"
                    component={Dashboard}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/profile"
                    component={Profile}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/patient"
                    component={Patient}
                    roles={[ "isDev", "isResepsionis", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/queue"
                    component={Queue}
                    roles={[ "isDev", "isResepsionis", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/record"
                    component={Record}
                    roles={[ "isDev", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/employee"
                    component={Employee}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/division"
                    component={Division}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/treatment"
                    component={Treatment}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/schedule"
                    component={Schedule}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
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

