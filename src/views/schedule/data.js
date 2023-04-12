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
import Breadcrumb from 'containers/navs/Breadcrumb';

import CustomSelectInput from 'components/common/CustomSelectInput';

const selectDivision = [
  { label: 'Poli Umum', value: 'umum', key: 0 },
  { label: 'Poli Gigi', value: 'gigi', key: 1 }
];

const selectEmployee = [
  { label: 'John Doe', value: 'john', key: 0 },
  { label: 'Jane Doe', value: 'jane', key: 1 },
  { label: 'Josh Doe', value: 'josh', key: 2 },
  { label: 'Jack Doe', value: 'jack', key: 3 },
  { label: 'Janet Doe', value: 'janet', key: 4 },
];

const Data = ({ match }) => {
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle className="mb-4">
                  Data Jadwal
                  <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah Jadwal
                  </Button>
                </CardTitle>
                <FormGroup className="mt-4">
                  <Label for="jadwalCari">
                    Tanggal
                  </Label>
                  <Input
                    type="date"
                    name="jadwalCari"
                    id="jadwalCari"
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
                      <th>Nama</th>
                      <th>Peran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>1</th>
                      <td>Otto</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>2</th>
                      <td>Jacob</td>
                      <td>Doctor</td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: 'center'}}>3</th>
                      <td>Larry</td>
                      <td>Nurse</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
              <CardBody>
                <CardTitle>
                  Form Manajemen Jadwal
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="pegawai">
                          Karyawan / Tenaga Medis
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="pegawai"
                          value={selectedEmployee}
                          onChange={setSelectedEmployee}
                          options={selectEmployee}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
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
                    </Colxx>
                  </FormGroup>

                  <Row>
                    <Colxx sm={6}>
                      &nbsp;
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