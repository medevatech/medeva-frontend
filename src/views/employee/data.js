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

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Pagination from 'components/common/Pagination';

import CustomSelectInput from 'components/common/CustomSelectInput';

const selectRole = [
  { label: 'Developer', value: 'developer', key: 0 },
  { label: 'Super Admin', value: 'superAdmin', key: 1 },
  { label: 'Admin', value: 'admin', key: 2 },
  { label: 'Receptionist', value: 'receptionist', key: 3 },
  { label: 'Nurse', value: 'nurse', key: 4 },
  { label: 'Doctor', value: 'doctor', key: 5 },
  { label: 'Management', value: 'management', key: 6 }
];

const selectDivision = [
  { label: 'Poli Umum', value: 'umum', key: 0 },
  { label: 'Poli Gigi', value: 'gigi', key: 1 }
];

const selectWP = [
  { label: 'SIP', value: 'sip', key: 0 },
  { label: 'STR', value: 'str', key: 1 },
];

const Data = ({ match }) => {

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedWP, setSelectedWP] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(3);

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Data Karyawan & Tenaga Kesehatan
                  <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah
                  </Button>
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
                </CardTitle>
                <Table>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'center'}}>#</th>
                      <th>ID</th>
                      <th>Nama</th>
                      <th style={{textAlign: 'center'}}>Username</th>
                      <th style={{textAlign: 'center'}}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>1</th>
                      <td>0001</td>
                      <td>Otto</td>
                      <td style={{textAlign: 'center'}}>ot2</td>
                      <td style={{textAlign: 'center'}}>ot2@medeva.tech</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>2</th>
                      <td>0002</td>
                      <td>Jacob</td>
                      <td style={{textAlign: 'center'}}>objac</td>
                      <td style={{textAlign: 'center'}}>objac@medeva.tech</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>3</th>
                      <td>0003</td>
                      <td>Larry</td>
                      <td style={{textAlign: 'center'}}>larry</td>
                      <td style={{textAlign: 'center'}}>larry@medeva.tech</td>
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
                  Form Manajemen Karyawan & Tenaga Kesehatan
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="username">
                          Username<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Username"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="password">
                          Password<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Colxx>
                    
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="noKITAS">
                          No. KITAS<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="noKITAS"
                          id="noKITAS"
                          placeholder="No. KITAS"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="namaLengkap">
                          Nama Lengkap<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="namaLengkap"
                          id="namaLengkap"
                          placeholder="Nama Lengkap"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="peran">
                          Peran<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="peran"
                          value={selectedRole}
                          onChange={setSelectedRole}
                          options={selectRole}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="divisi">
                          Divisi<span className="required text-danger" aria-required="true"> *</span>
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
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="alamat">
                          Alamat
                        </Label>
                        <Input
                          type="textarea"
                          name="alamat"
                          id="alamat"
                          placeholder="Alamat"
                          style={{minHeight: '100'}}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="kodePos">
                          Kode Pos
                        </Label>
                        <Input
                          type="text"
                          name="kodePos"
                          id="kodePos"
                          placeholder="Kode Pos"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="provinsi">
                          Provinsi
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="provinsi"
                          value={selectedProvince}
                          onChange={setSelectedProvince}
                          // options={selectNationality}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="kotakab">
                          Kota / Kabupaten
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kotakab"
                          value={selectedCity}
                          onChange={setSelectedCity}
                          // options={selectCity}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="kecamatan">
                          Kecamatan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kecamatan"
                          value={selectedSubdistrict}
                          onChange={setSelectedSubdistrict}
                          // options={selectSubdistrict}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="kelurahan">
                          Kelurahan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kelurahan"
                          value={selectedWard}
                          onChange={setSelectedWard}
                          // options={selectWard}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="noHP">
                          No. HP
                        </Label>
                        <Input
                          type="text"
                          name="noHP"
                          id="noHP"
                          placeholder="No. HP"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                      <Label for="jenisKelamin">
                        Jenis Kelamin<span className="required text-danger" aria-required="true"> *</span>
                      </Label>
                      <Row>
                        <Colxx sm={12} md={12} xl={4}>
                          <CustomInput
                            type="radio"
                            id="laki"
                            name="jenisKelamin"
                            label="Laki-laki"
                          />
                        </Colxx>
                        <Colxx sm={12} md={12} xl={8}>
                          <CustomInput
                            type="radio"
                            id="perempuan"
                            name="jenisKelamin"
                            label="Perempuan"
                          />
                        </Colxx>
                      </Row>
                      </FormGroup>
                    </Colxx>
                    
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="statusMenikah">
                          Status Menikah
                        </Label>
                        <Row>
                          <Colxx sm={12} md={12} xl={4}>
                            <CustomInput
                              type="radio"
                              id="menikah"
                              name="menikah"
                              label="Menikah"
                            />
                          </Colxx>
                          <Colxx sm={12} md={12} xl={8}>
                            <CustomInput
                              type="radio"
                              id="belumMenikah"
                              name="menikah"
                              label="Belum Menikah"
                            />
                          </Colxx>
                        </Row>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="tempatLahir">
                          Tempat Lahir
                        </Label>
                        <Input
                          type="text"
                          name="tempatLahir"
                          id="tempatLahir"
                          placeholder="Tempat Lahir"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="tanggalLahir">
                          Tanggal Lahir
                        </Label>
                        <Input
                          type="date"
                          name="tanggalLahir"
                          id="tanggalLahir"
                          placeholder="Tanggal Lahir"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="izin">
                          Tipe Izin<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="izin"
                          id="izin"
                          value={selectedWP}
                          onChange={setSelectedWP}
                          options={selectWP}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                    <FormGroup>
                        <Label for="noIzin">
                        No. Izin<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                        type="text"
                        name="noIzin"
                        id="noIzin"
                        placeholder="No. Izin"
                        />
                    </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="kadaluarsaIzin">
                          Kadaluarsa Izin<span className="required text-danger" aria-required="true"> *</span>
                        </Label>
                        <Input
                          type="date"
                          name="kadaluarsaIzin"
                          id="kadaluarsaIzin"
                          placeholder="Kadaluarsa Izin"
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
export default Data;