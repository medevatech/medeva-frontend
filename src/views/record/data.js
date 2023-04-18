import React, { useState } from 'react';
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

const selectVisitation = [
  { label: 'Meninggal', value: 'meninggal', key: 0 },
  { label: 'Berobat Jalan', value: 'berobat', key: 1 },
  { label: 'Rujuk', value: 'rujuk', key: 2 }
];

const selectPrognosa = [
  { label: 'Sanam (Sembuh)', value: 'sanam', key: 0 },
  { label: 'Bonam (Baik)', value: 'bonam', key: 1 },
  { label: 'Malam (Buruk/Jelek)', value: 'malam', key: 2 },
  { label: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', value: 'dubiasanam', key: 3 },
  { label: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', value: 'dubiamalam', key: 3 },
];

const selectType = [
  { label: 'Promotif', value: 'promotif', key: 0 },
  { label: 'Preventif', value: 'preventif', key: 1 },
  { label: 'Rawat Inap', value: 'ranap', key: 2 },
  { label: 'Rawat Jalan', value: 'rajal', key: 3 }
];

const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

const Data = ({ match }) => {
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedVisitation, setSelectedVisitation] = useState([]);
  const [selectedPrognosa, setSelectedPrognosa] = useState([]);

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(3);

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle className="mb-4">
                  Data Antrian
                  <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah
                  </Button>
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
                  Form Registrasi Rekam Medis
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={5}>
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

                    <Colxx sm={5}>
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

                    <Colxx sm={2}>
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

                    <Colxx sm={6}>
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

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="kll">
                          Kasus KLL
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

                    {/* <Colxx sm={12}>
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
                    </Colxx> */}
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
export default Data;