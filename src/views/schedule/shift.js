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

import Swal from "sweetalert2";
import moment from "moment";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import data from "data/profileStatuses";

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
  { label: "Senin", value: "Senin", key: 0, name: "hari" },
  { label: "Selasa", value: "Selasa", key: 1, name: "hari" },
  { label: "Rabu", value: "Rabu", key: 2, name: "hari" },
  { label: "Kamis", value: "Kamis", key: 3, name: "hari" },
  { label: "Jumat", value: "Jumat", key: 4, name: "hari" },
  { label: "Sabtu", value: "Sabtu", key: 5, name: "hari" },
  { label: "Minggu", value: "Minggu", key: 6, name: "hari" },
];

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
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDivision, setSearchDivision] = useState("");

  const [startShiftTime, setStartShiftTime] = useState(new Date());
  const [endShiftTime, setEndShiftTime] = useState(new Date());

  const [clinicId, setClinicId] = useState("");
  const [divisionId, setDivisionId] = useState("");

  const [shift, setShift] = useState([
    {
      id: "",
      id_karyawan: "",
      id_klinik: clinicId,
      id_divisi: divisionId,
      hari: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
    },
  ]);

  const [tempShift, setTempShift] = useState({
    id: "",
    id_karyawan: "",
    id_klinik: clinicId,
    id_divisi: divisionId,
    hari: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
  });

  const addShiftFields = () => {
    let newFieldShift = {
      id: "",
      id_karyawan: "",
      id_klinik: clinicId,
      id_divisi: divisionId,
      hari: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
    };
    setShift([...shift, newFieldShift]);
  };

  const removeShiftFields = (id, index) => {
    let dataShift = [...shift];
    dataShift.slice(index, 1);
    setShift(dataShift);
    if (dataShift === "update") {
      setTempShift(dataShift);
    }
  };

  // } else if (event.name === "tanggal") {
  //   dataShift[index][event.name] = event.value;
  // } else if (event.name === "hari") {
  //   dataShift[index][event.name] = event.value;
  // } else if (event.name === "waktu_mulai") {
  //   dataShift[index][event.name] = event.value;
  // } else if (event.name === "waktu_selesai") {
  //   dataShift[index][event.name] = event.value;
  // } else {

  const handleShiftChange = (index, event, waktu = null) => {
    console.log(event);
    let dataShift = [...shift];
    if (event.name === "id_karyawan") {
      dataShift[index][event.name] = event.value;
    } else if (event.name === "hari") {
      dataShift[index][event.name] = event.value;
    } else if (waktu === "waktu_mulai") {
      dataShift[index]["waktu_mulai"] = event;
    } else if (waktu === "waktu_selesai") {
      dataShift[index]["waktu_selesai"] = event;
    } else {
      dataShift[index][event.target.name] = event.target.value;
    }

    console.log(dataShift);
    setShift(dataShift);
  };

  const onChange = (e) => {
    if (e.name === "id_klinik") {
      setClinicId(e.value);
    } else if (e.name === "id_divisi") {
      setDivisionId(e.value);
    }
    console.log(clinicId);
    console.log(divisionId);
  };

  const handleChangeId = (idClinic, idDivision) => {
    setClinicId(idClinic);
    setDivisionId(idDivision);
  };

  const [selectDivisionByClinic, setSelectDivisionByClinic] = useState([]);

  const changeDivision = async (index, id_klinik) => {
    selectDivisionByClinic[index] = [];
    try {
      const response = divisionAPI.getByClinic("", `${id_klinik}`);
      console.log("response dvs by clcn", response);
      if (response.status === 200) {
        let data = response.data.data;
        if (data) {
          data.map((data) => {
            selectDivisionByClinic[index].push({
              label: data.nama_divisi,
              value: data.id,
              key: data.id,
              name: "id_divisi",
            });
          });
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onShiftSubmit = async (e) => {
    e.preventDefault();
    console.log(shift);
    for (var i = 0; i < shift.length; i++) {
      shift[i].id_klinik = clinicId;
      shift[i].id_divisi = divisionId;
      shift[i].waktu_mulai = moment(shift[i].waktu_mulai).format("HH:mm:ss");
      shift[i].waktu_selesai = moment(shift[i].waktu_selesai).format(
        "HH:mm:ss"
      );
      if (
        shift[i].id !== "" &&
        (shift[i].id_karyawan !== tempShift[i].id_karyawan ||
          shift[i].tanggal !== tempShift[i].tanggal ||
          shift[i].hari !== tempShift[i].hari ||
          shift[i].waktu_mulai !== tempShift[i].waktu_mulai ||
          shift[i].waktu_selesai !== tempShift[i].waktu_selesai)
      ) {
        onShiftEdit(shift[i]);
      } else if (shift[i].id === "") {
        onShiftAdd(shift[i]);
      }
    }
  };

  const onShiftAdd = async (shift) => {
    try {
      const response = await shiftAPI.add(shift);
      console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        console.log("shift add", data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
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

  const handleCancelInput = () => {
    setShift({
      id: "",
      id_klinik: "",
      id_divisi: "",
      hari: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
    });
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

  const [form, setForm] = useState({
    id_klinik: "",
    id_divisi: "",
    shift: [],
  });

  const handleSelectClinic = (idClinic, idDivision) => {
    setForm({
      id_klinik: idClinic,
      id_divisi: idDivision,
      shift: [],
    });
  };

  const handleCreateNewShift = () => {
    let newShift = {
      tanggal: "",
      hari: "",
      waktu_mulai: "",
      waktu_selesai: "",
    };
    setForm((prev) => ({ ...prev, shift: [...prev.shift, newShift] }));
  };

  const handleChangeInput = (e, index) => {
    setForm((prev) => ({
      ...prev,
      shift: prev.shift.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [e.target.name]: e.target.value };
      }),
    }));
  };

  const handleDeleteShift = (index) => {
    setForm((prev) => ({
      ...prev,
      shift: prev.shift.filter((_, i) => i !== index),
    }));
  };

  // const handleCancelInput = () => {
  //   setForm({
  //     id_klinik: "",
  //     id_divisi: "",
  //     shift: [],
  //   });
  // };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // format each start and end
    const formattedShift = form.shift.map((item) => ({
      ...item,
      waktu_mulai: new Date(item.waktu_mulai).toLocaleTimeString("default", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      waktu_selesai: new Date(item.waktu_selesai).toLocaleTimeString(
        "default",
        {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    }));

    // send to backend
    const newForm = {
      ...form,
      shift: formattedShift,
    };
    console.log("submit", newForm);

    if (dataStatus === "add") {
      try {
        const response = await shiftAPI.add("", newForm);
        console.log(response);
        if (response.status === 200) {
          let data = await response.data.data;
          console.log(data);
          Swal.fire({
            title: "Sukses!",
            html: `Tambah shift sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah shift gagal`,
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
    }
  };

  const onDeleteShift = async (id) => {
    try {
      const response = await shiftAPI.delete("", id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus shift gagal: ${response.message}`,
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
  }, [
    limit,
    searchName,
    searchDivision,
    searchClinicF,
    currentPage,
    searchDivisionF,
  ]);

  // console.log("shift divisi", divisionData);

  // const onChange = (index, e) => {
  // if (e.name === "id_klinik") {
  //   setShift((current) => {
  //     return { ...current, id_klinik: e ? e.value : "" };
  //   });
  // } else if (e.name === "id_divisi") {
  //   setShift((current) => {
  //     return { ...current, id_divisi: e ? e.value : "" };
  //   });
  // } else
  //   if (e.name === "tanggal") {
  //     setShift((current) => {
  //       return { ...current, tanggal: e ? e.value : "" };
  //     });
  //   } else if (e.name === "hari") {
  //     setScheduleRoutine((current) => {
  //       return { ...current, hari: e ? e.value : "" };
  //     });
  //   }
  // };

  // const onSubmit = () => {};

  // const getShift = async (params) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await shiftAPI.get("", params);
  //     dispatch({ type: "GET_SHIFT", payload: res.data.data });
  //     dispatch({
  //       type: "GET_TOTAL_PAGE_SHIFT",
  //       payload: res.data.pagination.totalPage,
  //     });
  //     setShiftData(res.data.data);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const [limitShift, setLimitShift] = useState(10);

  // useEffect(() => {
  //   let params = "";
  //   if (limitShift !== "10") {
  //     params = `${params}?limit=${limitShift}`;
  //   } else {
  //     params = `${params}?limit=10`;
  //   }
  //   getShift(params);
  // }, [limit]);

  // console.log("shift shift", shiftData);
  // console.log("selected clinic", selectedClinic);
  // console.log(searchDivisi);
  // console.log("shift data", shift);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  // console.log(shift);
  console.log(searchClinicF);
  console.log(searchDivisionF);
  console.log(divisionId);
  console.log(clinicId);

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle className="mb-4">Data Shift</CardTitle>
              {/* <FormGroup className="mt-4">
                <Label for="jadwalCari">Tanggal</Label>
                <Input
                  type="date"
                  name="jadwalCari"
                  id="jadwalCari"
                  placeholder="Tanggal"
                />
              </FormGroup> */}
              <FormGroup className="mt-4">
                <Label for="klinik">Klinik</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="klinik"
                  onChange={(e) => setSearchClinicF(e.value)}
                  options={selectedClinic}
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="divisi">Divisi</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="divisi"
                  onChange={(e) => setSearchDivisionF(e.value)}
                  options={selectedDivision}
                />
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Pencarian"
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                  <Button outline color="theme-3" className="button-search">
                    <i className="simple-icon-magnifier"></i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>#</th>
                    <th>Divisi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center" colSpan={2}>
                        <img src={loader} alt="loading..." width="100" />
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  ) : divisionData.length > 0 ? (
                    divisionData.map((data) => (
                      <tr
                        key={data.id}
                        // onClick={() => setSearchDivisi(data.id)}
                        // onClick={() =>
                        //   handleSelectClinic(data.id_klinik, data.id)
                        // }
                        onClick={() => handleChangeId(data.id_klinik, data.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <th
                          scope="row"
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {startNumber++}
                        </th>
                        <td>
                          <h6 className="mt-2" style={{ fontWeight: "normal" }}>
                            {data.nama_divisi}
                          </h6>
                          <h7>{data.nama_klinik}</h7>
                          <br />
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <Button
                            color="secondary"
                            size="xs"
                            className="button-xs"
                            // onClick={() => setSearchDivisi(data.id)}
                            onClick={() =>
                              handleChangeId(data.id_klinik, data.id)
                            }
                          >
                            <i className="simple-icon-arrow-right-circle"></i>
                          </Button>{" "}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center" colSpan={2}>
                        <h5 style={{ marginTop: "1.5rem" }}>
                          <b>Data tidak ditemukan</b>
                        </h5>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Form Manajemen Shift</CardTitle>
              {/* <Colxx sm={6}>
                <FormGroup>
                  <Label for="id_klinik">
                    Klinik
                    <span className="required text-danger" aria-required="true">
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
                    options={selectedClinic}
                    value={selectedClinic.find(
                      (item) => item.value === clinicId
                    )}
                    isDisabled={disableClinic}
                    onChange={onChange}
                  />
                </FormGroup>
              </Colxx>

              <Colxx sm={6}>
                <FormGroup>
                  <Label for="id_divisi">
                    Divisi
                    <span className="required text-danger" aria-required="true">
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
                    options={selectedDivision}
                    value={selectedDivision.find(
                      (item) => item.value === divisionId
                    )}
                    isDisabled={disableDivision}
                    onChange={onChange}
                  />
                </FormGroup>
              </Colxx> */}

              <Colxx sm={12} className="my-4">
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  className="mb-2"
                  onClick={addShiftFields}
                >
                  Tambah
                </Button>
                <h6>Shift Rutin</h6>
                <Separator className="schedule-separator" />
              </Colxx>
              <Form>
                {/* <FormGroup row>
                  
                </FormGroup> */}
                {shift.map((input, index) => {
                  return (
                    <Row className="schedule-row" key={index}>
                      <Colxx sm={3}>
                        <FormGroup>
                          <Label for="id_karyawan">
                            Karyawan
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
                            name="id_karyawan"
                            id="id_karyawan"
                            placeholderText="Pilih Karyawan"
                            value={selectedEmployee.find(
                              (item) =>
                                item.value === shift[index].id_karyawan || ""
                            )}
                            options={selectedEmployee}
                            // isDisabled={disableDivision}
                            onChange={(event) =>
                              handleShiftChange(index, event)
                            }
                          />
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={3}>
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
                          <Input
                            type="date"
                            name="tanggal"
                            id="tanggal"
                            placeholderText="Pilih tanggal"
                            value={shift[index].tanggal}
                            onChange={
                              (event) => handleShiftChange(index, event)
                              // console.log(event, index)
                            }
                            autoComplete="off"
                            required
                          />
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={3}>
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
                          />
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={2}>
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
                            // id="waktu_mulai"
                            selected={shift[index].waktu_mulai}
                            // onChange={(event) => handleShiftChange(index, event)}
                            // onChange={() => {
                            //   let dataShift = [...shift];
                            //   dataShift[index]['waktu_mulai'] = e;
                            //   setShift(dataShift);
                            // }}
                            onChange={(event) =>
                              handleShiftChange(index, event, "waktu_mulai")
                            }
                            // placeholderText="Pilih waktu mulai"
                            showTimeInput
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="HH:mm"
                            autoComplete="off"
                            required
                          />
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={2}>
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
                            // placeholderText="Pilih waktu selesai"
                            selected={shift[index].waktu_selesai}
                            onChange={(event) =>
                              handleShiftChange(index, event, "waktu_selesai")
                            }
                            showTimeInput
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="HH:mm"
                            autoComplete="off"
                            required
                          />
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={2} md={2}>
                        <Label>&nbsp;</Label>
                        <br />
                        <Button
                          color="danger"
                          onClick={() => removeShiftFields(index)}
                          className="remove-schedule"
                        >
                          <i className="simple-icon-trash"></i>
                        </Button>
                      </Colxx>
                    </Row>
                  );
                })}

                <Row>
                  <Colxx sm={6}>
                    <Label>* ) Wajib diisi</Label>
                    <br />
                    <Label>
                      ** ) Boleh diisi salah satu namun tidak boleh kosong
                      keduanya
                    </Label>
                  </Colxx>
                  <Colxx sm={6} className="text-right">
                    <Button outline color="danger" onClick={handleCancelInput}>
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
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default Data;
