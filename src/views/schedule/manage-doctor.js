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
  Col,
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

import Pagination from "reactstrap/es/Pagination";

import shiftAPI from "api/shift";
import divisionAPI from "api/division";
import clinicAPI from "api/clinic";
import employeeAPI from "api/employee";
import scheduleAPI from "api/schedule";
import doctorScheduleAPI from "api/schedule/doctor";

import Swal from "sweetalert2";
import moment from "moment";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import data from "data/profileStatuses";

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const divisionAll = useSelector((state) => state.division);
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
  const [selectedEmployee, setSelectedEmployee] = useState([
    { label: "Pilih Karyawan", value: "", key: 0, name: "id_doctor" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDivision, setSearchDivision] = useState("");

  const [clinicId, setClinicId] = useState("");
  const [divisionId, setDivisionId] = useState("");

  const [modalCalendar, setModalCalendar] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // const [eventCalendar, setEventCalendar] = useState([
  // {
  //   id: "",
  //   id_doctor: "",
  //   tanggal: "",
  //   waktu_mulai: "",
  //   waktu_selesai: "",
  // },
  // {
  //   id: 1,
  //   title: "Balap",
  //   rrule: {
  //     freq: "daily",
  //     interval: 2,
  //     // byweekday: ["mo", "fr"],
  //     dtstart: "2023-07-01T07:00:00Z", // will also accept '20120201T103000'
  //     until: "2023-09-01",
  //   },
  //   duration: "04:00",
  //   //   // start: "2023-06-14T10:00:00Z",
  //   //   // end: "2023-06-14T20:00:00Z",
  //   //   // title: "my recurring event",
  //   //   // rrule: {
  //   //   //   freq: "daily",
  //   //   //   dtstart: "2023-06-07T10:30:00",
  //   //   //   until: "2023-07-01T10:30:00",
  //   //   // },
  // },
  // ]);

  // const [rrule, setRrule] = useState({});

  const [eventCalendar, setEventCalendar] = useState({
    id: "",
    id_clinic: clinicId,
    id_division: divisionId,
    id_doctor: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [dataCalendar, setDataCalendar] = useState([]);

  const handleSelectCalendar = (selectInfo) => {
    setModalCalendar(true);
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect();
    // console.log(calendarApi);
    let day = selectInfo.startStr;
    let timeSt = new Date();
    console.log(day);
    console.log(timeSt);
    setEventCalendar({
      date: day,
      start_time: moment(timeSt).format("HH:mm"),
    });
    // let todayStr = new Date().toISOString().replace(/T.*$/, "");
    // console.log(todayStr);
  };

  // const combineDateAndTimeToUTC = (date, time) => {
  //   // check if date valid
  //   if (isNaN(Date.parse(date))) {
  //     return null;
  //   }

  //   // check if time valid
  //   if (!time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
  //     return null;
  //   }

  //   const dateObject = new Date(`${date} ${time}`);
  //   return dateObject.toISOString();
  // };

  const handleInputCalendar = (e, val = null) => {
    // e.preventDefault();
    console.log(e);
    // setEventCalendar((prevData) => ({
    //   ...prevData,
    //   [e.target.name]: e.target.value,
    // }));
    // console.log(e.name);
    // console.log(e.value);
    let dataInputCalendar = { ...eventCalendar };
    dataInputCalendar["id_clinic"] = clinicId;
    dataInputCalendar["id_division"] = divisionId;
    if (e.name === "id_doctor") {
      dataInputCalendar["id_doctor"] = e.value;
    } else if (e.target.name === "date") {
      dataInputCalendar["date"] = e.target.value;
    } else if (e.target.name === "start_time") {
      dataInputCalendar["start_time"] = e.target.value;
    } else if (e.target.name === "end_time") {
      dataInputCalendar["end_time"] = e.target.value;
    } else {
      console.log("p");
    }
    setEventCalendar(dataInputCalendar);
  };

  const onCalendarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await doctorScheduleAPI.add(eventCalendar);
      // console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        console.log("add", data);
        Swal.fire({
          title: "Sukses!",
          html: `Tambah jadwal sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah jadwal gagal: ${response.message}`,
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
      setEventCalendar({
        id: "",
        id_clinic: clinicId,
        id_division: divisionId,
        id_doctor: "",
        date: "",
        start_time: "",
        end_time: "",
      });
      setModalCalendar(false);
      getCalendar(params);
    }
  };

  const handleSelectPracticeSchedule = (clickInfo) => {
    let id = clickInfo.event.id;
    console.log(id);
    setIdPracticeSchedule(id);
    getPracticeScheduleById(id);
    setEventCalendar({
      id: "",
      id_clinic: clinicId,
      id_division: divisionId,
      id_doctor: "",
      date: "",
      start_time: "",
      end_time: "",
    });
    setModalDate(true);
  };

  const onCalendarUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await doctorScheduleAPI.update(eventCalendar, `/${id}`);
      // console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        // console.log("add", data);
        Swal.fire({
          title: "Sukses!",
          html: `Edit jadwal sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Edit jadwal gagal: ${response.message}`,
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
      setEventCalendar({
        id: "",
        id_clinic: clinicId,
        id_division: divisionId,
        id_doctor: "",
        date: "",
        start_time: "",
        end_time: "",
      });
      setModalDate(false);
      getCalendar(params);
    }
  };

  const handleSelectArchiveSchedule = () => {
    getPracticeScheduleById(idPracticeSchedule);
    setModalDate(false);
    setModalArchive(true);
  };

  const onArchivePracticeSchedule = async (e, id) => {
    e.preventDefault();
    const data = {
      is_active: 0,
    };
    try {
      const response = await doctorScheduleAPI.archive(data, `/${id}`);
      // console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        // console.log("add", data);
        Swal.fire({
          title: "Sukses!",
          html: `Arsip jadwal sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Arsip jadwal gagal: ${response.message}`,
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
      getCalendar(params);
    }
  };

  const handleSelectDeleteSchedule = () => {
    getPracticeScheduleById(idPracticeSchedule);
    setModalDate(false);
    setModalDelete(true);
  };

  const onDeletePracticeSchedule = async (e, id) => {
    e.preventDefault();
    try {
      const response = await doctorScheduleAPI.delete(data, `/${id}`);
      // console.log("shift add", response);
      if (response.status === 200) {
        let data = await response.data.data;
        // console.log("add", data);
        Swal.fire({
          title: "Sukses!",
          html: `Hapus jadwal sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus jadwal gagal: ${response.message}`,
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
      setModalDelete(false);
      getCalendar(params);
    }
  };

  const handleCancelAddPracticeSchedule = () => {
    setModalCalendar(false);
    setEventCalendar({
      id: "",
      id_clinic: clinicId,
      id_division: divisionId,
      id_doctor: "",
      date: "",
      start_time: "",
      end_time: "",
    });
  };

  const handleCancelUpdatePracticeSchedule = () => {
    setModalDate(false);
    setEventCalendar({
      id: "",
      id_clinic: clinicId,
      id_division: divisionId,
      id_doctor: "",
      date: "",
      start_time: "",
      end_time: "",
    });
  };

  const handleChangeId = (idClinic, idDivision) => {
    setRowSelected(idDivision);
    setClinicId(idClinic);
    setDivisionId(idDivision);
    // setShift([]);
    // setTempShift([]);
    // getScheduleByDivisionId(idDivision);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisionF, setSearchDivisionF] = useState("");
  // const [searchDivisionName, setSearchDivisionName] = useState("");
  const [searchClinicF, setSearchClinicF] = useState("");
  const [limit, setLimit] = useState(10);
  // const [sortBy, setSortBy] = useState("");
  // const [sortOrder, setSortOrder] = useState("");
  // const [divisionData, setDivisionData] = useState([]);
  // const [shiftData, setShiftData] = useState([]);
  // const [disableClinic, setDsableClinic] = useState(true);
  // const [disableDivision, setDisableDivision] = useState(true);

  const [practiceScheduleData, setPracticeScheduleData] = useState([]);
  const [idPracticeSchedule, setIdPracticeSchedule] = useState("");

  const getCalendar = async (params) => {
    try {
      const res = await doctorScheduleAPI.get(params);
      // console.log(res.data.data);
      let temp = [];
      console.log(res.data.data);
      res.data.data.forEach((item) => {
        temp.push({
          id: item.id,
          id_klinik: item.id_klinik,
          id_divisi: item.id_divisi,
          id_dokter: item.id_dokter,
          title: item.title,
          date: item.tanggal,
          start: item.start,
          end: item.end,
          color:
            item.is_active === 1
              ? "#39addf"
              : item.is_active === 0
              ? "#909090"
              : "",
        });
      });
      setDataCalendar(temp);
    } catch (err) {
      console.log(err);
    }
  };

  let params = "";
  useEffect(() => {
    getCalendar(params);
  }, []);

  const getPracticeScheduleById = async (id) => {
    try {
      const res = await doctorScheduleAPI.get(`/${id}`);
      const data = res.data.data[0];
      console.log(data);
      // setPracticeScheduleData(res.data.data[0]);
      setEventCalendar({
        id: data.id,
        id_clinic: data.id_klinik,
        id_division: data.id_divisi,
        id_doctor: data.id_dokter,
        date: moment(data.tanggal).format("yyyy-MM-DD"),
        start_time: moment(data.waktu_mulai).format("HH:mm"),
        end_time: moment(data.waktu_selesai).format("HH:mm"),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPracticeScheduleById(idPracticeSchedule);
  }, [idPracticeSchedule]);

  const getDivision = async (params) => {
    try {
      setIsLoading(true);
      const res = await divisionAPI.getDistinct(params);
      dispatch({ type: "GET_DIVISION", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_DIVISION",
        payload: res.data.pagination.totalPage,
      });
      // setDivisionData(res.data.data);
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
      // console.log("data divisi id", res.data.data[0]);
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
        // console.log("shift klinik data", data);
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
      // console.log("shift divisi", response);
      setSelectedDivision([
        { label: "Semua", value: "", key: 0, name: "id_divisi" },
      ]);
      if (response.status === 200) {
        let data = response.data.data;
        // console.log("shift divisi data", data);
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
      // console.log("shift employee", response);
      setSelectedEmployee([
        {
          label: "Pilih Dokter",
          value: "",
          key: 0,
          name: "id_doctor",
        },
      ]);
      if (response.status === 200) {
        let data = response.data.data;
        // console.log("shift employee data", data);
        for (var i = 0; i < data.length; i++) {
          setSelectedEmployee((current) => [
            ...current,
            {
              label: data[i].nama,
              value: data[i].id,
              key: data[i].id,
              name: "id_doctor",
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

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  console.log(clinicId);
  console.log(divisionId);

  console.log(dataCalendar);

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
                  onChange={(e) => setSearchName(e.target.value)}
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
                            // onClick={() => setSearchDivisi(data.id)}
                            // onClick={() =>
                            //   handleChangeId(data.id_klinik, data.id)
                            // }
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
            {clinicId ? (
              <CardBody>
                <CardTitle>Form Manajemen Jadwal Jaga</CardTitle>
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
                    // themeSystem="bootstrap5"
                    initialView="dayGridMonth"
                    editable
                    navLinks
                    selectable
                    selectMirror
                    dayMaxEvents
                    allDayContent={false}
                    allDaySlot={false}
                    events={dataCalendar}
                    // eventColor="#39addf"
                    // eventColor={
                    //   dataCalendar.is_active === 1
                    //     ? "#73c2fb"
                    //     : dataCalendar.is_active === 0
                    //     ? "yellow"
                    //     : "gray"
                    // }
                    // eventTextColor=""
                    nowIndicator={true}
                    locale={idLocale}
                    select={handleSelectCalendar}
                    headerToolbar={{
                      left: "title",
                      // center: "title",
                      right:
                        "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    footerToolbar={{
                      center: "prev,next today",
                    }}
                    displayEventTime
                    displayEventEnd
                    eventInteractive
                    // eventContent={(info) => <EventItem info={info} />}
                    eventClick={handleSelectPracticeSchedule}
                  />
                </FormGroup>
              </CardBody>
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
          </Card>
        </Colxx>

        <Modal isOpen={modalDate} toggle={() => setModalDate(!modalDate)}>
          <ModalHeader
            style={{
              display: "block",
            }}
          >
            <Row lg={12}>
              <Colxx lg={10}>Edit Jadwal Tenaga Kesehatan</Colxx>
              <Colxx lg={2}>
                <UncontrolledDropdown>
                  <DropdownToggle color="default">
                    <i className="simple-icon-options-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={handleSelectArchiveSchedule}>
                      <i className="iconsminds-arrow-right-2"></i>
                      &nbsp;Arsipkan Jadwal
                    </DropdownItem>
                    {/* {<IsActiveDropdown />} */}
                    {/* <>
                      <DropdownItem divider />
                      <DropdownItem onClick={handleSelectDeleteSchedule}>
                        <i className="simple-icon-trash"></i>
                        &nbsp; Hapus Jadwal
                      </DropdownItem>
                    </> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Colxx>
            </Row>
          </ModalHeader>

          <ModalBody>
            <Row lg={12}>
              {/* <Colxx lg={6}>
                <FormGroup>
                  <Label for="id_recurring">Pengulangan </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="id_recurring"
                    id="id_recurring"
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.id_recurring
                    // )}
                    // onChange={onChange}
                  />
                </FormGroup>
              </Colxx> */}
            </Row>
            <Row lg={12}>
              <Colxx lg={12}>
                <FormGroup>
                  <Label for="date">
                    Tanggal{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    placeholderText="Pilih Tanggal"
                    dateFormat="yyyy-MM-dd"
                    autoComplete="off"
                    required
                    value={eventCalendar.date}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="date"
                    id="date"
                    value={eventCalendar.date}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.tanggal_mulai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              {/* <Colxx lg={6}>
                <FormGroup>
                  <Label for="tanggal_selesai">Tanggal Selesai</Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="tanggal_selesai"
                    id="tanggal_selesai"
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.tanggal_selesai
                    // )}
                    // onChange={onChange}
                  />
                </FormGroup>
              </Colxx> */}
            </Row>
            <Row lg={12}>
              <Colxx lg={6}>
                <FormGroup>
                  <Label for="start_time">
                    Waktu Mulai{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="time"
                    name="start_time"
                    id="start_time"
                    placeholderText="Pilih Waktu Mulai"
                    showTimeInput
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    autoComplete="off"
                    timeCaption="Waktu"
                    timeInputLabel=""
                    required
                    selected={eventCalendar.start_time}
                    defaultValue={eventCalendar.start_time}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="start_time"
                    id="start_time"
                    value={eventCalendar.start_time}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.waktu_mulai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              <Colxx lg={6}>
                <FormGroup>
                  <Label for="end_time">
                    Waktu Selesai
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="time"
                    name="end_time"
                    id="end_time"
                    placeholderText="Pilih Waktu Selesai"
                    showTimeInput
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    autoComplete="off"
                    timeCaption="Waktu"
                    timeInputLabel=""
                    required
                    selected={eventCalendar.end_time}
                    defaultValue={eventCalendar.end_time}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="end_time"
                    id="end_time"
                    value={eventCalendar.end_time}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.waktu_selesai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              <Colxx lg={12}>
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
                    // value={eventCalendar.id_doctor}
                    required
                    placeholderText="Pilih Dokter"
                    options={selectedEmployee}
                    // defaultValue={eventCalendar.id_doctor}
                    value={selectedEmployee.find(
                      (item) => item.value === eventCalendar.id_doctor
                    )}
                    onChange={(e) => handleInputCalendar(e)}
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
              onClick={handleCancelUpdatePracticeSchedule}
            >
              Batal
            </Button>
            <Button
              color="primary"
              onClick={(e) => onCalendarUpdate(e, eventCalendar.id)}
            >
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalCalendar}
          toggle={() => setModalCalendar(!modalCalendar)}
        >
          <ModalHeader>Tambah Jadwal Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <Row lg={12}>
              {/* <Colxx lg={6}>
                <FormGroup>
                  <Label for="id_recurring">Pengulangan </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="id_recurring"
                    id="id_recurring"
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.id_recurring
                    // )}
                    // onChange={onChange}
                  />
                </FormGroup>
              </Colxx> */}
            </Row>
            <Row lg={12}>
              <Colxx lg={12}>
                <FormGroup>
                  <Label for="date">
                    Tanggal{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    placeholderText="Pilih Tanggal"
                    dateFormat="yyyy-MM-dd"
                    autoComplete="off"
                    required
                    value={eventCalendar.date}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="date"
                    id="date"
                    value={eventCalendar.date}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.tanggal_mulai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              {/* <Colxx lg={6}>
                <FormGroup>
                  <Label for="tanggal_selesai">Tanggal Selesai</Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="tanggal_selesai"
                    id="tanggal_selesai"
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.tanggal_selesai
                    // )}
                    // onChange={onChange}
                  />
                </FormGroup>
              </Colxx> */}
            </Row>
            <Row lg={12}>
              <Colxx lg={6}>
                <FormGroup>
                  <Label for="start_time">
                    Waktu Mulai{" "}
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="time"
                    name="start_time"
                    id="start_time"
                    placeholderText="Pilih Waktu Mulai"
                    showTimeInput
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    autoComplete="off"
                    timeCaption="Waktu"
                    timeInputLabel=""
                    required
                    defaultValue={eventCalendar.start_time}
                    selected={eventCalendar.start_time}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="start_time"
                    id="start_time"
                    value={eventCalendar.start_time}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.waktu_mulai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              <Colxx lg={6}>
                <FormGroup>
                  <Label for="end_time">
                    Waktu Selesai
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Input
                    type="time"
                    name="end_time"
                    id="end_time"
                    placeholderText="Pilih Waktu Selesai"
                    showTimeInput
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    autoComplete="off"
                    timeCaption="Waktu"
                    timeInputLabel=""
                    required
                    selected={eventCalendar.end_time}
                    onChange={(e) => handleInputCalendar(e)}
                  />
                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="end_time"
                    id="end_time"
                    value={eventCalendar.end_time}
                    required
                    // options={selectedPatient}
                    // value={selectedPatient.find(
                    //   (item) => item.value === queue.waktu_selesai
                    // )}
                    onChange={handleInputCalendar}
                  /> */}
                </FormGroup>
              </Colxx>
              <Colxx lg={12}>
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
                    // value={eventCalendar.id_doctor}
                    required
                    placeholderText="Pilih Dokter"
                    options={selectedEmployee}
                    value={selectedEmployee.find(
                      (item) => item.value === eventCalendar.id_doctor
                    )}
                    onChange={(e) => handleInputCalendar(e)}
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
              onClick={handleCancelAddPracticeSchedule}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onCalendarSubmit(e)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Jadwal Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <FormGroup>
              <h5>
                Apakah anda ingin mengarsipkan jadwal dengan nama tenaga
                kesehatan <b>{idPracticeSchedule}</b> ?
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
            <Button
              color="primary"
              onClick={(e) => onArchivePracticeSchedule(e, idPracticeSchedule)}
            >
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        {/* <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
          <ModalHeader>Hapus Jadwal Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <FormGroup>
              <h5>
                Apakah anda ingin menghapus jadwal dengan nama tenaga kesehatan{" "}
                <b>{idPracticeSchedule}</b> ?
              </h5>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalDelete(false)}
            >
              Batal
            </Button>
            <Button
              color="primary"
              onClick={(e) => onDeletePracticeSchedule(e, idPracticeSchedule)}
            >
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal> */}
      </Row>
    </>
  );
};
export default Data;