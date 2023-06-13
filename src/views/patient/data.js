import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table,
  Badge
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import useForm from 'utils/useForm';

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

import patientAPI from "api/patient";
import insuranceAPI from "api/insurance";
import insuranceClassAPI from "api/insurance/class";
import allergyAPI from "api/allergy";
import patientAllergyAPI from "api/patient-allergy";
import participantAPI from "api/participant";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectKITAS = [
  { label: "KTP", value: "KTP", key: 0, name: 'tipe_kitas' },
  { label: "SIM", value: "SIM", key: 1, name: 'tipe_kitas' },
  { label: "Paspor", value: "Paspor", key: 2, name: 'tipe_kitas' },
];

const selectInsurance = [
  { label: "Pilih Asuransi", value: "", key: 0, name: "id_asuransi" },
  { label: "PPS/Kapitasi", value: "PPS/Kapitasi", key: 1, name: "id_asuransi" },
  { label: "FFS Paket", value: "FFS Paket", key: 2, name: "id_asuransi" },
  { label: "FFS Non-Paket", value: "FFS Non-Paket", key: 3, name: "id_asuransi" },
];

const selectAllergy = [
  { label: "Pilih Alergi", value: "", key: 0, name: "id_alergi" },
  { label: "Alergi Obat", value: "Alergi Obat", key: 1, name: "id_alergi" },
  { label: "Alergi Makanan", value: "Alergi Makanan", key: 2, name: "id_alergi" },
  { label: "Alergi Kulit", value: "Alergi Kulit", key: 3, name: "id_alergi"},
  { label: "Alergi Debu", value: "Alergi Debu", key: 4, name: "id_alergi"},
  { label: "Lainnya", value: "Lainnya", key: 5, name: "id_alergi"},
];

const selectNationality = [
  { label: "WNI", value: "WNI", key: 0, name: 'kewarganegaraan' },
  { label: "WNA", value: "WNA", key: 1, name: 'kewarganegaraan' },
];

const selectStatusF = [
  { label: "Semua Status", value: "", key: 0, name: "status" },
  { label: "Aktif", value: "1", key: 1, name: "status" },
  { label: "Non-Aktif", value: "0", key: 2, name: "status" }
];

const selectMaritalStatus = [
  { label: "Pilih Status", value: "", key: 0, name: "status_menikah" },
  { label: "Belum Kawin", value: "Belum Kawin", key: 1, name: 'status_menikah' },
  { label: "Kawin", value: "Kawin", key: 2, name: 'status_menikah' },
  { label: "Cerai Hidup", value: "Cerai Hidup", key: 3, name: 'status_menikah' },
  { label: "Cerai Mati", value: "Cerai Mati", key: 4, name: 'status_menikah' },
];

const selectReligion = [
  { label: "Pilih Agama", value: "", key: 0, name: 'agama' }, 
  { label: "Islam", value: "Islam", key: 1, name: 'agama' },
  { label: "Protestan", value: "Protestan", key: 2, name: 'agama' },
  { label: "Katolik", value: "Katolik", key: 3, name: 'agama' },
  { label: "Hindu", value: "Hindu", key: 4, name: 'agama' },
  { label: "Budha", value: "Budha", key: 5, name: 'agama' },
];

const selectEmployment = [
  { label: "Pilih Pekerjaan", value: "", key: 999, name: 'pekerjaan' },
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
  { label: "Pilih Golongan Darah", value: "", key: 0, name: 'golongan_darah' },
  { label: "A-", value: "A-", key: 1, name: 'golongan_darah'  },
  { label: "A+", value: "A+", key: 2, name: 'golongan_darah'  },
  { label: "B-", value: "B-", key: 3, name: 'golongan_darah'  },
  { label: "B+", value: "B+", key: 4, name: 'golongan_darah'  },
  { label: "AB-", value: "AB-", key: 5, name: 'golongan_darah'  },
  { label: "AB+", value: "AB+", key: 6, name: 'golongan_darah'  },
  { label: "O-", value: "O-", key: 7, name: 'golongan_darah'  },
  { label: "O+", value: "O+", key: 8, name: 'golongan_darah'  },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Data = ({ match }) => {
  const dispatch = useDispatch();
  const patientAll = useSelector(state => state.patient);
  const patientTotalPage = useSelector(state => state.patientTotalPage);
  const { errors, validate } = useForm();

  const [dataStatusPatient, setDataStatusPatient] = useState("add");
  const [dataStatusAllergy, setDataStatusAllergy] = useState("add");
  const [dataStatusInsurance, setDataStatusInsurance] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKITAS, setSelectedKITAS] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  const [selectedProvince, setSelectedProvince] = useState([{ label: "Pilih Provinsi", value: "", key: 0, name: 'provinsi' }]);
  const [selectedCity, setSelectedCity] = useState([{ label: "Pilih Kota / Kabupaten", value: "", key: 0, name: 'kota' }]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([{ label: "Pilih Kecamatan", value: "", key: 0, name: 'kecamatan' }]);
  const [selectedWard, setSelectedWard] = useState([{ label: "Pilih Kelurahan", value: "", key: 0, name: 'kelurahan' }]);

  const [selectProvince, setSelectProvince] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [selectSubdistrict, setSelectSubdistrict] = useState([]);
  const [selectWard, setSelectWard] = useState([]);

  const [selectedInsuranceClass, setSelectedInsuranceClass] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState([{ label: ""}]);
  // const [selectedAllergy, setSelectedAllergy] = useState([{ label: ""}]);
  const [selectedAllergy, setSelectedAllergy] = useState([]);

  const [selectAllergy, setSelectAllergy] = useState([]);
  const [selectInsurance, setSelectInsurance] = useState([]);
  const [selectInsuranceClass, setSelectInsuranceClass] = useState([]);
  const [insuranceClassValue, setInsuranceClassValue] = useState([]);

  const [disabledInsuranceClass, setDisabledInsuranceClass] = useState([{0: false}]);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [patientStatus, setPatientStatus] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [patientSubmit, setPatientSubmit] = useState('');

  const [patientID, setPatientID] = useState('');

  const [insurance, setInsurance] = useState([
    { id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" }
  ]);

  const [tempInsurance, setTempInsurance] = useState([
    { id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" }
  ]);

  const addInsuranceFields = () => {
    let newfieldInsurance = { id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" };
    setInsurance([...insurance, newfieldInsurance]);

    // console.log(insurance.length + 1);
    disabledInsuranceClass[insurance.length] = true;
  };

  const removeInsuranceFields = (id, index) => {
    let dataInsurance = [...insurance];

    dataInsurance.splice(index, 1);

    setInsurance(dataInsurance);

    if(dataStatusInsurance === "update"){
      setTempInsurance(dataInsurance);
      onDeletePatientInsurance(id);
    }
  };

  const handleInsuranceChange = (index, event) => {
    let dataInsurance = [...insurance];

    if (event.name === "id_asuransi"){
      dataInsurance[index][event.name] = event.value;
      changeKelasAsuransi(index, event.value);

      // if (event.value !== "") {
      //   disabledInsuranceClass[index] = false;
      // } else {
      //   disabledInsuranceClass[index] = true;
      // }
    } else if (event.name === "id_asuransi_kelas"){
      dataInsurance[index][event.name] = event.value;
    } else {
      dataInsurance[index][event.target.name] = event.target.value;
    }

    // if(dataStatusInsurance === "update") {
    //   console.log(index, insurance[index].id_asuransi_kelas);
    //   selectInsuranceClassByInsurance[index].find(item => item.value === insurance[index].id_asuransi_kelas)
    // }

    setInsurance(dataInsurance);
  };

  // const [allergy, setAllergy] = useState([]);

  const [allergy, setAllergy] = useState([{ id: "", id_pasien: patientID, id_alergi: "" }]);

  const [tempAllergy, setTempAllergy] = useState([{ id: "", id_pasien: patientID, id_alergi: "" }]);

  const addAllergyFields = () => {
    let newfieldAllergy = { id: "", id_pasien: patientID, id_alergi: "" };
    setAllergy([...allergy, newfieldAllergy]);
  };

  const removeAllergyFields = (id, index) => {
    let dataAllergy = [...allergy];

    dataAllergy.splice(index, 1);

    setAllergy(dataAllergy);

    if(dataStatusAllergy === "update"){
      setTempAllergy(dataAllergy);
      onDeletePatientAllergy(id);
    }
  };

  const handleAllergyChange = (index, event) => {
    let dataAllergy = [...allergy];

    if (event.name === "id_alergi"){
      dataAllergy[index][event.name] = event.value;
    } else {
      dataAllergy[index][event.target.name] = event.target.value;
    }

    setAllergy(dataAllergy);
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

  const onLoadAlergi = async () => {
    try {
      const response = await allergyAPI.get("?limit=1000");
      // console.log(response);

      setSelectAllergy([{ label: "Pilih Alergi", value: "", key: 0, name: 'id_alergi' }, { label: "Tidak Ada Alergi", value: "Tidak Ada Alergi", key: 999, name: 'id_alergi' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectAllergy((current) => [
            ...current,
            { label: data[i].kategori  + ' - ' + data[i].nama, value: data[i].id, key: data[i].id, name: 'id_alergi' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadAsuransi = async () => {
    try {
      const response = await insuranceAPI.get("?limit=1000");
      // console.log(response);

      setSelectInsurance([{ label: "Pilih Asuransi", value: "", key: 0, name: 'id_asuransi' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectInsurance((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_asuransi' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadKelasAsuransi = async () => {
    try {
      const response = await insuranceClassAPI.get("?limit=1000");
      // console.log(response);

      setSelectInsuranceClass([{ label: "Pilih Kelas Asuransi", value: "", key: 0, name: 'id_asuransi_kelas' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectInsuranceClass((current) => [
            ...current,
            { label: data[i].nama_kelas, value: data[i].id, key: data[i].id, name: 'id_asuransi_kelas' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectInsuranceClassByInsurance, setSelectInsuranceClassByInsurance] = useState([]);

  const changeKelasAsuransi = async (index, id_asuransi, id_asuransi_kelas = null) => {
    selectInsuranceClassByInsurance[index] = [{ label: "Pilih Kelas", value: "", key: 0, name: 'asuransi_kelas' }];

    try {
      const response = await insuranceClassAPI.getByInsurance("", `/${id_asuransi}`);
      // console.log(response);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);

        if(data){
          data.map((data) => {
            selectInsuranceClassByInsurance[index].push({ 
              label: data.nama_kelas,
              value: data.id,
              key: data.id,
              name: 'id_asuransi_kelas'
            });
          })
        }

        disabledInsuranceClass[index] = false;
      } else {
        disabledInsuranceClass[index] = true;

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(index, selectInsuranceClassByInsurance[index]);
    // console.log(index, insurance[index].id_asuransi_kelas);
    // if (dataStatusInsurance === "update" || id_asuransi_kelas) {
    //   let set_id_asuransi_kelas = selectInsuranceClassByInsurance[index].find(item => item.value === id_asuransi_kelas) || '';
    //   insuranceClassValue[index] = set_id_asuransi_kelas;
    //   console.log('set', insuranceClassValue[index]);
    // } else {
    //   let get_id_asuransi_kelas = selectInsuranceClassByInsurance[index].find(item => item.value === insurance[index].id_asuransi_kelas) || '';
    //   insuranceClassValue[index] = get_id_asuransi_kelas;
    //   console.log('get', insuranceClassValue[index]);
    // }
  };

  const onChange = (e) => {
    // console.log('e', e);

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
    } else if (e.name === 'nomor_kitas') {
      validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'kewarganegaraan') {
      setPatient(current => {
          return { ...current, kewarganegaraan: e ? e.value : ''}
      })
    } else if (e.name === 'nama_lengkap') {
      validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
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

    // console.log('patient', patient);
  }

  const onPatientSubmit = async (e) => {
    e.preventDefault();
    setPatientSubmit("process");

    let isError = false;

    for(let [key, value] of Object.entries(patient)) {
      if((key === 'nama_lengkap' && value === '') || (key === 'nomor_kitas' && value === '')){
        validate(e, key, value);
        isError = true;
      //   return;
      }
    }

    if(isError === true){
      return;
    }

    if(dataStatusPatient === 'add') {
      try {
        const response = await patientAPI.add(patient);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          setPatientID(data.id);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah pasien gagal`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
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
      } finally {
        getPatient("");
      }
    } else if (dataStatusPatient === 'update') {
      try {
        const response = await patientAPI.update(patient, patientID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          setPatientID(patientID);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
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
      } finally {
        getPatient("");
      }
    } else {
      console.log('dataStatusPatient undefined')
    }

    setPatientSubmit("done");
  };

  const onAllergySubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < allergy.length; i++) {
      allergy[i].id_pasien = patientID;

      if(allergy[i].id !== '' && allergy[i].id_alergi !== tempAllergy[i].id_alergi) {
        onAllergyEdit(allergy[i]);
      } else if(allergy[i].id === '') {
        onAllergyAdd(allergy[i]);
      }
    }
  }

  const onAllergyAdd = async (allergy) => {
    try {
      const response = await patientAllergyAPI.add(allergy);
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
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah alergi pasien gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
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
  } 

  const onAllergyEdit = async (allergy) => {
    try {
      const response = await patientAllergyAPI.update(allergy, allergy.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Ubah alergi pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Ubah alergi pasien gagal`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
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
  }

  const onInsuranceSubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < insurance.length; i++) {
      insurance[i].id_pasien = patientID;

      if(insurance[i].id !== '' && (insurance[i].id_asuransi !== tempInsurance[i].id_asuransi || insurance[i].nomor_asuransi !== tempInsurance[i].nomor_asuransi)) {
        onInsuranceEdit(insurance[i]);
      } else if(insurance[i].id === '') {
        onInsuranceAdd(insurance[i]);
      }
    }
  }

  const onInsuranceAdd = async (insurance) => {
    try {
      const response = await participantAPI.add(insurance);
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
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah asuransi pasien gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
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
  } 

  const onInsuranceEdit = async (insurance) => {
    try {
      const response = await participantAPI.update(insurance, insurance.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Ubah asuransi pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Ubah asuransi pasien gagal`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
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
  }

  const resetForm = (e, scroll = false) => {
    // e.preventDefault();

    if(scroll) {
      if(window.innerWidth < 1280){
        const element = document.getElementById('manage-form-tab-mobile');
        if (element) {
          window.scroll({
            top: element,
            behavior: "smooth"
          })
        }
      }
    }

    setPatientStatus(0);
    setPatientName('');
    setPatientID('');
    
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
    
    setAllergy([{ id: "", id_pasien: patientID, id_alergi: "" }]);
    setInsurance([{ id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" }]);

    setDisabledInsuranceClass([{0: false}]);
    setDataStatusPatient("add");
    setDataStatusAllergy("add");
    setDataStatusInsurance("add");
    onLoadProvinsi();
    onLoadAlergi();
    onLoadAsuransi();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getPatient = async (params) => {
    try {
      setIsLoading(true);
      const res = await patientAPI.get(params);
      // console.log(res.data.data);
      dispatch({type: "GET_PATIENT", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_PATIENT", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getPatientById = async (e, id) => {
    e.preventDefault();
    resetForm(e);
    setDataStatusPatient("update");
    setRowSelected(id);

    if(window.innerWidth < 1280){
      const element = document.getElementById('manage-form-tab-mobile');
      if (element) {
        window.scroll({
          top: element,
          behavior: "smooth"
        })
      }
    }
    
    let data = null;

    try {
      const res = await patientAPI.get(`/${id}`);
      data = res.data.data[0];
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

      setPatientName(data.nama_lengkap);
      setPatientStatus(data.is_active);

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

      if(data.provinsi && data.kota && data.kecamatan && data.kelurahan) {
        let id_provinsi = selectedProvince.find(item => item.value === data.provinsi).key;
        changeKota(id_provinsi, editAddress);
      }
    } catch (e) {
      console.log(e);
    } finally {
      getAllergyByPatientId(data.id);
      getInsuranceByPatientId(data.id);
    }

    // console.log(dataStatusPatient);
  };

  const getAllergyByPatientId = async (id) => {
    setAllergy([]);
    setTempAllergy([]);

    try {
      const res = await patientAllergyAPI.getByPatient(`/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {

          setAllergy((current) => [
            ...current, { id: data.id, id_pasien: data.id_pasien, id_alergi: data.id_alergi }
          ]);

          setTempAllergy((current) => [
            ...current, { id: data.id, id_pasien: data.id_pasien, id_alergi: data.id_alergi }
          ]);
        })
      }

      setDataStatusAllergy("update");
    } catch (e) {
      console.log(e);

      setAllergy([{ id: '', id_pasien: patientID, id_alergi: "" }]);
      setTempAllergy([{ id: '', id_pasien: patientID, id_alergi: "" }]);

      setDataStatusAllergy("add");
    }
  };

  const getInsuranceByPatientId = async (id) => {
    setInsurance([]);
    setTempInsurance([]);

    try {
      const res = await participantAPI.getByPatient("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setInsurance((current) => [
            ...current, { id: data.id, id_pasien: data.id_pasien, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, nomor_asuransi: data.nomor_asuransi }
          ]);
          changeKelasAsuransi(index, data.id_asuransi, data.id_asuransi_kelas);

          setTempInsurance((current) => [
            ...current, { id: data.id, id_pasien: data.id_pasien, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, nomor_asuransi: data.nomor_asuransi }
          ]);
        })
      }

      setDataStatusInsurance("update");
    } catch (e) {
      console.log(e);

      setInsurance([{ id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" }]);
      setTempInsurance([{ id: '', id_pasien: patientID, id_asuransi: "", id_asuransi_kelas: "", nomor_asuransi: "" }]);

      setDataStatusInsurance("add");
    }
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, patientID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, patientID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
    userData.roles.includes('isResepsionis')){
      if (patientID && patientStatus == 1) {
        return <ButtonArchive/>;
      } else if (patientID && patientStatus == 0) {
        return <ButtonActive/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await patientAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setPatientID(data.id);
      setPatientStatus(data.is_active);
      setPatientName(data.nama_lengkap);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (patientStatus == 1) {
        const response = await patientAPI.archive("", patientID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await patientAPI.activate("", patientID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi pasien sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi pasien gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      }
      // console.log(response);
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      getPatient("");
    }
  };

  
  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await patientAPI.get(`/${id}`);
      let data = res.data.data[0];

      setPatientID(data.id);
      setPatientName(data.nama_lengkap);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await patientAPI.delete("", patientID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus pasien gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }

      // console.log(response);
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      getPatient("");
    }
  };

  const onDeletePatientAllergy = async (id) => {
    try {
      const response = await patientAllergyAPI.delete("", id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus alergi pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus alergi pasien gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }

      // console.log(response);
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
  };

  const onDeletePatientInsurance = async (id) => {
    try {
      const response = await participantAPI.delete("", id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus asuransi pasien sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus asuransi pasien gagal: ${response.message}`,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        throw Error(`Error status: ${response.status}`);
      }

      // console.log(response);
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
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, searchName, searchStatus, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
    
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchName !== "") {
      params = `${params}&search=${searchName}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    setRowSelected(false);
    getPatient(params);
  }, [limit, searchName, searchStatus, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    onLoadProvinsi();
    onLoadAlergi();
    onLoadAsuransi();
  }, [ ]);

  useEffect(() => {
    if(selectedCity.length > 0 && editAddress.status === 2) {
      let id_kota = selectedCity.find(item => item.value === editAddress.nama_kota).key;
      changeKecamatan(id_kota, editAddress);
    }

    if(selectedSubdistrict.length > 0 && editAddress.status === 3) {
      let id_kecamatan = selectedSubdistrict.find(item => item.value === editAddress.nama_kecamatan).key;
      changeKelurahan(id_kecamatan, editAddress);
    }
  }, [editAddress]);

  useEffect(() => {
    if (patientSubmit === "done") {
      setTimeout(() => {

        if(allergy.length > 0 && patientID) {
          onAllergySubmit();
        }
        
        if(insurance.length > 0 && patientID) {
          onInsuranceSubmit();
        }

        setTimeout(() => {
          resetForm();
        }, 2000)
      }, 1000);
    };
  }, [ patientSubmit ]);

  // useEffect(() => {
    // if(dataStatusInsurance === "update" && insurance[0].id !== ''){
      // let dataInsurance = [...insurance];
      // console.log(dataInsurance);
      // dataInsurance[index]['id_asuransi_kelas'] = id_asuransi_kelas;
      // setInsurance(dataInsurance);
      
      // setTimeout(() => {

      // }, 5000);
    // }
  // }, [ dataStatusInsurance ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4 switch-table">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <Row>
                  <Colxx sm="12" md="12" xl="12">
                  Data Pasien
                  </Colxx>
                </Row>
              </CardTitle>
              <FormGroup row style={{ margin: '0px', width: '100%' }}>
                <Colxx sm="12" md="12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                  <Label for="status">
                    Status
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="status"
                    onChange={(e) => setSearchStatus(e.value)}
                    options={selectStatusF}
                    value={{ label: "Semua Status", value: "", key: 0, name: "status" }}
                    isSearchable={false}
                  />
                </Colxx>
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Pencarian"
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                  <Button outline color="theme-3" className="button-search">
                    <i className="simple-icon-magnifier"></i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Table hover>
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Pasien</th>
                    <th className="center-xy" style={{ width: '55px' }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelected == false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center">
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) : patientAll.length > 0 ? (
                    patientAll.map((data) => (
                      <tr key={data.id} onClick={(e) => getPatientById(e, data.id)} style={{ cursor: 'pointer' }} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama_lengkap}</h6>
                          {data.jenis_kelamin ? data.jenis_kelamin.substring(0,1) : '-'}, {new Date().getFullYear() - data.tanggal_lahir.substring(0,4)} tahun<br/>
                          {data.tipe_kitas} {data.nomor_kitas}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getPatientById(e, data.id)}
                            >
                            <i className="simple-icon-arrow-right-circle"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center">
                        <h5 style={{ marginTop: '1.5rem' }}><b>Data tidak ditemukan</b></h5>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPage={patientTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={patientTotalPage}
              />
            </CardBody>
          </Card>
        </Colxx>

        <Colxx sm="12" md="12" xl="8" className="mb-4 manage-form" id="manage-form-tab-mobile">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <Row>
                  <Colxx sm="5" md="6" xl="6">
                    Form Manajemen Pasien
                  </Colxx>
                  <Colxx sm="7" md="6" xl="6" style={{ textAlign: 'right' }}>
                    {<IsActive/>}
                  </Colxx>
                </Row>
              </CardTitle>
              <Form className="av-tooltip tooltip-right-top" onSubmit={onPatientSubmit}>
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
                          value={selectKITAS.find(item => item.value === patient.tipe_kitas) || { label: "KTP", value: "KTP", key: 0, name: 'tipe_kitas' }}
                          options={selectKITAS}
                          onChange={onChange}
                          isSearchable={false}
                          // required
                        />
                        <Input
                          type="number"
                          name="nomor_kitas"
                          id="nomor_kitas"
                          placeholder="No. KITAS"
                          className="input-KITAS"
                          value={patient.nomor_kitas}
                          onChange={onChange}
                          pattern="[0-9]*"
                          // required={true}
                        />
                        {errors.nomor_kitas && (
                          <div className="rounded invalid-feedback d-block" style={{ bottom: '140%' }}>
                            {errors.nomor_kitas}
                          </div>
                        )}
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
                        // required={true}
                      />
                      {errors.nama_lengkap && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.nama_lengkap}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="jenisKelamin">
                        Jenis Kelamin
                        {/* <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span> */}
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
                        type="number"
                        name="kode_pos"
                        id="kode_pos"
                        placeholder="Kode Pos"
                        pattern="[0-9]*"
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
                        value={selectedProvince.find(item => item.value === patient.provinsi) || { label: "Pilih Provinsi", value: "", key: 0, name: 'provinsi' }}
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
                        value={selectedCity.find(item => item.value === patient.kota) || { label: "Pilih Kota / Kabupaten", value: "", key: 0, name: 'kota' }}
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
                        value={selectedSubdistrict.find(item => item.value === patient.kecamatan) || { label: "Pilih Kecamatan", value: "", key: 0, name: 'kecamatan' }}
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
                        value={selectedWard.find(item => item.value === patient.kelurahan) || { label: "Pilih Kelurahan", value: "", key: 0, name: 'kelurahan' }}
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
                        value={selectNationality.find(item => item.value === patient.kewarganegaraan) || { label: "WNI", value: "WNI", key: 0, name: 'kewarganegaraan' }}
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
                        value={selectReligion.find(item => item.value === patient.agama) || { label: "Pilih Agama", value: "", key: 0, name: 'agama' }}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="pekerjaan">Pekerjaan</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="pekerjaan"
                        options={selectEmployment}
                        value={selectEmployment.find(item => item.value === patient.pekerjaan) || { label: "Pilih Pekerjaan", value: "", key: 999, name: 'pekerjaan' }}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="statusMenikah">Status Menikah</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="status_menikah"
                        options={selectMaritalStatus}
                        value={selectMaritalStatus.find(item => item.value === patient.status_menikah) || { label: "Pilih Status", value: "", key: 0, name: "status_menikah" }}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="golongan_darah">
                        Golongan Darah
                        {/* <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span> */}
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="golongan_darah"
                        options={selectBlood}
                        value={selectBlood.find(item => item.value === patient.golongan_darah) || { label: "Pilih Golongan Darah", value: "", key: 0, name: 'golongan_darah' }}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>Alergi</Label>
                      {allergy.map((input, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select select-allergy"
                              classNamePrefix="react-select"
                              // isMulti
                              name="id_alergi"
                              id="id_alergi"
                              value={selectAllergy.find(item => item.value === allergy[index].id_alergi) || ''}
                              options={selectAllergy}
                              onChange={(event) =>
                                handleAllergyChange(index, event)
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
                          </React.Fragment>
                        );
                      })}
                      <Button
                        color="primary"
                        // style={{ float: "right" }}
                        className="mb-2"
                        onClick={addAllergyFields}
                      >
                        Tambah
                      </Button>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Row>
                        <Colxx sm={6}>
                          <Label>Asuransi</Label>
                        </Colxx>
                        <Colxx sm={6} className="insurance-class-label">
                          <Label>Kelas Asuransi</Label>
                        </Colxx>
                      </Row>
                      {insurance.map((input, index) => {
                        return (
                          <Row key={index}>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Select
                                  addonType="prepend"
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi"
                                  value={selectInsurance.find(item => item.value === insurance[index].id_asuransi) || { label: "Pilih Asuransi", value: "", key: 0, name: 'id_asuransi' }}
                                  options={selectInsurance}
                                  onChange={(event) =>
                                    handleInsuranceChange(index, event)
                                  }
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Select
                                  addonType="prepend"
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi_kelas"
                                  value={
                                    insurance[index].id_asuransi_kelas !== undefined && selectInsuranceClassByInsurance[index] !== undefined &&
                                      selectInsuranceClassByInsurance[index].find(item => item.value === insurance[index].id_asuransi_kelas) || { label: "Pilih Kelas", value: "", key: 0, name: 'asuransi_kelas' }
                                  }
                                  // value={
                                  //   (insurance[index].id_asuransi_kelas !== undefined || selectInsuranceClassByInsurance[index] !== undefined) &&
                                  //     insuranceClassValue[index]
                                  // }
                                  options={selectInsuranceClassByInsurance[index]}
                                  onChange={(event) =>
                                    handleInsuranceChange(index, event)
                                  }
                                  isDisabled={disabledInsuranceClass[index]}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={12}>
                              <InputGroup className="input-group-insurance">
                                <Input
                                  type="number"
                                  name="nomor_asuransi"
                                  placeholder="No. Asuransi"
                                  className="input-insurance"
                                  value={insurance[index].nomor_asuransi}
                                  pattern="[0-9]*"
                                  onChange={(event) =>
                                    handleInsuranceChange(index, event)
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
                            </Colxx>
                          </Row>
                        );
                      })}
                      <Button
                        color="primary"
                        // style={{ float: "right" }}
                        className="mb-2"
                        onClick={addInsuranceFields}
                      >
                        Tambah
                      </Button>
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
                      // onClick={(e) => onPatientSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Colxx>

        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Pasien</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {patientStatus == 1 ?  'mengarsipkan pasien'  : 'aktivasi pasien' } <b>{patientName}</b>?</h5>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalArchive(false)}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onStatusSubmit(e)}>
              Ya
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalDelete}
          toggle={() => setModalDelete(!modalDelete)}
        >
          <ModalHeader>Hapus Pasien</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus data <b>{patientName}</b>?</h5>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalDelete(false)}
            >
              Batal
            </Button>
            <Button color="primary" onClick={(e) => onDeleteSubmit(e)}>
              Ya
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Row>

      <Button
        color="primary"
        className="float-btn"
        onClick={(e) => resetForm(e, true)}
      >
        <i className="iconsminds-add-user"></i> Tambah Pasien
      </Button>
    </>
  );
};
export default Data;