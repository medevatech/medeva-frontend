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

const selectReligion = [
  { label: 'Islam', value: 'islam', key: 0 },
  { label: 'Protestan', value: 'protestan', key: 1 },
  { label: 'Katolik', value: 'katolik', key: 2 },
  { label: 'Hindu', value: 'hindu', key: 3 },
  { label: 'Budha', value: 'budha', key: 4 }
];

const selectEmployment = [
  { label: 'Belum/Tidak Bekerja', value: 'belum', key: 0 },
  { label: 'Pegawai Negeri Sipil', value: 'pns', key: 1 },
  { label: 'Tentara Nasional Indonesia', value: 'tni', key: 2 },
  { label: 'Kepolisian RI', value: 'polisi', key: 3 },
  { label: 'Karyawan BUMN', value: 'bumn', key: 4 },
  { label: 'Karyawan BUMD', value: 'bumd', key: 5 },
  { label: 'Anggota DPR-RI', value: 'dpr', key: 6 },
  { label: 'Anggota DPD', value: 'dpd', key: 7 },
  { label: 'Anggota BPK', value: 'bpk', key: 8 },
  { label: 'Presiden', value: 'presiden', key: 9 },
  { label: 'Wakil Presiden', value: 'wapres', key: 10 },
  { label: 'Anggota MK', value: 'mk', key: 11 },
  { label: 'Anggota Kabinet/Kementerian', value: 'kabinet', key: 12 },
  { label: 'Duta Besar', value: 'dubes', key: 13 },
  { label: 'Gubernur', value: 'gubernur', key: 14 },
  { label: 'Wakil Gubernur', value: 'wagub', key: 15 },
  { label: 'Bupati', value: 'bupati', key: 16 },
  { label: 'Wakil Bupati', value: 'wabup', key: 17 },
  { label: 'Walikota', value: 'walikota', key: 18 },
  { label: 'Wakil Walikota', value: 'wawali', key: 19 },
  { label: 'Anggota DPRD Provinsi', value: 'dprdprov', key: 20 },
  { label: 'Anggota DPRD Kabupaten/Kota', value: 'dprdkotakab', key: 21 },
  { label: 'Pengacara', value: 'pengacara', key: 22 },
  { label: 'Notaris', value: 'notaris', key: 23 },
  { label: 'Peneliti', value: 'peneliti', key: 24 },
  { label: 'Perangkat Desa', value: 'prgdesa', key: 25 },
  { label: 'Kepala Desa', value: 'kades', key: 26 },
  { label: 'Dosen', value: 'dosen', key: 27 },
  { label: 'Guru', value: 'guru', key: 28 },
  { label: 'Perdagangan', value: 'perdagangan', key: 29 },
  { label: 'Industri', value: 'industri', key: 30 },
  { label: 'Konstruksi', value: 'konstruksi', key: 31 },
  { label: 'Transportasi', value: 'transportasi', key: 32 },
  { label: 'Karyawan Swasta', value: 'swasta', key: 33 },
  { label: 'Karyawan Honorer', value: 'honorer', key: 34 },
  { label: 'Buruh Harian Lepas', value: 'buruh', key: 35 },
  { label: 'Pembantu Rumah Tangga', value: 'prt', key: 36 },
  { label: 'Tukang Cukur', value: 'cukur', key: 37 },
  { label: 'Tukang Listrik', value: 'listrik', key: 38 },
  { label: 'Tukang Batu', value: 'batu', key: 39 },
  { label: 'Tukang Kayu', value: 'kayu', key: 40 },
  { label: 'Tukang Sol Sepatu', value: 'solsepatu', key: 41 },
  { label: 'Tukang Las/Pandai Besi', value: 'las', key: 42 },
  { label: 'Tukang Jahit', value: 'jahit', key: 43 },
  { label: 'Tukang Gigi', value: 'gigi', key: 44 },
  { label: 'Penata Rias', value: 'rias', key: 45 },
  { label: 'Penata Busana', value: 'tatabusana', key: 46 },
  { label: 'Penata Rambut', value: 'rambut', key: 47 },
  { label: 'Mekanik', value: 'mekanik', key: 48 },
  { label: 'Seniman', value: 'seniman', key: 49 },
  { label: 'Tabib', value: 'tabib', key: 50 },
  { label: 'Paraji', value: 'paraji', key: 51 },
  { label: 'Perancang Busana', value: 'rancangbusana', key: 52 },
  { label: 'Penterjemah', value: 'terjemah', key: 53 },
  { label: 'Wartawan', value: 'wartawan', key: 54 },
  { label: 'Juru Masak', value: 'masak', key: 55 },
  { label: 'Promotor Acara', value: 'promotor', key: 56 },
  { label: 'Pilot', value: 'pilot', key: 57 },
  { label: 'Arsitek', value: 'arsitek', key: 58 },
  { label: 'Akuntan', value: 'akuntan', key: 59 },
  { label: 'Konsultan', value: 'konsultan', key: 60 },
  { label: 'Penyiar Televisi', value: 'televisi', key: 61 },
  { label: 'Penyiar Radio', value: 'radio', key: 62 },
  { label: 'Pelaut', value: 'pelaut', key: 63 },
  { label: 'Sopir', value: 'sopir', key: 64 },
  { label: 'Pialang', value: 'pialang', key: 65 },
  { label: 'Paranormal', value: 'paranormal', key: 66 },
  { label: 'Pedagang', value: 'Pedagang', key: 67 },
  { label: 'Wiraswasta', value: 'wiraswasta', key: 68 },
  { label: 'Petani/Pekebun', value: 'petani', key: 69 },
  { label: 'Peternak', value: 'peternak', key: 70 },
  { label: 'Buruh Tani/Perkebunan Swasta', value: 'buruhtani', key: 71 },
  { label: 'Buruh Peternakan', value: 'buruhternak', key: 72 },
  { label: 'Nelayan/Perikanan', value: 'nelayan', key: 73 },
  { label: 'Buruh Nelayan/Perikanan', value: 'buruhnelayan', key: 74 },
  { label: 'Imam Masjid', value: 'imam', key: 75 },
  { label: 'Pendeta', value: 'pendeta', key: 76 },
  { label: 'Pastor', value: 'pastor', key: 77 },
  { label: 'Ustadz/Mubaligh', value: 'ustadz', key: 78 },
  { label: 'Biarawati', value: 'biarawati', key: 79 },
  { label: 'Pelajar/Mahasiswa', value: 'pelajar', key: 80 },
  { label: 'Dokter', value: 'dokter', key: 81 },
  { label: 'Bidan', value: 'bidan', key: 82 },
  { label: 'Perawat', value: 'perawat', key: 83 },
  { label: 'Apoteker', value: 'apoteker', key: 84 },
  { label: 'Psikiater/Psikolog', value: 'psikolog', key: 85 },
  { label: 'Pensiunan', value: 'pensiunan', key: 86 },
  { label: 'Mengurus Rumah Tangga', value: 'rumahtangga', key: 87 },
  { label: 'Lainnya', value: 'lainnya', key: 88 }
];

const selectBlood = [
  { label: 'A-', value: 'a-', key: 0 },
  { label: 'A+', value: 'a+', key: 1 },
  { label: 'B-', value: 'b-', key: 2 },
  { label: 'B+', value: 'b+', key: 3 },
  { label: 'AB-', value: 'ab-', key: 4 },
  { label: 'AB+', value: 'ab+', key: 5 },
  { label: 'O-', value: 'o-', key: 6 },
  { label: 'O+', value: 'o+', key: 7 }
];

const Data = ({ match }) => {
  const [selectedReligion, setSelectedReligion] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedBlood, setSelectedBlood] = useState([]);

  const [selectedNationality, setSelectedNationality] = useState([]);
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
                  Data Pasien
                  <Button color="primary" style={{float: 'right'}} className="mb-4">
                    Tambah
                  </Button>
                  
                  <InputGroup className="mt-4">
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
                  Form Manajemen Pasien
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="noKITAS">
                          No. KITAS
                        </Label>
                        <Input
                          type="text"
                          name="noKITAS"
                          id="noKITAS"
                          placeholder="No. KITAS"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="noAsuransi">
                          No. Asuransi
                        </Label>
                        <Input
                          type="text"
                          name="noAsuransi"
                          id="noAsuransi"
                          placeholder="No. Asuransi"
                        />
                      </FormGroup>
                    </Colxx>
                    
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="namaLengkap">
                          Nama Lengkap
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
                      <Label for="jenisKelamin">
                        Jenis Kelamin
                      </Label>
                      <Row>
                        <Colxx sm={6} md={4} xl={3}>
                          <CustomInput
                            type="radio"
                            id="laki"
                            name="jenisKelamin"
                            label="Laki-laki"
                          />
                        </Colxx>
                        <Colxx sm={6} md={8} xl={9}>
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

                    <Colxx sm={6}>
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
                          // options={selectProvince}
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

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="kewarganegaraan">
                          Kewarganegaraan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="kewarganegaraan"
                          value={selectedNationality}
                          onChange={setSelectedNationality}
                          // options={selectNationality}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="agama">
                          Agama
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="agama"
                          value={selectedReligion}
                          onChange={setSelectedReligion}
                          options={selectReligion}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="pekerjaan">
                          Pekerjaan
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="pekerjaan"
                          value={selectedEmployment}
                          onChange={setSelectedEmployment}
                          options={selectEmployment}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="statusMenikah">
                          Status Menikah
                        </Label>
                        <Row>
                          <Colxx md={12} xl={4}>
                            <CustomInput
                              type="radio"
                              id="menikah"
                              name="menikah"
                              label="Menikah"
                            />
                          </Colxx>
                          <Colxx md={12} xl={8}>
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

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="golonganDarah">
                          Golongan Darah
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="golonganDarah"
                          value={selectedBlood}
                          onChange={setSelectedBlood}
                          options={selectBlood}
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
