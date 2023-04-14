import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import axios from "axios";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

const selectRole = [
  { label: "Developer", value: "developer", key: 0 },
  { label: "Super Admin", value: "superAdmin", key: 1 },
  { label: "Admin", value: "admin", key: 2 },
  { label: "Resepsionis", value: "resepsionis", key: 3 },
  { label: "Perawat", value: "perawat", key: 4 },
  { label: "Dokter", value: "dokter", key: 5 },
  { label: "Manajemen", value: "manajemen", key: 6 },
];

const selectDivision = [
  { label: "Poli Umum", value: "umum", key: 0 },
  { label: "Poli Gigi", value: "gigi", key: 1 },
];

const selectWP = [
  { label: "SIP", value: "sip", key: 0 },
  { label: "STR", value: "str", key: 1 },
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

  const [employeeData, setEmployeeData] = useState([]);

  // const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("5");
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const getEmployee = async (url) => {
    try {
      const res = await axios.get(url);
      setEmployeeData(res.data.data.result);
      console.log("Get employee", res.data.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `https://medv.vercel.app/api/v1/karyawan`;
    if (limit !== "10") {
      url = `${url}?limit=${limit}`;
    } else {
      url = `${url}?limit=5`;
    }
    if (search !== "") {
      url = `${url}&searchName=${search}`;
    }
    if (currentPage !== "1") {
      url = `${url}&page=${currentPage}`;
    }
    getEmployee(url);
  }, [limit, search, sortBy, sortOrder, currentPage]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 5 + 1;
  }

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                Data Karyawan & Tenaga Kesehatan
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  className="mb-4"
                >
                  Tambah
                </Button>
                <InputGroup className="my-4">
                  <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Pencarian"
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  />
                  <InputGroupAddon addonType="append">
                    <Button outline color="theme-3" className="button-search">
                      <i className="simple-icon-magnifier"></i>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </CardTitle>
              <Table className="overflow-table-employee">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>No</th>
                    <th>ID</th>
                    <th>Nama</th>
                    <th style={{ textAlign: "center" }}>Username</th>
                    {/* <th style={{ textAlign: "center" }}>Email</th> */}
                  </tr>
                </thead>
                <tbody>
                  {employeeData ? (
                    employeeData.map((data) => (
                      <tr>
                        <th scope="row" style={{ textAlign: "center" }}>
                          {startNumber++}
                        </th>
                        <td>{data.id}</td>
                        <td>{data.nama}</td>
                        <td style={{ textAlign: "center" }}>{data.username}</td>
                        {/* <td style={{ textAlign: "center" }}>{data.email}</td> */}
                      </tr>
                    ))
                  ) : (
                    <>
                      <b2>Loading data</b2>
                    </>
                  )}
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
              <CardTitle>Form Manajemen Karyawan & Tenaga Kesehatan</CardTitle>
              <Form>
                <FormGroup row>
                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="username">
                        Username
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                      <Label for="email">Email</Label>
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
                        Password
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                        No. KITAS
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                        Nama Lengkap
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                        Peran
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                        Divisi
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                      <Label for="alamat">Alamat</Label>
                      <Input
                        type="textarea"
                        name="alamat"
                        id="alamat"
                        placeholder="Alamat"
                        style={{ minHeight: "100" }}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="kodePos">Kode Pos</Label>
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
                      <Label for="provinsi">Provinsi</Label>
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
                      <Label for="kotakab">Kota / Kabupaten</Label>
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
                      <Label for="kecamatan">Kecamatan</Label>
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
                      <Label for="kelurahan">Kelurahan</Label>
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
                      <Label for="noHP">No. HP</Label>
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
                        Jenis Kelamin
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                      <Label for="statusMenikah">Status Menikah</Label>
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
                      <Label for="tempatLahir">Tempat Lahir</Label>
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
                      <Label for="tanggalLahir">Tanggal Lahir</Label>
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
                        Tipe Izin
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
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
                        No. Izin
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                        Kadaluarsa Izin
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
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
                    <Label>* ) Wajib diisi</Label>
                  </Colxx>
                  <Colxx sm={6} className="text-right">
                    <Button outline color="danger">
                      Batal
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="primary">Simpan</Button>
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
