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

import Swal from "sweetalert2";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";

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
  { label: "Senin", value: "senin", key: 0 },
  { label: "Selasa", value: "selasa", key: 1 },
  { label: "Rabu", value: "rabu", key: 2 },
  { label: "Kamis", value: "kamis", key: 3 },
  { label: "Jumat", value: "jumat", key: 4 },
  { label: "Sabtu", value: "kamis", key: 5 },
  { label: "Minggu", value: "jumat", key: 6 },
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
  const [isLoading, setIsLoading] = useState(false);

  const [startShiftTime, setStartShiftTime] = useState(new Date());
  const [endShiftTime, setEndShiftTime] = useState(new Date());

  const [scheduleRoutine, setScheduleRoutine] = useState([
    {
      id: Math.random(),
      tanggalJagaRutin: "",
      hariJagaRutin: "",
      waktuMulaiRutin: "",
      waktuSelesaiRutin: "",
    },
  ]);

  const addScheduleRoutine = () => {
    let newfield = {
      id: Math.random(),
      tanggalJagaRutin: "",
      hariJagaRutin: "",
      waktuMulaiRutin: "",
      waktuSelesaiRutin: "",
    };
    setScheduleRoutine([...scheduleRoutine, newfield]);
  };

  const removeScheduleRoutine = (id, index) => {
    let data = [...scheduleRoutine];
    data.splice(index, 1);
    setScheduleRoutine(data);
  };

  const handleScheduleRoutineAdd = (index, event) => {
    let data = [...scheduleRoutine];
    data[index][event.target.name] = event.target.value;
    setScheduleRoutine(data);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisiF, setSearchDivisiF] = useState("");
  const [searchDivisiName, setSearchDivisiName] = useState("");
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [divisionData, setDivisionData] = useState([]);
  const [shiftData, setShiftData] = useState([]);

  const [shift, setShift] = useState({
    id_klinik: "",
    id_divisi: "",
    hari: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
  });

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

  const onLoadClinic = async () => {
    try {
      const response = await clinicAPI.get("", "?limit=1000");
      console.log("shift klinik", response);
      setSelectedClinic([]);
      if (response.status === 200) {
        let data = response.data.data;
        console.log("shift klinik data", data);
        for (var i = 0; i < data.lenght; i++) {
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
        for (var i = 0; i < data.lenght; i++) {
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
    if (searchDivisiF !== "") {
      params = `${params}&searchDivisi=${searchDivisiF}`;
    }
    if (searchDivisiName !== "") {
      params = `${params}&searchDivisiName=${searchDivisiName}`;
    }
    getDivision(params);
    onLoadClinic();
    onLoadDivision();
  }, [limit, searchDivisiName, currentPage, searchDivisiF]);

  console.log("shift divisi", divisionData);

  const onChange = (e) => {
    if (e.name === id_klinik) {
      setShift((current) => {
        return { ...current, id_klinik: e ? e.value : "" };
      });
    } else if (e.name === "id_divisi") {
      setShift((current) => {
        return { ...current, id_divisi: e ? e.value : "" };
      });
    } else if (e.name === "hari") {
      setShift((current) => {
        return { ...current, hari: e ? e.value : "" };
      });
    } else if (e.name === "tanggal") {
      setShift((current) => {
        return { ...current, tanggal: e ? e.value : "" };
      });
    } else if (e.name === "waktu_mulai") {
      setShift((current) => {
        return { ...current, waktu_mulai: e ? e.value : "" };
      });
    }
  };

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

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle className="mb-4">Data Shift</CardTitle>
              <FormGroup className="mt-4">
                <Label for="jadwalCari">Tanggal</Label>
                <Input
                  type="date"
                  name="jadwalCari"
                  id="jadwalCari"
                  placeholder="Tanggal"
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="divisi">Divisi</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="divisi"
                  // value={selectedDivision}
                  // onChange={setSelectedDivision}
                  // options={selectDivision}
                />
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Pencarian"
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
                    <th>Nama</th>
                    <th>Peran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={{ textAlign: "center" }}>
                      1
                    </th>
                    <td>Otto</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "center" }}>
                      2
                    </th>
                    <td>Jacob</td>
                    <td>Doctor</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "center" }}>
                      3
                    </th>
                    <td>Larry</td>
                    <td>Nurse</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Form Manajemen Shift</CardTitle>
              <Form>
                <FormGroup row>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="klinik">
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
                        name="klinik"
                        options={selectedClinic}
                        value={selectedClinic.find(
                          (item) => item.value === clinic.id
                        )}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="divisi">
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
                        name="divisi"
                        value={selectedDivision}
                        onChange={setSelectedDivision}
                        options={selectDivision}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12} className="my-4">
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      className="mb-2"
                      onClick={addScheduleRoutine}
                    >
                      Tambah
                    </Button>
                    <h6>Shift Rutin</h6>
                    <Separator className="schedule-separator" />
                  </Colxx>

                  {scheduleRoutine.map((input, index) => {
                    return (
                      <Row className="schedule-row">
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label for="tanggalJagaRutin">
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
                              name="tanggalJagaRutin"
                              id="tanggalJagaRutin"
                              placeholder="Tanggal"
                              value={input.tanggalJagaRutin}
                              onChange={(event) =>
                                handleScheduleRoutineAdd(index, event)
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={3}>
                          <FormGroup>
                            <Label for="hariJagaRutin">
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
                              name="hariJagaRutin"
                              // value={selectedDays}
                              // onChange={setSelectedDays}
                              options={selectDays}
                              value={input.hariJagaRutin}
                              onChange={(event) =>
                                handleScheduleRoutineAdd(index, event)
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2}>
                          <FormGroup>
                            <Label for="waktuMulaiRutin">
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
                              selected={startShiftTime}
                              // onChange={setStartShiftTime}
                              name="waktuMulaiRutin"
                              id="waktuMulaiRutin"
                              showTimeInput
                              showTimeSelect
                              showTimeSelectOnly
                              timeFormat="HH:mm"
                              timeIntervals={5}
                              dateFormat="HH:mm"
                              // timeCaption="Jam"
                              onChange={(event) =>
                                handleScheduleRoutineAdd(index, event)
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2}>
                          <FormGroup>
                            <Label for="waktuSelesaiRutin">
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
                              selected={endShiftTime}
                              // onChange={setEndShiftTime}
                              name="waktuSelesaiRutin"
                              id="waktuSelesaiRutin"
                              showTimeInput
                              showTimeSelect
                              showTimeSelectOnly
                              timeFormat="HH:mm"
                              timeIntervals={5}
                              dateFormat="HH:mm"
                              // timeCaption="Jam"
                              onChange={(event) =>
                                handleScheduleRoutineAdd(index, event)
                              }
                            />
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={2} md={2}>
                          <Label>&nbsp;</Label>
                          <br />
                          <Button
                            color="danger"
                            onClick={() =>
                              removeScheduleRoutine(input.id, index)
                            }
                            className="remove-schedule"
                          >
                            <i className="simple-icon-trash"></i>
                          </Button>
                        </Colxx>
                      </Row>
                    );
                  })}
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
                  <Colxx sm={6} className="text-right">
                    <Button outline color="danger">
                      Batal
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="primary">Simpan</Button>
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
