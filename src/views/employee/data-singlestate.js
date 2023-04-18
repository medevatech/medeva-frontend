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

import auth from "api/authorization";
import Swal from "sweetalert2";

const selectRole = [
  // { label: 'Developer', value: 'DEVELOPER', key: 0 },
  // { label: 'Manager', value: 'MANAGER', key: 1 },
  { label: "Admin", value: "ADMIN", key: 2 },
  { label: "Resepsionis", value: "RESEPSIONIS", key: 3 },
  { label: "Perawat", value: "PERAWAT", key: 4 },
  { label: "Dokter", value: "DOKTER", key: 5 },
  { label: "Manajemen", value: "MANAJEMEN", key: 6 },
];

const selectDivision = [
  { label: "Poli Umum", value: "umum", key: 0 },
  { label: "Poli Gigi", value: "gigi", key: 1 },
];

const selectWP = [
  { label: "SIP", value: "SIP", key: 0 },
  { label: "STR", value: "STR", key: 1 },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Data = ({ match, history, loading, error }) => {
  const [ userLogin, setUserLogin ] = useState({
    username: "medeva1", nama: "Medeva Tech", email: "dev@medeva.tech1", password: "medeva123",
    is_dev: 0, is_manager: 0, is_admin: 0, is_resepsionis: 0, is_perawat: 0, is_dokter: 0, is_manajemen: 0,
    jenis_kelamin: "", nomor_kitas: "", tipe_izin: "", nomor_izin: "", kadaluarsa_izin: "",
    nomor_hp: "", tempat_lahir: "", tanggal_lahir: "",
    alamat: "", kode_pos: "", provinsi: "", kota: "", kecamatan: "", kelurahan: "",
    status_menikah: ""
  });

  // const [username, setUsername] = useState("medeva1");
  // const [nama, setNama] = useState("Medeva Tech");
  // const [email, setEmail] = useState("dev@medeva.tech1");
  // const [password, setPassword] = useState("medeva123");

  // const [is_dev, setIsDev] = useState(0);
  // const [is_manager, setIsManager] = useState(0);
  // const [is_admin, setIsAdmin] = useState(0);
  // const [is_resepsionis, setIsResepsionis] = useState(0);
  // const [is_perawat, setIsPerawat] = useState(0);
  // const [is_dokter, setIsDokter] = useState(0);
  // const [is_manajemen, setIsManajemen] = useState(0);

  // const [divisi, setDivisi] = useState("");
  // const [jenis_kelamin, setJenisKelamin] = useState("");
  // const [nomor_kitas, setNoKITAS] = useState("");
  // const [tipe_izin, setTipeIzin] = useState("");
  // const [nomor_izin, setNoIzin] = useState("");
  // const [kadaluarsa_izin, setKadaluarsaIzin] = useState("");
  // const [nomor_hp, setNoHP] = useState("");
  // const [tempat_lahir, setTempatLahir] = useState("");
  // const [tanggal_lahir, setTanggalLahir] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [kode_pos, setKodePos] = useState("");
  // const [provinsi, setProvinsi] = useState([]);
  // const [kota, setKota] = useState([]);
  // const [kecamatan, setKecamatan] = useState([]);
  // const [kelurahan, setKelurahan] = useState([]);
  // const [status_menikah, setStatus] = useState("");

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedWP, setSelectedWP] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const [selectProvince, setSelectProvince] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [selectSubdistrict, setSelectSubdistrict] = useState([]);
  const [selectWard, setSelectWard] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [employeeData, setEmployeeData] = useState([]);

  // const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("5");
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const handleChangeProv = (event) => {
    setSelectProvince(event);
    setProvinsi(event.value);
    changeKota(event.key);
  };

  const handleChangeCity = (event) => {
    setSelectCity(event);
    setKota(event.value);
    changeKecamatan(event.key);
  };

  const handleChangeSubdistrict = (event) => {
    setSelectSubdistrict(event);
    setKecamatan(event.value);
    changeKelurahan(event.key);
  };

  const handleChangeWard = (event) => {
    setSelectWard(event);
    setKelurahan(event.value);
  };

  const onLoadProvinsi = async () => {
    try {
      const response = await fetch(urlProvinsi);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        for (var i = 0; i < data.length; i++) {
          setSelectedProvince((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKota = async (id_prov) => {
    try {
      const response = await fetch(`${urlKabupaten}/${id_prov}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedCity([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedCity((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKecamatan = async (id_kota) => {
    try {
      const response = await fetch(`${urlKecamatan}/${id_kota}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedSubdistrict([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedSubdistrict((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKelurahan = async (id_kecamatan) => {
    try {
      const response = await fetch(`${urlKelurahan}/${id_kecamatan}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedWard([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedWard((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeGender = (e, jns) => {
    setJenisKelamin(jns);
    // console.log(e.target);
    // console.log(jns);
  };

  const handleChangeMarital = (e, nkh) => {
    setStatus(nkh);
    // setUserLogin(current) => {
    //   set
    // }
  };

  const handleChangePermissionType = (event) => {
    setSelectedWP(event);
    setTipeIzin(event.value);
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event); // is_dev, is_manager, is_admin, is_resepsionis, is_perawat, is_dokter, is_manajemen
    // console.log(event);

    for (var i = 0; i < event.length; i++) {
      if (event[i].value === "DEVELOPER") {
        setIsDev(1);
      } else if (event[i].value === "MANAGER") {
        setIsManager(1);
      } else if (event[i].value === "ADMIN") {
        setIsAdmin(1);
      } else if (event[i].value === "RESEPSIONIS") {
        setIsResepsionis(1);
      } else if (event[i].value === "PERAWAT") {
        setIsPerawat(1);
      } else if (event[i].value === "DOKTER") {
        setIsDokter(1);
      } else if (event[i].value === "MANAJEMEN") {
        setIsManajemen(1);
      } else {
        // setIsDev(0);
        // setIsManager(0);
        // setIsAdmin(0);
        // setIsResepsionis(0);
        // setIsPerawat(0);
        // setIsDokter(0);
        // setIsManajemen(0);
      }
    }
  };

  useEffect(() => {
    onLoadProvinsi();
  }, []);

  const onUserRegister = async (e) => {
    // if (email !== '' && password !== '') {
    //   history.push("./login");
    // }

    try {
      let data = {
        nama,
        username,
        email,
        password,
        is_dev,
        is_manager,
        is_admin,
        is_resepsionis,
        is_perawat,
        is_dokter,
        is_manajemen,
        jenis_kelamin,
        nomor_kitas,
        tipe_izin,
        nomor_izin,
        kadaluarsa_izin,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kode_pos,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        status_menikah,
      };
      console.log(data);

      const response = await auth.register(data);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah karyawan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        resetForm(e);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah karyawan gagal`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Error!",
        html: `Tambah karyawan gagal`,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    
    setUsername("");
    setNama("");
    setEmail("");
    setPassword("");
    setIsDev(0);
    setIsManager(0);
    setIsAdmin(0);
    setIsResepsionis(0);
    setIsPerawat(0);
    setIsDokter(0);
    setIsManajemen(0);
    setJenisKelamin("");
    setNoKITAS("");
    setTipeIzin("");
    setNoIzin("");
    setKadaluarsaIzin("");
    setNoHP("");
    setTempatLahir("");
    setTanggalLahir("");
    setAlamat("");
    setKodePos("");
    setProvinsi([]);
    setKota([]);
    setKecamatan([]);
    setKelurahan([]);
    setStatus("");
    setSelectedRole([]);
    // setSelectedDivision([]);
    setSelectedWP([]);
    setSelectedProvince([]);
    setSelectedCity([]);
    setSelectedSubdistrict([]);
    setSelectedWard([]);
    setSelectProvince([]);
    setSelectCity([]);
    setSelectSubdistrict([]);
    setSelectWard([]);

    onLoadProvinsi();
  };

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
    onLoadProvinsi();
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
                  onClick={resetForm}
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
                      <tr key={data.id}>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={nomor_kitas}
                        onChange={(e) => setNoKITAS(e.target.value)}
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
                        name="nama"
                        id="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
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
                        id="peran"
                        value={selectedRole}
                        // onChange={setSelectedRole}
                        options={selectRole}
                        onChange={(event) => handleChangeRole(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  {/* <Colxx sm={6}>
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
                  </Colxx> */}

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="alamat">Alamat</Label>
                      <Input
                        type="text"
                        name="alamat"
                        id="alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
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
                        value={kode_pos}
                        onChange={(e) => setKodePos(e.target.value)}
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
                        id="provinsi"
                        // value={selectedProvince}
                        // onChange={setSelectedProvince}
                        // options={selectProvince}
                        options={selectedProvince}
                        value={selectProvince}
                        onChange={(event) => handleChangeProv(event)}
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
                        id="kotakab"
                        // value={selectedCity}
                        // onChange={setSelectedCity}
                        // options={selectCity}
                        options={selectedCity}
                        value={selectCity}
                        onChange={(event) => handleChangeCity(event)}
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
                        id="kecamatan"
                        // value={selectedSubdistrict}
                        // onChange={setSelectedSubdistrict}
                        // options={selectSubdistrict}
                        options={selectedSubdistrict}
                        value={selectSubdistrict}
                        onChange={(event) => handleChangeSubdistrict(event)}
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
                        id="kelurahan"
                        // value={selectedWard}
                        // onChange={setSelectedWard}
                        // options={selectWard}
                        options={selectedWard}
                        value={selectWard}
                        onChange={(event) => handleChangeWard(event)}
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
                        value={nomor_hp}
                        onChange={(e) => setNoHP(e.target.value)}
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
                            value={jenis_kelamin}
                            onChange={(e) => handleChangeGender(e, "Laki-laki")}
                          />
                        </Colxx>
                        <Colxx sm={12} md={12} xl={8}>
                          <CustomInput
                            type="radio"
                            id="perempuan"
                            name="jenisKelamin"
                            label="Perempuan"
                            value={jenis_kelamin}
                            onChange={(e) => handleChangeGender(e, "Perempuan")}
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
                            value={status_menikah}
                            onChange={(e) => handleChangeMarital(e, "Menikah")}
                          />
                        </Colxx>
                        <Colxx sm={12} md={12} xl={8}>
                          <CustomInput
                            type="radio"
                            id="belumMenikah"
                            name="menikah"
                            label="Belum Menikah"
                            value={status_menikah}
                            onChange={(e) =>
                              handleChangeMarital(e, "Belum Menikah")
                            }
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
                        value={tempat_lahir}
                        onChange={(e) => setTempatLahir(e.target.value)}
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
                        value={tanggal_lahir}
                        onChange={(e) => setTanggalLahir(e.target.value)}
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
                        name="tipe_izin"
                        id="tipe_izin"
                        // value={selectedWP}
                        // onChange={setSelectedWP}
                        options={selectWP}
                        value={selectedWP}
                        onChange={(event) => handleChangePermissionType(event)}
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
                        value={nomor_izin}
                        onChange={(e) => setNoIzin(e.target.value)}
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
                        value={kadaluarsa_izin}
                        onChange={(e) => setKadaluarsaIzin(e.target.value)}
                      />
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <Row>
                  <Colxx sm={6}>
                    <Label>* Wajib diisi</Label>
                  </Colxx>
                  <Colxx sm={6} className="text-right">
                    <Button
                      type="submit"
                      onClick={resetForm}
                      outline
                      color="danger"
                    >
                      Batal
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      color="primary"
                      onClick={(e) => onUserRegister(e)}
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
export default Data;