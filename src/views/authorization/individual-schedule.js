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

import AppLayout from "layout/AppLayout";

import shiftAPI from "api/shift";
import employeeAPI from "api/employee";
import scheduleAPI from "api/schedule";

import Swal from "sweetalert2";
import moment from "moment";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import data from "data/profileStatuses";
import { useTable } from "react-table";

const userData = JSON.parse(localStorage.getItem("user_data"));
let idEmployee = userData.id;
let roleUser = userData.roles;

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

  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataShift, setDataShift] = useState([]);

  const handleSelectSchedule = (clickInfo) => {
    let id = clickInfo.event.id;
    console.log(id);
    // setScheduleId(id);
    getSchedule(id);
    getShift(id);
    setModalDetail(true);
  };

  const handleRefresh = (id) => {
    getSchedule(id);
    getShift(id);
  };

  const getSchedule = async (id) => {
    try {
      const res = await scheduleAPI.getByEmployee(`/${id}`);
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

  const getShift = async (id) => {
    try {
      const res = await shiftAPI.getByIdEmployee(`/${id}`);
      let temp = [];
      console.log("puririn", res.data.data);
      res.data.data.forEach((data) => {
        temp.push({
          id: data.id,
          id_divisi: data.id_divisi,
          id_karyawan: data.id_karyawan,
          title: data.nama,
          date: data.tanggal,
          start: data.start,
          end: data.end,
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
    getSchedule(idEmployee);
    getShift(idEmployee);
    getShiftById(shiftId);
  }, [idEmployee, shiftId]);

  // console.log(dataSchedule);
  console.log(dataShift);
  // console.log(openTable);
  console.log(divisionId);
  console.log(scheduleId);
  console.log(idEmployee);

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Row>
          {/*  */}
          <Colxx sm="12" md="12" xl="12" className="mb-4">
            <Card className="mb-8">
              <CardBody>
                {/* <CardTitle>
                  {idEmployee ? (
                    <>Form Manajemen Jadwal Jaga Pribadi {idEmployee}</>
                  ) : (
                    ""
                  )}
                </CardTitle> */}
                <CardTitle>Form Manajemen Jadwal Pribadi</CardTitle>
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
                    events={[...dataSchedule, ...dataShift]}
                    nowIndicator={true}
                    locale={idLocale}
                    // select={handleSelectCalendar}
                    customButtons={{
                      buttonRefresh: {
                        text: "Refresh",
                        click: () => handleRefresh(idEmployee),
                      },
                    }}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right:
                        "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    footerToolbar={{
                      center: "buttonRefresh",
                    }}
                    displayEventTime
                    displayEventEnd
                    eventInteractive
                    // eventClick={handleSelectSchedule}
                  />
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