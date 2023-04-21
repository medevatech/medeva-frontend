import React, { useState, useEffect } from "react";
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
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

import patientAPI from "api/patient";
import Swal from "sweetalert2";

const selectKITAS = [
  { label: "KTP", value: "KTP", key: 0 },
  { label: "SIM", value: "SIM", key: 1 },
  { label: "Paspor", value: "PASPOR", key: 2 },
];

const selectInsurance = [
  { label: "BPJS", value: "BPJS", key: 0, target: { name: "tipe_asuransi" } },
  { label: "Lainnya", value: "Lainnya", key: 1, target: { name: "tipe_asuransi" } },
];

const selectAllergy = [
  { label: "Alergi Obat", value: "Alergi Obat", key: 0, target: { name: "kategori" } },
  { label: "Alergi Makanan", value: "Alergi Makanan", key: 1, target: { name: "kategori" } },
  { label: "Alergi Kulit", value: "Alergi Kulit", key: 2, target: { name: "kategori" } },
  { label: "Alergi Debu", value: "Alergi Debu", key: 3, target: { name: "kategori" } },
  { label: "Lainnya", value: "Lainnya", key: 4, target: { name: "kategori" } },
];

const selectNationality = [
  { label: "WNI", value: "WNI", key: 0 },
  { label: "WNA", value: "WNA", key: 1 },
];

const selectMaritalStatus = [
  { label: "Kawin", value: "Kawin", key: 0 },
  { label: "Belum Kawin", value: "Belum Kawin", key: 1 },
  { label: "Cerai Hidup", value: "Cerai Hidup", key: 2 },
  { label: "Cerai Mati", value: "Cerai Mati", key: 3 },
];

const selectReligion = [
  { label: "Islam", value: "Islam", key: 0 },
  { label: "Protestan", value: "Protestan", key: 1 },
  { label: "Katolik", value: "Katolik", key: 2 },
  { label: "Hindu", value: "Hindu", key: 3 },
  { label: "Budha", value: "Budha", key: 4 },
];

const selectEmployment = [
  { label: "Belum/Tidak Bekerja", value: "Belum/Tidak Bekerja", key: 0 },
  { label: "Pegawai Negeri Sipil", value: "Pegawai Negeri Sipil", key: 1 },
  { label: "Tentara Nasional Indonesia", value: "Tentara Nasional Indonesia", key: 2 },
  { label: "Kepolisian RI", value: "Kepolisian RI", key: 3 },
  { label: "Karyawan BUMN", value: "Karyawan BUMN", key: 4 },
  { label: "Karyawan BUMD", value: "Karyawan BUMD", key: 5 },
  { label: "Anggota DPR-RI", value: "Anggota DPR-RI", key: 6 },
  { label: "Anggota DPD", value: "Anggota DPD", key: 7 },
  { label: "Anggota BPK", value: "Anggota BPK", key: 8 },
  { label: "Presiden", value: "Presiden", key: 9 },
  { label: "Wakil Presiden", value: "Wakil Presiden", key: 10 },
  { label: "Anggota MK", value: "Anggota MK", key: 11 },
  { label: "Anggota Kabinet/Kementerian", value: "Anggota Kabinet/Kementerian", key: 12 },
  { label: "Duta Besar", value: "Duta Besar", key: 13 },
  { label: "Gubernur", value: "Gubernur", key: 14 },
  { label: "Wakil Gubernur", value: "Wakil Gubernur", key: 15 },
  { label: "Bupati", value: "Bupati", key: 16 },
  { label: "Wakil Bupati", value: "Wakil Bupati", key: 17 },
  { label: "Walikota", value: "Walikota", key: 18 },
  { label: "Wakil Walikota", value: "Wakil Walikota", key: 19 },
  { label: "Anggota DPRD Provinsi", value: "Anggota DPRD Provinsi", key: 20 },
  { label: "Anggota DPRD Kabupaten/Kota", value: "Anggota DPRD Kabupaten/Kota", key: 21 },
  { label: "Pengacara", value: "Pengacara", key: 22 },
  { label: "Notaris", value: "Notaris", key: 23 },
  { label: "Peneliti", value: "Peneliti", key: 24 },
  { label: "Perangkat Desa", value: "Perangkat Desa", key: 25 },
  { label: "Kepala Desa", value: "Kepala Desa", key: 26 },
  { label: "Dosen", value: "Dosen", key: 27 },
  { label: "Guru", value: "Guru", key: 28 },
  { label: "Perdagangan", value: "Perdagangan", key: 29 },
  { label: "Industri", value: "Industri", key: 30 },
  { label: "Konstruksi", value: "Konstruksi", key: 31 },
  { label: "Transportasi", value: "Transportasi", key: 32 },
  { label: "Karyawan Swasta", value: "Karyawan Swasta", key: 33 },
  { label: "Karyawan Honorer", value: "Karyawan Honorer", key: 34 },
  { label: "Buruh Harian Lepas", value: "Buruh Harian Lepas", key: 35 },
  { label: "Pembantu Rumah Tangga", value: "Pembantu Rumah Tangga", key: 36 },
  { label: "Tukang Cukur", value: "Tukang Cukur", key: 37 },
  { label: "Tukang Listrik", value: "Tukang Listrik", key: 38 },
  { label: "Tukang Batu", value: "Tukang Batu", key: 39 },
  { label: "Tukang Kayu", value: "Tukang Kayu", key: 40 },
  { label: "Tukang Sol Sepatu", value: "Tukang Sol Sepatu", key: 41 },
  { label: "Tukang Las/Pandai Besi", value: "Tukang Las/Pandai Besi", key: 42 },
  { label: "Tukang Jahit", value: "Tukang Jahit", key: 43 },
  { label: "Tukang Gigi", value: "Tukang Gigi", key: 44 },
  { label: "Penata Rias", value: "Penata Rias", key: 45 },
  { label: "Penata Busana", value: "Penata Busana", key: 46 },
  { label: "Penata Rambut", value: "Penata Rambut", key: 47 },
  { label: "Mekanik", value: "Mekanik", key: 48 },
  { label: "Seniman", value: "Seniman", key: 49 },
  { label: "Tabib", value: "Tabib", key: 50 },
  { label: "Paraji", value: "Paraji", key: 51 },
  { label: "Perancang Busana", value: "Perancang Busana", key: 52 },
  { label: "Penterjemah", value: "Penterjemah", key: 53 },
  { label: "Wartawan", value: "Wartawan", key: 54 },
  { label: "Juru Masak", value: "Juru Masak", key: 55 },
  { label: "Promotor Acara", value: "Promotor Acara", key: 56 },
  { label: "Pilot", value: "Pilot", key: 57 },
  { label: "Arsitek", value: "Arsitek", key: 58 },
  { label: "Akuntan", value: "Akuntan", key: 59 },
  { label: "Konsultan", value: "Konsultan", key: 60 },
  { label: "Penyiar Televisi", value: "Penyiar Televisi", key: 61 },
  { label: "Penyiar Radio", value: "Penyiar Radio", key: 62 },
  { label: "Pelaut", value: "Pelaut", key: 63 },
  { label: "Sopir", value: "Sopir", key: 64 },
  { label: "Pialang", value: "Pialang", key: 65 },
  { label: "Paranormal", value: "Paranormal", key: 66 },
  { label: "Pedagang", value: "Pedagang", key: 67 },
  { label: "Wiraswasta", value: "Wiraswasta", key: 68 },
  { label: "Petani/Pekebun", value: "Petani/Pekebun", key: 69 },
  { label: "Peternak", value: "Peternak", key: 70 },
  { label: "Buruh Tani/Perkebunan Swasta", value: "Buruh Tani/Perkebunan Swasta", key: 71 },
  { label: "Buruh Peternakan", value: "Buruh Peternakan", key: 72 },
  { label: "Nelayan/Perikanan", value: "Nelayan/Perikanan", key: 73 },
  { label: "Buruh Nelayan/Perikanan", value: "Buruh Nelayan/Perikanan", key: 74 },
  { label: "Imam Masjid", value: "Imam Masjid", key: 75 },
  { label: "Pendeta", value: "Pendeta", key: 76 },
  { label: "Pastor", value: "Pastor", key: 77 },
  { label: "Ustadz/Mubaligh", value: "Ustadz/Mubaligh", key: 78 },
  { label: "Biarawati", value: "Biarawati", key: 79 },
  { label: "Pelajar/Mahasiswa", value: "Pelajar/Mahasiswa", key: 80 },
  { label: "Dokter", value: "Dokter", key: 81 },
  { label: "Bidan", value: "Bidan", key: 82 },
  { label: "Perawat", value: "Perawat", key: 83 },
  { label: "Apoteker", value: "Apoteker", key: 84 },
  { label: "Psikiater/Psikolog", value: "Psikiater/Psikolog", key: 85 },
  { label: "Pensiunan", value: "Pensiunan", key: 86 },
  { label: "Mengurus Rumah Tangga", value: "Mengurus Rumah Tangga", key: 87 },
  { label: "Lainnya", value: "Lainnya", key: 88 },
];

const selectBlood = [
  { label: "A-", value: "A-", key: 0 },
  { label: "A+", value: "A+", key: 1 },
  { label: "B-", value: "B-", key: 2 },
  { label: "B+", value: "B+", key: 3 },
  { label: "AB-", value: "AB-", key: 4 },
  { label: "AB+", value: "AB+", key: 5 },
  { label: "O-", value: "O-", key: 6 },
  { label: "O+", value: "O+", key: 7 },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const patientAll = useSelector(state => state.patient);
  const patientTotalPage = useSelector(state => state.patientTotalPage);

  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedKITAS, setSelectedKITAS] = useState("");

  const [selectedInsurance, setSelectedInsurance] = useState([{ label: ""}]);
  const [selectedAllergy, setSelectedAllergy] = useState([{ label: ""}]);

  const [selectProvince, setSelectProvince] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [selectSubdistrict, setSelectSubdistrict] = useState([]);
  const [selectWard, setSelectWard] = useState([]);
  
  const [tipe_kitas, setTipeKITAS] = useState("");
  const [nomor_kitas, setNomorKITAS] = useState("");

  const [nama_lengkap, setNamaLengkap] = useState("");
  const [nomor_hp, setNomorHP] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kode_pos, setKodePos] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("Laki-laki");
  
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [golongan_darah, setGolonganDarah] = useState("");
  const [status_menikah, setStatusMenikah] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [asuransi, setAsuransi] = useState([
    { id: Math.random(), tipe_asuransi: "", nomor_asuransi: "" }
  ]);

  const addInsuranceFields = () => {
    let newfieldInsurance = { id: Math.random(), tipe_asuransi: "", nomor_asuransi: "" };
    setAsuransi([...asuransi, newfieldInsurance]);

    let newfieldDropdownInsurance = { label: "" };
    setSelectedInsurance([...selectedInsurance, newfieldDropdownInsurance]);
  };

  const removeInsuranceFields = (id, index) => {
    let dataInsurance1 = [...asuransi];
    dataInsurance1.splice(index, 1);
    setAsuransi(dataInsurance1);
  };

  const handleInsuranceAdd = (index, event) => {
    let dataInsurance2 = [...asuransi]; let displaySelectInsurance = [...selectedInsurance];
    if (event.target.name === "tipe_asuransi"){
      dataInsurance2[index][event.target.name] = event.value;
      displaySelectInsurance[index]["label"] = event.value;
    } else {
      dataInsurance2[index][event.target.name] = event.target.value;
    }

    setAsuransi(dataInsurance2);
    setSelectedInsurance(displaySelectInsurance);

    // console.log("data", asuransi);
    // console.log("displaySelectInsurance", selectedInsurance);
  };

  const [alergi, setAlergi] = useState([
    { id: Math.random(), nama: "", kategori: "" }
  ]);

  const addAllergyFields = () => {
    let newfieldAllergy = { id: Math.random(), nama: "", kategori: "" };
    setAlergi([...alergi, newfieldAllergy]);

    let newfieldDropdownAllergy = { label: "" };
    setSelectedAllergy([...selectedAllergy, newfieldDropdownAllergy]);
  };

  const removeAllergyFields = (id, index) => {
    let dataAllergy1 = [...alergi];
    dataAllergy1.splice(index, 1);
    setAlergi(dataAllergy1);
  };

  const handleAllergyAdd = (index, event) => {
    let dataAllergy2 = [...alergi]; let displaySelectAllergy = [...selectedAllergy];
    if (event.target.name === "kategori"){
      dataAllergy2[index][event.target.name] = event.value;
      displaySelectAllergy[index]["label"] = event.value;
    } else {
      dataAllergy2[index][event.target.name] = event.target.value;
    }

    setAlergi(dataAllergy2);
    setSelectedAllergy(displaySelectAllergy);
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");

  const getPatient = async (params) => {
    try {
      const res = await patientAPI.get("", params);
      console.log(res);
      dispatch({type: "GET_PATIENT", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_PATIENT", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    }
  };

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

    getPatient(params);
    onLoadProvinsi();

  }, [limit, search, sortBy, sortOrder, page]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

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

  const handleChangeKITAS = (event) => {
    setSelectedKITAS(event);
    setNomorKITAS(event.value);
  };

  const handleChangeJK = (event) => {
    setJenisKelamin(event.target.value);
  };

  const handleChangeReligion = (event) => {
    setSelectedReligion(event);
    setAgama(event.value);
  };

  const handleChangeEmployment = (event) => {
    setSelectedEmployment(event);
    setPekerjaan(event.value);
  };

  const handleChangeBlood = (event) => {
    setSelectedBlood(event);
    setGolonganDarah(event.value);
  };

  const handleChangeMaritalStatus = (event) => {
    setSelectedMaritalStatus(event);
    setStatusMenikah(event.value);
  };

  const onPatientAdd = async (e) => {
    try {
      let data = {
        tipe_kitas,
        nomor_kitas,
        nama_lengkap,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kode_pos,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        agama,
        pekerjaan,
        golongan_darah,
        jenis_kelamin,
        status_menikah,
      };
      // console.log(data);

      const response = await patientAPI.add(data);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        resetForm(e);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah pasien gagal`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.statusCode}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: `Tambah pasien gagal`,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    
    setTipeKITAS("");
    setNomorKITAS("");
    setNamaLengkap("");
    setNomorHP("");
    setTempatLahir("");
    setTanggalLahir("");
    setAlamat("");
    setKodePos("");
    setAgama("");
    setPekerjaan("");
    setGolonganDarah("");
    setJenisKelamin("Laki-laki")
    setProvinsi("");
    setKota("");
    setKecamatan("");
    setKelurahan("");
    setStatusMenikah("");
    setSelectedMaritalStatus("");
    setSelectedReligion("");
    setSelectedNationality("");
    setSelectedEmployment("");
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedSubdistrict("");
    setSelectedWard("");
    setSelectedBlood("");
    setSelectProvince("");
    setSelectCity("");
    setSelectSubdistrict("");
    setSelectWard("");

    setAsuransi([{ id: Math.random(), tipe_asuransi: "", nomor_asuransi: "", target: { name: "tipe_asuransi" } }]);
    setAlergi([{ id: Math.random(), nama: "", kategori: "", target: { name: "kategori" } }]);

    onLoadProvinsi();
  };

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                Data Pasien
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  className="mb-4"
                  onClick={resetForm}
                >
                  Tambah
                </Button>
                <InputGroup className="mt-4">
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Pencarian"
                    onChange={(e) => setSearch(e.target.value)}
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
                    <th style={{ textAlign: "center", verticalAlign: 'middle' }}>#</th>
                    <th colSpan="1">Pasien</th>
                    <th style={{ textAlign: "center", width: '150px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {patientAll ? (
                    patientAll.map((data) => (
                      <tr key={data.id}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }}>{data.nama_lengkap}</h6>
                          {data.jenis_kelamin}, Umur<br/>
                          {data.tipe_kitas}, {data.nomor_hp}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs"
                            // onClick={}
                            >
                            <i className="simple-icon-note"></i>
                          </Button>
                          {' '}
                          <Button color="warning" size="xs"
                            // onClick={}
                            >
                            <i className="simple-icon-drawer"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <p>Loading data</p>
                      </td>
                    </tr>
                  )} */}
                  <tr>
                      <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                        1
                      </th>
                      <td>
                        <h6 style={{ fontWeight: 'bold' }}>Pasien A</h6>
                        Jenis Kelamin, Umur<br/>
                        Tipe KITAS, Nomor KITAS
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                        <Button color="secondary" size="xs">
                          <i className="simple-icon-note"></i>
                        </Button>
                        {' '}
                        <Button color="warning" size="xs">
                          <i className="simple-icon-drawer"></i>
                        </Button>
                      </td>
                    </tr>
                  <tr>
                      <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                        2
                      </th>
                      <td>
                        <h6 style={{ fontWeight: 'bold' }}>Pasien B</h6>
                        Jenis Kelamin, Umur<br/>
                        Tipe KITAS, Nomor KITAS
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                        <Button color="secondary" size="xs">
                          <i className="simple-icon-note"></i>
                        </Button>
                        {' '}
                        <Button color="warning" size="xs">
                          <i className="simple-icon-drawer"></i>
                        </Button>
                      </td>
                    </tr>
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPage={patientTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Form Manajemen Pasien</CardTitle>
              <Form>
                <FormGroup row>
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
                      <InputGroup>
                        <Select
                          addonType="prepend"
                          components={{ Input: CustomSelectInput }}
                          className="react-select select-KITAS"
                          classNamePrefix="react-select"
                          name="tipeKITAS"
                          value={selectedKITAS}
                          options={selectKITAS}
                          onChange={(event) => handleChangeKITAS(event)}
                        />
                        <Input
                          type="text"
                          name="noKITAS"
                          id="noKITAS"
                          placeholder="No. KITAS"
                          className="input-KITAS"
                          value={nomor_kitas}
                          onChange={(e) => setNomorKITAS(e.target.value)}
                        />
                      </InputGroup>
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
                        value={nama_lengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
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
                        <Colxx sm={6} md={4} xl={4}>
                          <CustomInput
                            type="radio"
                            id="laki"
                            name="jenisKelamin"
                            label="Laki-laki"
                            checked={jenis_kelamin === "Laki-laki"}
                            onChange={(e) => handleChangeJK(e)}
                          />
                        </Colxx>
                        <Colxx sm={6} md={8} xl={8}>
                          <CustomInput
                            type="radio"
                            id="perempuan"
                            name="jenisKelamin"
                            label="Perempuan"
                            checked={jenis_kelamin === "Perempuan"}
                            onChange={(e) => handleChangeJK(e)}
                          />
                        </Colxx>
                      </Row>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="noHP">No. HP</Label>
                      <Input
                        type="number"
                        name="noHP"
                        id="noHP"
                        placeholder="No. HP"
                        value={nomor_hp}
                        pattern="[0-9]*"
                        onChange={(e) => setNomorHP(e.target.value)}
                      />
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
                        placeholder="Tanggal Lahir"
                        value={tanggal_lahir}
                        onChange={(e) => setTanggalLahir(e.target.value)}
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
                        placeholder="Kode Pos"
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
                        options={selectedWard}
                        value={selectWard}
                        onChange={(event) => handleChangeWard(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="kewarganegaraan">Kewarganegaraan</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="kewarganegaraan"
                        options={selectNationality}
                        value={selectedNationality}
                        onChange={(event) => handleChangeNationality(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="agama">Agama</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="agama"
                        options={selectReligion}
                        value={selectedReligion}
                        onChange={(event) => handleChangeReligion(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="pekerjaan">Pekerjaan</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="pekerjaan"
                        options={selectEmployment}
                        value={selectedEmployment}
                        onChange={(event) => handleChangeEmployment(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="statusMenikah">Status Menikah</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="status_menikah"
                        options={selectMaritalStatus}
                        value={selectedMaritalStatus}
                        onChange={(event) => handleChangeMaritalStatus(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="golonganDarah">
                        Golongan Darah
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
                        name="golonganDarah"
                        options={selectBlood}
                        value={selectedBlood}
                        onChange={(event) => handleChangeBlood(event)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label style={{ lineHeight: '3' }}>Asuransi</Label>
                      <Button
                        color="primary"
                        style={{ float: "right" }}
                        className="mb-2"
                        onClick={addInsuranceFields}
                      >
                        Tambah
                      </Button>
                      {asuransi.map((input, index) => {
                        return (
                          <InputGroup
                            key={input.id}
                            className="input-group-insurance"
                          >
                            <Select
                              addonType="prepend"
                              components={{ Input: CustomSelectInput }}
                              className="react-select select-insurance"
                              classNamePrefix="react-select"
                              name="tipe_asuransi"
                              value={selectedInsurance.label}
                              options={selectInsurance}
                              onChange={(event) =>
                                handleInsuranceAdd(index, event)
                              }
                            />
                            <Input
                              type="text"
                              name="nomor_asuransi"
                              placeholder="No. Asuransi"
                              className="input-insurance"
                              value={input.nomor_asuransi}
                              onChange={(event) =>
                                handleInsuranceAdd(index, event)
                              }
                            />
                            {index > 0 && (
                              <Button
                                color="danger"
                                style={{ float: "right" }}
                                onClick={() =>
                                  removeInsuranceFields(input.id, index)
                                }
                                className="remove-insurance"
                              >
                                <i className="simple-icon-trash"></i>
                              </Button>
                            )}
                          </InputGroup>
                        );
                      })}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label style={{ lineHeight: '3' }}>Alergi</Label>
                      <Button
                        color="primary"
                        style={{ float: "right" }}
                        className="mb-2"
                        onClick={addAllergyFields}
                      >
                        Tambah
                      </Button>
                      {alergi.map((input, index) => {
                        return (
                          <InputGroup
                            key={input.id}
                            className="input-group-allergy"
                          >
                            <Select
                              addonType="prepend"
                              components={{ Input: CustomSelectInput }}
                              className="react-select select-allergy"
                              classNamePrefix="react-select"
                              name="kategori"
                              value={selectedAllergy.label}
                              options={selectAllergy}
                              onChange={(event) =>
                                handleAllergyAdd(index, event)
                              }
                            />
                            <Input
                              type="text"
                              name="nama"
                              placeholder="Nama Alergi"
                              className="input-allergy"
                              value={input.nama}
                              onChange={(event) =>
                                handleAllergyAdd(index, event)
                              }
                            />
                            {index > 0 && (
                              <Button
                                color="danger"
                                style={{ float: "right" }}
                                onClick={() =>
                                  removeAllergyFields(input.id, index)
                                }
                                className="remove-allergy"
                              >
                                <i className="simple-icon-trash"></i>
                              </Button>
                            )}
                          </InputGroup>
                        );
                      })}
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <Row>
                  <Colxx sm={6}>
                    <Label>* ) Wajib diisi</Label>
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
                      onClick={(e) => onPatientAdd(e)}
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