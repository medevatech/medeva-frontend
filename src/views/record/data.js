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
import divisionAPI from "api/division";
import recordAPI from "api/record";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

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
  const allRecord = useSelector(state => state.allRecordByPatient);

  const [dataStatus, setDataStatus] = useState("add");

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDivisionF, setSelectedDivisionF] = useState([{ label: "Semua", value: "", key: 0, name: 'id_klinik' }]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedVisitation, setSelectedVisitation] = useState('');
  const [selectedPrognosa, setSelectedPrognosa] = useState('');

  const [modalRecord, setModalRecord] = useState(false);
  const [showRecord, setShowRecord] = useState('none');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [Sdate, setStartDate] = useState(new Date());
  const [Edate, setEndDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const [patientStatus, setPatientStatus] = useState(0);
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

  const [ record, setRecord ] = useState({
    id_jaga: watchID,
    id_vs: '',
    id_pasien: patientID,
    waktu_mulai: startDateTime,
    waktu_selesai: endDateTime,
    tipe: '',
    anamnesis: '',
    pemeriksaan_fisik: '',
    prognosa: '',
    kasus_kll: false,
    status_pulang: '',
    keluhan: ''
  });

  // const [ allRecord, setAllRecord ] = useState([]);

  const onChange = (e, name = "") => {
    // console.log('e', e);

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

      setIsChecked(false);
    } else if (e.target.name === 'kasus_kll' && e.target.checked === true) {
      setRecord(current => {
          return { ...current, kasus_kll: true }
      })

      setIsChecked(true);
    } else {
      setRecord(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    // console.log('record', record);
  }

  const getRecordByPatientId = async (e, id) => {
    e.preventDefault();
    // resetForm(e);

    if(id){
      setDataStatus("update");

      try {
        const res = await recordAPI.get("", `/${id}`);
        let data = res.data.data[0];

        // console.log(data);

        setRecordID(data.id);
        setRecord({
          id_jaga: data.id_jaga,
          id_vs: data.id_vs,
          id_pasien: patientID,
          waktu_mulai: data.waktu_mulai,
          waktu_selesai: data.waktu_selesai,
          tipe: data.tipe,
          anamnesis: data.anamnesis,
          pemeriksaan_fisik: data.pemeriksaan_fisik,
          prognosa: data.prognosa,
          kasus_kll: data.kasus_kll,
          status_pulang: data.status_pulang,
          keluhan: data.keluhan
        });

        setSelectedType({tipe: data.tipe ? e.value : ''});
        setSelectedVisitation({status_pulang: data.status_pulang ? e.value : ''});
        setSelectedPrognosa({prognosa: data.prognosa ? e.value : ''});

        if (data.kasus_kll === true) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }

        // console.log(record);
      } catch (e) {
        console.log(e);
      }
    } else {
      setDataStatus("add");

      setRecord({
        id_jaga: watchID,
        id_vs: vitalSignsID,
        id_pasien: patientID,
        // waktu_mulai: moment(patientData.created_at).format("YYYY-MM-DD HH:mm:ss.SSS"),
        // waktu_mulai: moment(patientData.created_at).format(),
        // waktu_selesai: endDateTime,
        tipe: '',
        anamnesis: '',
        pemeriksaan_fisik: '',
        prognosa: '',
        kasus_kll: '',
        status_pulang: '',
        keluhan: ''
      });
    }

    setModalRecord(true);

    // console.log(dataStatus);
  };

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

          // resetForm(e);
          // setShowRecord('none');

          getVitalSignsByPatientId(e, patientID, patientData);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah rekam medis gagal: ${response.message}`,
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
    } else if(dataStatus === 'update') {
      try {
        const response = await recordAPI.update(record, recordID);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Ubah rekam medis sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // resetForm(e);
          // setShowRecord('none');

          getVitalSignsByPatientId(e, patientID, patientData);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah rekam medis gagal: ${response.message}`,
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
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e) => {
    e.preventDefault();

    dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: []});
    // setAllRecord([]);

    setRecord({
      id_jaga: watchID,
      id_vs: '',
      id_pasien: patientID,
      waktu_mulai: startDateTime,
      // waktu_selesai: endDateTime,
      tipe: '',
      anamnesis: '',
      pemeriksaan_fisik: '',
      prognosa: '',
      kasus_kll: false,
      status_pulang: '',
      keluhan: ''
    });

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
    onLoadDivisi();
  };

  const onLoadDivisi = async () => {
    try {
      const response = await divisionAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedDivisionF([{ label: "Semua", value: "", key: 0, name: 'id_divisi' }]);

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

    console.log('patientID', id);
    console.log('patientData', data);

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
    }

    setPatientStatus(1);
  };
  
  const getAllRecordByPatientId = async (e, id) => {
    dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: []});

    try {
      const res = await recordAPI.getByPatient("", `/${id}`);
      let data = res.data.data;
      dispatch({type: "GET_ALL_RECORD_BY_PATIENT", payload: data});
    } catch (e) {
      console.log(e);
    }

    setPatientStatus(2);
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
    onLoadDivisi();

    if(patientStatus === 1 && patientID) {
      getAllRecordByPatientId("", patientID);
    }
    
  // }, [limit, search, searchDivisi, sortBy, sortOrder, currentPage, queueAll, queueTotalPage, allRecord]);
  }, [limit, searchName, searchDivisi, sortBy, sortOrder, currentPage, allRecord, patientStatus]);

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
                <Table>
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
                          <tr key={data.id} onClick={(e) => getVitalSignsByPatientId(e, data.id_pasien, data)} style={{ cursor: 'pointer'}}>
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
                                {' '}
                                {/* <Button color="warning" size="xs" className="button-xs">
                                  <i className="simple-icon-drawer"></i>
                                </Button> */}
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
                        { vitalSigns.id_pasien ? moment(vitalSigns.created_at).format("DD MMM YYYY - HH:mm") : 'Tanggal / Waktu' }
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
                    <Button color="primary" style={{ float: "right" }} className="mb-4" onClick={(e) => getRecordByPatientId(e, "")}>
                      Tambah
                    </Button> :
                  '' }
                  { patientStatus === 2 && allRecord.length > 0 ?
                    <>
                      <br/>
                      <Label style={{ fontWeight: 'bold' }}>{patientData.nama_lengkap}, </Label>&nbsp;
                      <Label>
                        {patientData.jenis_kelamin}, {new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun
                      </Label>
                    </> :
                    ' Tidak Ditemukan' }
                </CardTitle>
                {patientStatus === 2 && allRecord.length > 0 ? ( 
                  allRecord.map((data) => ( 
                  <Table borderless className="med-record-table" key={data.id}>
                    <tbody>
                      <tr>
                        <th><h6 style={{ fontWeight: 'bold' }}>Kunjungan {data.tipe ? data.tipe : '-'}</h6></th>
                        <td>
                            <span style={{ float: 'right' }}>
                              {data.waktu_mulai ? data.waktu_mulai : '00/00/0000'} s/d {data.waktu_selesai ? data.waktu_selesai : '00/00/0000'}
                              {/* {data.created_at ? data.created_at : '00/00/0000'} s/d {data.updated_at ? data.updated_at : '00/00/0000'} */}
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
                      {/* <tr>
                        <th>Prognosa</th>
                        <td>{data.prognosa ? data.prognosa : '-'}</td>
                      </tr>
                      <tr>
                        <th>Kasus KLL</th>
                        <td>{
                            data.kasus_kll ? 
                              <h5><span className="badge med-record-badge badge-danger badge-pill"><i className="simple-icon-check"></i></span></h5> :
                              <h5><span className="badge med-record-badge badge-success badge-pill"><i className="simple-icon-close"></i></span></h5>
                            }
                        </td>
                      </tr> */}
                      {/* <tr>
                        <th>Status Pulang</th>
                        <td>{data.status_pulang ? data.status_pulang : '-'}</td>
                      </tr> */}
                      <tr>
                        <th></th>
                        <td>
                            <Button color="secondary" size="xs" style={{ float: "right" }}
                              onClick={(e) => getRecordByPatientId(e, data.id)}
                              >
                              Ubah Data Rekam Medis
                            </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  ) ) 
                ) : ('')}
              </CardBody>
            </Card>
          </Colxx>

          <Modal isOpen={modalRecord} toggle={() => setModalRecord(!modalRecord)} className="modal-record">
            <ModalHeader>
              Form Registrasi Rekam Medis <span style={{ fontWeight: 'bold' }}>{patientData.nama_lengkap}</span>
            </ModalHeader>
            <Form>
            <ModalBody>
              <FormGroup row>
                {/* <Colxx sm={6}>
                  <FormGroup>
                    <Label for="waktu_mulai">
                      Waktu Mulai<span className="required text-danger" aria-required="true"> *</span>
                    </Label>
                    <DatePicker
                      // selected={startDateTime}
                      // selected={moment(new Date(patientData.created_at)).format("d MMMM yyyy HH:mm")}
                      selected={new Date(patientData.created_at)}
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
                </Colxx> */}

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
                      value={selectType.find(item => item.value === record.tipe) || ''}
                      // value={selectedType}
                      // onChange={setSelectedType}
                      options={selectType}
                      // value={record.tipe}
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
                      checked={isChecked}
                      type="checkbox"
                      name="kasus_kll"
                      id="kasus_kll"
                      label="Kecelakaan Lalu Lintas"
                      value={record.kasus_kll}
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
                    <Label for="prognosa">
                      Prognosa
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="prognosa"
                      value={selectPrognosa.find(item => item.value === record.prognosa) || ''}
                      // value={selectedPrognosa}
                      // onChange={setSelectedPrognosa}
                      options={selectPrognosa}
                      // value={record.prognosa}
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
                      // value={selectedVisitation}
                      value={selectVisitation.find(item => item.value === record.status_pulang) || ''}
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
                  <Button color="primary" 
                    onClick={(e) => onRecordSubmit(e)}>
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