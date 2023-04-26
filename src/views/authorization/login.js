import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';

import { Colxx } from 'components/common/CustomBootstrap';

import UserLayout from 'layout/UserLayout';

import auth from 'api/authorization';
import Swal from 'sweetalert2';

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
  const [input_login, setInputLogin] = useState('dev@medeva.tech');
  const [password, setPassword] = useState('dev123');

  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
  //   }
  // }, [error]);

  const [ userLogin, setUserLogin ] = useState({ input_login: 'dev@medeva.tech', password: 'dev123'});

  const onUserLogin = async (values) => {
    if (!loading) {
      if (values.input_login !== '' && values.password !== '') {
        // loginUserAction(values, history);
        // history.push("../dashboard");

        // const loginDB = async (e) => {
          // values.preventDefault();
  
          try {
              // userLoginData = JSON.stringify({ input_login: userLogin.email, password: userLogin.password })
              // userLoginData = { input_login: email, password: password };
              let data = { input_login, password };

              const response = await auth.login(data);
              // console.log(response);
  
              if (response.status == 200) {
                  let data = await response.data.data;
                  // console.log(data);

                  let user = { id : "", username: "", roles: {}}
                  // let roles = { isDev: 0, isManager: 0, isAdmin: 0, isResepsionis: 0, isPerawat: 0, isDokter: 0, isManajemen: 0};

                  // if (data.is_dev === 1) {
                  //   roles.isDev = 1;
                  // } else if (data.is_manager === 1) {
                  //   roles.isManager = 1;
                  // } else if (data.is_admin === 1) {
                  //   roles.isAdmin = 1;
                  // } else if (data.is_resepsionis === 1) {
                  //   roles.isResepsionis = 1;
                  // } else if (data.is_perawat === 1) {
                  //   roles.isPerawat = 1;
                  // } else if (data.is_dokter === 1) {
                  //   roles.isDokter = 1;
                  // } else if (data.is_manajemen === 1) {
                  //   roles.isManajemen = 1;
                  // }

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

                  user.id = data.id; user.username = data.username; user.roles = roles;

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
                  //     confirmButtonText: 'Menuju dashboard',
                  })
                  // }).then((result) => {
                  //   if (result.isConfirmed) {
                      history.push("../dashboard");
                  //   }
                  // })
                  
              } else {
                Swal.fire({
                    title: 'Gagal!',
                    html: `Login gagal`,
                    icon: 'error',
                    confirmButtonColor: '#008ecc',
                    confirmButtonText: 'Coba lagi',
                })

                throw Error(`Error status: ${response.statusCode}`);
              }
          } catch (e) {
              Swal.fire({
                title: 'Error!',
                html: `Login failed`,
                icon: 'error',
                confirmButtonColor: '#008ecc',
                confirmButtonText: 'Coba lagi',
            })
            
            console.log(e);
          }
        // }
      }
    }
  }

  const initialValues = { input_login, password };

  // const onChange = (e) => {
  //   setUserLogin(currState => {
  //       return { ...currState, [e.target.id]: e.target.value }
  //   })
  // }

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
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Username atau Email<span className="required text-danger" aria-required="true"> *</span>
                      </Label>
                      <input
                        className="form-control"
                        name="email"
                        // validate={validateEmail}
                        value={input_login}
                        // onChange={onChange}
                        onChange={(e) => setInputLogin(e.target.value)}
                      />
                      {/* {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )} */}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Password<span className="required text-danger" aria-required="true"> *</span>
                      </Label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        // validate={validatePassword}
                        value={password}
                        // onChange={onChange}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )} */}
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
