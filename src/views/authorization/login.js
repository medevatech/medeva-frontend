import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { loginUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';

import UserLayout from 'layout/UserLayout';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Home = ({ history, loading, error, loginUserAction }) => {
  const [email] = useState('demo@gogo.com');
  const [password] = useState('gogo123');

  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
  //   }
  // }, [error]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        loginUserAction(values, history);
        history.push("../dashboard");
      }
    }
  };

  const initialValues = { email, password };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MEDEVA</p>
              <p className="white mb-0">
                Gunakan akun Anda untuk melakukan login.
                <br />
                Jika Andan belum terdaftar, silahkan melakukan{' '}
                <NavLink to="/register" className="yellowmedeva">
                  registrasi.
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <NavLink to="/" className="yellowmedeva">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                Login
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Username atau Email
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Password
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <div className="d-flex justify-content-end align-items-center">
                      {/* <NavLink to="/register">
                        Registrasi Pengguna
                      </NavLink> */}
                      {/* <NavLink to="/authorization/forgot-password">
                        Forgot Password?
                      </NavLink> */}
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? 'show-spinner' : ''
                        }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          LOGIN
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Home);
