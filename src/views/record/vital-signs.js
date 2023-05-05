import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Pagination from 'components/common/Pagination';

import CustomSelectInput from 'components/common/CustomSelectInput';

import queueAPI from "api/queue";
import vitalSignsAPI from "api/vital-signs";
import divisionAPI from "api/division";
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

const selectAwareness = [
  { label: 'Compos Mentis', value: 'Compos Mentis', key: 0, name: 'kesadaran' },
  { label: 'Somnolence', value: 'Somnolence', name: 'kesadaran' },
  { label: 'Sopot', value: 'Sopot', name: 'kesadaran' },
  { label: 'Coma', value: 'Coma', name: 'kesadaran' },
];

const VitalSigns = ({ match }) => {
  const dispatch = useDispatch();
  const queueAll = useSelector(state => state.queue);
  const queueTotalPage = useSelector(state => state.queueTotalPage);
  const [dataStatus, setDataStatus] = useState("add");

  // const [selectDivision, setSelectDivision] = useState([]);
  const [selectedDivisionF, setSelectedDivisionF] = useState([{ label: "Semua", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedAwareness, setSelectedAwareness] = useState('');

  const [startDateTime, setStartDateTime] = useState(new Date());

  const [patientID, setPatientID] = useState('');
  const [patientData, setPatientData] = useState('');
  const [vitalSignsID, setVitalSignsID] = useState('');

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

  const onChange = (e) => {
    // console.log('e', e);

    if (e.name === 'kesadaran') {
      setVitalSigns(current => {
          return { ...current, kesadaran: e.value }
      })

      setSelectedAwareness(e);
    } else {
      setVitalSigns(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    // console.log('vitalSigns', vitalSigns);
  }

  const onVitalSignsSubmit = async (e) => {
    e.preventDefault();

    // console.log(vitalSigns);
    if(dataStatus === 'add' && vitalSigns.id_pasien) {
      try {
        const response = await vitalSignsAPI.add(vitalSigns);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah pra-konsultasi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah pra-konsultasi gagal: ${response.message}`,
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
    } else if(dataStatus === 'update' && vitalSigns.id_pasien && vitalSignsID) {
      try {
        const response = await vitalSignsAPI.update(vitalSigns, vitalSignsID);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Ubah pra-konsultasi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah pra-konsultasi gagal: ${response.message}`,
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

    setVitalSigns({
      id_pasien: '',
      keluhan: '',
      kesadaran: '',
      temperatur: 0,
      tinggi_badan: 0,
      berat_badan: 0,
      lingkar_perut: 0,
      imt: 0,
      sistole: 0,
      diastole: 0,
      respiratory_rate: 0,
      heart_rate: 0,
      catatan_tambahan: ''
    });
    
    setSelectedAwareness('');

    setPatientID('');
    setVitalSignsID('');
    setPatientData('');

    setDataStatus("add");
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
    e.preventDefault();
    resetForm(e);

    setPatientID(id);
    setPatientData(data);

    try {
      const res = await vitalSignsAPI.getByPatient("", `/${id}`);
      let data = res.data.data[0];

      // console.log(data);

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

      setVitalSignsID(data.id);
  
      setSelectedAwareness({kesadaran: data.kesadaran ? e.value : ''});
      setDataStatus("update");
      
      console.log(vitalSigns);
    } catch (e) {
      console.log(e);
      setDataStatus("add");
    }
    
    // console.log(dataStatus);
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

    if(dataStatus === "add" && vitalSigns.id_pasien === '') {
      setVitalSigns(current => {
        return { ...current, id_pasien: patientID }
      })
    }
    
  // }, [limit, searchName, sortBy, sortOrder, currentPage, queueAll, queueTotalPage, dataStatus, vitalSigns.id_pasien]);
  }, [limit, searchName, searchDivisi, sortBy, sortOrder, currentPage, dataStatus, vitalSigns.id_pasien]);

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
                      Poli / Divisi
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="divisi"
                      onChange={(e) => setSearchDivisi(e.value)}
                      // onChange={setSelectedDivision}
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
                          <tr key={data.id} onClick={(e) => getVitalSignsByPatientId(e, data.id, data)} style={{ cursor: 'pointer'}}>
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
                      {/* <tr>
                        <th scope="row" className="center-xy">1</th>
                        <td className="icon-column">
                          <i className="simple-icon-magnifier queue-icon"></i><br/>
                          <span className="queue-text">0001</span>
                        </td>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }}>Otto</h6>
                          Laki-laki, 32 Tahun
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs">
                            <i className="simple-icon-note"></i>
                          </Button>
                          {' '}
                          <Button color="warning" size="xs" className="button-xs">
                            <i className="simple-icon-drawer"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="center-xy">2</th>
                        <td className="icon-column">
                          <i className="simple-icon-magnifier queue-icon"></i><br/>
                          <span className="queue-text">0002</span>
                        </td>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }}>Jacob</h6>
                          Laki-laki, 26 Tahun
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs">
                            <i className="simple-icon-note"></i>
                          </Button>
                          {' '}
                          <Button color="warning" size="xs" className="button-xs">
                            <i className="simple-icon-drawer"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="center-xy">3</th>
                        <td className="icon-column">
                          <i className="simple-icon-magnifier queue-icon"></i><br/>
                          <span className="queue-text">0003</span>
                        </td>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }}>Larry</h6>
                          Laki-laki, 57 Tahun
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs">
                            <i className="simple-icon-note"></i>
                          </Button>
                          {' '}
                          <Button color="warning" size="xs" className="button-xs">
                            <i className="simple-icon-drawer"></i>
                          </Button>
                        </td>
                      </tr> */}
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
          <Card className="mb-8">
              <CardBody>
                <CardTitle>
                  <Row>
                    <Colxx sm="6" md="6" xl="6">
                    Form Registrasi Pra-Konsultasi {patientData ?
                    <>
                      <br/><br/>{patientData.nama_lengkap}<br/><p style={{ fontWeight: 'normal' }}>{patientData.jenis_kelamin.substring(0,1)}, {new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)}</p>
                    </> :
                    ''}
                    </Colxx>
                    <Colxx sm="6" md="6" xl="6">
                      <Label style={{ float: 'right', lineHeight: 3 }}>
                        {patientData ? <><br/><br/>{patientData.created_at}</> : 'Tanggal / Waktu' }
                        {/* {startDateTime} */}
                      </Label><br/>
                    </Colxx>
                  </Row>
                </CardTitle>
                <Form>
                  <FormGroup row>
                    {/* <Colxx sm={12}>
                      <FormGroup>
                        <Label for="tanggalRekam">
                          Tanggal / Waktu
                        </Label>
                        <DatePicker
                          selected={startDateTime}
                          onChange={setStartDateTime}
                          name="tanggalRekam"
                          id="tanggalRekam"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="d MMMM yyyy HH:mm"
                          readOnly={true}
                          timeCaption="Jam"
                          className="disabled-datepicker"
                        />
                      </FormGroup>
                    </Colxx> */}

                    {/* <Colxx sm={6}>
                      <FormGroup>
                        <Label for="noAntrian">
                          No. Antrian
                        </Label>
                        <Input
                          type="text"
                          name="noAntrian"
                          id="noAntrian"
                          placeholder="No. Antrian"
                          disabled={true}
                        />
                      </FormGroup>
                    </Colxx> */}

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
                          style={{minHeight: '100px'}}
                          value={vitalSigns.keluhan}
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="kesadaran">
                          Kesadaran<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kesadaran"
                          options={selectAwareness}
                          required
                          value={selectAwareness.find(item => item.value === vitalSigns.kesadaran) || ''}
                          // value={selectedAwareness}
                          onChange={onChange}
                          isSearchable={false}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="temperatur">
                          Temperatur<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="temperatur"
                            id="temperatur"
                            placeholder="Temperatur"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.temperatur}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append"><span className="input-group-text"><sup>0</sup>C</span></InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="tinggi_badan">
                          Tinggi Badan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="tinggi_badan"
                            id="tinggi_badan"
                            placeholder="Tinggi Badan"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.tinggi_badan}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append">cm</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="berat_badan">
                          Berat Badan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="berat_badan"
                            id="berat_badan"
                            placeholder="Berat Badan"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.berat_badan}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append">kg</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="lingkar_perut">
                          Lingkar Perut
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="lingkar_perut"
                            id="lingkar_perut"
                            placeholder="Lingkar Perut"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.lingkar_perut}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append">cm</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="sistole">
                          Tekanan Darah<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Row>
                          <Colxx xs={5} sm={5} className="responsive-mobile-vertical-xs-5">
                            <InputGroup>
                              <Input
                                type="number"
                                name="sistole"
                                id="sistole"
                                placeholder="Sistole"
                                // style={{ maxWidth: '75px' }}
                                required={true}
                                pattern="[0-9]*"
                                value={vitalSigns.sistole}
                                onChange={onChange}
                              />
                              <InputGroupAddon addonType="append">mmHg</InputGroupAddon>
                            </InputGroup>
                          </Colxx>
                          <Colxx xs={2} sm={1} className="responsive-mobile-vertical-xs-2" style={{ lineHeight: '2rem' }}>/</Colxx>
                          <Colxx xs={5} sm={5} className="responsive-mobile-vertical-xs-5">
                            <InputGroup>
                              <Input
                                type="number"
                                name="diastole"
                                id="diastole"
                                placeholder="Diastole"
                                // style={{ maxWidth: '75px' }}
                                required={true}
                                pattern="[0-9]*"
                                value={vitalSigns.diastole}
                                onChange={onChange}
                              />
                              <InputGroupAddon addonType="append">mmHg</InputGroupAddon>
                            </InputGroup>
                          </Colxx>
                        </Row>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="imt">
                          IMT<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="imt"
                            id="imt"
                            placeholder="IMT"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.imt}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append"><span className="input-group-text">kg/m<sup>2</sup></span></InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="respiratory_rate">
                          Tingkat Pernapasan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="respiratory_rate"
                            id="respiratory_rate"
                            placeholder="Tingkat Pernapasan"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.respiratory_rate}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append">/ menit</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="heart_rate">
                          Detak Jantung<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="heart_rate"
                            id="heart_rate"
                            placeholder="Detak Jantung"
                            required={true}
                            pattern="[0-9]*"
                            value={vitalSigns.heart_rate}
                            onChange={onChange}
                          />
                          <InputGroupAddon addonType="append">bpm</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="catatan_tambahan">
                          Catatan Tambahan
                        </Label>
                        <Input
                          type="textarea"
                          name="catatan_tambahan"
                          id="catatan_tambahan"
                          placeholder="Catatan Tambahan"
                          style={{minHeight: '100px'}}
                          value={vitalSigns.catatan_tambahan}
                          onChange={onChange}
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
                      <Button
                        type="button"
                        onClick={resetForm}
                        outline
                        color="danger"
                      >
                        Batal
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        color="primary"
                        onClick={(e) => onVitalSignsSubmit(e)}
                      >
                        Simpan
                      </Button>
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
export default VitalSigns;