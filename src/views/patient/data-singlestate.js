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
import insuranceAPI from "api/insurance";
import allergyAPI from "api/allergy";
import Swal from "sweetalert2";

const selectKITAS = [
  { label: "KTP", value: "KTP", key: 0, name: 'tipe_kitas' },
  { label: "SIM", value: "SIM", key: 1, name: 'tipe_kitas' },
  { label: "Paspor", value: "PASPOR", key: 2, name: 'tipe_kitas' },
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
  { label: "WNI", value: "WNI", key: 0, name: 'kewarganegaraan' },
  { label: "WNA", value: "WNA", key: 1, name: 'kewarganegaraan' },
];

const selectMaritalStatus = [
  { label: "Kawin", value: "Kawin", key: 0, name: 'status_menikah' },
  { label: "Belum Kawin", value: "Belum Kawin", key: 1, name: 'status_menikah' },
  { label: "Cerai Hidup", value: "Cerai Hidup", key: 2, name: 'status_menikah' },
  { label: "Cerai Mati", value: "Cerai Mati", key: 3, name: 'status_menikah' },
];

const selectReligion = [
  { label: "Islam", value: "Islam", key: 0, name: 'agama' },
  { label: "Protestan", value: "Protestan", key: 1, name: 'agama' },
  { label: "Katolik", value: "Katolik", key: 2, name: 'agama' },
  { label: "Hindu", value: "Hindu", key: 3, name: 'agama' },
  { label: "Budha", value: "Budha", key: 4, name: 'agama' },
];

const selectEmployment = [
  { label: "Belum/Tidak Bekerja", value: "Belum/Tidak Bekerja", key: 0, name: 'pekerjaan' },
  { label: "Pegawai Negeri Sipil", value: "Pegawai Negeri Sipil", key: 1, name: 'pekerjaan' },
  { label: "Tentara Nasional Indonesia", value: "Tentara Nasional Indonesia", key: 2, name: 'pekerjaan' },
  { label: "Kepolisian RI", value: "Kepolisian RI", key: 3, name: 'pekerjaan' },
  { label: "Karyawan BUMN", value: "Karyawan BUMN", key: 4, name: 'pekerjaan' },
  { label: "Karyawan BUMD", value: "Karyawan BUMD", key: 5, name: 'pekerjaan' },
  { label: "Anggota DPR-RI", value: "Anggota DPR-RI", key: 6, name: 'pekerjaan' },
  { label: "Anggota DPD", value: "Anggota DPD", key: 7, name: 'pekerjaan' },
  { label: "Anggota BPK", value: "Anggota BPK", key: 8, name: 'pekerjaan' },
  { label: "Presiden", value: "Presiden", key: 9, name: 'pekerjaan' },
  { label: "Wakil Presiden", value: "Wakil Presiden", key: 10, name: 'pekerjaan' },
  { label: "Anggota MK", value: "Anggota MK", key: 11, name: 'pekerjaan' },
  { label: "Anggota Kabinet/Kementerian", value: "Anggota Kabinet/Kementerian", key: 12, name: 'pekerjaan' },
  { label: "Duta Besar", value: "Duta Besar", key: 13, name: 'pekerjaan' },
  { label: "Gubernur", value: "Gubernur", key: 14, name: 'pekerjaan' },
  { label: "Wakil Gubernur", value: "Wakil Gubernur", key: 15, name: 'pekerjaan' },
  { label: "Bupati", value: "Bupati", key: 16, name: 'pekerjaan' },
  { label: "Wakil Bupati", value: "Wakil Bupati", key: 17, name: 'pekerjaan' },
  { label: "Walikota", value: "Walikota", key: 18, name: 'pekerjaan' },
  { label: "Wakil Walikota", value: "Wakil Walikota", key: 19, name: 'pekerjaan' },
  { label: "Anggota DPRD Provinsi", value: "Anggota DPRD Provinsi", key: 20, name: 'pekerjaan'  },
  { label: "Anggota DPRD Kabupaten/Kota", value: "Anggota DPRD Kabupaten/Kota", key: 21, name: 'pekerjaan'  },
  { label: "Pengacara", value: "Pengacara", key: 22, name: 'pekerjaan'  },
  { label: "Notaris", value: "Notaris", key: 23, name: 'pekerjaan'  },
  { label: "Peneliti", value: "Peneliti", key: 24, name: 'pekerjaan'  },
  { label: "Perangkat Desa", value: "Perangkat Desa", key: 25, name: 'pekerjaan'  },
  { label: "Kepala Desa", value: "Kepala Desa", key: 26, name: 'pekerjaan'  },
  { label: "Dosen", value: "Dosen", key: 27, name: 'pekerjaan'  },
  { label: "Guru", value: "Guru", key: 28, name: 'pekerjaan'  },
  { label: "Perdagangan", value: "Perdagangan", key: 29, name: 'pekerjaan'  },
  { label: "Industri", value: "Industri", key: 30, name: 'pekerjaan'  },
  { label: "Konstruksi", value: "Konstruksi", key: 31, name: 'pekerjaan'  },
  { label: "Transportasi", value: "Transportasi", key: 32, name: 'pekerjaan'  },
  { label: "Karyawan Swasta", value: "Karyawan Swasta", key: 33, name: 'pekerjaan'  },
  { label: "Karyawan Honorer", value: "Karyawan Honorer", key: 34, name: 'pekerjaan'  },
  { label: "Buruh Harian Lepas", value: "Buruh Harian Lepas", key: 35, name: 'pekerjaan'  },
  { label: "Pembantu Rumah Tangga", value: "Pembantu Rumah Tangga", key: 36, name: 'pekerjaan'  },
  { label: "Tukang Cukur", value: "Tukang Cukur", key: 37, name: 'pekerjaan'  },
  { label: "Tukang Listrik", value: "Tukang Listrik", key: 38, name: 'pekerjaan'  },
  { label: "Tukang Batu", value: "Tukang Batu", key: 39, name: 'pekerjaan'  },
  { label: "Tukang Kayu", value: "Tukang Kayu", key: 40, name: 'pekerjaan'  },
  { label: "Tukang Sol Sepatu", value: "Tukang Sol Sepatu", key: 41, name: 'pekerjaan'  },
  { label: "Tukang Las/Pandai Besi", value: "Tukang Las/Pandai Besi", key: 42, name: 'pekerjaan'  },
  { label: "Tukang Jahit", value: "Tukang Jahit", key: 43, name: 'pekerjaan'  },
  { label: "Tukang Gigi", value: "Tukang Gigi", key: 44, name: 'pekerjaan'  },
  { label: "Penata Rias", value: "Penata Rias", key: 45, name: 'pekerjaan'  },
  { label: "Penata Busana", value: "Penata Busana", key: 46, name: 'pekerjaan'  },
  { label: "Penata Rambut", value: "Penata Rambut", key: 47, name: 'pekerjaan'  },
  { label: "Mekanik", value: "Mekanik", key: 48, name: 'pekerjaan'  },
  { label: "Seniman", value: "Seniman", key: 49, name: 'pekerjaan'  },
  { label: "Tabib", value: "Tabib", key: 50, name: 'pekerjaan'  },
  { label: "Paraji", value: "Paraji", key: 51, name: 'pekerjaan'  },
  { label: "Perancang Busana", value: "Perancang Busana", key: 52, name: 'pekerjaan'  },
  { label: "Penterjemah", value: "Penterjemah", key: 53, name: 'pekerjaan'  },
  { label: "Wartawan", value: "Wartawan", key: 54, name: 'pekerjaan'  },
  { label: "Juru Masak", value: "Juru Masak", key: 55, name: 'pekerjaan'  },
  { label: "Promotor Acara", value: "Promotor Acara", key: 56, name: 'pekerjaan'  },
  { label: "Pilot", value: "Pilot", key: 57, name: 'pekerjaan'  },
  { label: "Arsitek", value: "Arsitek", key: 58, name: 'pekerjaan'  },
  { label: "Akuntan", value: "Akuntan", key: 59, name: 'pekerjaan'  },
  { label: "Konsultan", value: "Konsultan", key: 60, name: 'pekerjaan'  },
  { label: "Penyiar Televisi", value: "Penyiar Televisi", key: 61, name: 'pekerjaan'  },
  { label: "Penyiar Radio", value: "Penyiar Radio", key: 62, name: 'pekerjaan'  },
  { label: "Pelaut", value: "Pelaut", key: 63, name: 'pekerjaan'  },
  { label: "Sopir", value: "Sopir", key: 64, name: 'pekerjaan'  },
  { label: "Pialang", value: "Pialang", key: 65, name: 'pekerjaan'  },
  { label: "Paranormal", value: "Paranormal", key: 66, name: 'pekerjaan'  },
  { label: "Pedagang", value: "Pedagang", key: 67, name: 'pekerjaan'  },
  { label: "Wiraswasta", value: "Wiraswasta", key: 68, name: 'pekerjaan'  },
  { label: "Petani/Pekebun", value: "Petani/Pekebun", key: 69, name: 'pekerjaan'  },
  { label: "Peternak", value: "Peternak", key: 70, name: 'pekerjaan'  },
  { label: "Buruh Tani/Perkebunan Swasta", value: "Buruh Tani/Perkebunan Swasta", key: 71, name: 'pekerjaan'  },
  { label: "Buruh Peternakan", value: "Buruh Peternakan", key: 72, name: 'pekerjaan'  },
  { label: "Nelayan/Perikanan", value: "Nelayan/Perikanan", key: 73, name: 'pekerjaan'  },
  { label: "Buruh Nelayan/Perikanan", value: "Buruh Nelayan/Perikanan", key: 74, name: 'pekerjaan'  },
  { label: "Imam Masjid", value: "Imam Masjid", key: 75, name: 'pekerjaan'  },
  { label: "Pendeta", value: "Pendeta", key: 76, name: 'pekerjaan'  },
  { label: "Pastor", value: "Pastor", key: 77, name: 'pekerjaan'  },
  { label: "Ustadz/Mubaligh", value: "Ustadz/Mubaligh", key: 78, name: 'pekerjaan'  },
  { label: "Biarawati", value: "Biarawati", key: 79, name: 'pekerjaan'  },
  { label: "Pelajar/Mahasiswa", value: "Pelajar/Mahasiswa", key: 80, name: 'pekerjaan'  },
  { label: "Dokter", value: "Dokter", key: 81, name: 'pekerjaan'  },
  { label: "Bidan", value: "Bidan", key: 82, name: 'pekerjaan'  },
  { label: "Perawat", value: "Perawat", key: 83, name: 'pekerjaan'  },
  { label: "Apoteker", value: "Apoteker", key: 84, name: 'pekerjaan'  },
  { label: "Psikiater/Psikolog", value: "Psikiater/Psikolog", key: 85, name: 'pekerjaan'  },
  { label: "Pensiunan", value: "Pensiunan", key: 86, name: 'pekerjaan'  },
  { label: "Mengurus Rumah Tangga", value: "Mengurus Rumah Tangga", key: 87, name: 'pekerjaan'  },
  { label: "Lainnya", value: "Lainnya", key: 88, name: 'pekerjaan'  },
];

const selectBlood = [
  { label: "A-", value: "A-", key: 0, name: 'golongan_darah'  },
  { label: "A+", value: "A+", key: 1, name: 'golongan_darah'  },
  { label: "B-", value: "B-", key: 2, name: 'golongan_darah'  },
  { label: "B+", value: "B+", key: 3, name: 'golongan_darah'  },
  { label: "AB-", value: "AB-", key: 4, name: 'golongan_darah'  },
  { label: "AB+", value: "AB+", key: 5, name: 'golongan_darah'  },
  { label: "O-", value: "O-", key: 6, name: 'golongan_darah'  },
  { label: "O+", value: "O+", key: 7, name: 'golongan_darah'  },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const patientAll = useSelector(state => state.patient);
  const patientTotalPage = useSelector(state => state.patientTotalPage);
  const [dataStatus, setDataStatus] = useState("add");

  const [selectedKITAS, setSelectedKITAS] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const [selectProvince, setSelectProvince] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [selectSubdistrict, setSelectSubdistrict] = useState([]);
  const [selectWard, setSelectWard] = useState([]);

  const [selectedInsurance, setSelectedInsurance] = useState([{ label: ""}]);
  const [selectedAllergy, setSelectedAllergy] = useState([{ label: ""}]);

  const [patientID, setPatientID] = useState('');
  const [insuranceID, setInsuranceID] = useState('');
  const [allergyID, setAllergyID] = useState('');

  const [insurance, setInsurance] = useState({
    id_pasien: '',
    tipe_asuransi: '',
    nomor_asuransi: '',
  });

  const [selectInsurance, setSelectInsurance] = useState([
    { id: Math.random(), tipe_asuransi: "", nomor_asuransi: "" }
  ]);

  const addInsuranceFields = () => {
    let newfieldInsurance = { id: Math.random(), tipe_asuransi: "", nomor_asuransi: "" };
    setSelectInsurance([...selectInsurance, newfieldInsurance]);

    let newfieldDropdownInsurance = { label: "" };
    setSelectedInsurance([...selectedInsurance, newfieldDropdownInsurance]);
  };

  const removeInsuranceFields = (id, index) => {
    let dataInsurance1 = [...selectInsurance];
    dataInsurance1.splice(index, 1);
    setSelectInsurance(dataInsurance1);
  };

  const handleInsuranceAdd = (index, event) => {
    let dataInsurance2 = [...selectInsurance]; let displaySelectInsurance = [...selectedInsurance];
    if (event.target.name === "tipe_asuransi"){
      dataInsurance2[index][event.target.name] = event.value;
      displaySelectInsurance[index]["label"] = event.value;
    } else {
      dataInsurance2[index][event.target.name] = event.target.value;
    }

    setSelectInsurance(dataInsurance2);
    setSelectedInsurance(displaySelectInsurance);

    // console.log("data", selectInsurance);
    // console.log("displaySelectInsurance", selectedInsurance);
  };

  const [allergy, setAllergy] = useState({
    id_pasien: '',
    id_alergi: '',
    id_kunjungan_dicatat: '',
    id_kunjungan_dihapus: ''
  });

  const [selectAllergy, setSelectAlergi] = useState([
    { id: Math.random(), nama: "", kategori: "" }
  ]);

  const addAllergyFields = () => {
    let newfieldAllergy = { id: Math.random(), nama: "", kategori: "" };
    setSelectAlergi([...selectAllergy, newfieldAllergy]);

    let newfieldDropdownAllergy = { label: "" };
    setSelectedAllergy([...selectedAllergy, newfieldDropdownAllergy]);
  };

  const removeAllergyFields = (id, index) => {
    let dataAllergy1 = [...selectAllergy];
    dataAllergy1.splice(index, 1);
    setSelectAlergi(dataAllergy1);
  };

  const handleAllergyAdd = (index, event) => {
    let dataAllergy2 = [...selectAllergy]; let displaySelectAllergy = [...selectedAllergy];
    if (event.target.name === "kategori"){
      dataAllergy2[index][event.target.name] = event.value;
      displaySelectAllergy[index]["label"] = event.value;
    } else {
      dataAllergy2[index][event.target.name] = event.target.value;
    }

    setSelectAlergi(dataAllergy2);
    setSelectedAllergy(displaySelectAllergy);
  };

  const [patient, setPatient] = useState({
    tipe_kitas: '',
    nomor_kitas: '',
    nama_lengkap: '',
    nomor_hp: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    kode_pos: '',
    jenis_kelamin: '',
    kewarganegaraan: '',
    agama: '',
    pekerjaan: '',
    golongan_darah: '',
    status_menikah: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
  });

  const [ editAddress, setEditAddress ] = useState({
    status: 0,
    nama_kota: '',
    nama_kecamatan: '',
    nama_kelurahan: ''
  });

  const [ processPatient, setProcessPatient ] = useState(0);

  const onLoadProvinsi = async () => {
    try {
      const response = await fetch(urlProvinsi);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        for (var i = 0; i < data.length; i++) {
          setSelectedProvince((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id, name: 'provinsi' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKota = async (id_prov, eA = null) => {
    try {
      const response = await fetch(`${urlKabupaten}/${id_prov}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedCity([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedCity((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id, name: 'kota' },
          ]);
        }

        if(eA) {
          setEditAddress(current => {
              return { ...current, status: 2 }
          })
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKecamatan = async (id_kota, eA = null) => {
    try {
      const response = await fetch(`${urlKecamatan}/${id_kota}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedSubdistrict([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedSubdistrict((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id, name: 'kecamatan' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }

      if(eA) {
        setEditAddress(current => {
            return { ...current, status: 3 }
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeKelurahan = async (id_kecamatan, eA = null) => {
    try {
      const response = await fetch(`${urlKelurahan}/${id_kecamatan}.json`);
      // console.log(response);

      if (response.ok) {
        let data = await response.json();
        setSelectedWard([]);
        for (var i = 0; i < data.length; i++) {
          setSelectedWard((current) => [
            ...current,
            { label: data[i].nama, value: data[i].nama, key: data[i].id, name: 'kelurahan' },
          ]);
        }

        if(eA) {
          setEditAddress(current => {
              return { ...current, status: 4 }
          })
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    console.log('e', e);

    if (e.length > 0) {
      for (var i = 0; i < e.length; i++) {
        console.log('e = ' + i);
      }

    //   setSelectedRole(e);
      // setSelectedRole(Array.isArray(e) ? e.map(x => x.value) : []);

      // console.log('selectedRole onChange', selectedRole);
    } else {
      if (e.name === 'provinsi') {
        setPatient(current => {
            return { ...current, provinsi: e ? e.value : ''}
        })
        setSelectProvince(e); changeKota(e.key, "");
      } else if (e.name === 'kota') {
        setPatient(current => {
            return { ...current, kota: e ? e.value : ''}
        })
        setSelectCity(e); changeKecamatan(e.key);
      } else if (e.name === 'kecamatan') {
        setPatient(current => {
            return { ...current, kecamatan: e ? e.value : ''}
        })
        setSelectSubdistrict(e); changeKelurahan(e.key);
      } else if (e.name === 'kelurahan') {
        setPatient(current => {
            return { ...current, kelurahan: e ? e.value : ''}
        })
        setSelectWard(e);
      } else if (e.name === 'tipe_kitas') {
        setPatient(current => {
            return { ...current, tipe_kitas: e ? e.value : ''}
        })
      } else if (e.name === 'kewarganegaraan') {
        setPatient(current => {
            return { ...current, kewarganegaraan: e ? e.value : ''}
        })
      } else if (e.name === 'agama') {
        setPatient(current => {
            return { ...current, agama: e ? e.value : ''}
        })
      } else if (e.name === 'pekerjaan') {
        setPatient(current => {
            return { ...current, pekerjaan: e ? e.value : ''}
        })
      } else if (e.name === 'status_menikah') {
        setPatient(current => {
            return { ...current, status_menikah: e ? e.value : ''}
        })
      } else if (e.name === 'golongan_darah') {
        setPatient(current => {
            return { ...current, golongan_darah: e ? e.value : ''}
        })
      } else {
        if (e.target.name && e.target.name === 'jenis_kelamin') {
          if(e.target.id === 'laki') {
            setPatient(current => {
              return { ...current, jenis_kelamin: 'Laki-laki' }
            })
          } else if(e.target.id === 'perempuan') {
            setPatient(current => {
              return { ...current, jenis_kelamin: 'Perempuan' }
            })
          }
        } else if (e.target.name && e.target.name !== 'jenis_kelamin') {
          setPatient(current => {
              return { ...current, [e.target.name]: e.target.value }
          })
        } else {
          console.log(e);
        }
      }
    }

    console.log('patient', patient);
  }

  const onInsuranceSubmit = async (e, status = 0) => {
    e.preventDefault();

    if(dataStatus === 'add') {
      try {
        const response = await insuranceAPI.add(insurance);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah asuransi pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          if(status) {
            setProcessPatient(2)
          }

          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah asuransi pasien gagal`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await insuranceAPI.update(insurance, insuranceID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah asuransi pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          if(status) {
            setProcessPatient(2)
          }
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah asuransi pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else {
      console.log('dataStatus undefined')
    }
  }

  const onAllergySubmit = async (e, status = 0) => {
    e.preventDefault();

    if(dataStatus === 'add') {
      try {
        const response = await allergyAPI.add(allergy);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah asuransi pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          if(status) {
            setProcessPatient(3)
          }

          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah asuransi pasien gagal`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await allergyAPI.update(allergy, allergyID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah alergi pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          if(status) {
            setProcessPatient(3)
          }
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah alergi pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else {
      console.log('dataStatus undefined')
    }
  }

  const onPatientSubmit = async (e) => {
    e.preventDefault();

    if(dataStatus === 'add') {
      try {
        const response = await patientAPI.add(patient);
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

          setPatientID(data.id);
          setProcessPatient(1);

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
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await patientAPI.update(patient, patientID);
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

          setPatientID(data.id);
          setProcessPatient(1);
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    
    setPatient({
      tipe_kitas: '',
      nomor_kitas: '',
      nama_lengkap: '',
      nomor_hp: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      alamat: '',
      kode_pos: '',
      jenis_kelamin: '',
      kewarganegaraan: '',
      agama: '',
      pekerjaan: '',
      golongan_darah: '',
      status_menikah: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
    });

    setSelectedMaritalStatus("");
    setSelectedReligion("");
    setSelectedNationality("");
    setSelectedEmployment("");
    setSelectedBlood("");
    setSelectedKITAS("");

    setSelectedProvince([]);
    setSelectedCity([]);
    setSelectedSubdistrict([]);
    setSelectedWard([]);
    setSelectProvince([]);
    setSelectCity([]);
    setSelectSubdistrict([]);
    setSelectWard([]);

    setSelectInsurance([{ id: Math.random(), tipe_asuransi: "", nomor_asuransi: "", target: { name: "tipe_asuransi" } }]);
    setSelectAlergi([{ id: Math.random(), nama: "", kategori: "", target: { name: "kategori" } }]);

    setDataStatus("add");
    onLoadProvinsi();
  };

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

  const getPatientById = async (e, id) => {
    e.preventDefault();
    resetForm(e);
    setDataStatus("update");

    try {
      const res = await patientAPI.get("", id);
      let data = res.data.data.result[0];

      // console.log(data);

      setPatientID(data.id);
      setPatient({
        tipe_kitas: data.tipe_kitas,
        nomor_kitas: data.nomor_kitas,
        nama_lengkap: data.nama_lengkap,
        nomor_hp: data.nomor_hp,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: data.tanggal_lahir.substring(0, 10),
        alamat: data.alamat,
        kode_pos: data.kode_pos,
        jenis_kelamin: data.jenis_kelamin,
        kewarganegaraan: data.kewarganegaraan,
        agama: data.agama,
        pekerjaan: data.pekerjaan,
        golongan_darah: data.golongan_darah,
        status_menikah: data.status_menikah,
        provinsi: data.provinsi,
        kota: data.kota,
        kecamatan: data.kecamatan,
        kelurahan: data.kelurahan,
      });

      console.log(patient);

      setSelectedMaritalStatus({spesialis: data.status_menikah ? e.value : ''});
      setSelectedReligion({agama: data.agama ? e.value : ''});
      setSelectedNationality({kewarganegaraan: data.kewarganegaraan ? e.value : ''});
      setSelectedEmployment({pekerjaan: data.pekerjaan ? e.value : ''});
      setSelectedBlood({golongan_darah: data.golongan_darah ? e.value : ''});
      setSelectedKITAS({tipe_kitas: data.tipe_kitas ? e.value : ''});
      setSelectedGender(data.jenis_kelamin);

      setSelectProvince({provinsi: data.provinsi ? e.value : ''});
      setSelectCity({kota: data.kota ? e.value : ''});
      setSelectSubdistrict({kecamatan: data.kecamatan ? e.value : ''});
      setSelectWard({kelurahan: data.kelurahan ? e.value : ''});

      setEditAddress(current => {
        return { ...current,
          status: 1,
          nama_kota: data.kota,
          nama_kecamatan: data.kecamatan,
          nama_kelurahan: data.kelurahan
        }
      })

      let id_provinsi = selectedProvince.find(item => item.value === data.provinsi).key;
      changeKota(id_provinsi, editAddress);
    } catch (e) {
      console.log(e);
    }

    console.log(dataStatus);
  };

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let params = "";
    
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (search !== "") {
      params = `${params}&searchName=${search}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    getPatient(params);
    onLoadProvinsi();

    if(selectedCity.length > 0 && editAddress.status === 2) {
      let id_kota = selectedCity.find(item => item.value === editAddress.nama_kota).key;
      changeKecamatan(id_kota, editAddress);
    }

    if(selectedSubdistrict.length > 0 && editAddress.status === 3) {
      let id_kecamatan = selectedSubdistrict.find(item => item.value === editAddress.nama_kecamatan).key;
      changeKelurahan(id_kecamatan, editAddress);
    }

    if(setSelectInsurance.length > 0 && processPatient === 1) {
      onInsuranceSubmit();
    }

    if(setSelectedAllergy.length > 0 && processPatient === 2) {
      onAllergySubmit();
    }

  }, [limit, search, sortBy, sortOrder, currentPage, editAddress, processPatient]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");

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
                          <Button color="secondary" size="xs" className="button-xs"
                            // onClick={(e) => getEmployeeById(e, data.id)}
                            >
                            <i className="simple-icon-note"></i>
                          </Button>
                          {' '}
                          <Button color="warning" size="xs" className="button-xs"
                            // onClick={}
                            >
                            <i className="simple-icon-drawer"></i>
                          </Button>
                          {' '}
                          <Button color="danger" size="xs" className="button-xs"
                            // onClick={}
                            >
                            <i className="simple-icon-trash"></i>
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
                        <Button color="secondary" size="xs" className="button-xs"
                          // onClick={(e) => getEmployeeById(e, data.id)}
                          >
                          <i className="simple-icon-note"></i>
                        </Button>
                        {' '}
                        <Button color="warning" size="xs" className="button-xs"
                          // onClick={}
                          >
                          <i className="simple-icon-drawer"></i>
                        </Button>
                        {' '}
                        <Button color="danger" size="xs" className="button-xs"
                          // onClick={}
                          >
                          <i className="simple-icon-trash"></i>
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
                        <Button color="secondary" size="xs" className="button-xs"
                          // onClick={(e) => getEmployeeById(e, data.id)}
                          >
                          <i className="simple-icon-note"></i>
                        </Button>
                        {' '}
                        <Button color="warning" size="xs" className="button-xs"
                          // onClick={}
                          >
                          <i className="simple-icon-drawer"></i>
                        </Button>
                        {' '}
                        <Button color="danger" size="xs" className="button-xs"
                          // onClick={}
                          >
                          <i className="simple-icon-trash"></i>
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
                      <Label for="nomor_kitas">
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
                          name="tipe_kitas"
                          value={selectKITAS.find(item => item.value === patient.tipe_kitas) || ''}
                          options={selectKITAS}
                          onChange={onChange}
                        />
                        <Input
                          type="text"
                          name="nomor_kitas"
                          id="nomor_kitas"
                          placeholder="No. KITAS"
                          className="input-KITAS"
                          value={patient.nomor_kitas}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="nama_lengkap">
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
                        name="nama_lengkap"
                        id="nama_lengkap"
                        placeholder="Nama Lengkap"
                        value={patient.nama_lengkap}
                        onChange={onChange}
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
                            name="jenis_kelamin"
                            label="Laki-laki"
                            checked={patient.jenis_kelamin === 'Laki-laki'}
                            value={selectedGender}
                            onChange={onChange}
                          />
                        </Colxx>
                        <Colxx sm={6} md={8} xl={8}>
                          <CustomInput
                            type="radio"
                            id="perempuan"
                            name="jenis_kelamin"
                            label="Perempuan"
                            checked={patient.jenis_kelamin === 'Perempuan'}
                            value={selectedGender}
                            onChange={onChange}
                          />
                        </Colxx>
                      </Row>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="nomor_hp">No. HP</Label>
                      <Input
                        type="number"
                        name="nomor_hp"
                        id="nomor_hp"
                        placeholder="No. HP"
                        value={patient.nomor_hp}
                        pattern="[0-9]*"
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="tempat_lahir">Tempat Lahir</Label>
                      <Input
                        type="text"
                        name="tempat_lahir"
                        id="tempat_lahir"
                        placeholder="Tempat Lahir"
                        value={patient.tempat_lahir}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="tanggal_lahir">Tanggal Lahir</Label>
                      <Input
                        type="date"
                        name="tanggal_lahir"
                        id="tanggal_lahir"
                        placeholder="Tanggal Lahir"
                        value={patient.tanggal_lahir}
                        onChange={onChange}
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
                        value={patient.alamat}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="kode_pos">Kode Pos</Label>
                      <Input
                        type="text"
                        name="kode_pos"
                        id="kode_pos"
                        placeholder="Kode Pos"
                        value={patient.kode_pos}
                        onChange={onChange}
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
                        value={selectedProvince.find(item => item.value === patient.provinsi) || ''}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="kota">Kota / Kabupaten</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="kota"
                        id="kota"
                        options={selectedCity}
                        value={selectedCity.find(item => item.value === patient.kota) || ''}
                        onChange={onChange}
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
                        value={selectedSubdistrict.find(item => item.value === patient.kecamatan) || ''}
                        onChange={onChange}
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
                        value={selectedWard.find(item => item.value === patient.kelurahan) || ''}
                        onChange={onChange}
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
                        value={selectNationality.find(item => item.value === patient.kewarganegaraan) || ''}
                        onChange={onChange}
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
                        value={selectReligion.find(item => item.value === patient.agama) || ''}
                        onChange={onChange}
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
                        value={selectEmployment.find(item => item.value === patient.pekerjaan) || ''}
                        onChange={onChange}
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
                        value={selectMaritalStatus.find(item => item.value === patient.status_menikah) || ''}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="golongan_darah">
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
                        name="golongan_darah"
                        options={selectBlood}
                        value={selectBlood.find(item => item.value === patient.golongan_darah) || ''}
                        onChange={onChange}
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
                      {selectInsurance.map((input, index) => {
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
                      {selectAllergy.map((input, index) => {
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
                      onClick={(e) => onPatientSubmit(e)}
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