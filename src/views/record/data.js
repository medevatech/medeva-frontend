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

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const queueAll = useSelector(state => state.queue);
  const queueTotalPage = useSelector(state => state.queueTotalPage);
  // const allRecord = useSelector(state => state.allRecordByPatient);
  const [dataStatus, setDataStatus] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [allRecord, setAllRecord] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDivisionF, setSelectedDivisionF] = useState([{ label: "Semua", value: "", key: 0, name: 'id_klinik' }]);
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

  const [isLoading, setIsLoading] = useState(false);

  const getQueue = async (params) => {
    try {
      setIsLoading(true);
      const res = await queueAPI.get("", params);
      dispatch({type: "GET_QUEUE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_QUEUE", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getVitalSignsByPatientId = async (e, id, data) => {
    // e.preventDefault();
    // resetForm(e);
    setRowSelected(data.id);

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
    setWatchID(data.id_jaga);

    // console.log('patientID', id);
    // console.log('patientData', data);

    try {
      const res = await vitalSignsAPI.getByPatient("", `/${id}`);
      let data = res.data.data[0];
      // console.log('vitalSigns', data);

      setVitalSignsID(data.id);

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
        catatan_tambahan: data.catatan_tambahan,
        created_at: data.created_at
      });

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);
    } finally {
      getAllRecordByPatientId(e, id);
    }
  };
  
  const getAllRecordByPatientId = async (e, id) => {
    // dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: []});
    setAllRecord([]);

    try {
      const res = await recordAPI.getByPatient("", `/${id}`);
      let data = res.data.data;
      // dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: data});
      setAllRecord(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchDivisi, setSearchDivisi] = useState("");

  useEffect(() => {
    let params = "";
    if (limit !== "10") {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchName !== "") {
      params = `${params}&searchName=${searchName}`;
    }
    if (searchDivisi !== "") {
      params = `${params}&searchDivisi=${searchDivisi}`;
    }
    if (!userData.roles.includes('isDev')) {
      params = `${params}&searchJaga=${userData.id}`;
    }
    if (currentPage !== "1") {
      params = `${params}&page=${currentPage}`;
    }

    getQueue(params);
    
  // }, [limit, search, searchDivisi, sortBy, sortOrder, currentPage, queueAll, queueTotalPage, allRecord]);
  }, [limit, searchName, searchDivisi, sortBy, sortOrder, currentPage]);

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
                      onChange={(e) => setSearchDivisi(e.value)}
                      options={selectedDivisionF}
                    />
                  </Colxx>
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
                      <th className="center-xy" style={{ width: '40px' }}>#</th>
                      <th colSpan={2}>Antrian</th>
                      <th className="center-xy" style={{ width: '55px' }}>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ? (
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
                                  onClick={(e) => getVitalSignsByPatientId(e, data.id_pasien, data)}
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
                      { patientData ? patientData.nama_lengkap : 'Pasien' }<br/>
                      <Label>{ patientData ? `${patientData.jenis_kelamin}, ${new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun`  : 'Jenis Kelamin, Umur' }</Label><br/>
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
                  Riwayat Rekam Medis
                  { patientData ?
                    <Link to={{
                        pathname: `/record/form`,
                        state: { patientID: patientID, patientData: patientData, watchID: watchID }
                    }}>
                      <Button color="primary" style={{ float: "right" }} className="mb-4">
                        Tambah
                      </Button>
                    </Link> :
                  '' }
                  { allRecord.length > 0 ?
                    <>
                      <br/>
                      <Label style={{ fontWeight: 'bold' }}>{patientData.nama_lengkap}, </Label>&nbsp;
                      <Label>
                        {patientData.jenis_kelamin}, {new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun
                      </Label>
                    </> :
                    ' Tidak Ditemukan' }
                </CardTitle>
                { allRecord.length > 0 && ( 
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
                      <tr>
                        <th></th>
                        <td>
                            <Link to={{
                                pathname: `/record/form`,
                                state: { patientID: patientID, patientData: patientData, recordID: data.id, watchID: watchID }
                            }}>
                              <Button color="secondary" size="xs" style={{ float: "right" }}>
                                Ubah Data
                              </Button>
                            </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  ) ) 
                )}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
    </>
  );
};
export default Data;