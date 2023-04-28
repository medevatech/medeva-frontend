import React, { useState, useEffect } from 'react';
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
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import moment from "moment";
import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Pagination from 'components/common/Pagination';

import CustomSelectInput from 'components/common/CustomSelectInput';

import queueAPI from "api/queue";
import vitalSignsAPI from "api/vital-signs";
import recordAPI from "api/record";
import Swal from "sweetalert2";

const selectDivision = [
  { label: 'Poli Umum', value: 'umum', key: 0 },
  { label: 'Poli Gigi', value: 'gigi', key: 1 }
];

const selectPatient = [
  { label: 'John Doe', value: 'john', key: 0 },
  { label: 'Jane Doe', value: 'jane', key: 1 },
  { label: 'Josh Doe', value: 'josh', key: 2 },
  { label: 'Jack Doe', value: 'jack', key: 3 },
  { label: 'Janet Doe', value: 'janet', key: 4 },
];

const selectVisitation = [
  { label: 'Meninggal', value: 'Meninggal', key: 0, name: 'status_pulang' },
  { label: 'Berobat Jalan', value: 'Berobat Jalan', key: 1, name: 'status_pulang' },
  { label: 'Rujuk', value: 'Rujuk', key: 2, name: 'status_pulang' }
];

const selectPrognosa = [
  { label: 'Sanam (Sembuh)', value: 'Sanam (Sembuh)', key: 0, name: 'prognosa' },
  { label: 'Bonam (Baik)', value: 'Bonam (Baik)', key: 1, name: 'prognosa' },
  { label: 'Malam (Buruk/Jelek)', value: 'Malam (Buruk/Jelek)', key: 2, name: 'prognosa' },
  { label: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', value: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', key: 3, name: 'prognosa' },
  { label: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', value: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', key: 4, name: 'prognosa' },
];

const selectType = [
  { label: 'Promotif', value: 'Promotif', key: 0, name: 'tipe' },
  { label: 'Preventif', value: 'Preventif', key: 1, name: 'tipe' },
  { label: 'Rawat Inap', value: 'Rawat Inap', key: 2, name: 'tipe' },
  { label: 'Rawat Jalan', value: 'Rawat Jalan', key: 3, name: 'tipe' }
];

const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const queueAll = useSelector(state => state.queue);
  const queueTotalPage = useSelector(state => state.queueTotalPage);
  const [dataStatus, setDataStatus] = useState("add");

  const [selectedDivision, setSelectedDivision] = useState('');

  const [selectedType, setSelectedType] = useState('');
  const [selectedVisitation, setSelectedVisitation] = useState('');
  const [selectedPrognosa, setSelectedPrognosa] = useState('');

  const [modalRecord, setModalRecord] = useState(false);
  const [showRecord, setShowRecord] = useState('none');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [Sdate, setStartDate] = useState(new Date());
  const [Edate, setEndDate] = useState(new Date());

  const [patientID, setPatientID] = useState('');
  const [vitalSignsID, setVitalSignsID] = useState('');
  const [recordID, setRecordID] = useState('');

  const [ vitalSigns, setVitalSigns ] = useState({
    id_pasien: patientID,
    keluhan: '',
    kesadaran: '',
    temperatur: '',
    tinggi_badan: '',
    berat_badan: '',
    lingkar_perut: '',
    imt: '',
    sistole: '',
    diastole: '',
    respiratory_rate: '',
    heart_rate: '',
    catatan_tambahan: ''
  });

  const [ record, setRecord ] = useState({
    id_jaga: '',
    id_vs: '',
    id_pasien: patientID,
    waktu_mulai: '',
    waktu_selesai: '',
    tipe: '',
    anamnesis: '',
    pemeriksaan_fisik: '',
    prognosa: '',
    kasus_kll: false,
    status_pulang: '',
    keluhan: ''
  });

  const onChange = (e, name = "") => {
    console.log('e', e);

    if (e.name === 'tipe') {
      setRecord(current => {
          return { ...current, tipe: e.value }
      })

      setSelectedType(e);
    } else if (e.name === 'status_pulang') {
      setRecord(current => {
          return { ...current, status_pulang: e.value }
      })

      setSelectedVisitation(e);
    } else if (e.name === 'prognosa') {
      setRecord(current => {
          return { ...current, prognosa: e.value }
      })

      setSelectedPrognosa(e);
    } else if (name === 'waktu_mulai') {
      const sd = new Date(e);
      // console.log('sd', sd);
      // setStartDate(sd);
      setStartDateTime(sd);

      setRecord(current => {
          return { ...current, waktu_mulai: moment(ed).format("yyyy-MM-DD HH:mm") }
      })
    } else if (name === 'waktu_selesai') {
      const ed = new Date(e);
      // console.log('ed', ed);
      // setEndDate(ed);
      setEndDateTime(ed);

      setRecord(current => {
          return { ...current, waktu_selesai: moment(ed).format("yyyy-MM-DD HH:mm") }
      })
    } else if (e.target.name === 'kasus_kll' && e.target.checked === false) {
      setRecord(current => {
          return { ...current, kasus_kll: false }
      })
    } else if (e.target.name === 'kasus_kll' && e.target.checked === true) {
      setRecord(current => {
          return { ...current, kasus_kll: true }
      })
    } else {
      setRecord(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    console.log('record', record);
  }

  const onRecordSubmit = async (e) => {
    e.preventDefault();

    // console.log(record);
    if(dataStatus === 'add') {
      try {
        const response = await recordAPI.add(record);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah rekam medis sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah rekam medis gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: 3,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if(dataStatus === 'update') { console.log('harusnya fungsi update');
      // try {
      //   const response = await recordAPI.update(record, recordID);
      //   // console.log(response);

      //   if (response.status == 200) {
      //     let data = await response.data.data;
      //     // console.log(data);

      //     Swal.fire({
      //       title: "Sukses!",
      //       html: `Ubah rekam medis sukses`,
      //       icon: "success",
      //       confirmButtonColor: "#008ecc",
      //     });

      //     resetForm(e);
      //   } else {
      //     Swal.fire({
      //       title: "Gagal!",
      //       html: `Ubah rekam medis gagal: ${response.message}`,
      //       icon: "error",
      //       confirmButtonColor: "#008ecc",
      //       confirmButtonText: "Coba lagi",
      //     });

      //     throw Error(`Error status: ${response.statusCode}`);
      //   }
      // } catch (e) {
      //   Swal.fire({
      //     title: "Gagal!",
      //     html: e,
      //     icon: "error",
      //     confirmButtonColor: "#008ecc",
      //     confirmButtonText: "Coba lagi",
      //   });

      //   console.log(e);
      // }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e) => {
    e.preventDefault();

    setRecord([{
      id_jaga: '',
      id_vs: '',
      id_pasien: '',
      waktu_mulai: '',
      waktu_selesai: '',
      tipe: '',
      anamnesis: '',
      pemeriksaan_fisik: '',
      prognosa: '',
      kasus_kll: false,
      status_pulang: '',
      keluhan: ''
    }]);

    setVitalSigns({
      id_pasien: patientID,
      keluhan: '',
      kesadaran: '',
      temperatur: '',
      tinggi_badan: '',
      berat_badan: '',
      lingkar_perut: '',
      imt: '',
      sistole: '',
      diastole: '',
      respiratory_rate: '',
      heart_rate: '',
      catatan_tambahan: ''
    });
    
    setSelectedType("");
    setSelectedVisitation("");
    setSelectedPrognosa("");

    setPatientID('');
    setVitalSignsID('');
    setRecordID('');

    setShowRecord('none');
    setDataStatus("add");
  };

  const getQueue = async (params) => {
    try {
      const res = await queueAPI.get("", params);
      dispatch({type: "GET_QUEUE", payload: res.data.data});
      // dispatch({type: "GET_TOTAL_PAGE_QUEUE", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    }
  };

  const getVitalSignsByPatientId = async (e, id) => {
    // e.preventDefault();
    resetForm(e);

    try {
      const res = await vitalSignsAPI.getByPatient("", `/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setVitalSignsID(id);
      setPatientID(data.id_pasien);

      setVitalSigns({
        id_pasien: data.id_pasien,
        keluhan: data.keluhan,
        kesadaran: data.kesadaran,
        temperatur: data.temperatur,
        tinggi_badan: data.tinggi_badan,
        berat_badan: data.berat_badan,
        lingkar_perut: data.lingkar_perut,
        imt: data.imt,
        sistole: data.sistole,
        diastole: data.diastole,
        respiratory_rate: data.respiratory_rate,
        heart_rate: data.heart_rate,
        catatan_tambahan: data.catatan_tambahan
      });

      getRecordByPatientId("", data.id_pasien);

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };
  
  const getRecordByPatientId = async (e, id) => {
    try {
      const res = await recordAPI.get("", `/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      // setRecordID(id);
      // setPatientID(data.id_pasien);

      setRecord([{
        id_jaga: data.id_jaga,
        id_vs: data.id_vs,
        id_pasien: data.id_pasien,
        waktu_mulai: data.waktu_mulai,
        waktu_selesai: data.waktu_selesai,
        tipe: data.tipe,
        anamnesis: data.anamnesis,
        pemeriksaan_fisik: data.pemeriksaan_fisik,
        prognosa: data.prognosa,
        kasus_kll: data.kasus_kll,
        status_pulang: data.status_pulang,
        keluhan: data.keluhan
      }]);

      setSelectedType({tipe: data.tipe ? e.value : ''});
      setSelectedVisitation({status_pulang: data.status_pulang ? e.value : ''});
      setSelectedPrognosa({prognosa: data.prognosa ? e.value : ''});

      setShowRecord('block');

      // console.log(record);
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(3);

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (search !== "") {
      params = `${params}&searchName=${search}`;
    }
    if (currentPage !== "1") {
      params = `${params}&page=${currentPage}`;
    }

    getQueue(params);
  }, [limit, search, sortBy, sortOrder, currentPage, queueAll, queueTotalPage]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle className="mb-4">
                  Data Antrian
                  {/* <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah
                  </Button> */}
                </CardTitle>
                <FormGroup row style={{ margin: '0px', width: '100%' }}>
                  <Colxx sm="12" md="6" style={{ paddingLeft: '0px' }}>
                    <Label for="tanggalRekamCari">
                          Tanggal
                        </Label>
                        <Input
                          type="date"
                          name="tanggalRekamCari"
                          id="tanggalRekamCari"
                          placeholder="Tanggal"
                          defaultValue={new Date().toISOString().substr(0, 10)}
                        />
                  </Colxx>
                  <Colxx sm="12" md="6" style={{ paddingRight: '0px' }}>
                    <Label for="divisi">
                      Divisi
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
                  </Colxx>
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
                    <th className="center-xy">#</th>
                      <th colSpan={2}>Antrian</th>
                    <th style={{ textAlign: "center", width: '150px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {queueAll ? (
                      queueAll.map((data) => (
                        <tr key={data.id}>
                            <th scope="row" className="center-xy">{startNumber++}</th>
                            <td className="icon-column">
                              <i className="simple-icon-magnifier queue-icon"></i><br/>
                              <span className="queue-text">0001</span>
                            </td>
                            <td>
                              <h6 style={{ fontWeight: 'bold' }}>{data.nama_lengkap}</h6>
                              {data.jenis_kelamin.substring(0,1)}, {new Date().getFullYear() - data.tanggal_lahir.substring(0,4)} tahun<br/>
                            </td>
                            <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                              <Button color="secondary" size="xs" className="button-xs"
                                // onClick={(e) => getVitalSignsByPatientId(e, data.id)}
                              >
                                <i className="simple-icon-note"></i>
                              </Button>
                              {' '}
                              <Button color="warning" size="xs" className="button-xs">
                                <i className="simple-icon-drawer"></i>
                              </Button>
                            </td>
                          </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <p>Loading data</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Pagination
                  currentPage={currentPage}
                  totalPage={queueTotalPage}
                  onChangePage={(i) => setCurrentPage(i)}
                />
              </CardBody>
            </Card>
          </Colxx>
          <Colxx sm="12" md="12" xl="8" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <Row>
                    <Colxx sm="6" md="6" xl="6">
                      Otto<br/>
                      <Label>Laki-laki, 32 Tahun</Label><br/>
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-microscope"></i>
                      </Badge>
                      {' '}
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-ambulance"></i>
                      </Badge>
                      {' '}
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-atom"></i>
                      </Badge>
                      {' '}
                    </Colxx>
                    <Colxx sm="6" md="6" xl="6">
                      <Label style={{ float: 'right', lineHeight: 3 }}>
                        25 April 2023 12.42
                        {/* {startDateTime} */}
                      </Label><br/>
                    </Colxx>
                  </Row>
                </CardTitle>
                <Table bordered style={{ display: {showRecord} }}>
                  <tbody>
                    <tr>
                      <th>Keluhan</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                    <tr>
                      <th>Kesadaran</th>
                      <td>Compos Mentis</td>
                    </tr>
                    <tr>
                      <th>Temperatur</th>
                      <td>100 <sup>0</sup>C</td>
                    </tr>
                    <tr>
                      <th>Tinggi Badan</th>
                      <td>100 cm</td>
                    </tr>
                    <tr>
                      <th>Berat Badan</th>
                      <td>100 kg</td>
                    </tr>
                    <tr>
                      <th>Lingkar Perut</th>
                      <td>100 cm</td>
                    </tr>
                    <tr>
                      <th>IMT</th>
                      <td>100 kg/m<sup>2</sup></td>
                    </tr>
                    <tr>
                      <th>Tekanan Darah</th>
                      <td>100 mmHg / 100 mmHg</td>
                    </tr>
                    <tr>
                      <th>Tingkat Pernapasan</th>
                      <td>100 / menit</td>
                    </tr>
                    <tr>
                      <th>Detak Jantung</th>
                      <td>100 bpm</td>
                    </tr>
                    <tr>
                      <th>Catatan Tambahan</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Riwayat Rekam Medis
                  <Button
                    color="primary"
                    style={{ float: "right" }}
                    className="mb-4"
                    onClick={() => setModalRecord(true)}
                  >
                    Tambah
                  </Button>
                </CardTitle>
                <Table borderless className="med-record-table">
                  <tbody>
                    <tr>
                      <th><h6 style={{ fontWeight: 'bold' }}>DD/ Diagnosis</h6></th>
                      <td><span style={{ float: 'right' }}>25 April 2023 12.42</span></td>
                    </tr>
                    <tr>
                      <th>Anamnesis</th>
                      <td>Compos Mentis</td>
                    </tr>
                    <tr>
                      <th>Rhinos SR</th>
                      <td>(01/01/2019 - 21/01/2019)</td>
                    </tr>
                    <tr>
                      <th>Tindakan</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                    <tr>
                      <th>Pemeriksaan Penunjang</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                    <tr>
                      <th>Rujukan</th>
                      <td>Poli X</td>
                    </tr>
                  </tbody>
                </Table>
                <Table borderless className="med-record-table">
                  <tbody>
                    <tr>
                      <th><h6 style={{ fontWeight: 'bold' }}>DD/ Diagnosis</h6></th>
                      <td><span style={{ float: 'right' }}>25 April 2023 12.42</span></td>
                    </tr>
                    <tr>
                      <th>Anamnesis</th>
                      <td>Compos Mentis</td>
                    </tr>
                    <tr>
                      <th>Rhinos SR</th>
                      <td>(01/01/2019 - 21/01/2019)</td>
                    </tr>
                    <tr>
                      <th>Tindakan</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                    <tr>
                      <th>Pemeriksaan Penunjang</th>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!</td>
                    </tr>
                    <tr>
                      <th>Rujukan</th>
                      <td>Poli X</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            {/* <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Form Registrasi Rekam Medis
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="waktuMulai">
                          Waktu Mulai<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <DatePicker
                          selected={startDateTime}
                          onChange={setStartDateTime}
                          name="waktuMulai"
                          id="waktuMulai"
                          showTimeInput
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={5}
                          dateFormat="d MMMM yyyy HH:mm"
                          readOnly={true}
                          timeCaption="Jam"
                          className="disabled-datepicker"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="waktuSelesai">
                          Waktu Selesai<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <DatePicker
                          selected={endDateTime}
                          onChange={setEndDateTime}
                          name="waktuSelesai"
                          id="waktuSelesai"
                          showTimeInput
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={5}
                          dateFormat="d MMMM yyyy HH:mm"
                          timeCaption="Jam"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="tipe">
                          Tipe
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="tipe"
                          value={selectedType}
                          onChange={setSelectedType}
                          options={selectType}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="prognosa">
                          Prognosa
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="prognosa"
                          value={selectedPrognosa}
                          onChange={setSelectedPrognosa}
                          options={selectPrognosa}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="anamnesis">
                          Anamnesis
                        </Label>
                        <Input
                          type="textarea"
                          name="anamnesis"
                          id="anamnesis"
                          placeholder="Anamnesis"
                          style={{minHeight: '100'}}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="periksaFisik">
                          Pemeriksaan Fisik
                        </Label>
                        <Input
                          type="textarea"
                          name="periksaFisik"
                          id="periksaFisik"
                          placeholder="Pemeriksaan Fisik"
                          style={{minHeight: '100'}}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="kll">
                          Kasus Kecelakaan Lalu Lintas
                        </Label>
                        <CustomInput
                          type="checkbox"
                          id="kll"
                          label="Kecelakaan Lalu Lintas"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="pulang">
                          Status Pulang<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="pulang"
                          value={selectedVisitation}
                          onChange={setSelectedVisitation}
                          options={selectVisitation}
                          required
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <Row>
                    <Colxx sm={6}>
                      <Label>
                        * ) Wajib diisi
                      </Label>
                    </Colxx>
                    <Colxx sm={6} className="text-right">
                      <Button outline color="danger">
                        Batal
                      </Button>
                      &nbsp;&nbsp;
                      <Button color="primary">
                        Simpan
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              </CardBody>
            </Card> */}
          </Colxx>

          <Modal isOpen={modalRecord} toggle={() => setModalRecord(!modalRecord)} className="modal-record">
            <ModalHeader>
              Form Registrasi Rekam Medis Otto
            </ModalHeader>
            <Form>
            <ModalBody>
              <FormGroup row>
                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="waktu_mulai">
                      Waktu Mulai<span className="required text-danger" aria-required="true"> *</span>
                    </Label>
                    <DatePicker
                      selected={startDateTime}
                      // onChange={setStartDateTime}
                      name="waktu_mulai"
                      id="waktu_mulai"
                      showTimeInput
                      // showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      dateFormat="d MMMM yyyy HH:mm"
                      readOnly={true}
                      // timeCaption="Jam"
                      className="disabled-datepicker"
                      // value={Sdate}
                      onChange={(e) => onChange(e, "waktu_mulai")}
                      shouldCloseOnSelect={true}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="waktu_selesai">
                      Waktu Selesai<span className="required text-danger" aria-required="true"> *</span>
                    </Label>
                    <DatePicker
                      selected={endDateTime}
                      // onChange={setEndDateTime}
                      name="waktu_selesai"
                      id="waktu_selesai"
                      showTimeInput
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      dateFormat="d MMMM yyyy HH:mm"
                      timeCaption="Jam"
                      // value={Edate}
                      onChange={(e) => onChange(e, "waktu_selesai")}
                      shouldCloseOnSelect={true}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="tipe">
                      Tipe
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="tipe"
                      value={selectedType}
                      // onChange={setSelectedType}
                      options={selectType}
                      // value={record.tipe}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="prognosa">
                      Prognosa
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="prognosa"
                      value={selectedPrognosa}
                      // onChange={setSelectedPrognosa}
                      options={selectPrognosa}
                      // value={record.prognosa}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={12}>
                  <FormGroup>
                    <Label for="anamnesis">
                      Anamnesis
                    </Label>
                    <Input
                      type="textarea"
                      name="anamnesis"
                      id="anamnesis"
                      placeholder="Anamnesis"
                      style={{minHeight: '100'}}
                      value={record.anamnesis}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={12}>
                  <FormGroup>
                    <Label for="pemeriksaan_fisik">
                      Pemeriksaan Fisik
                    </Label>
                    <Input
                      type="textarea"
                      name="pemeriksaan_fisik"
                      id="pemeriksaan_fisik"
                      placeholder="Pemeriksaan Fisik"
                      style={{minHeight: '100'}}
                      value={record.pemeriksaan_fisik}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="kasus_kll">
                      Kasus Kecelakaan Lalu Lintas
                    </Label>
                    <CustomInput
                      type="checkbox"
                      name="kasus_kll"
                      id="kasus_kll"
                      label="Kecelakaan Lalu Lintas"
                      value={record.kasus_kll}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={6}>
                  <FormGroup>
                    <Label for="status_pulang">
                      Status Pulang<span className="required text-danger" aria-required="true"> *</span>
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="status_pulang"
                      value={selectedVisitation}
                      // onChange={setSelectedVisitation}
                      options={selectVisitation}
                      required
                      // value={record.status_pulang}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx sm={12}>
                  <FormGroup>
                    <Label for="keluhan">
                      Keluhan
                    </Label>
                    <Input
                      type="textarea"
                      name="keluhan"
                      id="keluhan"
                      placeholder="Keluhan"
                      style={{minHeight: '100'}}
                      value={record.keluhan}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Colxx>
              </FormGroup>

              
            </ModalBody>
            <ModalFooter style={{ display: 'block' }}>
              <Row>
                <Colxx sm={6}>
                  <Label>
                    * ) Wajib diisi
                  </Label>
                </Colxx>
                <Colxx sm={6} className="text-right">
                <Button
                  type="button"
                  outline
                  color="danger"
                  onClick={() => setModalRecord(false)}>
                    Batal
                  </Button>
                  &nbsp;&nbsp;
                  <Button color="primary">
                    Simpan
                  </Button>
                </Colxx>
              </Row>
            </ModalFooter>
            </Form>
          </Modal>
        </Row>
    </>
  );
};
export default Data;