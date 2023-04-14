import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Colxx } from "components/common/CustomBootstrap";
import CustomSelectInput from "components/common/CustomSelectInput";

import UserLayout from "layout/UserLayout";

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

const selectWP = [
  { label: "SIP", value: "SIP", key: 0 },
  { label: "STR", value: "STR", key: 1 },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Register = ({ history, loading, error }) => {
  const [username, setUsername] = useState("medeva1");
  const [nama, setNama] = useState("Medeva Tech");
  const [email, setEmail] = useState("dev@medeva.tech1");
  const [password, setPassword] = useState("medeva123");

  const [is_dev, setIsDev] = useState(0);
  const [is_manager, setIsManager] = useState(0);
  const [is_admin, setIsAdmin] = useState(0);
  const [is_resepsionis, setIsResepsionis] = useState(0);
  const [is_perawat, setIsPerawat] = useState(0);
  const [is_dokter, setIsDokter] = useState(0);
  const [is_manajemen, setIsManajemen] = useState(0);

  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [nomor_kitas, setNoKITAS] = useState("");
  const [tipe_izin, setTipeIzin] = useState("");
  const [nomor_izin, setNoIzin] = useState("");
  const [kadaluarsa_izin, setKadaluarsaIzin] = useState("");
  const [nomor_hp, setNoHP] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kode_pos, setKodePos] = useState("");
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [status_menikah, setStatus] = useState("");

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

  const onUserRegister = async (values) => {
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
      // console.log(data);

      const response = await auth.register(data);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Registrasi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Menuju login",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("./login");
          }
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Registrasi gagal`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Error!",
        html: `Login failed`,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Try again",
      });

      console.log(e);
    }
  };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MEDEVA</p>
              <p className="white mb-0">
                Gunakan form ini untuk registrasi akun. <br />
                Jika sudah terdaftar, silahkan melakukan{" "}
                <NavLink to="/" className="yellowmedeva">
                  login.
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <NavLink to="/" className="yellowmedeva">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">Registrasi</CardTitle>
              <Form>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Username
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Password
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Peran
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    No. KITAS
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Nama Lengkap
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Alamat</Label>
                  <Input
                    type="text"
                    name="alamat"
                    id="alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Kode Pos</Label>
                  <Input
                    type="text"
                    name="kodePos"
                    id="kodePos"
                    value={kode_pos}
                    onChange={(e) => setKodePos(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Provinsi</Label>
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Kota / Kabupaten</Label>
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Kecamatan</Label>
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Kelurahan</Label>
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>No. HP</Label>
                  <Input
                    type="text"
                    name="noHP"
                    id="noHP"
                    value={nomor_hp}
                    onChange={(e) => setNoHP(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group mb-4">
                  <Label
                    style={{ fontSize: "80%", color: "rgba(58, 58, 58, 0.7)" }}
                  >
                    Jenis Kelamin
                    <span className="required text-danger" aria-required="true">
                      {" "}
                      *
                    </span>
                  </Label>
                  <Row>
                    <Colxx md={4} xl={3}>
                      <CustomInput
                        type="radio"
                        id="laki"
                        name="jenisKelamin"
                        label="Laki-laki"
                        value={jenis_kelamin}
                        onChange={(e) => handleChangeGender(e, "Laki-laki")}
                      />
                    </Colxx>
                    <Colxx md={8} xl={9}>
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

                <FormGroup className="form-group mb-4">
                  <Label
                    style={{ fontSize: "80%", color: "rgba(58, 58, 58, 0.7)" }}
                  >
                    Status Menikah
                  </Label>
                  <Row>
                    <Colxx md={4} xl={3}>
                      <CustomInput
                        type="radio"
                        id="menikah"
                        name="menikah"
                        label="Menikah"
                        value={status_menikah}
                        onChange={(e) => handleChangeMarital(e, "Menikah")}
                      />
                    </Colxx>
                    <Colxx md={8} xl={9}>
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Tempat Lahir</Label>
                  <Input
                    type="text"
                    name="tempatLahir"
                    id="tempatLahir"
                    value={tempat_lahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Tanggal Lahir</Label>
                  <Input
                    type="date"
                    name="tanggalLahir"
                    id="tanggalLahir"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Tipe Izin
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    No. Izin
                    <span className="required text-danger" aria-required="true">
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

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    Kadaluarsa Izin
                    <span className="required text-danger" aria-required="true">
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

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => onUserRegister()}
                  >
                    DAFTAR
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

const mapStateToProps = ({ authUser }) => {
  // const { loading, error } = authUser;
  const { loading, error } = "";
  return { loading, error };
};

export default connect(mapStateToProps, {
  // registerUserAction: registerUser,
})(Register);
