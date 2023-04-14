import axios from "axios";
import Swal from "sweetalert2";
import api from "constants/api";

export const registerUser = (data, history) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const res = await axios.post(
      //   `https://medv.vercel.app/api/v1/karyawan/login`,
      `${process.env.REACT_APP_BASE_PATHV1 + api.auth.register}`,
      data
    );
    const user = res.data.data;
    dispatch({ type: "USER_REGSITER_SUCCESS", payload: user });
    Swal.fire("Success", "Register user success", "success");
    history.push("/employee/data");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Regsiter user failed", "error");
  }
};
