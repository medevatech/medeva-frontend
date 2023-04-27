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

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedAwareness, setSelectedAwareness] = useState('');

  const [startDateTime, setStartDateTime] = useState(new Date());

  const [patientID, setPatientID] = useState('');
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
    if(dataStatus === 'add') {
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

          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah pra-konsultasi gagal: ${response.message}`,
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
      //   const response = await vitalSignsAPI.update(vitalSigns, vitalSignsID);
      //   // console.log(response);

      //   if (response.status == 200) {
      //     let data = await response.data.data;
      //     // console.log(data);

      //     Swal.fire({
      //       title: "Sukses!",
      //       html: `Ubah pra-konsultasi sukses`,
      //       icon: "success",
      //       confirmButtonColor: "#008ecc",
      //     });

      //     resetForm(e);
      //   } else {
      //     Swal.fire({
      //       title: "Gagal!",
      //       html: `Ubah pra-konsultasi gagal: ${response.message}`,
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

    setDataStatus("add");
  };

  const getQueue = async (params) => {
    try {
      const res = await queueAPI.get("", params);
      dispatch({type: "GET_QUEUE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_QUEUE", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    }
  };

  const getQueueById = async (e, id) => {
    e.preventDefault();
    resetForm(e);
    setDataStatus("update");

    try {
      const res = await queueAPI.get("", `/${id}`);
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
  
      setSelectedAwareness({kesadaran: data.kesadaran ? e.value : ''});

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

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

    // getQueue(params);
  }, [limit, search, sortBy, sortOrder, currentPage]);

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
                  {/* <Button
                    color="primary"
                    style={{ float: "right" }}
                    className="mb-4"
                    onClick={resetForm}
                  >
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
                    <tr>
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
                    </tr>
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
                  Form Registrasi Pra-Konsultasi
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
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
                    </Colxx>

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

                    <Colxx sm={6}>
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
                          value={vitalSigns.keluhan}
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
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
                          value={selectedAwareness}
                          onChange={onChange}
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