import axios from "axios";
import Swal from "sweetalert2";
import api from "constants/api";

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const res = await axios.post(
      //   `https://medv.vercel.app/api/v1/karyawan/login`,
      `${process.env.REACT_APP_BASE_PATHV1 + api.auth.login}`,
      data
    );
    const user = res.data.data;
    localStorage.setItem("token", user.token);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    Swal.fire("Success", "Login user success", "success");
    <Link to="/home" />;
  } catch (err) {
    console.log(err);
    Swal.fire("Failed", "Login user failed", "error");
  }
};
