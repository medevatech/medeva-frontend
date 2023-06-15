import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupText,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table,
  Badge,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import axios from "axios";
import moment from "moment";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

import queueAPI from "api/queue";
import patientAPI from "api/patient";
// import vitalSignsAPI from "api/vital-signs";
import divisionAPI from "api/division";
import scheduleAPI from "api/schedule";
import Swal from "sweetalert2";

import loader from "../../assets/img/loading.gif";

const userData = JSON.parse(localStorage.getItem("user_data"));

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const queueAll = useSelector((state) => state.queue);
  const queueTotalPage = useSelector((state) => state.queueTotalPage);
  const [dataStatus, setDataStatus] = useState("add");

  const [scheduleId, setScheduleId] = useState([]);
  const scheduleAll = useSelector((state) => state.schedule);
  const scheduleTotalPage = useSelector((state) => state.scheduleTotalPage);

  const [schedule, setSchedule] = useState({
    nama_karyawan: "",
    tipe: "",
  });

  const [selectedDivisionF, setSelectedDivisionF] = useState([
    { label: "Semua", value: "", key: 0, name: "id_klinik" },
  ]);

  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState([]);

  const [startDateTime, setStartDateTime] = useState(new Date());

  const [patientID, setPatientID] = useState("");
  const [patientData, setPatientData] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEditPriority, setModalEditPriority] = useState(false);

  const [rowSelected, setRowSelected] = useState(null);

  const selectPriority = [
    {
      label: "Rendah",
      value: 1,
      key: 1,
      name: "prioritas",
    },
    {
      label: "Sedang",
      value: 2,
      key: 2,
      name: "prioritas",
    },
    {
      label: "Tinggi",
      value: 3,
      key: 3,
      name: "prioritas",
    },
  ];

  const [queue, setQueue] = useState({
    id_jaga: "",
    id_pasien: "",
    prioritas: 1,
  });

  console.log("total page jaga", scheduleTotalPage);

  const getSchedule = async (params) => {
    try {
      setIsLoading(true);
      const res = await scheduleAPI.getDistinct(params);
      dispatch({ type: "GET_SCHEDULE", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_SCHEDULE",
        payload: res.data.pagination.totalPage,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getScheduleById = async (id) => {
    try {
      // setIsLoading(true);
      const res = await scheduleAPI.get(`/${id}`);
      console.log("data jaga id", res.data.data[0]);
      let data = res.data.data[0];
      setScheduleId(data.id);
      setSchedule({
        nama_karyawan: data.nama_karyawan,
        tipe: data.tipe,
      });
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisiF, setSearchDivisiF] = useState("");
  const [searchDivisiName, setSearchDivisiName] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");

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
    getSchedule(params);
    // onLoadDivisi();
    // onLoadQueueByDivisi();
  }, [
    limit,
    searchName,
    searchDivisiF,
    searchDivisiName,
    sortBy,
    sortOrder,
    currentPage,
    // vitalSigns.id_pasien,
  ]);

  useEffect(() => {
    getScheduleById(searchEmployee);
  }, [searchEmployee]);

  const defaultDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(defaultDate);

  // const getQueue = async (params) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await queueAPI.get(params);
  //     dispatch({ type: "GET_QUEUE", payload: res.data.data });
  //     dispatch({
  //       type: "GET_TOTAL_PAGE_QUEUE",
  //       payload: res.data.pagination.totalPage,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getQueueById = async (params) => {
    try {
      setIsLoadingQueue(true);
      const res = await queueAPI.getByScheduleId(params);
      dispatch({ type: "GET_QUEUE", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_QUEUE",
        payload: res.data.pagination.totalPage,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  const onLoadSchedule = async (id, today) => {
    try {
      const response = await scheduleAPI.getToday(`/${id}?searchDay=${today}`);
      // console.log("rak", response);

      setSelectedSchedule([
        {
          label: "Semua Dokter",
          value: "",
          id_employee: "",
          key: 0,
          name: "id_jaga",
        },
      ]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);

        for (var i = 0; i < data.length; i++) {
          setSelectedSchedule((current) => [
            ...current,
            {
              label:
                data[i].nama_karyawan +
                " ( " +
                moment(data[i].waktu_mulai).format("HH:mm") +
                " - " +
                moment(data[i].waktu_selesai).format("HH:mm") +
                " ) ",
              value: data[i].id,
              id_employee: data[i].id_karyawan,
              key: data[i].id,
              name: "id_jaga",
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

  const onLoadPatient = async () => {
    try {
      const response = await patientAPI.get("?limit=1000");
      // console.log("rak", response);

      setSelectedPatient([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);

        for (var i = 0; i < data.length; i++) {
          setSelectedPatient((current) => [
            ...current,
            {
              label: data[i].nama_lengkap,
              value: data[i].id,
              key: data[i].id,
              name: "id_pasien",
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

  const getToday = (dateStr, locale) => {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  };

  const dateStr = new Date();
  const today = getToday(dateStr, "id-ID");

  const getDay = () => {
    return today;
  };

  const onChangeId = (idDivisi, idKaryawan) => {
    setRowSelected(idKaryawan);
    setSearchDivisi(idDivisi);
    setSearchEmployee(idKaryawan);
    onLoadSchedule(idDivisi, today);
  };

  const [idDoctor, setIdDoctor] = useState("");

  useEffect(() => {
    onLoadSchedule();
    onLoadPatient();
  }, []);

  let paramsQueue = `/${searchDivisi}`;
  useEffect(() => {
    // let params = "";
    if (limit !== "10") {
      paramsQueue = `${paramsQueue}?limit=${limit}`;
    } else {
      paramsQueue = `${paramsQueue}?limit=10`;
    }
    if (date !== defaultDate) {
      paramsQueue = `${paramsQueue}&date=${date}`;
    }
    if (idDoctor !== "") {
      paramsQueue = `${paramsQueue}&searchDoctor=${idDoctor}`;
    }
    // getQueue(paramsQueue);
    getQueueById(paramsQueue);
  }, [limit, searchDivisi, sortBy, sortOrder, currentPage, date, idDoctor]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const onQueueSubmit = async (e) => {
    e.preventDefault();

    if (dataStatus === "add") {
      try {
        const response = await queueAPI.add(queue);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah antrian sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah antrian gagal: ${response.message}`,
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
      } finally {
        getQueueById(paramsQueue);
      }
    } else {
      console.log("dataStatus undefined");
    }
  };

  const onPriorityEdit = async (e, id) => {
    e.preventDefault();
    if (dataStatus === "edit") {
      try {
        const response = await queueAPI.update(queue, `/prioritas/${id}`);
        if (response.status === 200) {
          let data = await response.data.data;
          Swal.fire({
            title: "Sukses!",
            html: `Edit antrian sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
          setModalEditPriority(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: e,
            confirmButtonText: "Coba lagi",
          });
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      } finally {
        getQueueById(paramsQueue);
      }
    } else {
      console.log("dataStatus undefined");
    }
  };

  const [modalDelete, setModalDelete] = useState(false);
  const [queueId, setQueueId] = useState("");
  const [patientName, setPatientName] = useState("");

  const deleteById = async (e, id) => {
    e.preventDefault();
    // console.log(id);
    setModalDelete(true);
    try {
      const res = await queueAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);
      setQueueId(data.id);
      setPatientName(data.nama_lengkap);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await queueAPI.delete(queueId);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus antrian sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus antrian gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }

      // console.log(response);
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      getQueueById(paramsQueue);
    }
  };

  const handleButtonEditP = async (e, id) => {
    e.preventDefault();
    setModalEditPriority(true);
    setDataStatus("edit");
    setQueueId(id);
  };

  const onChange = (e) => {
    if (e.name === "id_jaga") {
      console.log(e);
      setIdDoctor(e.id_employee);
      setQueue((current) => {
        return { ...current, id_jaga: e ? e.value : "" };
      });
    } else if (e.name === "id_pasien") {
      setQueue((current) => {
        return { ...current, id_pasien: e ? e.value : "" };
      });
    } else if (e.name === "prioritas") {
      setQueue((current) => {
        return { ...current, prioritas: e ? e.value : "" };
      });
    } else {
      console.log(e);
    }
  };

  // console.log("pororo", selectedSchedule);
  // console.log("poro", selectedPatient);
  // console.log(schedule);
  // console.log(queue);
  // console.log(queueId);

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle style={{ marginBottom: 0 }}>
                <Row>
                  <Colxx sm="12" md="8" xl="8">
                    Poli / Divisi
                  </Colxx>
                </Row>
              </CardTitle>
              <InputGroup className="my-4">
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Pencarian"
                  onChange={(e) => setSearchDivisiName(e.target.value)}
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
                    <th className="center-xy" style={{ width: "40px" }}>
                      #
                    </th>
                    <th>Poli / Divisi</th>
                    <th className="center-xy" style={{ width: "55px" }}>
                      &nbsp;
                    </th>
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
                  ) : scheduleAll.length > 0 ? (
                    scheduleAll.map((data) => (
                      <tr
                        key={data.id}
                        onClick={() => onChangeId(data.id_divisi, data.id)}
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
                        <td
                          style={{
                            verticalAlign: "middle",
                            fontWeight: "bold",
                          }}
                        >
                          {data.tipe}
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
                            // onClick={() => onChangeId(data.id_divisi, data.id)}
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
                totalPage={scheduleTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            <CardBody>
              <CardTitle>
                <Row>
                  <Colxx sm="6" md="6" xl="6">
                    {schedule ? (
                      <>
                        Daftar Antrian {schedule.tipe} <br />
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                  </Colxx>
                  <Colxx sm="6" md="6" xl="6">
                    {searchDivisi ? (
                      <Button
                        color="primary"
                        style={{ float: "right" }}
                        className="mb-4"
                        onClick={() => setModalAdd(true)}
                      >
                        Tambah
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Colxx>
                  <FormGroup row style={{ margin: "0px", width: "100%" }}>
                    <Colxx
                      sm="6"
                      md="6"
                      style={{ paddingLeft: "16px", paddingRight: "16px" }}
                    >
                      <Label for="date">Hari</Label>
                      <p>{getDay()}</p>
                    </Colxx>
                    <Colxx
                      sm="6"
                      md="6"
                      style={{ paddingLeft: "16px", paddingRight: "16px" }}
                    >
                      <Label for="date">Tanggal</Label>
                      {searchDivisi ? (
                        <Input
                          type="date"
                          name="date"
                          id="date"
                          placeholder="Tanggal"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      ) : (
                        <Input
                          type="date"
                          name="date"
                          id="date"
                          placeholder="Tanggal"
                          value={date}
                          // onChange={(e) => setDate(e.target.value)}
                        />
                      )}
                    </Colxx>
                  </FormGroup>
                </Row>
              </CardTitle>
              <Row>
                <FormGroup row style={{ margin: "0px", width: "100%" }}>
                  {searchDivisi ? (
                    <Colxx
                      sm="12"
                      md="12"
                      style={{ paddingLeft: "16px", paddingRight: "16px" }}
                      className="react-select"
                    >
                      <Label for="id_jaga">Dokter</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        // placeholder="Pilih Dokter"
                        name="id_jaga"
                        id="id_jaga"
                        options={selectedSchedule}
                        value={selectedSchedule.find(
                          (item) =>
                            item.value === queue.id_jaga || {
                              label: "Semua Dokter",
                              value: "",
                              id_employee: "",
                              key: 0,
                              name: "id_jaga",
                            }
                        )}
                        onChange={onChange}
                      />
                    </Colxx>
                  ) : (
                    <></>
                  )}
                </FormGroup>
                <Colxx sm={12}>
                  <Table className="mt-4">
                    {searchDivisi ? (
                      <thead>
                        <tr>
                          <th
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            Pasien
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            Dokter Jaga
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            Prioritas
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
                      {isLoadingQueue ? (
                        <tr>
                          <td>&nbsp;</td>
                          <td align="center" colSpan={3}>
                            <img src={loader} alt="loading..." width="100" />
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      ) : searchDivisi !== "" && queueAll?.length ? (
                        queueAll.map((data) => (
                          <tr
                            key={`basic_${data.id}`}
                            style={{ cursor: "pointer" }}
                          >
                            <td
                              scope="row"
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {data.no_antrian}
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              <h6
                                style={{ fontWeight: "bold" }}
                                className="max-text"
                              >
                                {data.nama_lengkap}
                              </h6>
                              {data.jenis_kelamin.substring(0, 1)},{" "}
                              {new Date().getFullYear() -
                                data.tanggal_lahir.substring(0, 4)}{" "}
                              tahun
                              <br />
                              {data.tipe_kitas} {data.nomor_kitas}
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              {data.nama_karyawan}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <h6 className="mt-2">
                                {data.prioritas === 1 ? (
                                  <Button
                                    color="success"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    Rendah
                                  </Button>
                                ) : data.prioritas === 2 ? (
                                  <Button
                                    color="warning"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    Sedang
                                  </Button>
                                ) : data.prioritas === 3 ? (
                                  <Button
                                    color="danger"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    Tinggi
                                  </Button>
                                ) : (
                                  "0"
                                )}
                              </h6>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              className="mt-2"
                            >
                              <Button
                                color="danger"
                                className="remove-schedule"
                                size="xs"
                                onClick={(e) => deleteById(e, data.id)}
                              >
                                <i className="simple-icon-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : searchDivisi === "" ? (
                        <tr>
                          <td>&nbsp;</td>
                          <td align="center" colSpan={3}>
                            <h5
                              style={{
                                marginTop: "1.5rem",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <b>Silahkan pilih divisi</b>
                            </h5>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      ) : (
                        <tr>
                          <td>&nbsp;</td>
                          <td align="center" colSpan={3}>
                            <h5
                              style={{
                                marginTop: "1.5rem",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <b>Antrian kosong</b>
                            </h5>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Modal isOpen={modalAdd} toggle={() => setModalAdd(!modalAdd)}>
          <ModalHeader>Tambah Antrian</ModalHeader>
          <ModalBody>
            <FormGroup>
              {/* <Colxx
                sm="6"
                md="10"
                style={{
                  paddingRight: "0px",
                  marginLeft: "16px",
                  marginBottom: "12px",
                }}
              >
                <Label for="id_jaga">Dokter</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  placeholder="Pilih Dokter"
                  name="id_jaga"
                  id="id_jaga"
                  options={selectedSchedule}
                  value={selectedSchedule.find(
                    (item) => item.value === queue.id_jaga
                  )}
                  onChange={onChange}
                  isDisabled
                />
              </Colxx> */}
              <Colxx
                sm="6"
                md="10"
                style={{
                  paddingRight: "0px",
                  marginLeft: "16px",
                  marginBottom: "12px",
                }}
              >
                <Label for="pasien">Pasien</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="id_pasien"
                  id="id_pasien"
                  options={selectedPatient}
                  value={selectedPatient.find(
                    (item) => item.value === queue.id_pasien
                  )}
                  onChange={onChange}
                />
              </Colxx>
              <Colxx
                sm="6"
                md="10"
                style={{ paddingRight: "0px", marginLeft: "16px" }}
              >
                <Label for="prioritas">Prioritas</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="prioritas"
                  id="prioritas"
                  options={selectPriority}
                  value={selectPriority.find(
                    (item) => item.value === queue.prioritas
                  )}
                  defaultValue={{
                    label: "Rendah",
                    value: "1",
                    name: "prioritas",
                  }}
                  onChange={onChange}
                />
              </Colxx>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalAdd(false)}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onQueueSubmit(e)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalEditPriority}
          toggle={() => setModalEditPriority(!modalEditPriority)}
        >
          <ModalHeader>Edit Priority</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Colxx
                sm="6"
                md="10"
                style={{ paddingRight: "0px", marginLeft: "16px" }}
              >
                <Label for="prioritas">Prioritas</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="prioritas"
                  id="prioritas"
                  options={selectPriority}
                  value={selectPriority.find(
                    (item) => item.value === queue.prioritas
                  )}
                  onChange={onChange}
                />
              </Colxx>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalEditPriority(false)}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onPriorityEdit(e, queueId)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
          <ModalHeader>Hapus antrian</ModalHeader>
          <ModalBody>
            <FormGroup>
              Apakah anda ingin menghapus antrian dengan nama pasien{" "}
              <b>{patientName}</b> ?
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
            <Button color="primary" onClick={(e) => onDeleteSubmit(e, queueId)}>
              Simpan
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Row>
    </>
  );
};
export default Data;