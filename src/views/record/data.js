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
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
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

import { Wizard, Steps, Step } from 'react-albus';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';

import queueAPI from "api/queue";
import clinicAPI from "api/clinic";
import vitalSignsAPI from "api/vital-signs";
import divisionAPI from "api/division";
import diseaseAPI from "api/disease";
import recordAPI from "api/record";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

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

const selectPcs = [
  { label: 'Kapsul', value: 'Kapsul', key: 0, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 1, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 2, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 3, name: 'satuan' },
  { label: 'Mililiter', value: 'Mililiter', key: 4, name: 'satuan' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 5, name: 'satuan' },
];

const selectPeriod = [
  { label: 'Jam', value: 'Jam', key: 0, name: 'periode' },
  { label: 'Hari', value: 'Hari', key: 1, name: 'periode' }
];

const selectRules = [
  { label: 'Sebelum Makan', value: 'Sebelum Makan', key: 0, name: 'aturan_pakai' },
  { label: 'Setelah Makan', value: 'Setelah Makan', key: 1, name: 'aturan_pakai' },
  { label: 'Kapan Saja', value: 'Kapan Saja', key: 2, name: 'aturan_pakai' }
];

const selectConsume = [
  { label: 'Dikunyah', value: 'Dikunyah', key: 0, name: 'metode_konsumsi' },
  { label: 'Ditelan', value: 'Ditelan', key: 1, name: 'metode_konsumsi' },
  { label: 'Disuntik', value: 'Disuntik', key: 2, name: 'metode_konsumsi' },
  { label: 'Dihirup', value: 'Dihirup', key: 3, name: 'metode_konsumsi' },
  { label: 'Lainnya', value: 'Lainnya', key: 4, name: 'metode_konsumsi' }
];

const Data = ({ match, history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queueAll = useSelector(state => state.queue);
  const queueTotalPage = useSelector(state => state.queueTotalPage);
  // const allRecord = useSelector(state => state.allRecordByPatient);
  const [dataStatus, setDataStatus] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [allRecord, setAllRecord] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDivisionF, setSelectedDivisionF] = useState([{ label: "Semua Poli / Divisi", value: "", key: 0, name: 'id_divisi' }]);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([{ label: ""}]);
  const [selectedMedicine, setSelectedMedicine] = useState([{ label: ""}]);
  const [selectedReciept, setSelectedReciept] = useState([{ label: ""}]);
  const [selectedPcs, setSelectedPcs] = useState([{ label: ""}]);
  const [selectedPeriod, setSelectedPeriod] = useState([{ label: ""}]);
  const [selectedRules, setSelectedRules] = useState([{ label: ""}]);
  const [selectedConsume, setSelectedConsume] = useState([{ label: ""}]);
  const [selectedLab, setSelectedLab] = useState([{ label: ""}]);
  const [selectedTreatment, setSelectedTreatment] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedVisitation, setSelectedVisitation] = useState('');
  const [selectedPrognosa, setSelectedPrognosa] = useState('');
  
  const [showRecord, setShowRecord] = useState('none');

  const [patientID, setPatientID] = useState('');
  const [patientData, setPatientData] = useState('');
  const [vitalSignsID, setVitalSignsID] = useState('');
  const [recordID, setRecordID] = useState('');
  const [watchID, setWatchID] = useState('');
  const [participantID, setParticipantID] = useState('');
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');

  const [ vitalSigns, setVitalSigns ] = useState({
    id_pasien: patientID,
    keluhan: '-',
    kesadaran: '-',
    temperatur: 0,
    tinggi_badan: 0,
    berat_badan: 0,
    lingkar_perut: 0,
    imt: 0,
    sistole: 0,
    diastole: 0,
    respiratory_rate: 0,
    heart_rate: 0,
    catatan_tambahan: '-',
    created_at: ''
  });

  const resetForm = (e) => {
    e.preventDefault();

    // dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: []});
    setAllRecord([]);

    setVitalSigns({
      id_pasien: patientID,
      keluhan: '-',
      kesadaran: '-',
      temperatur: 0,
      tinggi_badan: 0,
      berat_badan: 0,
      lingkar_perut: 0,
      imt: 0,
      sistole: 0,
      diastole: 0,
      respiratory_rate: 0,
      heart_rate: 0,
      catatan_tambahan: '-',
      created_at: ''
    });
    
    setSelectedType("");
    setSelectedVisitation("");
    setSelectedPrognosa("");

    setPatientID('');
    setVitalSignsID('');
    setRecordID('');

    setShowRecord('none');
  };
    
  const onLoadKlinik = async () => {
    try {
      const response = await clinicAPI.get("?limit=1000");
      // console.log(response);

      setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
      setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedKlinik((current) => [
            ...current,
            { label: data[i].nama_klinik, value: data[i].id, key: data[i].id, name: 'id_klinik' },
          ]);
          
          setSelectedKlinikF((current) => [
            ...current,
            { label: data[i].nama_klinik, value: data[i].id, key: data[i].id, name: 'id_klinik' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
    
  const changeKlinik = async (id) => {
    setClinicID(id);
    onLoadDivisi();
  };

  const onLoadDivisi = async () => {
    try {
      const response = await divisionAPI.get(`?limit=1000&searchKlinik=${clinicID}`);
      // console.log(response);

      setSelectedDivisionF([{ label: "Semua Poli / Divisi", value: "", key: 0, name: 'id_divisi' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedDivisionF((current) => [
            ...current,
            { label: data[i].tipe, value: data[i].id, key: data[i].id, name: 'id_divisi' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const getQueue = async (params) => {
    try {
      setIsLoading(true);
      const res = await queueAPI.get(params);
      dispatch({type: "GET_QUEUE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_QUEUE", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getVitalSignsByPatientId = async (e, id, data) => {
    e && e.preventDefault();
    e && resetForm(e);
    data.id ? setRowSelected(data.id) : setRowSelected(id);

    setVitalSigns({
      id_pasien: patientID,
      keluhan: '-',
      kesadaran: '-',
      temperatur: 0,
      tinggi_badan: 0,
      berat_badan: 0,
      lingkar_perut: 0,
      imt: 0,
      sistole: 0,
      diastole: 0,
      respiratory_rate: 0,
      heart_rate: 0,
      catatan_tambahan: '-',
      created_at: ''
    });

    setPatientID(id);
    setPatientData(data);
    data.id_jaga ? setWatchID(data.id_jaga) : setWatchID(watchID);
    setParticipantID(data.id_peserta);

    // console.log('patientID', id);
    // console.log('patientData', data);

    try {
      const res = await vitalSignsAPI.getByPatient(`/${id}?tanggal=${moment(new Date()).format("YYYY-MM-DD")}`);
      // const res = await vitalSignsAPI.getByPatient(`/${id}`);
      // console.log('res', res);

      let dataVs = res.data.data[0];
      // console.log('vitalSigns', dataVs);

      setVitalSignsID(dataVs.id);

      setVitalSigns({
        id_pasien: dataVs.id_pasien,
        keluhan: dataVs.keluhan,
        kesadaran: dataVs.kesadaran,
        temperatur: dataVs.temperatur,
        tinggi_badan: dataVs.tinggi_badan,
        berat_badan: dataVs.berat_badan,
        lingkar_perut: dataVs.lingkar_perut,
        imt: dataVs.imt,
        sistole: dataVs.sistole,
        diastole: dataVs.diastole,
        respiratory_rate: dataVs.respiratory_rate,
        heart_rate: dataVs.heart_rate,
        catatan_tambahan: dataVs.catatan_tambahan,
        created_at: dataVs.created_at
      });

      if(window.innerWidth < 1280){
        const element = document.getElementById('manage-form-tab-mobile');
        if (element) {
          // window.scroll({
          //   top: element,
          //   behavior: "smooth"
          // })
    
          element.scrollIntoView({
            block: "end",
            behavior: "smooth"
          })
        }
      }

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);

      // setVitalSignsID("");

      // Swal.fire({
      //   title: "Gagal!",
      //   html: `Pra-Konsultasi pasien <b>${data.nama_lengkap}</b> hari ini tidak ditemukan, silahkan klik tombol berikut untuk menambah data Pra-Konsultasi`,
      //   icon: "error",
      //   confirmButtonColor: "#008ecc",
      //   confirmButtonText: "Tambah Data Pra-Konsultasi",
      //   showDenyButton: true,
      //   denyButtonText: "Kembali",
      //   reverseButtons: true
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     history.push({
      //       pathname: "/record/vital-signs",
      //       state: { patientID: id, patientData: data }
      //     });
      //   }
      // })
    } finally {
      getAllRecordByPatientId(e, id);
    }
  };
  
  const getAllRecordByPatientId = async (e, id) => {
    // dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: []});
    setAllRecord([]);

    try {
      const res = await recordAPI.getByPatient(`/${id}`);
      let data = res.data.data;
      // dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: data});
      setAllRecord(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");
  const [searchDate, setSearchDate] = useState(new Date().toISOString().substr(0, 10));
  const [searchKlinik, setSearchKlinik] = useState(clinicID);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, search, searchDivisi, searchKlinik, searchDate, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (search !== "") {
      params = `${params}&search=${search}`;
    }
    if (searchDivisi !== "") {
      params = `${params}&searchDivisi=${searchDivisi}`;
    }
    if (searchDate !== "") {
      params = `${params}&date=${moment(searchDate).format("YYYY-MM-DD")}`;
    }
    if (searchKlinik !== "") {
      params = `${params}&searchKlinik=${searchKlinik}`;
    }
    if (!userData.roles.includes('isDev') && userData.roles.includes('isDokter')) {
      params = `${params}&searchJaga=${userData.id}`;
    }
    if (currentPage !== "1") {
      params = `${params}&page=${currentPage}`;
    }

    setRowSelected(false);
    getQueue(params);

    userData.roles.includes('isDev') && onLoadKlinik();
    onLoadDivisi();
  }, [limit, search, searchDivisi, searchDate, searchKlinik, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    // console.log(location.state);

    if (location.state) {
      setPatientID(location.state.patientID);
      setPatientData(location.state.patientData);
      setWatchID(location.state.watchID);
      getVitalSignsByPatientId("", location.state.patientID, location.state.patientData);
    }
  }, [ ]);

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
                <CardTitle style={{ marginBottom: 0 }}>
                  <Row>
                    <Colxx sm="12" md="8" xl="8">
                    Data Antrian
                    </Colxx>
                    <Colxx sm="12" md="4" xl="4">
                      <Button
                        color="primary"
                        style={{ float: "right" }}
                        className="mb-4"
                        onClick={() => getQueue("?limit=10&page=1")}
                      >
                        Perbarui
                      </Button>
                    </Colxx>
                  </Row>
                </CardTitle>
                <FormGroup row style={{ margin: '0px', width: '100%' }}>
                  { userData.roles.includes('isDev') &&
                  <Colxx sm="12" md="12" style={{ paddingLeft: '0px', paddingRight: '0px' }} className="mb-3">
                    <Label for="klinik">
                      Klinik
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="klinik"
                      onChange={(e) => { setSearchKlinik(e.value); changeKlinik(e.value); }}
                      options={selectedKlinikF}
                      defaultValue={{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }}
                    />
                  </Colxx>
                  }
                  <Colxx sm="12" md="6" style={{ paddingLeft: '0px' }}>
                    <Label for="tanggal">
                      Tanggal
                    </Label>
                    <Input
                      type="date"
                      name="tanggal"
                      placeholder="Tanggal"
                      onChange={(e) => setSearchDate(e.target.value)}
                      value={searchDate}
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
                      onChange={(e) => setSearchDivisi(e.value)}
                      options={selectedDivisionF}
                      defaultValue={{ label: "Semua Poli / Divisi", value: "", key: 0, name: 'id_divisi' }}
                    />
                  </Colxx>
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
                      <th className="center-xy" style={{ width: '40px' }}>#</th>
                      <th colSpan={2}>Antrian</th>
                      <th className="center-xy" style={{ width: '55px' }}>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading && rowSelected == false ? (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center" colSpan={2}>
                        <img src={loader} alt="loading..." width="100"/>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                    ) : queueAll.length > 0 ? (
                        queueAll.map((data) => (
                          <tr key={data.id} onClick={(e) => getVitalSignsByPatientId(e, data.id_pasien, data)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
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
                                  // onClick={(e) => getVitalSignsByPatientId(e, data.id_pasien, data)}
                                >
                                  <i className="simple-icon-arrow-right-circle"></i>
                                </Button>
                              </td>
                            </tr>
                        ))
                      ) : (
                        <tr>
                          <td>&nbsp;</td>
                          <td align="center" colSpan={2}>
                            <h5 style={{ marginTop: '1.5rem' }}><b>Data tidak ditemukan</b></h5>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
                <Pagination
                  currentPage={currentPage}
                  totalPage={queueTotalPage}
                  onChangePage={(i) => setCurrentPage(i)}
                  numberLimit={queueTotalPage < 4 ? queueTotalPage : 3}
                />
              </CardBody>
            </Card>
          </Colxx>
          <Colxx sm="12" md="12" xl="8" className="mb-4 manage-form" id="manage-form-tab-mobile">
          { patientID ?
            // && vitalSignsID
              <>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <Row>
                        <Colxx sm="6" md="6" xl="6">
                          { patientData ? patientData.nama_lengkap : 'Pasien' }<br/>
                          <Label>{ patientData ? `${patientData.jenis_kelamin}, ${new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun`  : 'Jenis Kelamin, Umur' }</Label><br/>
                          {/* <Badge color="dark" pill className="mt-2 patient-badge">
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
                          {' '} */}
                        </Colxx>
                        <Colxx sm="6" md="6" xl="6">
                          <Label style={{ float: 'right', lineHeight: 2 }}>
                            { vitalSigns.id_pasien && vitalSigns.created_at ? moment(vitalSigns.created_at).format("DD MMM YYYY - HH:mm") : 'Tanggal / Waktu' }
                          </Label><br/>
                        </Colxx>
                      </Row>
                    </CardTitle>
                    <Table bordered style={{ display: {showRecord} }}>
                      <tbody>
                        <tr>
                          <th>Keluhan</th>
                          <td style={{ width: '70%' }}>{ vitalSigns.id_pasien ? vitalSigns.keluhan : '-' }</td>
                        </tr>
                        <tr>
                          <th>Kesadaran</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.kesadaran : '-' }</td>
                        </tr>
                        <tr>
                          <th>Temperatur</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.temperatur : '0' } <sup>0</sup>C</td>
                        </tr>
                        <tr>
                          <th>Tinggi Badan</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.tinggi_badan : '0' } cm</td>
                        </tr>
                        <tr>
                          <th>Berat Badan</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.berat_badan : '0' } kg</td>
                        </tr>
                        <tr>
                          <th>Lingkar Perut</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.lingkar_perut : '0' } cm</td>
                        </tr>
                        <tr>
                          <th>Tekanan Darah</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.sistole : '0' } mmHg / { vitalSigns ? vitalSigns.diastole : '0' } mmHg</td>
                        </tr>
                        <tr>
                          <th>IMT</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.imt : '0' } kg/m<sup>2</sup></td>
                        </tr>
                        <tr>
                          <th>Tingkat Pernapasan</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.respiratory_rate : '0' } / menit</td>
                        </tr>
                        <tr>
                          <th>Detak Jantung</th>
                          <td>{ vitalSigns.id_pasien ? vitalSigns.heart_rate : '0' } bpm</td>
                        </tr>
                        <tr>
                          <th>Catatan Tambahan</th>
                          <td style={{ width: '70%' }}>{ vitalSigns.id_pasien ? vitalSigns.catatan_tambahan : '-' }</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      { patientID ? 
                        // vitalSignsID ?
                          <Link to={{
                              pathname: `/record/form`,
                              state: { patientID: patientID, patientData: patientData, watchID: watchID, recordID: '', participantID: participantID }
                          }}>
                            <Button color="primary" style={{ float: "right" }} className="mb-4">
                              Tambah Rekam Medis
                            </Button>
                          </Link>
                          // :
                          // <Link to={{
                          //     pathname: `/record/vital-signs`,
                          //     state: { patientID: patientID, patientData: patientData }
                          // }}>
                          //   <Button color="primary" style={{ float: "right" }} className="mb-4">
                          //     Tambah Data Pra-Konsultasi
                          //   </Button>
                          // </Link>
                        : ''
                      }
                      { patientID ? 
                        allRecord.length > 0 ?
                          <>
                            Riwayat Rekam Medis
                            <br/>
                            <Label style={{ fontWeight: 'bold' }}>{patientData.nama_lengkap}, </Label>&nbsp;
                            <Label>
                              {patientData.jenis_kelamin}, {new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun
                            </Label>
                          </>
                          : 'Riwayat Rekam Medis Tidak Ditemukan'
                          // vitalSignsID ? 'Riwayat Rekam Medis Tidak Ditemukan' :
                          // <>
                          //   {'Riwayat Rekam Medis dan Data Pra-Konsultasi Hari Ini Tidak Ditemukan'}
                          //   <br/>
                          //   <Label>
                          //     Silahkan mengisi data Pra-Konsultasi pasien <b>{patientData.nama_lengkap}</b> pada hari ini untuk administrasi data rekam medis
                          //   </Label>
                          // </>
                          : 'Silahkan memilih pasien pada antrian terlebih dahulu'
                      }
                    </CardTitle>
                    { patientID ? 
                      allRecord.length > 0 && ( 
                        allRecord.map((data) => ( 
                        <Table className="med-record-table" key={data.id}>
                          <tbody>
                            <tr>
                              <th><h6 style={{ fontWeight: 'bold' }}>Kunjungan {data.tipe ? data.tipe : '-'}</h6></th>
                              <td>
                                  <span style={{ float: 'right' }}>
                                    {data.waktu_mulai ? moment(data.waktu_mulai).format("DD MMM YYYY - HH:mm") : '00/00/0000 - 00:00'} s/d {data.waktu_selesai ? moment(data.waktu_selesai).format("DD MMM YYYY - HH:mm") : '00/00/0000 - 00:00'}
                                  </span>
                              </td>
                            </tr>
                            <tr>
                              <th>Keluhan</th>
                              <td style={{ width: '70%' }}>{data.keluhan ? data.keluhan : '-'}</td>
                            </tr>
                            <tr>
                              <th>Anamnesis</th>
                              <td>{data.anamnesis ? data.anamnesis : '-'}</td>
                            </tr>
                            <tr>
                              <th>Pemeriksaan Fisik</th>
                              <td>{data.pemeriksaan_fisik ? data.pemeriksaan_fisik : '-'}</td>
                            </tr>
                            { patientData && vitalSignsID ?
                            <tr>
                              <th></th>
                              <td>
                                  <Link to={{
                                      pathname: `/record/form`,
                                      state: { patientID: patientID, patientData: patientData, recordID: data.id, watchID: watchID, participantID: participantID }
                                  }}>
                                    <Button color="secondary" size="xs" style={{ float: "right" }}>
                                      Ubah Data
                                    </Button>
                                  </Link>
                              </td>
                            </tr>
                            : <></>}
                          </tbody>
                        </Table>
                        ) ) 
                      ) : ''}
                  </CardBody>
                </Card>
              </>
            : <Card className="mb-4">
                <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                    <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                    <p className="mb-5">Silahkan memilih antrian untuk melihat data pra-konsultasi dan riwayat rekam medis pasien.
                      Setelah data muncul, silahkan klik tombol tambah untuk menambahkan data pra-konsultasi pasien atau rekam medis baru.</p>
                </CardBody>
            </Card> }
          </Colxx>
        </Row>
    </>
  );
};
export default Data;