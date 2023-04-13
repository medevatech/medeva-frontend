import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "redux/actions/login";

// import { Formik, Form, Field } from "formik";
import axios from "axios";

import { Colxx } from "components/common/CustomBootstrap";

import UserLayout from "layout/UserLayout";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const dispatch = useDispatch();

const Home = ({ history, loading, error, loginUserAction }) => {
  const [input_login, setInput_login] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
  //   }
  // }, [error]);

  // const onUserLogin = (values) => {
  //   if (!loading) {
  //     if (values.email !== "" && values.password !== "") {
  //       loginUserAction(values, history);
  //       history.push("../dashboard");
  //     }
  //   }
  // };

  // const initialValues = { email, password };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log(input_login);
  //   console.log(password);
  //   let data = {
  //     input_login,
  //     password,
  //   };
  //   try {
  //     const res = await axios.post(
  //       `https://medv.vercel.app/api/v1/karyawan/login`,
  //       data
  //     );
  //     const user = res.data.data;
  //     console.log(user);
  //     console.log(user.token);
  //     localStorage.setItem("token", user.token);
  //     Swal.fire("Success", "Login success", "success");
  //     <Link to="/home" />;
  //   } catch (err) {
  //     console.log(err);
  //     Swal.fire("Error", "Login failed", "error");
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(input_login);
    console.log(password);
    let data = {
      input_login,
      password,
    };
    dispatch(loginUser(data));
  };

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
                Jika Andan belum terdaftar, silahkan melakukan{" "}
                <NavLink to="/register" className="yellowmedeva">
                  registrasi.
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <NavLink to="/" className="yellowmedeva">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">Login</CardTitle>

              {/* <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                {({ errors, touched }) => ( */}
              <form
                className="av-tooltip tooltip-label-bottom"
                onSubmit={handleLogin}
              >
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Username atau Email
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <input
                    className="form-control"
                    name="input_login"
                    type="text"
                    id="input_login"
                    value={input_login}
                    onChange={(e) => setInput_login(e.target.value)}
                    // validate={validateEmail}
                  />
                  {/* {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )} */}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Password
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // validate={validatePassword}
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
                    type="submit"
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">LOGIN</span>
                  </Button>
                </div>
              </form>
              {/* )}
              </Formik> */}
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
