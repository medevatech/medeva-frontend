import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { NotificationContainer } from './components/common/react-notifications';
import MainRouter from './router/main-router';

class App extends React.Component {
  render() {
    return (
      <div className="h-100">
        <React.Fragment>
          <>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <MainRouter/>
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
