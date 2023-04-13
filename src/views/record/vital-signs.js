import React, { useState } from 'react';
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
  { label: 'Compos Mentis', value: 'composmentis', key: 0 },
  { label: 'Somnolence', value: 'somnolence', key: 1 },
  { label: 'Sopot', value: 'sopot', key: 2 },
  { label: 'Coma', value: 'coma', key: 3 },
];

const VitalSigns = ({ match }) => {
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [selectedAwareness, setSelectedAwareness] = useState([]);

  const [startDateTime, setStartDateTime] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(3);

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle className="mb-4">
                  Data Pasien
                  <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah
                  </Button>
                </CardTitle>
                <FormGroup className="mt-4">
                  <Label for="tanggalRekamCari">
                    Tanggal
                  </Label>
                  <Input
                    type="date"
                    name="tanggalRekamCari"
                    id="tanggalRekamCari"
                    placeholder="Tanggal"
                  />
                </FormGroup>
                <FormGroup className="mt-4">
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
                      <th style={{textAlign: 'center'}}>#</th>
                      <th>No. Antrian</th>
                      <th>Nama</th>
                      <th style={{textAlign: 'center'}}>Jenis Kelamin</th>
                      <th style={{textAlign: 'center'}}>Umur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>1</th>
                      <td>0001</td>
                      <td>Otto</td>
                      <td style={{textAlign: 'center'}}>Laki-laki</td>
                      <td style={{textAlign: 'center'}}>32</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>2</th>
                      <td>0002</td>
                      <td>Jacob</td>
                      <td style={{textAlign: 'center'}}>Laki-laki</td>
                      <td style={{textAlign: 'center'}}>26</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>3</th>
                      <td>0003</td>
                      <td>Larry</td>
                      <td style={{textAlign: 'center'}}>Laki-laki</td>
                      <td style={{textAlign: 'center'}}>57</td>
                    </tr>
                  </tbody>
                </Table>
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
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
                    <Colxx sm={6}>
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

                    <Colxx sm={6}>
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
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="pasien">
                          Pasien<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="pasien"
                          value={selectedPatient}
                          onChange={setSelectedPatient}
                          options={selectPatient}
                        />
                      </FormGroup>
                    </Colxx>

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
                          value={selectedAwareness}
                          onChange={setSelectedAwareness}
                          options={selectAwareness}
                          required
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
                          />
                          <InputGroupAddon addonType="append"><span className="input-group-text"><sup>0</sup>C</span></InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="tinggiBadan">
                          Tinggi Badan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="tinggiBadan"
                            id="tinggiBadan"
                            placeholder="Tinggi Badan"
                            required={true}
                          />
                          <InputGroupAddon addonType="append">cm</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="beratBadan">
                          Berat Badan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="beratBadan"
                            id="beratBadan"
                            placeholder="Berat Badan"
                            required={true}
                          />
                          <InputGroupAddon addonType="append">kg</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="lingkarPerut">
                          Lingkar Perut
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="lingkarPerut"
                            id="lingkarPerut"
                            placeholder="Lingkar Perut"
                            required={true}
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
                              />
                              <InputGroupAddon addonType="append">mmHg</InputGroupAddon>
                            </InputGroup>
                          </Colxx>
                        </Row>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="respiratory">
                          Tingkat Pernapasan<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="respiratory"
                            id="respiratory"
                            placeholder="Tingkat Pernapasan"
                            required={true}
                          />
                          <InputGroupAddon addonType="append">/menit</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="heart">
                          Detak Jantung<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="heart"
                            id="heart"
                            placeholder="Detak Jantung"
                            required={true}
                          />
                          <InputGroupAddon addonType="append">bpm</InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="catatan">
                          Catatan Tambahan
                        </Label>
                        <Input
                          type="textarea"
                          name="catatan"
                          id="catatan"
                          placeholder="Catatan Tambahan"
                          style={{minHeight: '100px'}}
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
            </Card>
          </Colxx>
        </Row>
    </>
  );
};
export default VitalSigns;