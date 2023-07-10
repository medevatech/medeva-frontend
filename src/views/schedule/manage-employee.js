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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";

import CustomSelectInput from "components/common/CustomSelectInput";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import idLocale from "@fullcalendar/core/locales/id";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import Pagination from "components/common/Pagination";

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
import { useTable } from "react-table";

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const divisionAll = useSelector((state) => state.division);
  const [divisionTotalPage, setDivisionTotalPage] = useState([]);
  const clinicAll = useSelector((state) => state.clinic);
  const shiftAll = useSelector((state) => state.shift);
  const [dataStatus, setDataStatus] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState([
    { label: "Semua", value: "", key: 0, name: "id_divisi" },
  ]);
  const [selectedClinic, setSelectedClinic] = useState([
    { label: "Semua", value: "", key: 0, name: "id_klinik" },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState([
    { label: "Pilih Dokter", value: "", key: 0, name: "id_doctor" },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState([
    { label: "Pilih Karyawan", value: "", key: 0, name: "id_employee" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDivision, setSearchDivision] = useState("");

  const [clinicId, setClinicId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [shiftId, setShiftId] = useState("");

  const [modalShift, setModalShift] = useState(false);
  const [modalCalendar, setModalCalendar] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalActivate, setModalActivate] = useState(false);

  const [eventShift, setEventShift] = useState({
    id: "",
    id_doctor_schedule: "",
    id_employee: "",
  });

  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataShift, setDataShift] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  const [openTable, setOpenTable] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  // const handleInputCalendar = (e, val = null) => {
  //   let dataInputCalendar = { ...eventCalendar };
  //   dataInputCalendar["id_clinic"] = clinicId;
  //   dataInputCalendar["id_division"] = divisionId;
  //   if (e.name === "id_doctor") {
  //     dataInputCalendar["id_doctor"] = e.value;
  //   } else if (e.name === "id_subtitute") {
  //     dataInputCalendar["id_subtitute"] = e.value;
  //   } else if (e.target.name === "date") {
  //     dataInputCalendar["date"] = e.target.value;
  //   } else if (e.target.name === "start_time") {
  //     dataInputCalendar["start_time"] = e.target.value;
  //   } else if (e.target.name === "end_time") {
  //     dataInputCalendar["end_time"] = e.target.value;
  //   } else {
  //     console.log("p");
  //   }
  //   setEventCalendar(dataInputCalendar);
  // };

  const handleSelectSchedule = (clickInfo) => {
    let id = clickInfo.event.id;
    console.log(id);
    setScheduleId(id);
    getShiftBySchedule(id);
    setOpenTable(true);
  };

  const handleAddShift = () => {
    setEventShift({
      id: "",
      id_doctor_schedule: scheduleId,
      id_employee: "",
    });
    setModalShift(true);
  };

  const handleInputShift = (e) => {
    console.log(e);
    let dataInputShift = { ...eventShift };
    dataInputShift["id_doctor_schedule"] = scheduleId;
    if (e.name === "id_employee") {
      dataInputShift["id_employee"] = e.value;
    } else {
      console.log("pooh");
    }
    setEventShift(dataInputShift);
  };

  const onShiftSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shiftAPI.add(eventShift);
      if (response.status === 200) {
        let data = await response.data.data;
        console.log("add", data);
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
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      setEventShift({
        id: "",
        id_doctor_schedule: "",
        id_employee: "",
      });
      setModalShift(false);
      getShiftBySchedule(scheduleId);
    }
  };

  const handleEditShift = (id) => {
    setShiftId(id);
    getShiftById(id);
    setModalUpdate(true);
  };

  const onShiftUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await shiftAPI.update(eventShift, `/${id}`);
      if (response.status === 200) {
        let data = await response.data.data;
        Swal.fire({
          title: "Sukses!",
          html: `Edit shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Edit shift gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      setModalUpdate(false);
      getShiftBySchedule(scheduleId);
    }
  };

  const handleArchiveShift = (id) => {
    setShiftId(id);
    getShiftById(id);
    setModalArchive(true);
  };

  const onShiftArchive = async (e, id) => {
    e.preventDefault();
    try {
      const response = await shiftAPI.archive(`/${id}`);
      if (response.status === 200) {
        let data = await response.data.data;
        Swal.fire({
          title: "Sukses!",
          html: `Arsip shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Arsip shift gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      setModalArchive(false);
      getShiftBySchedule(scheduleId);
    }
  };

  const handleActivateShift = (id) => {
    setShiftId(id);
    getShiftById(id);
    setModalActivate(true);
  };

  const onShiftActivate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await shiftAPI.activate(`/${id}`);
      if (response.status === 200) {
        let data = await response.data.data;
        Swal.fire({
          title: "Sukses!",
          html: `Aktivasi shift sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Aktivasi shift gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      setModalActivate(false);
      getShiftBySchedule(scheduleId);
    }
  };

  const handleChangeId = (idClinic, idDivision) => {
    setRowSelected(idDivision);
    setClinicId(idClinic);
    setDivisionId(idDivision);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisionF, setSearchDivisionF] = useState("");
  const [searchClinicF, setSearchClinicF] = useState("");
  const [limit, setLimit] = useState(10);

  const [practiceScheduleData, setPracticeScheduleData] = useState([]);
  const [idPracticeSchedule, setIdPracticeSchedule] = useState("");

  const getScheduleByDivision = async (id) => {
    try {
      const res = await scheduleAPI.getByDivision(`/${id}`);
      let temp = [];
      console.log(res.data.data);
      res.data.data.forEach((data) => {
        temp.push({
          id: data.id,
          id_klinik: data.id_klinik,
          id_divisi: data.id_divisi,
          id_dokter: data.id_dokter,
          title: data.nama_karyawan,
          date: data.tanggal,
          start: data.start,
          end: data.end,
          id_pengganti: data.id_pengganti,
          color:
            data.is_active === 1 && data.id_pengganti != null
              ? "#FFDE00"
              : data.is_active === 0
              ? "#909090"
              : data.is_active === 1
              ? "#39addf"
              : "",
        });
      });
      setDataSchedule(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const getShiftBySchedule = async (id) => {
    try {
      const res = await shiftAPI.getByIdSchedule(`/${id}`);
      let temp = [];
      console.log("puririn", res.data.data);
      res.data.data.forEach((data) => {
        temp.push({
          id: data.id,
          id_divisi: data.id_divisi,
          id_karyawan: data.id_karyawan,
          title: data.nama,
          date: moment(data.tanggal).format("yyyy-MM-DD"),
          start: moment(data.start).format("HH:mm"),
          end: moment(data.end).format("HH:mm"),
          color: data.is_active === 1 ? "green" : "#909090",
          is_active: data.is_active,
        });
      });
      setDataShift(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const getShiftById = async (id) => {
    try {
      const res = await shiftAPI.get(`/${id}`);
      const data = res.data.data[0];
      console.log(data);
      setEventShift({
        id: data.id,
        id_doctor_schedule: data.id_jadwal_dokter,
        id_employee: data.id_karyawan,
      });
      setEmployeeName(data.nama);
    } catch (err) {
      console.log(err);
    }
  };

  let params = "";
  useEffect(() => {
    getScheduleByDivision(divisionId);
    getShiftBySchedule(scheduleId);
    getShiftById(shiftId);
  }, [divisionId, scheduleId, shiftId]);

  const getDivision = async (params) => {
    try {
      setIsLoading(true);
      const res = await divisionAPI.getDistinct(params);
      dispatch({ type: "GET_DIVISION", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_DIVISION",
        payload: res.data.pagination.totalPage,
      });
      setDivisionTotalPage(res.data.pagination.totalPage);
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
      let data = res.data.data[0];
      setDivisionId(data.id);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadClinic = async () => {
    try {
      const response = await clinicAPI.get("", "?limit=1000");
      setSelectedClinic([
        { label: "Semua", value: "", key: 0, name: "id_klinik" },
      ]);
      if (response.status === 200) {
        let data = response.data.data;
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
      setSelectedDivision([
        { label: "Semua", value: "", key: 0, name: "id_divisi" },
      ]);
      if (response.status === 200) {
        let data = response.data.data;
        for (var i = 0; i < data.length; i++) {
          setSelectedDivision((current) => [
            ...current,
            {
              label: data[i].tipe,
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
      setSelectedEmployee([
        {
          label: "Pilih Karyawan",
          value: "",
          key: 0,
          name: "id_employee",
        },
      ]);
      if (response.status === 200) {
        let data = response.data.data;
        for (var i = 0; i < data.length; i++) {
          setSelectedEmployee((current) => [
            ...current,
            {
              label: data[i].nama,
              value: data[i].id,
              key: data[i].id,
              name: "id_employee",
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
    if (search !== "") {
      params = `${params}&search=${search}`;
    }
    getDivision(params);
    onLoadClinic();
    onLoadDivision();
    // onLoadDoctor();
    onLoadEmployee();
    getDivisionId(searchDivisi);
  }, [
    limit,
    search,
    searchDivision,
    searchClinicF,
    currentPage,
    searchDivisionF,
  ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  let tableNumber = 1;

  if (currentTablePage !== 1) {
    tableNumber = (currentTablePage - 1) * 10 + 1;
  }

  // console.log(dataSchedule);
  console.log(dataShift);
  // console.log(openTable);
  console.log(divisionId);
  console.log(scheduleId);

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle className="mb-4">Data Jadwal Jaga</CardTitle>
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
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                  <Button outline color="theme-3" className="button-search">
                    <i className="simple-icon-magnifier"></i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Table hover>
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
                  ) : divisionAll.length > 0 ? (
                    divisionAll.map((data) => (
                      <tr
                        key={data.id}
                        onClick={() => handleChangeId(data.id_klinik, data.id)}
                        style={{ cursor: "pointer" }}
                        className={`${
                          rowSelected == data.id && "row-selected"
                        }`}
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
                          <h6 className="mt-2" style={{ fontWeight: "bold" }}>
                            {data.tipe}
                          </h6>
                          {data.nama_klinik}
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
              <Pagination
                currentPage={currentPage}
                totalPage={divisionTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={divisionTotalPage < 4 ? divisionTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            {clinicId ? (
              <>
                <CardBody>
                  <CardTitle>Form Manajemen Jadwal JShift</CardTitle>
                  <FormGroup>
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        multiMonthPlugin,
                        interactionPlugin,
                        rrulePlugin,
                        listPlugin,
                        bootstrap5Plugin,
                      ]}
                      initialView="dayGridMonth"
                      editable
                      navLinks
                      selectable
                      selectMirror
                      dayMaxEvents
                      allDayContent={false}
                      allDaySlot={false}
                      // events={dataSchedule}
                      events={[...dataSchedule]}
                      nowIndicator={true}
                      locale={idLocale}
                      // select={handleSelectCalendar}
                      // customButtons={{
                      //   buttonAdd: {
                      //     text: "Tambah",
                      //     click: () => handleAddRecurring(),
                      //   },
                      // }}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right:
                          "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                      }}
                      // footerToolbar={{
                      //   center: "buttonAdd",
                      // }}
                      displayEventTime
                      displayEventEnd
                      eventInteractive
                      eventClick={handleSelectSchedule}
                    />
                  </FormGroup>
                </CardBody>
                {scheduleId ? (
                  <></>
                ) : (
                  <CardBody
                    colSpan={3}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="/assets/empty.svg"
                      width={150}
                      className="mt-5 mb-3"
                    />
                    <p className="mb-3">
                      Silahkan memilih salah satu jadwal jaga dengan melakukan
                      klik pada jadwal jaga yang telah tersedia di kalender
                      untuk melihat tabel jadwal shift.
                    </p>
                  </CardBody>
                )}
              </>
            ) : (
              <CardBody
                style={{ textAlign: "center", verticalAlign: "middle" }}
              >
                <img
                  src="/assets/empty.svg"
                  width={150}
                  className="mt-5 mb-3"
                />
                <p className="mb-3">
                  Silahkan memilih poli / divisi untuk melihat jadwal.
                </p>
              </CardBody>
            )}
            {openTable === true ? (
              <CardBody>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>
                        <Button color="primary" onClick={handleAddShift}>
                          Tambah
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  {dataShift?.length > 0 ? (
                    <thead>
                      <tr>
                        <th className="center-xy" style={{ width: "40px" }}>
                          #
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            verticalAlign: "middle",
                          }}
                        >
                          Nama Karyawan
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Waktu Mulai
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Waktu Selesai
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            width: "5%",
                          }}
                        ></th>
                      </tr>
                    </thead>
                  ) : (
                    <></>
                  )}
                  <tbody>
                    {dataShift.length > 0 ? (
                      dataShift.map((data) => (
                        <tr key={data.id}>
                          <td
                            scope="row"
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {tableNumber++}
                          </td>
                          <td
                            scope="row"
                            style={{
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            {data.title}
                          </td>
                          <td
                            scope="row"
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {data.start}
                          </td>
                          <td
                            scope="row"
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {data.end}
                          </td>
                          <td
                            scope="row"
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {data.is_active === 0
                              ? "Tidak Aktif"
                              : data.is_active === 1
                              ? "Aktif"
                              : ""}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                            className="mt-2"
                          >
                            <UncontrolledDropdown>
                              <DropdownToggle color="default">
                                <i className="simple-icon-options-vertical"></i>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  onClick={() => handleEditShift(data.id)}
                                >
                                  <i className="iconsminds-arrow-right-2"></i>
                                  &nbsp;Edit Shift
                                </DropdownItem>
                                {data.is_active === 1 ? (
                                  <>
                                    <DropdownItem divider />
                                    <DropdownItem
                                      onClick={() =>
                                        handleArchiveShift(data.id)
                                      }
                                    >
                                      <i className="simple-icon-trash"></i>
                                      &nbsp; Arsip Shift
                                    </DropdownItem>
                                  </>
                                ) : data.is_active === 0 ? (
                                  <>
                                    <DropdownItem divider />
                                    <DropdownItem
                                      onClick={() =>
                                        handleActivateShift(data.id)
                                      }
                                    >
                                      <i className="simple-icon-trash"></i>
                                      &nbsp; Activate Shift
                                    </DropdownItem>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td align="center" colSpan={3}>
                          <CardBody
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <img
                              src="/assets/empty.svg"
                              width={150}
                              className="mt-5 mb-3"
                            />
                            <p className="mb-3">
                              Jadwal shift dari jadwal jaga yang dipilih kosong,
                              silahkan menambahkan jadwal shift.
                            </p>
                          </CardBody>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            ) : openTable === false ? (
              <></>
            ) : (
              <></>
            )}
          </Card>
        </Colxx>

        <Modal isOpen={modalShift} toggle={() => setModalShift(!modalShift)}>
          <ModalHeader
            style={{
              display: "block",
            }}
          >
            <Row lg={12}>
              <Colxx lg={10}>Tambah Jadwal Shift</Colxx>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Row lg={12}>
              {/* <Colxx lg={12}>
                <FormGroup>
                  <Label for="id_doctor">
                    Dokter{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="id_doctor"
                    id="id_doctor"
                    required
                    placeholderText="Pilih Dokter"
                    // options={selectedEmployee}
                    // value={selectedEmployee.find(
                    //   (item) => item.value === eventCalendar.id_doctor
                    // )}
                    // onChange={(e) => handleInputCalendar(e)}
                  />
                </FormGroup>
              </Colxx> */}
              <Colxx lg={12}>
                <FormGroup>
                  <Label for="id_employee">
                    Karyawan{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="id_employee"
                    id="id_employee"
                    required
                    placeholderText="Pilih Karyawan"
                    options={selectedEmployee}
                    value={selectedEmployee.find(
                      (item) => item.value === eventShift.id_employee
                    )}
                    onChange={(e) => handleInputShift(e)}
                  />
                </FormGroup>
              </Colxx>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              // onClick={handleCancelUpdatePracticeSchedule}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onShiftSubmit(e)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalUpdate} toggle={() => setModalUpdate(!modalUpdate)}>
          <ModalHeader
            style={{
              display: "block",
            }}
          >
            <Row lg={12}>
              <Colxx lg={10}>Edit Jadwal Shift</Colxx>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Row lg={12}>
              <Colxx lg={12}>
                <FormGroup>
                  <Label for="id_employee">
                    Karyawan{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="id_employee"
                    id="id_employee"
                    required
                    placeholderText="Pilih Karyawan"
                    options={selectedEmployee}
                    value={selectedEmployee.find(
                      (item) => item.value === eventShift.id_employee
                    )}
                    onChange={(e) => handleInputShift(e)}
                  />
                </FormGroup>
              </Colxx>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              // onClick={handleCancelUpdatePracticeSchedule}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onShiftUpdate(e, shiftId)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Jadwal Shift Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <FormGroup>
              <h5>
                Apakah anda ingin mengarsipkan jadwal shift dengan nama tenaga
                kesehatan <b>{employeeName}</b> ?
              </h5>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalArchive(false)}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onShiftArchive(e, shiftId)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalActivate}
          toggle={() => setModalActivate(!modalActivate)}
        >
          <ModalHeader>Aktivasi Jadwal Shift Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <FormGroup>
              <h5>
                Apakah anda ingin mengaktivasi jadwal shift dengan nama tenaga
                kesehatan <b>{employeeName}</b> ?
              </h5>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalActivate(false)}
            >
              Batal
            </Button>
            <Button
              color="primary"
              onClick={(e) => onShiftActivate(e, shiftId)}
            >
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Row>
    </>
  );
};
export default Data;