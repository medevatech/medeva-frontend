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
  // const [vitalSignsID, setVitalSignsID] = useState("");

  // const [vitalSigns, setVitalSigns] = useState({
  //   id_pasien: patientID,
  //   keluhan: "",
  //   kesadaran: "",
  //   temperatur: "",
  //   tinggi_badan: "",
  //   berat_badan: "",
  //   lingkar_perut: "",
  //   imt: "",
  //   sistole: "",
  //   diastole: "",
  //   respiratory_rate: "",
  //   heart_rate: "",
  //   catatan_tambahan: "",
  // });

  // const onChange = (e) => {
  //   // console.log('e', e);

  //   if (e.name === "kesadaran") {
  //     setVitalSigns((current) => {
  //       return { ...current, kesadaran: e.value };
  //     });

  //     setSelectedAwareness(e);
  //   } else {
  //     setVitalSigns((current) => {
  //       return { ...current, [e.target.name]: e.target.value };
  //     });
  //   }

  //   // console.log('vitalSigns', vitalSigns);
  // };

  // const onVitalSignsSubmit = async (e) => {
  //   e.preventDefault();

  //   // console.log(vitalSigns);
  //   if (dataStatus === "add") {
  //     try {
  //       const response = await vitalSignsAPI.add(vitalSigns);
  //       // console.log(response);

  //       if (response.status == 200) {
  //         let data = await response.data.data;
  //         // console.log(data);

  //         Swal.fire({
  //           title: "Sukses!",
  //           html: `Tambah pra-konsultasi sukses`,
  //           icon: "success",
  //           confirmButtonColor: "#008ecc",
  //         });

  //         // resetForm(e);
  //       } else {
  //         Swal.fire({
  //           title: "Gagal!",
  //           html: `Tambah pra-konsultasi gagal: ${response.message}`,
  //           icon: "error",
  //           confirmButtonColor: "#008ecc",
  //           confirmButtonText: "Coba lagi",
  //         });

  //         throw Error(`Error status: ${response.status}`);
  //       }
  //     } catch (e) {
  //       Swal.fire({
  //         title: "Gagal!",
  //         html: e,
  //         icon: "error",
  //         confirmButtonColor: "#008ecc",
  //         confirmButtonText: "Coba lagi",
  //       });

  //       console.log(e);
  //     }
  //   } else if (dataStatus === "update") {
  //     try {
  //       const response = await vitalSignsAPI.update(vitalSigns, vitalSignsID);
  //       // console.log(response);

  //       if (response.status == 200) {
  //         let data = await response.data.data;
  //         // console.log(data);

  //         Swal.fire({
  //           title: "Sukses!",
  //           html: `Ubah pra-konsultasi sukses`,
  //           icon: "success",
  //           confirmButtonColor: "#008ecc",
  //         });

  //         // resetForm(e);
  //       } else {
  //         Swal.fire({
  //           title: "Gagal!",
  //           html: `Ubah pra-konsultasi gagal: ${response.message}`,
  //           icon: "error",
  //           confirmButtonColor: "#008ecc",
  //           confirmButtonText: "Coba lagi",
  //         });

  //         throw Error(`Error status: ${response.status}`);
  //       }
  //     } catch (e) {
  //       Swal.fire({
  //         title: "Gagal!",
  //         html: e,
  //         icon: "error",
  //         confirmButtonColor: "#008ecc",
  //         confirmButtonText: "Coba lagi",
  //       });

  //       console.log(e);
  //     }
  //   } else {
  //     console.log("dataStatus undefined");
  //   }
  // };

  // const resetForm = (e) => {
  //   e.preventDefault();

  //   setPatientID("");
  //   setVitalSignsID("");
  //   setPatientData("");

  //   setVitalSigns({
  //     id_pasien: patientID,
  //     keluhan: "",
  //     kesadaran: "",
  //     temperatur: 0,
  //     tinggi_badan: 0,
  //     berat_badan: 0,
  //     lingkar_perut: 0,
  //     imt: 0,
  //     sistole: 0,
  //     diastole: 0,
  //     respiratory_rate: 0,
  //     heart_rate: 0,
  //     catatan_tambahan: "",
  //   });

  //   setSelectedAwareness("");

  //   setDataStatus("add");
  // };

  // const onLoadDivisi = async () => {
  //   try {
  //     const response = await divisionAPI.get("", "?limit=1000");
  //     // console.log(response);

  //     setSelectedDivisionF([
  //       { label: "Semua", value: "", key: 0, name: "id_divisi" },
  //     ]);

  //     if (response.status === 200) {
  //       let data = response.data.data;
  //       // console.log(data);

  //       for (var i = 0; i < data.length; i++) {
  //         setSelectedDivisionF((current) => [
  //           ...current,
  //           {
  //             label: data[i].tipe,
  //             value: data[i].id,
  //             key: data[i].id,
  //             name: "id_divisi",
  //           },
  //         ]);
  //       }
  //     } else {
  //       throw Error(`Error status: ${response.status}`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const onLoadQueueByDivisi = async () => {
  //   try {
  //     const response = await queueAPI.get("", "?limit=1000");
  //     // console.log(response);

  //     setSelectedQueue([
  //       { label: "Semua", value: "", key: 0, name: "id_divisi" },
  //     ]);

  //     if (response.status === 200) {
  //       let data = response.data.data;
  //       // console.log(data);

  //       for (var i = 0; i < data.length; i++) {
  //         setSelectedQueue((current) => [
  //           ...current,
  //           {
  //             label: data[i].tipe,
  //             value: data[i].id,
  //             key: data[i].id,
  //             name: "id_divisi",
  //           },
  //         ]);
  //       }
  //     } else {
  //       throw Error(`Error status: ${response.status}`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEditPriority, setModalEditPriority] = useState(false);
  const [queueId, setQueueId] = useState("");

  const [queueData, setQueueData] = useState([
    // {
    //   id: 1,
    //   no_antrian: 1,
    //   prioritas: 1,
    //   nama_lengkap: "Pramudia S",
    //   jenis_kelamin: "L",
    //   tanggal_lahir: "2000-07-10",
    //   nomor_kitas: "3526671",
    // },
    // {
    //   id: 2,
    //   no_antrian: 2,
    //   prioritas: 2,
    //   nama_lengkap: "Helmi S",
    //   jenis_kelamin: "L",
    //   tanggal_lahir: "1999-07-10",
    //   nomor_kitas: "3526671",
    // },
  ]);

  const selectPriority = [
    {
      label: "High",
      value: "1",
      key: 0,
      name: "prioritas",
    },
    {
      label: "Medium",
      value: "2",
      key: 1,
      name: "prioritas",
    },
    {
      label: "Low",
      value: "3",
      key: 2,
      name: "prioritas",
    },
  ];

  const [queue, setQueue] = useState({
    id_jaga: "",
    id_pasien: "",
    prioritas: "",
  });

  console.log("total page jaga", scheduleTotalPage);

  const getSchedule = async (params) => {
    try {
      setIsLoading(true);
      const res = await scheduleAPI.get("", params);
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
      setIsLoading(true);
      const res = await scheduleAPI.get("", `/${id}`);
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
      setIsLoading(false);
    }
  };

  const getQueue = async (params) => {
    try {
      setIsLoading(true);
      const res = await queueAPI.get("", params);
      dispatch({ type: "GET_QUEUE", payload: res.data.data });
      dispatch({
        type: "GET_TOTAL_PAGE_QUEUE",
        payload: res.data.pagination.totalPage,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDivisiF, setSearchDivisiF] = useState("");
  const [searchDivisiName, setSearchDivisiName] = useState("");

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchDivisiF !== "") {
      params = `${params}&searchDivisi=${searchDivisiF}`;
    }
    if (searchDivisiName !== "") {
      params = `${params}&searchDivisiName=${searchDivisiName}`;
    }
    if (currentPage !== "1") {
      params = `${params}&page=${currentPage}`;
    }
    getSchedule(params);
    getScheduleById(searchDivisi);
    // onLoadDivisi();
    // onLoadQueueByDivisi();
  }, [
    limit,
    searchName,
    searchDivisiF,
    searchDivisiName,
    searchDivisi,
    sortBy,
    sortOrder,
    currentPage,
    dataStatus,
    // vitalSigns.id_pasien,
  ]);

  const defaultDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(defaultDate);

  const onLoadSchedule = async () => {
    try {
      const response = await scheduleAPI.get("", "?limit=1000");
      // console.log("rak", response);

      setSelectedSchedule([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);

        for (var i = 0; i < data.length; i++) {
          setSelectedSchedule((current) => [
            ...current,
            {
              label: data[i].nama_karyawan,
              value: data[i].id,
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
      const response = await patientAPI.get("", "?limit=1000");
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

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchDivisi !== "") {
      params = `${params}&searchDivisi=${searchDivisi}`;
    }
    if (date !== defaultDate) {
      params = `${params}&date=${date}`;
    }
    getQueue(params);
    onLoadSchedule();
    onLoadPatient();
    // onLoadDivisi();
    // onLoadQueueByDivisi();
  }, [
    limit,
    searchDivisi,
    sortBy,
    sortOrder,
    currentPage,
    date,
    // vitalSigns.id_pasien,
  ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  let startNumberQueue = 1;

  // if (currentPageQueue ! == 1) {
  //   startNumberQueue = (currentPageQueue - 1) * 10 + 1;
  // }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [listBasic, setListBasic] = useState([
    {
      id: 1,
      title: "Angel Cake",
    },
    {
      id: 2,
      title: "Bibingka",
    },
    {
      id: 3,
      title: "Cremeschnitte",
    },
    {
      id: 4,
      title: "Faworki",
    },
  ]);

  // useEffect(() => {
  //   onLoadSchedule();
  // });

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
      }
    } else {
      console.log("dataStatus undefined");
    }
  };

  const onPriorityEdit = async (e, id) => {
    e.preventDefault();
    if (dataStatus === "edit") {
      try {
        const response = await queueAPI.update(queue, id);
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
      }
    } else {
      console.log("dataStatus undefined");
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

  console.log("pororo", selectedSchedule);
  console.log("poro", selectedPatient);
  console.log(schedule);
  console.log(queue);
  console.log(queueId);

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
                        onClick={() => setSearchDivisi(data.id_divisi)}
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
                          <h6 style={{ fontWeight: "bold" }}>{data.divisi}</h6>
                          {data.nama_karyawan}
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
                            onClick={() => setSearchDivisi(data.id_divisi)}
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
                    Daftar Antrian Poli / Divisi{" "}
                    {schedule ? (
                      <>
                        <br />
                        <br />
                        <p>{schedule.nama_karyawan}</p>
                        <p style={{ fontWeight: "normal" }}>{schedule.tipe}</p>
                      </>
                    ) : (
                      ""
                    )}
                  </Colxx>
                  <Colxx sm="6" md="6" xl="6">
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      className="mb-4"
                      onClick={() => setModalAdd(true)}
                    >
                      Tambah
                    </Button>
                  </Colxx>
                  <FormGroup row style={{ margin: "0px", width: "100%" }}>
                    <Colxx
                      sm="12"
                      md="12"
                      style={{ paddingLeft: "16px", paddingRight: "16px" }}
                    >
                      <Label for="date">Tanggal</Label>
                      <Input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Tanggal"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Colxx>
                  </FormGroup>
                </Row>
              </CardTitle>
              <Row>
                <Colxx xxs="12">
                  {/* <h5 className="mb-4">
                    <IntlMessages id="sortable.basic" />
                  </h5> */}
                  {/* <ReactSortable
                      list={queueData}
                      setList={(list) => setQueueData(list)}
                      tag="ul"
                      className="list-unstyled"
                      >
                        {queueData.map((item) => (
                          <li key={`basic_${item.id}`}>
                            <p>
                              {item.id}. {item.no_antrian}
                            </p>
                            <p>
                              {item.nama_lengkap}. {item.prioritas}
                            </p>
                          </li>
                        ))}
                        <Table>
                          <thead>
                            <tr>
                              <th
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                No. Antrian
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
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                }}
                              >
                                Nama
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                Jenis Kelamin
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                Usia
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                No. Kitas
                              </th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoading ? (
                              <tr>
                                <td>&nbsp;</td>
                                <td align="center" colSpan={2}>
                                  <img
                                    src={loader}
                                    alt="loading..."
                                    width="100"
                                  />
                                </td>
                                <td>&nbsp;</td>
                              </tr>
                            ) : queueData.length > 0 ? (
                              queueData.map((data) => (
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
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <h7 className="mt-2">
                                      {data.prioritas === 1 ? (
                                        <h7>High</h7>
                                      ) : data.prioritas === 2 ? (
                                        <h7>Medium</h7>
                                      ) : data.prioritas === 3 ? (
                                        <h7>Low</h7>
                                      ) : (
                                        "0"
                                      )}
                                    </h7>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "left",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <h7 className="mt-2">
                                      {data.nama_lengkap}
                                    </h7>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <h7 className="mt-2">
                                      {data.jenis_kelamin.substring(0, 1)}
                                    </h7>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <h7 className="mt-2">
                                      {new Date().getFullYear() -
                                        data.tanggal_lahir.substring(0, 4)}{" "}
                                      tahun
                                      <br />
                                    </h7>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <h7 className="mt-2">{data.nomor_kitas}</h7>
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
                      </ReactSortable> */}
                  <Table>
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          No. Antrian
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
                            textAlign: "left",
                            verticalAlign: "middle",
                          }}
                        >
                          Nama
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Jenis Kelamin
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Usia
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          No. Kitas
                        </th>
                        <th>&nbsp;</th>
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
                      ) : searchDivisi !== "" ? (
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
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <h7 className="mt-2">
                                {data.prioritas === 1 ? (
                                  <Button
                                    color="danger"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    High
                                  </Button>
                                ) : data.prioritas === 2 ? (
                                  <Button
                                    color="primary"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    Medium
                                  </Button>
                                ) : data.prioritas === 3 ? (
                                  <Button
                                    color="success"
                                    className=""
                                    size="xs"
                                    onClick={(e) =>
                                      handleButtonEditP(e, data.id)
                                    }
                                  >
                                    Low
                                  </Button>
                                ) : (
                                  "0"
                                )}
                              </h7>
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              <h7 className="mt-2">{data.nama_lengkap}</h7>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <h7 className="mt-2">
                                {data.jenis_kelamin.substring(0, 1)}
                              </h7>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <h7 className="mt-2">
                                {new Date().getFullYear() -
                                  data.tanggal_lahir.substring(0, 4)}{" "}
                                tahun
                                <br />
                              </h7>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <h7 className="mt-2">{data.nomor_kitas}</h7>
                            </td>
                          </tr>
                        ))
                      ) : searchDivisi === "" ? (
                        <tr>
                          <td>&nbsp;</td>
                          <td align="center" colSpan={2}>
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
                          <td align="center" colSpan={2}>
                            <h5
                              style={{
                                marginTop: "1.5rem",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <b>Data tidak ditemukan</b>
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
              <Colxx
                sm="6"
                md="10"
                style={{
                  paddingRight: "0px",
                  marginLeft: "16px",
                  marginBottom: "12px",
                }}
              >
                <Label for="jaga">Divisi / Poli</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="id_jaga"
                  id="id_jaga"
                  options={selectedSchedule}
                  value={selectedSchedule.find(
                    (item) => item.value === queue.id_jaga
                  )}
                  onChange={onChange}
                />
              </Colxx>
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
      </Row>
    </>
  );
};
export default Data;