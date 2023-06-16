import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button, Input, Form } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import useForm from 'utils/useForm';

import { Colxx } from 'components/common/CustomBootstrap';

import UserLayout from 'layout/UserLayout';

import auth from 'api/authorization';
import Swal from 'sweetalert2';

const Home = ({ history, loading, error }) => {
  const [ login, setLogin ] = useState({ input_login: 'dev@medeva.tech', password: 'dev123'});
  const { errors, validate } = useForm();

  // const parseJwt = (token) => {
  //   var base64Url = token.split('.')[1]
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  //   var jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //       })
  //       .join('')
  //   )
  
  //   return JSON.parse(jsonPayload)  
  // }

  useEffect(() => {
    localStorage.getItem('user_data') && JSON.parse(localStorage.getItem('user_data')).token ? history.push("/dashboard") : history.push("/login");
  }, [ ]);


  const onChange = (e) => {
    // console.log('e', e);

    setLogin(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    validate(e, e.target.name === 'password' ? 'password_login' : e.target.name, e.value ? e.value : e.target.value);

    // console.log('login', login);
  }

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(login)) {
      if(key === 'input_login' && value === ''){
        validate(e, key, value);
        isError = true;
        // return;
      }

      if(key === 'password' && value === ''){
        validate(e, 'password_login', value);
        isError = true;
        // return;
      }
    }

    if(isError === true){
      return;
    }

    try {
      const response = await auth.login(login);
      // console.log(response);

      if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          if(data.is_active === 1){
            let user = { id : "", username: "", roles: {}, token: ""};

            let roles = [];

            if (data.is_dev === 1) {
              roles.push("isDev");
            }
            
            if (data.is_manager === 1) {
              roles.push("isManager");
            }
            
            if (data.is_admin === 1) {
              roles.push("isAdmin");
            }
            
            if (data.is_resepsionis === 1) {
              roles.push("isResepsionis");
            }
            
            if (data.is_perawat === 1) {
              roles.push("isPerawat");
            }
            
            if (data.is_dokter === 1) {
              roles.push("isDokter");
            }
            
            if (data.is_manajemen === 1) {
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
            
            // let isAlreadyExpired = false;
            // let tenSeconds = new Date().getTime() + 10000;
            
            // if(isAlreadyExpired === false){
            //   setInterval(() => {
            //     const tokenExpiredAt = parseJwt(data.token).exp;
            //     // isAlreadyExpired = new Date().getTime() > new Date(tokenExpiredAt * 1000).getTime();
            //     isAlreadyExpired = new Date().getTime() > tenSeconds;
            //     if (isAlreadyExpired) {
            //       localStorage.clear();
            //       history.push("/login");
            //     }

            //     console.log('tenSeconds', tenSeconds);
            //     // console.log('tokenExpiredAt', tokenExpiredAt);
            //     console.log('isAlreadyExpired', isAlreadyExpired);
            //   }, 1000);
            // }

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
                html: `Login gagal: akun tidak aktif`,
                icon: 'error',
                confirmButtonColor: '#008ecc',
                confirmButtonText: 'Hubungi admin MEDEVA',
            })
          }    
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
        html: e,
        icon: 'error',
        confirmButtonColor: '#008ecc',
        confirmButtonText: 'Coba lagi',
      })
      
      console.log(e);
    }
  }

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

              <Form className="av-tooltip tooltip-right-top" onSubmit={onLoginSubmit}>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Username atau Email<span className="required text-danger" aria-required="true"> *</span>
                  </Label>
                  <Input
                    className="form-control"
                    name="input_login"
                    value={login.input_login}
                    onChange={onChange}
                  />
                  {errors.input_login && (
                    <div className="rounded invalid-feedback invalid-feedback-login d-block">
                      {errors.input_login}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Password<span className="required text-danger" aria-required="true"> *</span>
                  </Label>
                  <Input
                    className="form-control"
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={onChange}
                  />
                  {errors.password_login && (
                    <div className="rounded invalid-feedback d-block">
                      {errors.password_login}
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
                    // type="submit"
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