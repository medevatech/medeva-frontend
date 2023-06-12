import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';

import UserLayout from 'layout/UserLayout';

import auth from 'api/authorization';
import Swal from 'sweetalert2';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Silahkan mengisi password Anda';
  }
  // else if (value.length < 4) {
  //   error = 'Value must be longer than 3 characters';
  // }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Silahkan mengisi username atau email Anda';
  }
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //   error = 'Invalid email address';
  // }
  return error;
};

const Home = ({ history, loading, error, loginUserAction }) => {
  const [email, setEmail] = useState('dev@medeva.tech');
  const [password, setPassword] = useState('dev123');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = async (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
          try {
              let input_login = email;

              let data = { input_login, password };

              const response = await auth.login(data);
              // console.log(response);
  
              if (response.status == 200) {
                  let data = await response.data.data;
                  // console.log(data);

                  let user = { id : "", username: "", roles: {}, token: ""};

                  let roles = [];

                  if (data.is_dev === 1) {
                    roles.push("isDev");
                  } else if (data.is_manager === 1) {
                    roles.push("isManager");
                  } else if (data.is_admin === 1) {
                    roles.push("isAdmin");
                  } else if (data.is_resepsionis === 1) {
                    roles.push("isResepsionis");
                  } else if (data.is_perawat === 1) {
                    roles.push("isPerawat");
                  } else if (data.is_dokter === 1) {
                    roles.push("isDokter");
                  } else if (data.is_manajemen === 1) {
                    roles.push("isManajemen");
                  }

                  user.id = data.id; user.username = data.username; user.roles = roles; user.token = data.token;

                  localStorage.setItem('user_data', JSON.stringify(user));
                  // console.log(localStorage.getItem('user_data'));

                  // localStorage.setItem('id', data.id);
                  // localStorage.setItem('username', data.username);
                  // localStorage.setItem('roles', JSON.stringify(roles));
                  // localStorage.setItem('token', data.token);
                  
                  // localStorage.setItem('isDev', data.is_dev);
                  // localStorage.setItem('isManager', data.is_manager);
                  // localStorage.setItem('isAdmin', data.is_admin);
                  // localStorage.setItem('isResepsionis', data.is_resepsionis);
                  // localStorage.setItem('isPerawat', data.is_perawat);
                  // localStorage.setItem('isDokter', data.is_dokter);
                  // localStorage.setItem('isManajemen', data.is_manajemen);

                  Swal.fire({
                      title: 'Sukses!',
                      html: `Login sukses`,
                      icon: 'success',
                      confirmButtonColor: '#008ecc',
                  })
                  
                  history.push("../dashboard");
                  
              } else {
                Swal.fire({
                    title: 'Gagal!',
                    html: `Login gagal: ${response.message}`,
                    icon: 'error',
                    confirmButtonColor: '#008ecc',
                    confirmButtonText: 'Coba lagi',
                })

                throw Error(`Error status: ${response.statusCode}`);
              }
          } catch (e) {
              Swal.fire({
                title: 'Error!',
                html: `Login gagal: ${e}`,
                icon: 'error',
                confirmButtonColor: '#008ecc',
                confirmButtonText: 'Coba lagi',
            })
            
            console.log(e);
          }
      }
    }
  }

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
                {/* Jika Anda belum terdaftar, silahkan melakukan{' '}
                <NavLink to="/register" className="yellowmedeva">
                  registrasi.
                </NavLink> */}
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
                  <Form className="av-tooltip tooltip-right-top">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Username atau Email<span className="required text-danger" aria-required="true"> *</span>
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={validateEmail}
                        // value={input_login}
                        // onChange={onChange}
                        // onChange={(e) => setInputLogin(e.target.value)}
                      />
                      {errors.email && touched.email && (
                        <div className="rounded invalid-feedback invalid-feedback-login d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Password<span className="required text-danger" aria-required="true"> *</span>
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={validatePassword}
                        // value={password}
                        // onChange={onChange}
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && touched.password && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <div className="d-flex justify-content-end align-items-center">
                      {/* <NavLink to="/authorization/forgot-password">
                        Lupa Password?
                      </NavLink> */}
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? 'show-spinner' : ''
                        }`}
                        size="lg"
                        type="submit"
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
  // const { loading, error } = authUser;
  const { loading, error } = "";
  return { loading, error };
};

export default connect(mapStateToProps, {
  // loginUserAction: loginUser,
})(Home);
