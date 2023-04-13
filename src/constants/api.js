const api = {
  base: process.env.REACT_APP_BASE_PATHV1,
  auth: {
    login: "/karyawan/login",
    register: "/karyawan/register",
    resetPassword: "/karyawan/update/password",
  },
  employee: {
    updateEmployee: "/karyawan/update",
    updateEmployeePhoto: "/karyawan/update/foto",
  },
};

export default api;
