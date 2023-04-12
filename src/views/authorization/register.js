import React, { useState } from 'react';
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
} from 'reactstrap';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import { Colxx } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';

import UserLayout from 'layout/UserLayout';

const selectRole = [
  { label: 'Developer', value: 'developer', key: 0 },
  { label: 'Super Admin', value: 'superAdmin', key: 1 },
  { label: 'Admin', value: 'admin', key: 2 },
  { label: 'Receptionist', value: 'receptionist', key: 3 },
  { label: 'Nurse', value: 'nurse', key: 4 },
  { label: 'Doctor', value: 'doctor', key: 5 },
  { label: 'Management', value: 'management', key: 6 }
];

const selectWP = [
  { label: 'SIP', value: 'sip', key: 0 },
  { label: 'STR', value: 'str', key: 1 },
];

const Register = ({ history, loading, error }) => {
  const [username] = useState('medeva');
  const [namaLengkap] = useState('Medeva Tech');
  const [email] = useState('dev@medeva.tech');
  const [password] = useState('medeva123');

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedWP, setSelectedWP] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const onUserRegister = () => {
    if (email !== '' && password !== '') {
      history.push("./login");
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
                    Jika sudah terdaftar, silahkan melakukan{' '}
                    <NavLink to="/" className="yellowmedeva">
                        login.
                    </NavLink>
                    </p>
                </div>
                <div className="form-side">
                    <NavLink to="/" className="yellowmedeva">
                    <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                    Registrasi
                    </CardTitle>
                    <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Username
                        </Label>
                        <Input type="text" defaultValue={username} name="username" id="username" />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Email
                        </Label>
                        <Input type="email" defaultValue={email} name="email" id="email" />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Password
                        </Label>
                        <Input type="password" defaultValue={password} name="password" id="password" />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Peran
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="peran"
                          id="peran"
                          value={selectedRole}
                          onChange={setSelectedRole}
                          options={selectRole}
                        />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        No. KITAS
                        </Label>
                        <Input type="text" defaultValue="" name="noKITAS" id="noKITAS" />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Nama Lengkap
                        </Label>
                        <Input type="text" defaultValue={namaLengkap} name="namaLengkap" id="namaLengkap"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Alamat
                        </Label>
                        <Input type="text" defaultValue="" name="alamat" id="alamat"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Kode Pos
                        </Label>
                        <Input type="text" defaultValue="" name="kodePos" id="kodePos"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Provinsi
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="provinsi"
                          id="provinsi"
                          value={selectedProvince}
                          onChange={setSelectedProvince}
                          // options={selectProvince}
                        />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Kota / Kabupaten
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kotakab"
                          id="kotakab"
                          value={selectedCity}
                          onChange={setSelectedCity}
                          // options={selectCity}
                        />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Kecamatan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kecamatan"
                          id="kecamatan"
                          value={selectedSubdistrict}
                          onChange={setSelectedSubdistrict}
                          // options={selectSubdistrict}
                        />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Kelurahan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kelurahan"
                          id="kelurahan"
                          value={selectedWard}
                          onChange={setSelectedWard}
                          // options={selectWard}
                        />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        No. HP
                        </Label>
                        <Input type="text" defaultValue="" name="noHP" id="noHP"  />
                    </FormGroup>

                    <FormGroup className="form-group mb-4">
                        <Label style={{ fontSize: '80%', color: 'rgba(58, 58, 58, 0.7)' }}>
                        Jenis Kelamin
                        </Label>
                        <Row>
                          <Colxx md={4} xl={3}>
                            <CustomInput
                              type="radio"
                              id="laki"
                              name="jenisKelamin"
                              label="Laki-laki"
                            />
                          </Colxx>
                          <Colxx md={8} xl={9}>
                            <CustomInput
                              type="radio"
                              id="perempuan"
                              name="jenisKelamin"
                              label="Perempuan"
                            />
                          </Colxx>
                        </Row>
                    </FormGroup>

                    <FormGroup className="form-group mb-4">
                        <Label style={{ fontSize: '80%', color: 'rgba(58, 58, 58, 0.7)' }}>
                        Status Menikah
                        </Label>
                        <Row>
                          <Colxx md={4} xl={3}>
                            <CustomInput
                              type="radio"
                              id="menikah"
                              name="menikah"
                              label="Menikah"
                            />
                          </Colxx>
                          <Colxx md={8} xl={9}>
                            <CustomInput
                              type="radio"
                              id="belumMenikah"
                              name="menikah"
                              label="Belum Menikah"
                            />
                          </Colxx>
                        </Row>
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Tempat Lahir
                        </Label>
                        <Input type="text" defaultValue="" name="tempatLahir" id="tempatLahir"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Tanggal Lahir
                        </Label>
                        <Input type="date" defaultValue="" name="tanggalLahir" id="tanggalLahir"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Tipe Izin
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

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        No. Izin
                        </Label>
                        <Input type="text" defaultValue="" name="noIzin" id="noIzin"  />
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                        Kadaluarsa Izin
                        </Label>
                        <Input
                          type="date"
                          name="kadaluarsaIzin"
                          id="kadaluarsaIzin"
                          placeholder="Kadaluarsa Izin"
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
    const { loading, error } = authUser;
    return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
