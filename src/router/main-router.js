import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';
// import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute } from '../helpers/authHelper';
import Swal from "sweetalert2";

const Error = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const Unauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-unauthorized" */ '../views/unauthorized')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ '../views/authorization/login')
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "user-profile" */ '../views/authorization/profile')
);
const individualSchedule = React.lazy(() =>
  import(/* webpackChunkName: "user-schedule" */ '../views/authorization/individual-schedule')
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ '../views/dashboard')
);
const Patient = React.lazy(() =>
  import(/* webpackChunkName: "views-patient" */ '../views/patient')
);
const Insurance = React.lazy(() =>
  import(/* webpackChunkName: "views-insurance" */ '../views/insurance')
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
const Service = React.lazy(() =>
  import(/* webpackChunkName: "views-service" */ '../views/service')
);
const Medicine = React.lazy(() =>
  import(/* webpackChunkName: "views-medicine" */ '../views/medicine')
);
const Schedule = React.lazy(() =>
  import(/* webpackChunkName: "views-schedule" */ '../views/schedule')
);
const MasterData = React.lazy(() =>
  import(/* webpackChunkName: "views-master-data" */ '../views/master-data')
);

const userData = JSON.parse(localStorage.getItem('user_data'));

const MainRouter = ( ) => {
    const parseJwt = (token) => {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
    
      return JSON.parse(jsonPayload);
    }
    
    useEffect(() => {
      if(userData && userData.token) {
        let isAlreadyExpired = false;
        let tenSeconds = new Date().getTime() + 3000;

        let url = window.location.href.split('/');
        
        if(isAlreadyExpired === false){
          setInterval(() => {
            const tokenExpiredAt = parseJwt(userData.token).exp;
            isAlreadyExpired = new Date().getTime() > new Date(tokenExpiredAt * 1000).getTime();
            // isAlreadyExpired = new Date().getTime() > tenSeconds;
            if (isAlreadyExpired) {
              // localStorage.removeItem('user_data');
              localStorage.clear();

              Swal.fire({
                  title: 'Gagal!',
                  html: `Sesi akun Anda telah habis, silahkan melakukan Login ulang`,
                  icon: 'error',
                  confirmButtonColor: '#008ecc',
                  // confirmButtonText: 'Hubungi admin MEDEVA',
              });

              setTimeout(() => {
                window.location.href = url[0] + '//' + url[2];
              }, 3000);
            }
      
            // console.log('tenSeconds', tenSeconds);
            // console.log('tokenExpiredAt', tokenExpiredAt);
            // console.log('isAlreadyExpired', isAlreadyExpired);
          // }, 1000 * 60 * 15);
          }, 3000);
        }
      }
    }, [ ]);

    return (
      // <Provider store={store}>
        <Router>
            <Switch>
                <ProtectedRoute
                // <Route
                    path="/dashboard"
                    component={Dashboard}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/profile"
                    component={Profile}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/patient"
                    component={Patient}
                    roles={[ "isDev", "isResepsionis", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/insurance"
                    component={Insurance}
                    roles={[ "isDev", "isManager", "isAdmin", "isFinance", "isManajemen" ]}
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
                    path="/service"
                    component={Service}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/medicine"
                    component={Medicine}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/schedule"
                    component={Schedule}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/individual-schedule"
                    component={individualSchedule}
                    roles={[ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ]}
                />
                <ProtectedRoute
                // <Route
                    path="/master-data"
                    component={MasterData}
                    roles={[ "isDev", "isManager", "isAdmin" ]}
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

