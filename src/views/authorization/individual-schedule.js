import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import DatePicker from "react-datepicker";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";

import CustomSelectInput from "components/common/CustomSelectInput";

import Pagination from "reactstrap/es/Pagination";

import shiftAPI from "api/shift";
import divisionAPI from "api/division";
import clinicAPI from "api/clinic";
import employeeAPI from "api/employee";
import scheduleAPI from "api/schedule";

import Swal from "sweetalert2";
import moment from "moment";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import data from "data/profileStatuses";
import AppLayout from "layout/AppLayout";

const selectDivision = [
  { label: "Poli Umum", value: "umum", key: 0 },
  { label: "Poli Gigi", value: "gigi", key: 1 },
];

const selectEmployee = [
  { label: "John Doe", value: "john", key: 0 },
  { label: "Jane Doe", value: "jane", key: 1 },
  { label: "Josh Doe", value: "josh", key: 2 },
  { label: "Jack Doe", value: "jack", key: 3 },
  { label: "Janet Doe", value: "janet", key: 4 },
];

const selectDays = [
  { label: "Pilih Hari", value: 0, key: 0, name: "hari" },
  { label: "Senin", value: 1, key: 1, name: "hari" },
  { label: "Selasa", value: 2, key: 2, name: "hari" },
  { label: "Rabu", value: 3, key: 3, name: "hari" },
  { label: "Kamis", value: 4, key: 4, name: "hari" },
  { label: "Jumat", value: 5, key: 5, name: "hari" },
  { label: "Sabtu", value: 6, key: 6, name: "hari" },
  { label: "Minggu", value: 7, key: 7, name: "hari" },
];

let shiftId = "";
const userData = JSON.parse(localStorage.getItem("user_data"));
let idEmployee = userData.id;
let roleUser = userData.roles;
console.log(idEmployee);
console.log(roleUser);
console.log(userData);
console.log(userData.roles);

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const divisionAll = useSelector((state) => state.division);
  const clinicAll = useSelector((state) => state.clinic);
  const shiftAll = useSelector((state) => state.shift);
  const [dataStatus, setDataStatus] = useState("add");
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([
    { label: "Pilih Karyawan", value: "", key: 0, name: "id_karyawan" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDivision, setSearchDivision] = useState("");

  const [employeeName, setEmployeeName] = useState("");

  const [shift, setShift] = useState([
    {
      id: "",
      id_karyawan: idEmployee,
      id_klinik: "",
      id_divisi: "",
      hari: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
    },
  ]);

  const [tempShift, setTempShift] = useState({
    id: "",
    id_karyawan: idEmployee,
    id_klinik: "",
    id_divisi: "",
    hari: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
  });

  const addShiftFields = () => {
    let newFieldShift = {
      id: "",
      id_karyawan: idEmployee,
      id_klinik: "",
      id_divisi: "",
      hari: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
    };
    setShift([...shift, newFieldShift]);
  };

  const removeShiftFields = (id, index) => {
    let dataShift = [...shift];
    dataShift.splice(index, 1);
    setShift(dataShift);
    if (dataStatus === "update") {
      if (id) {
        setTempShift(dataShift);
        onArchiveShift(id);
      }
    }
  };

  const handleShiftChange = (index, event, waktu = null) => {
    // console.log(event);
    let dataShift = [...shift];
    if (waktu === "tanggal") {
      dataShift[index]["tanggal"] = event;
    } else if (waktu === "waktu_mulai") {
      event
        ? (dataShift[index]["waktu_mulai"] = event)
        : (dataShift[index]["waktu_mulai"] = "");
    } else if (waktu === "waktu_selesai") {
      event
        ? (dataShift[index]["waktu_selesai"] = event)
        : (dataShift[index]["waktu_selesai"] = "");
    } else if (event.name === "id_klinik") {
      dataShift[index][event.name] = event.value;
    } else if (event.name === "id_divisi") {
      dataShift[index][event.name] = event.value;
    } else if (event.name === "hari") {
      dataShift[index][event.name] = event.value;
    } else {
      dataShift[index][event.target.name] = event.target.value;
    }

    console.log(dataShift);
    setShift(dataShift);
  };

  const handleChangeId = (idClinic, idDivision) => {
    getScheduleByDivisionId(idDivision);
    setClinicId(idClinic);
    setDivisionId(idDivision);
  };

  const onShiftSubmit = async (e) => {
    e.preventDefault();
    console.log(shift);
    for (var i = 0; i < shift.length; i++) {
      shift[i].id_karyawan = idEmployee;
      const tmp = {
        id: shift[i].id,
        id_karyawan: shift[i].id_karyawan,
        id_klinik: shift[i].id_klinik,
        id_divisi: shift[i].id_divisi,
        hari: shift[i].hari,
        tanggal: shift[i].tanggal,
        waktu_mulai: shift[i].waktu_mulai,
        waktu_selesai: shift[i].waktu_selesai,
      };
      if (
        tmp.id !== "" &&
        (tmp.id_klinik !== tempShift[i].id_klinik ||
          tmp.id_divisi !== tempShift[i].id_divisi ||
          tmp.tanggal !== tempShift[i].tanggal ||
          tmp.hari !== tempShift[i].hari ||
          tmp.waktu_mulai !== tempShift[i].waktu_mulai ||
          tmp.waktu_selesai !== tempShift[i].waktu_selesai)
      ) {
        onShiftEdit(shift[i]);
      } else if (tmp.id === "") {
        onShiftAdd(tmp, tmp.id_karyawan);
      }
    }
  };

  const onShiftAdd = async (shift, idKaryawan) => {
    try {
      const response = await scheduleAPI.add(shift);
      console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        // setShiftId(data.id);
        shiftId = data.id;
        console.log("shift add", data);
        Swal.fire({
          title: "Sukses!",
          html: `Tambah shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
        // setShiftId(data.id);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah shift gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onShiftEdit = async (shift) => {
    try {
      const response = await scheduleAPI.update(shift, shift.id);
      console.log("shift edit", response);
      if (response.status === 200) {
        let data = await response.data.data;
        console.log("shift edit", data);

        Swal.fire({
          title: "Sukses!",
          html: `Ubah shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        // setShiftId(shift.id);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Ubah shift gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onArchiveShift = async (id) => {
    try {
      const response = await scheduleAPI.archive("", id);
      console.log("shift delete", response);
      if (response.status === 200) {
        let data = await response.data.data;
        console.log("shift delete", data);

        Swal.fire({
          title: "Sukses!",
          html: `Arsip jadwal jaga sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        // setShiftId(shift.id);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Arsip jadwal jaga gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const handleCancelInput = () => {
    setShift([
      {
        id: "",
        id_karyawan: "",
        id_klinik: "",
        id_divisi: "",
        hari: "",
        tanggal: "",
        waktu_mulai: "",
        waktu_selesai: "",
      },
    ]);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisionF, setSearchDivisionF] = useState("");
  const [searchDivisionName, setSearchDivisionName] = useState("");
  const [searchClinicF, setSearchClinicF] = useState("");
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [divisionData, setDivisionData] = useState([]);
  const [shiftData, setShiftData] = useState([]);
  const [disableClinic, setDsableClinic] = useState(true);
  const [disableDivision, setDisableDivision] = useState(true);

  const getDivision = async (params) => {
    try {
      setIsLoading(true);
      const res = await divisionAPI.get("", params);
      dispatch({ type: "GET_SCHEDULE", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_SCHEDULE",
        payload: res.data.pagination.totalPage,
      });
      setDivisionData(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getDivisionId = async (id) => {
    try {
      setIsLoading(true);
      const res = await divisionAPI.get("", `/${id}`);
      console.log("data divisi id", res.data.data[0]);
      let data = res.data.data[0];
      setDivisionId(data.id);
      setShift({
        id_klinik: data.id_klinik,
        id_divisi: data.id,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadClinic = async () => {
    try {
      const response = await clinicAPI.get("", "?limit=1000");
      setSelectedClinic([]);
      if (response.status === 200) {
        let data = response.data.data;
        console.log("shift klinik data", data);
        for (var i = 0; i < data.length; i++) {
          setSelectedClinic((current) => [
            ...current,
            {
              label: data[i].nama_klinik,
              value: data[i].id,
              key: data[i].id,
              name: "id_klinik",
            },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadDivision = async () => {
    try {
      const response = await divisionAPI.get("", "?limit=1000");
      console.log("shift divisi", response);
      setSelectedDivision([]);
      if (response.status === 200) {
        let data = response.data.data;
        console.log("shift divisi data", data);
        for (var i = 0; i < data.length; i++) {
          setSelectedDivision((current) => [
            ...current,
            {
              label: data[i].nama_divisi,
              value: data[i].id,
              key: data[i].id,
              name: "id_divisi",
            },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadEmployee = async () => {
    try {
      const response = await employeeAPI.get("", "?limit=1000");
      console.log("shift employee", response);
      setSelectedEmployee([]);
      if (response.status === 200) {
        let data = response.data.data;
        console.log("shift employee data", data);
        for (var i = 0; i < data.length; i++) {
          setSelectedEmployee((current) => [
            ...current,
            {
              label: data[i].nama,
              value: data[i].id,
              key: data[i].id,
              name: "id_karyawan",
            },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getScheduleByEmployeeId = async (id) => {
    setShift([]);
    setTempShift([]);
    try {
      const res = await scheduleAPI.getByEmployee("", `/${id}?searchStatus=1`);
      let data = res.data.data;
      console.log("databy", data);
      if (data) {
        data.map((data, index) => {
          const tmpDate = new Date(data.tanggal);
          const tmpStart = new Date(data.waktu_mulai);
          const tmpEnd = new Date(data.waktu_selesai);
          setShift((current) => [
            ...current,
            {
              id: data.id,
              id_klinik: data.id_klinik,
              id_divisi: data.id_divisi,
              hari: data.hari,
              tanggal: new Date(tmpDate),
              waktu_mulai: new Date(tmpStart),
              waktu_selesai: new Date(tmpEnd),
            },
          ]);
          setTempShift((current) => [
            ...current,
            {
              id: data.id,
              id_klinik: data.id_klinik,
              id_divisi: data.id_divisi,
              hari: data.hari,
              tanggal: new Date(tmpDate),
              waktu_mulai: new Date(tmpStart),
              waktu_selesai: new Date(tmpEnd),
            },
          ]);
        });
      }
      setDataStatus("update");
      setEmployeeName(data[0].nama_karyawan);
    } catch (e) {
      console.log(e);
      setShift([
        {
          id: "",
          id_karyawan: "",
          id_klinik: "",
          id_divisi: "",
          hari: "",
          tanggal: "",
          waktu_mulai: "",
          waktu_selesai: "",
        },
      ]);
      setTempShift([
        {
          id: "",
          id_karyawan: "",
          id_klinik: "",
          id_divisi: "",
          hari: "",
          tanggal: "",
          waktu_mulai: "",
          waktu_selesai: "",
        },
      ]);
      setDataStatus("add");
    }
  };

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (currentPage !== "1") {
      params = `${params}&page=${currentPage}`;
    }
    if (searchClinicF !== "") {
      params = `${params}&searchKlinik=${searchClinicF}`;
    }
    if (searchDivisionF !== "") {
      params = `${params}&searchDivisi=${searchDivisionF}`;
    }
    if (searchName !== "") {
      params = `${params}&searchName=${searchName}`;
    }
    getDivision(params);
    onLoadClinic();
    onLoadDivision();
    onLoadEmployee();
    getDivisionId(searchDivisi);
    getScheduleByEmployeeId(idEmployee);
  }, [
    limit,
    searchName,
    searchDivision,
    searchClinicF,
    currentPage,
    searchDivisionF,
  ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Row>
          {/*  */}
          <Colxx sm="12" md="12" xl="12" className="mb-4">
            <Card className="mb-8">
              <CardBody>
                <CardTitle>
                  {employeeName ? (
                    <>Form Manajemen Jadwal Jaga Pribadi {employeeName}</>
                  ) : (
                    ""
                  )}
                </CardTitle>
                <FormGroup>
                  {shift.map((input, index) => {
                    return (
                      <Row key={index}>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label for="id_klinik">
                              Klinik
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                *
                              </span>
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="id_klinik"
                              id="id_klinik"
                              placeholderText="Pilih Klnik"
                              value={selectedClinic.find(
                                (item) =>
                                  item.value === shift[index].id_klinik || ""
                              )}
                              options={selectedClinic}
                              onChange={(event) =>
                                handleShiftChange(index, event)
                              }
                              isDisabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2}>
                          <FormGroup>
                            <Label for="id_divisi">
                              Divisi
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                *
                              </span>
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="id_divisi"
                              id="id_divisi"
                              placeholderText="Pilih Klnik"
                              value={selectedDivision.find(
                                (item) =>
                                  item.value === shift[index].id_divisi || ""
                              )}
                              options={selectedDivision}
                              // isDisabled={disableDivision}
                              onChange={(event) =>
                                handleShiftChange(index, event)
                              }
                              isDisabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2}>
                          <FormGroup>
                            <Label for="hari">
                              Hari
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                **
                              </span>
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="hari"
                              id="hari"
                              // placeholderText="Pilih hari"
                              value={selectDays.find(
                                (item) => item.value === shift[index].hari || ""
                              )}
                              options={selectDays}
                              onChange={(event) =>
                                handleShiftChange(index, event)
                              }
                              required
                              isDisabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2}>
                          <FormGroup>
                            <Label for="tanggal">
                              Tanggal
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                **
                              </span>
                            </Label>
                            <DatePicker
                              name="tanggal"
                              id="tanggal"
                              selected={shift[index].tanggal}
                              onChange={(event) =>
                                handleShiftChange(index, event, "tanggal")
                              }
                              placeholderText="Pilih Tanggal"
                              dateFormat="yyyy-MM-dd"
                              autoComplete="off"
                              required
                              disabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={1}>
                          <FormGroup>
                            <Label for="waktu_mulai">
                              Mulai
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                *
                              </span>
                            </Label>
                            <DatePicker
                              name="waktu_mulai"
                              id="waktu_mulai"
                              selected={shift[index].waktu_mulai}
                              onChange={(event) =>
                                handleShiftChange(index, event, "waktu_mulai")
                              }
                              placeholderText="Pilih Waktu Mulai"
                              showTimeInput
                              // showTimeSelect
                              showTimeSelectOnly
                              timeFormat="HH:mm"
                              timeIntervals={5}
                              dateFormat="HH:mm"
                              autoComplete="off"
                              timeCaption="Waktu"
                              timeInputLabel=""
                              required
                              disabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={1}>
                          <FormGroup>
                            <Label for="waktu_selesai">
                              Selesai
                              <span
                                className="required text-danger"
                                aria-required="true"
                              >
                                {" "}
                                *
                              </span>
                            </Label>
                            <DatePicker
                              name="waktu_selesai"
                              id="waktu_selesai"
                              placeholderText="Pilih Waktu Selesai"
                              selected={shift[index].waktu_selesai}
                              onChange={(event) =>
                                handleShiftChange(index, event, "waktu_selesai")
                              }
                              showTimeInput
                              // showTimeSelect
                              showTimeSelectOnly
                              timeFormat="HH:mm"
                              timeIntervals={5}
                              dateFormat="HH:mm"
                              timeCaption="Waktu"
                              timeInputLabel=""
                              autoComplete="off"
                              required
                              disabled={
                                !userData.roles.includes("isDev") &&
                                !userData.roles.includes("isAdmin") &&
                                !userData.roles.includes("isManager")
                              }
                            />
                          </FormGroup>
                        </Colxx>
                        {index > 0 && (
                          <Colxx sm={1}>
                            <Label>&nbsp;</Label>
                            <br />
                            <Button
                              color="danger"
                              style={{ float: "right" }}
                              onClick={() => removeShiftFields(input.id, index)}
                              className="remove-schedule"
                            >
                              <i className="simple-icon-trash"></i>
                            </Button>
                          </Colxx>
                        )}
                      </Row>
                    );
                  })}

                  <FormGroup>
                    {!userData.roles.includes("isDev") &&
                    !userData.roles.includes("isAdmin") &&
                    !userData.roles.includes("isManager") ? (
                      <Button
                        color="primary"
                        // style={{ float: "right" }}
                        className="mb-2"
                        onClick={addShiftFields}
                        disabled
                      >
                        Tambah
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        // style={{ float: "right" }}
                        className="mb-2"
                        onClick={addShiftFields}
                      >
                        Tambah
                      </Button>
                    )}
                  </FormGroup>

                  <Row>
                    <Colxx sm={6}>
                      <Label>* ) Wajib diisi</Label>
                      <br />
                      <Label>
                        ** ) Boleh diisi salah satu namun tidak boleh kosong
                        keduanya
                      </Label>
                    </Colxx>
                    {!userData.roles.includes("isDev") &&
                    !userData.roles.includes("isAdmin") &&
                    !userData.roles.includes("isManager") ? (
                      <Colxx sm={6} className="text-right">
                        <Button
                          outline
                          color="danger"
                          onClick={handleCancelInput}
                          disabled
                        >
                          Batal
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          color="primary"
                          type="submit"
                          onClick={onShiftSubmit}
                          disabled
                        >
                          Simpan
                        </Button>
                      </Colxx>
                    ) : (
                      <Colxx sm={6} className="text-right">
                        <Button
                          outline
                          color="danger"
                          onClick={handleCancelInput}
                        >
                          Batal
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          color="primary"
                          type="submit"
                          onClick={onShiftSubmit}
                        >
                          Simpan
                        </Button>
                      </Colxx>
                    )}
                  </Row>
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </AppLayout>
  );
};
export default Data;