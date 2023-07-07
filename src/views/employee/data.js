import React, { useEffect, useState, useRef } from "react";
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
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import useForm from 'utils/useForm';

import moment from "moment";
import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

import employeeAPI from "api/employee";
import clinicAPI from "api/clinic";
import contractAPI from "api/employee/contract";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectRole = [
  { label: "Developer", value: "Developer", key: 0, name: 'peran' },
  { label: "Manager", value: "Manager", key: 1, name: 'peran' },
  { label: "Admin", value: "Admin", key: 2, name: "peran" },
  { label: "Resepsionis", value: "Resepsionis", key: 3, name: "peran" },
  { label: "Perawat", value: "Perawat", key: 4, name: "peran" },
  { label: "Dokter", value: "Dokter", key: 5, name: "peran" },
  { label: "Manajemen", value: "Manajemen", key: 6, name: "peran" },
  { label: "Finance", value: "Finance", key: 7, name: "peran" },
  { label: "Kasir", value: "Kasir", key: 8, name: "peran" },
];

const selectType = [
  { label: "Pilih Tipe", value: "", key: 0, name: "tipe" },
  { label: "Manager", value: "Manager", key: 1, name: "tipe" },
  { label: "Admin", value: "Admin", key: 2, name: "tipe" },
  { label: "Resepsionis", value: "Resepsionis", key: 3, name: "tipe" },
  { label: "Perawat", value: "Perawat", key: 4, name: "tipe" },
  { label: "Dokter", value: "Dokter", key: 5, name: "tipe" },
  { label: "Manajemen", value: "Manajemen", key: 6, name: "tipe" },
  { label: "Finance", value: "Finance", key: 7, name: "tipe" },
  { label: "Kasir", value: "Kasir", key: 8, name: "tipe" },
];

const selectTypeF = [
  { label: "Semua Tipe", value: "", key: 0, name: "tipe" },
  { label: "Manager", value: "Manager", key: 1, name: "tipe" },
  { label: "Admin", value: "Admin", key: 2, name: "tipe" },
  { label: "Resepsionis", value: "Resepsionis", key: 3, name: "tipe" },
  { label: "Perawat", value: "Perawat", key: 4, name: "tipe" },
  { label: "Dokter", value: "Dokter", key: 5, name: "tipe" },
  { label: "Manajemen", value: "Manajemen", key: 6, name: "tipe" },
  { label: "Finance", value: "Finance", key: 7, name: "tipe" },
  { label: "Kasir", value: "Kasir", key: 8, name: "tipe" },
];

const selectStatusF = [
  { label: "Semua Status", value: "", key: 0, name: "status" },
  { label: "Aktif", value: "1", key: 1, name: "status" },
  { label: "Non-Aktif", value: "0", key: 2, name: "status" }
];

const selectWP = [
  { label: "Pilih Tipe Izin", value: "", key: 0, name: "tipe_izin" },
  { label: "SIP", value: "SIP", key: 1, name: 'tipe_izin' },
  { label: "STR", value: "STR", key: 2, name: 'tipe_izin' },
];

const selectMaritalStatus = [
  { label: "Pilih Status", value: "", key: 0, name: "status_menikah" },
  { label: "Belum Kawin", value: "Belum Kawin", key: 1, name: 'status_menikah' },
  { label: "Kawin", value: "Kawin", key: 2, name: 'status_menikah' },
  { label: "Cerai Hidup", value: "Cerai Hidup", key: 3, name: 'status_menikah' },
  { label: "Cerai Mati", value: "Cerai Mati", key: 4, name: 'status_menikah' },
];

const selectSpecialist = [
  { label: "Pilih Spesialisasi", value: "", key: 0, name: "spesialis" },
  { label: "Anak", value: "Anak", key: 1, name: 'spesialis' },
  { label: "Andrologi", value: "Andrologi", key: 2, name: 'spesialis' },
  { label: "Anestesiologi dan Terapi Intensif", value: "Anestesiologi dan Terapi Intensif", key: 3, name: 'spesialis' },
  { label: "Akupunktur Medik", value: "Akupunktur Medik", key: 4, name: 'spesialis' },
  { label: "Bedah", value: "Bedah", key: 5, name: 'spesialis' },
  { label: "Bedah Anak", value: "Bedah Anak", key: 6, name: 'spesialis' },
  { label: "Bedah Plastik, Rekonstruksi, dan Estetik", value: "Bedah Plastik, Rekonstruksi, dan Estetik", key: 7, name: 'spesialis' },
  { label: "Bedah Saraf", value: "Bedah Saraf", key: 8, name: 'spesialis' },
  { label: "Bedah Toraks, Kardiak, dan Vaskular", value: "Bedah Toraks, Kardiak, dan Vaskular", key: 9, name: 'spesialis' },
  { label: "Dermatologi dan Venereologi", value: "Dermatologi dan Venereologi", key: 10, name: 'spesialis' },
  { label: "Kegawatdaruratan Medik", value: "Kegawatdaruratan Medik", key: 11, name: 'spesialis' },
  { label: "Farmakologi Klinik", value: "Farmakologi Klinik", key: 12, name: 'spesialis' },
  { label: "Forensik dan Medikolegal", value: "Forensik dan Medikolegal", key: 13, name: 'spesialis' },
  { label: "Gizi Klinik", value: "Gizi Klinik", key: 14, name: 'spesialis' },
  { label: "Jantung dan Pembuluh Darah", value: "Jantung dan Pembuluh Darah", key: 15, name: 'spesialis' },
  { label: "Kedokteran Fisik dan Rehabilitasi", value: "Kedokteran Fisik dan Rehabilitasi", key: 16, name: 'spesialis' },
  { label: "Kedokteran Jiwa", value: "Kedokteran Jiwa", key: 17, name: 'spesialis' },
  { label: "Kedokteran Kelautan", value: "Kedokteran Kelautan", key: 18, name: 'spesialis' },
  { label: "Kedokteran Keluarga Layanan Primer", value: "Kedokteran Keluarga Layanan Primer", key: 19, name: 'spesialis' },
  { label: "Kedokteran Nuklir dan Teranostik Molekuler", value: "Kedokteran Nuklir dan Teranostik Molekuler", key: 20, name: 'spesialis' },
  { label: "Kedokteran Okupasi", value: "Kedokteran Okupasi", key: 21, name: 'spesialis' },
  { label: "Kedokteran Olahraga", value: "Kedokteran Olahraga", key: 22, name: 'spesialis' },
  { label: "Kedokteran Penerbangan", value: "Kedokteran Penerbangan", key: 23, name: 'spesialis' },
  { label: "Mikrobiologi Klinik", value: "Mikrobiologi Klinik", key: 24, name: 'spesialis' },
  { label: "Neurologi", value: "Neurologi", key: 25, name: 'spesialis' },
  { label: "Obstetri dan Ginekologi", value: "Obstetri dan Ginekologi", key: 26, name: 'spesialis' },
  { label: "Oftalmologi", value: "Oftalmologi", key: 27, name: 'spesialis' },
  { label: "Onkologi Radiasi", value: "Onkologi Radiasi", key: 28, name: 'spesialis' },
  { label: "Orthopaedi dan Traumatologi", value: "Orthopaedi dan Traumatologi", key: 29, name: 'spesialis' },
  { label: "Parasitologi Klinik", value: "Parasitologi Klinik", key: 30, name: 'spesialis' },
  { label: "Patologi Anatomi", value: "Patologi Anatomi", key: 31, name: 'spesialis' },
  { label: "Patologi Klinik", value: "Patologi Klinik", key: 32, name: 'spesialis' },
  { label: "Penyakit Dalam", value: "Penyakit Dalam", key: 33, name: 'spesialis' },
  { label: "Pulmonologi dan Kedokteran Respirasi", value: "Pulmonologi dan Kedokteran Respirasi", key: 34, name: 'spesialis' },
  { label: "Radiologi", value: "Radiologi", key: 35, name: 'spesialis' },
  { label: "Telinga Hidung Tenggorok Bedah Kepala Leher", value: "Telinga Hidung Tenggorok Bedah Kepala Leher", key: 36, name: 'spesialis' },
  { label: "Urologi", value: "Urologi", key: 37, name: 'spesialis' },
  { label: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", value: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", key: 38, name: 'spesialis' },
  { label: "Kedokteran Gigi Anak (Dokter Gigi)", value: "Kedokteran Gigi Anak (Dokter Gigi)", key: 39, name: 'spesialis' },
  { label: "Konservasi Gigi (Dokter Gigi)", value: "Konservasi Gigi (Dokter Gigi)", key: 40, name: 'spesialis' },
  { label: "Ortodonsia (Dokter Gigi)", value: "Ortodonsia (Dokter Gigi)", key: 41, name: 'spesialis' },
  { label: "Odontologi Forensik (Dokter Gigi)", value: "Odontologi Forensik (Dokter Gigi)", key: 42, name: 'spesialis' },
  { label: "Penyakit Mulut (Dokter Gigi)", value: "Penyakit Mulut (Dokter Gigi)", key: 43, name: 'spesialis' },
  { label: "Periodonsia (Dokter Gigi)", value: "Periodonsia (Dokter Gigi)", key: 44, name: 'spesialis' },
  { label: "Prostodonsia (Dokter Gigi)", value: "Prostodonsia (Dokter Gigi)", key: 45, name: 'spesialis' },
  { label: "Radiologi Kedokteran Gigi (Dokter Gigi)", value: "Radiologi Kedokteran Gigi (Dokter Gigi)", key: 46, name: 'spesialis' },
];

const selectSpecialistF = [
  { label: "Semua Spesialisasi", value: "", key: 0, name: 'spesialis' },
  { label: "Anak", value: "Anak", key: 1, name: 'spesialis' },
  { label: "Andrologi", value: "Andrologi", key: 2, name: 'spesialis' },
  { label: "Anestesiologi dan Terapi Intensif", value: "Anestesiologi dan Terapi Intensif", key: 3, name: 'spesialis' },
  { label: "Akupunktur Medik", value: "Akupunktur Medik", key: 4, name: 'spesialis' },
  { label: "Bedah", value: "Bedah", key: 5, name: 'spesialis' },
  { label: "Bedah Anak", value: "Bedah Anak", key: 6, name: 'spesialis' },
  { label: "Bedah Plastik, Rekonstruksi, dan Estetik", value: "Bedah Plastik, Rekonstruksi, dan Estetik", key: 7, name: 'spesialis' },
  { label: "Bedah Saraf", value: "Bedah Saraf", key: 8, name: 'spesialis' },
  { label: "Bedah Toraks, Kardiak, dan Vaskular", value: "Bedah Toraks, Kardiak, dan Vaskular", key: 9, name: 'spesialis' },
  { label: "Dermatologi dan Venereologi", value: "Dermatologi dan Venereologi", key: 10, name: 'spesialis' },
  { label: "Kegawatdaruratan Medik", value: "Kegawatdaruratan Medik", key: 11, name: 'spesialis' },
  { label: "Farmakologi Klinik", value: "Farmakologi Klinik", key: 12, name: 'spesialis' },
  { label: "Forensik dan Medikolegal", value: "Forensik dan Medikolegal", key: 13, name: 'spesialis' },
  { label: "Gizi Klinik", value: "Gizi Klinik", key: 14, name: 'spesialis' },
  { label: "Jantung dan Pembuluh Darah", value: "Jantung dan Pembuluh Darah", key: 15, name: 'spesialis' },
  { label: "Kedokteran Fisik dan Rehabilitasi", value: "Kedokteran Fisik dan Rehabilitasi", key: 16, name: 'spesialis' },
  { label: "Kedokteran Jiwa", value: "Kedokteran Jiwa", key: 17, name: 'spesialis' },
  { label: "Kedokteran Kelautan", value: "Kedokteran Kelautan", key: 18, name: 'spesialis' },
  { label: "Kedokteran Keluarga Layanan Primer", value: "Kedokteran Keluarga Layanan Primer", key: 19, name: 'spesialis' },
  { label: "Kedokteran Nuklir dan Teranostik Molekuler", value: "Kedokteran Nuklir dan Teranostik Molekuler", key: 20, name: 'spesialis' },
  { label: "Kedokteran Okupasi", value: "Kedokteran Okupasi", key: 21, name: 'spesialis' },
  { label: "Kedokteran Olahraga", value: "Kedokteran Olahraga", key: 22, name: 'spesialis' },
  { label: "Kedokteran Penerbangan", value: "Kedokteran Penerbangan", key: 23, name: 'spesialis' },
  { label: "Mikrobiologi Klinik", value: "Mikrobiologi Klinik", key: 24, name: 'spesialis' },
  { label: "Neurologi", value: "Neurologi", key: 25, name: 'spesialis' },
  { label: "Obstetri dan Ginekologi", value: "Obstetri dan Ginekologi", key: 26, name: 'spesialis' },
  { label: "Oftalmologi", value: "Oftalmologi", key: 27, name: 'spesialis' },
  { label: "Onkologi Radiasi", value: "Onkologi Radiasi", key: 28, name: 'spesialis' },
  { label: "Orthopaedi dan Traumatologi", value: "Orthopaedi dan Traumatologi", key: 29, name: 'spesialis' },
  { label: "Parasitologi Klinik", value: "Parasitologi Klinik", key: 30, name: 'spesialis' },
  { label: "Patologi Anatomi", value: "Patologi Anatomi", key: 31, name: 'spesialis' },
  { label: "Patologi Klinik", value: "Patologi Klinik", key: 32, name: 'spesialis' },
  { label: "Penyakit Dalam", value: "Penyakit Dalam", key: 33, name: 'spesialis' },
  { label: "Pulmonologi dan Kedokteran Respirasi", value: "Pulmonologi dan Kedokteran Respirasi", key: 34, name: 'spesialis' },
  { label: "Radiologi", value: "Radiologi", key: 35, name: 'spesialis' },
  { label: "Telinga Hidung Tenggorok Bedah Kepala Leher", value: "Telinga Hidung Tenggorok Bedah Kepala Leher", key: 36, name: 'spesialis' },
  { label: "Urologi", value: "Urologi", key: 37, name: 'spesialis' },
  { label: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", value: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", key: 38, name: 'spesialis' },
  { label: "Kedokteran Gigi Anak (Dokter Gigi)", value: "Kedokteran Gigi Anak (Dokter Gigi)", key: 39, name: 'spesialis' },
  { label: "Konservasi Gigi (Dokter Gigi)", value: "Konservasi Gigi (Dokter Gigi)", key: 40, name: 'spesialis' },
  { label: "Ortodonsia (Dokter Gigi)", value: "Ortodonsia (Dokter Gigi)", key: 41, name: 'spesialis' },
  { label: "Odontologi Forensik (Dokter Gigi)", value: "Odontologi Forensik (Dokter Gigi)", key: 42, name: 'spesialis' },
  { label: "Penyakit Mulut (Dokter Gigi)", value: "Penyakit Mulut (Dokter Gigi)", key: 43, name: 'spesialis' },
  { label: "Periodonsia (Dokter Gigi)", value: "Periodonsia (Dokter Gigi)", key: 44, name: 'spesialis' },
  { label: "Prostodonsia (Dokter Gigi)", value: "Prostodonsia (Dokter Gigi)", key: 45, name: 'spesialis' },
  { label: "Radiologi Kedokteran Gigi (Dokter Gigi)", value: "Radiologi Kedokteran Gigi (Dokter Gigi)", key: 46, name: 'spesialis' },
];

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const employeeData = useSelector(state => state.employee);
  const employeeTotalPage = useSelector(state => state.employeeTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);
  
  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedTypeF, setSelectedTypeF] = useState({ label: "Semua Tipe", value: "", key: 0, name: "tipe" },);
  const [selectedSpecialistF, setSelectedSpecialistF] = useState({ label: "Semua Spesialisasi", value: "", key: 0, name: "spesialis" },);

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedWP, setSelectedWP] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
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

  const [disabledSpecialist, setDisabledSpecialist] = useState(true);
  const [fieldColumn, setFieldColumn] = useState({ username: 4, email: 4 });
  const [openPassword, setOpenPassword] = useState('block');
  const [modalPassword, setModalPassword] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [employeeID, setEmployeeID] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState(0);
  const [employeeSubmit, setEmployeeSubmit] = useState('');
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');
  const [contractID, setContractID] = useState('');

  const [employee, setEmployee] = useState({
    username: '',
    nama: '',
    email: '',
    password: '',
    is_dev: 0,
    is_manager: 0,
    is_admin: 0,
    is_resepsionis: 0,
    is_perawat: 0,
    is_dokter: 0,
    is_manajemen: 0,
    is_finance: 0,
    is_cashier: 0,
    jenis_kelamin: '',
    nomor_kitas: '',
    tipe_izin: '',
    nomor_izin: '',
    kadaluarsa_izin: '',
    nomor_hp: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    kode_pos: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    status_menikah: '',
    tipe: '',
    spesialis: ''
  });

  const [ editAddress, setEditAddress ] = useState({
    status: 0,
    nama_kota: '',
    nama_kecamatan: '',
    nama_kelurahan: ''
  });

  const [contract, setContract] = useState({
    id_karyawan: employeeID,
    id_klinik: clinicID,
  });

  const onLoadKlinik = async () => {
    try {
      const response = await clinicAPI.get("?limit=1000");
      // console.log(response);

      setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
      setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedKlinik((current) => [
            ...current,
            { label: data[i].nama_klinik, value: data[i].id, key: data[i].id, name: 'id_klinik' },
          ]);
          
          setSelectedKlinikF((current) => [
            ...current,
            { label: data[i].nama_klinik, value: data[i].id, key: data[i].id, name: 'id_klinik' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
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
    // console.log('e', e);

    if (e.length > 0 && e[0].name === "peran") {
      // setSelectedRole(e);
      setSelectedRole(Array.isArray(e) ? e.map(x => x.value) : []);
  
      // console.log('selectedRole onChange', selectedRole);

      for (var i = 0; i < e.length; i++) {
        if (e[i].value === "Developer") {
          setEmployee(current => {
              return { ...current, is_dev: 1 }
          })

          validate(e, 'peran', 1);
        }
        
        if (e[i].value === "Manager") {
          setEmployee(current => {
              return { ...current, is_manager: 1 }
          })

          validate(e, 'peran', 1);
        }
        
        if (e[i].value === "Admin") {
          setEmployee(current => {
              return { ...current, is_admin: 1 }
          })

          validate(e, 'peran', 1);
        } 
        
        if (e[i].value === "Resepsionis") {
          setEmployee(current => {
              return { ...current, is_resepsionis: 1 }
          })

          validate(e, 'peran', 1);
        } 
        
        if (e[i].value === "Perawat") {
          setEmployee(current => {
              return { ...current, is_perawat: 1 }
          })

          validate(e, 'peran', 1);
        }
        
        if (e[i].value === "Dokter") {
          setEmployee(current => {
              return { ...current, is_dokter: 1 }
          })

          validate(e, 'peran', 1);
        } 
        
        if (e[i].value === "Manajemen") {
          setEmployee(current => {
              return { ...current, is_manajemen: 1 }
          })

          validate(e, 'peran', 1);
        } 
        
        if (e[i].value === "Finance") {
          setEmployee(current => {
              return { ...current, is_finance: 1 }
          })

          validate(e, 'peran', 1);
        } 
        
        if (e[i].value === "Kasir") {
          setEmployee(current => {
              return { ...current, is_cashier: 1 }
          })

          validate(e, 'peran', 1);
        } 
      }
    } else if (e.length <= 0) {
      setEmployee(current => {
          return { ...current, is_dev: 0, is_manager: 0, is_admin: 0, is_resepsionis: 0, is_perawat: 0, is_dokter: 0, is_manajemen: 0, is_finance: 0, is_cashier: 0 }
      })

      setSelectedRole(Array.isArray(e) ? e.map(x => x.value) : []);
      validate(e, 'peran', '');
    } else if (e.name === 'id_klinik') {
      setContract(current => {
          return { ...current, id_klinik: e ? e.value : ''}
      })

      setClinicID(e.value);
    } else if (e.name === 'provinsi') {
        setEmployee(current => {
            // return { ...current, provinsi: e.value }
            return { ...current, provinsi: e ? e.value : ''}
        })
        setSelectProvince(e); changeKota(e.key, null);
    } else if (e.name === 'kota') {
      setEmployee(current => {
          // return { ...current, kota: e.value }
          return { ...current, kota: e ? e.value : ''}
      })
      setSelectCity(e); changeKecamatan(e.key, null);
    } else if (e.name === 'kecamatan') {
      setEmployee(current => {
          // return { ...current, kecamatan: e.value }
          return { ...current, kecamatan: e ? e.value : ''}
      })
      setSelectSubdistrict(e); changeKelurahan(e.key, null);
    } else if (e.name === 'kelurahan') {
      setEmployee(current => {
          // return { ...current, kelurahan: e.value }
          return { ...current, kelurahan: e ? e.value : ''}
      })
      setSelectWard(e);
    } else if (e.name === 'tipe_izin') {
      setEmployee(current => {
          // return { ...current, tipe_izin: e.value }
          return { ...current, tipe_izin: e ? e.value : ''}
      })
      setSelectedWP(e);
      validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'tipe') {
      setEmployee(current => {
          // return { ...current, tipe: e.value }
          return { ...current, tipe: e ? e.value : ''}
      })
      setSelectedType(e);
      validate(e, 'tipe_karyawan', e.value ? e.value : '');

      if (e.value === 'Dokter') {
        setDisabledSpecialist(false);
        validate(e, 'spesialis', '');
      } else {
        setDisabledSpecialist(true);
        setEmployee(current => {
            return { ...current, spesialis: ''}
        })
        validate(e, 'spesialis', 1);
      }
    } else if (e.name === 'spesialis') {
      setEmployee(current => {
          // return { ...current, spesialis: e.value }
          return { ...current, spesialis: e ? e.value : ''}
      })
      setSelectedSpecialist(e);
      validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'status_menikah') {
      setEmployee(current => {
          // return { ...current, status_menikah: e.value }
          return { ...current, status_menikah: e ? e.value : ''}
      })
      setSelectedMaritalStatus(e);
    } else {
      if (e.target.name && e.target.name === 'jenis_kelamin') {
        if(e.target.id === 'laki') {
          setEmployee(current => {
            return { ...current, jenis_kelamin: 'Laki-laki' }
          })
        } else if(e.target.id === 'perempuan') {
          setEmployee(current => {
            return { ...current, jenis_kelamin: 'Perempuan' }
          })
        }
      // } else if (e.target.name && e.target.name === 'status_menikah') {
      //   if(e.target.id === 'menikah') {
      //     setEmployee(current => {
      //       return { ...current, status_menikah: 'Menikah' }
      //     })
      //   } else if(e.target.id === 'belumMenikah') {
      //     setEmployee(current => {
      //       return { ...current, status_menikah: 'Belum Menikah' }
      //     })
      //   }
      } else if (e.target.name && e.target.name === 'password_update') {
        setEmployeePassword(current => {
            return { ...current, password: e.target.value }
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
      } else if (e.target.name && e.target.name !== 'jenis_kelamin') {

        if (e.target.name && e.target.name === 'username') {
          setEmployee(current => {
              return { ...current, username: e.target.value }
          })
          validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
        } else if (e.target.name && e.target.name === 'password') {
          setEmployee(current => {
              return { ...current, password: e.target.value }
          })
          validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
        } else if (e.target.name && e.target.name === 'nomor_kitas') {
          setEmployee(current => {
              return { ...current, nomor_kitas: e.target.value }
          })
          validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
        } else if (e.target.name && e.target.name === 'nomor_izin') {
          setEmployee(current => {
              return { ...current, nomor_izin: e.target.value }
          })
          validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
        } else if (e.target.name && e.target.name === 'kadaluarsa_izin') {
          setEmployee(current => {
              return { ...current, kadaluarsa_izin: e.target.value }
          })
          validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
        }

        setEmployee(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
      } else {
        console.log(e);
      }
    }
    
    // console.log('employee', employee);
  }

  const onEmployeeSubmit = async (e) => {
    e.preventDefault();
    setEmployeeSubmit("process");
      
    setContract(current => {
        return { ...current, id_klinik: clinicID }
    })

    let isError = false;

    let isDev, isManager, isAdmin, isResepsionis, isPerawat, isDokter, isManajemen, isFinance, isCashier = false;

    for(let [key, value] of Object.entries(contract)) {
      if((key === 'id_klinik' && value === '')){
        validate(e, key, value);
        isError = true;
      }
    }

    for(let [key, value] of Object.entries(employee)) {
      if((key === 'username' && value === '') || (key === 'no_kitas' && value === '')  ||
        (key === 'tipe' && value === '') || (key === 'tipe_izin' && value === '') || (key === 'nomor_izin' && value === '') ||
        (key === 'kadaluarsa_izin' && value === '') || (key === 'peran' && value === '')){
        validate(e, key, value);
        isError = true;
      }

      if(dataStatus === "add") {
        if(key === 'password' && value === '') {
          validate(e, key, value);
          isError = true;
        }
      }

      key === 'is_dev' && value === 0 ? isDev = false : isDev = true
      key === 'is_manager' && value === 0 ? isManager = false : isManager = true
      key === 'is_admin' && value === 0 ? isAdmin = false : isAdmin = true
      key === 'is_resepsionis' && value === 0 ? isResepsionis = false : isResepsionis = true
      key === 'is_perawat' && value === 0 ? isPerawat = false : isPerawat = true
      key === 'is_dokter' && value === 0 ? isDokter = false : isDokter = true
      key === 'is_manajemen' && value === 0 ? isManajemen = false : isManajemen = true
      key === 'is_finance' && value === 0 ? isFinance = false : isFinance = true
      key === 'is_cashier' && value === 0 ? isCashier = false : isCashier = true

      if((key === 'tipe' && value !== '') && (key === 'spesialis' && value === '')){
        validate(e, 'spesialis', value);
        isError = true;
      }
    }

    function noPeran () {
      validate(e, 'peran', '');
      isError = true;
    }

    isDev == false && isManager == false && isAdmin == false && isResepsionis == false && isPerawat == false && isDokter == false && isManajemen == false && isFinance == false && isCashier == false && noPeran()

    // console.log('dataStatus', dataStatus);
    // console.log('isError', isError);
    // console.log('errors', errors);

    if(isError === true){
      return;
    }

    if(dataStatus === 'add') {
      try {
        const response = await employeeAPI.add(employee);
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
  
          setEmployeeID(data.id);
          // resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah karyawan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e.response.data.message,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await employeeAPI.update(employee, employeeID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah karyawan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
            
          setContract(current => {
              return { ...current, id_karyawan: data.id}
          })
  
          // resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah karyawan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e.response.data.message,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else {
      console.log('dataStatus undefined')
    }
    
    setEmployeeSubmit("done");
  };

  const onContractSubmit = async (e) => {
    e && e.preventDefault();
      
    contract.id_karyawan = employeeID;

    if(dataStatus === 'add') {
      try {
        const response = await contractAPI.add(contract);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah kontrak sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah kontrak gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e.response.data.message,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      } finally {
        !userData.roles.includes('isDev') ? getEmployee(`?searchKlinik=${userData.id_klinik}`) : getEmployee("");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await contractAPI.update(contract, contract.id);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah kontrak sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah kontrak gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e.response.data.message,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      } finally {
        !userData.roles.includes('isDev') ? getEmployee(`?searchKlinik=${userData.id_klinik}`) : getEmployee("");
        getEmployeeById("", employeeID);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    if(scroll) {
      if(window.innerWidth < 1280){
        const element = document.getElementById('manage-form-tab-mobile');
        if (element) {
          // window.scroll({
          //   top: element,
          //   behavior: "smooth"
          // })

          element.scrollIntoView({
            block: "end",
            behavior: "smooth"
          })
        }
      }
    }

    setEmployeeID('');
    setEmployeeUsername('');
    setEmployeePassword({ password: '' });
    setEmployeeStatus(0);

    setEmployee({
      username: '',
      nama: '',
      email: '',
      password: '',
      is_dev: 0,
      is_manager: 0,
      is_admin: 0,
      is_resepsionis: 0,
      is_perawat: 0,
      is_dokter: 0,
      is_manajemen: 0,
      is_finance: 0,
      is_cashier: 0,
      jenis_kelamin: '',
      nomor_kitas: '',
      tipe_izin: '',
      nomor_izin: '',
      kadaluarsa_izin: '',
      nomor_hp: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      alamat: '',
      kode_pos: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      status_menikah: '',
      tipe: '',
      spesialis: ''
    });

    setEditAddress({
      status: 0,
      nama_kota: '',
      nama_kecamatan: '',
      nama_kelurahan: ''
    })

    setSelectedRole([]);
    setSelectedWP("");
    setSelectedType("");
    setSelectedSpecialist("");
    setSelectedGender("");
    setSelectedMaritalStatus("");

    setSelectedProvince([]);
    setSelectedCity([]);
    setSelectedSubdistrict([]);
    setSelectedWard([]);
    setSelectProvince([]);
    setSelectCity([]);
    setSelectSubdistrict([]);
    setSelectWard([]);

    setDisabledSpecialist(true);
    setFieldColumn({ username: 4, email: 4 });
    setOpenPassword('block');

    setDataStatus("add");
    onLoadKlinik();
    onLoadProvinsi();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getEmployee = async (params) => {
    try {
      setIsLoading(true);
      const res = await employeeAPI.get(params);
      // console.log(res);

      dispatch({type: "GET_EMPLOYEE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_EMPLOYEE", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmployeeById = async (e, id) => {
    e && e.preventDefault();
    e && resetForm(e);
    setDataStatus("update");
    setFieldColumn({ username: 6, email: 6 });
    setOpenPassword('none');
    setRowSelected(id);

    if(window.innerWidth < 1280){
      const element = document.getElementById('manage-form-tab-mobile');
      if (element) {
        // window.scroll({
        //   top: element,
        //   behavior: "smooth"
        // })

        element.scrollIntoView({
          block: "end",
          behavior: "smooth"
        })
      }
    }

    try {
      const res = await employeeAPI.get(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setEmployeeID(data.id);
      setEmployee({
        username: data.username,
        nama: data.nama,
        email: data.email,
        password: '',
        is_dev: data.is_dev,
        is_manager: data.is_manager,
        is_admin: data.is_admin,
        is_resepsionis: data.is_resepsionis,
        is_perawat: data.is_perawat,
        is_dokter: data.is_dokter,
        is_manajemen: data.is_manajemen,
        is_finance: data.is_finance,
        is_cashier: data.is_cashier,
        jenis_kelamin: data.jenis_kelamin,
        nomor_kitas: data.nomor_kitas,
        tipe_izin: data.tipe_izin,
        nomor_izin: data.nomor_izin,
        // kadaluarsa_izin: data.kadaluarsa_izin.substring(0, 10),
        // kadaluarsa_izin: moment(data.kadaluarsa_izin).format("yyyy MM dd"),
        kadaluarsa_izin: data.kadaluarsa_izin,
        nomor_hp: data.nomor_hp,
        tempat_lahir: data.tempat_lahir,
        // tanggal_lahir: data.tanggal_lahir.substring(0, 10),
        // tanggal_lahir: moment(data.tanggal_lahir).format("yyyy MM dd"),
        tanggal_lahir: data.tanggal_lahir,
        alamat: data.alamat,
        kode_pos: data.kode_pos,
        provinsi: data.provinsi,
        kota: data.kota,
        kecamatan: data.kecamatan,
        kelurahan: data.kelurahan,
        status_menikah: data.status_menikah,
        tipe: data.tipe,
        spesialis: data.spesialis
      });
      setEmployeeStatus(data.is_active);

      // console.log(employee);

      if (data.is_dev === 1) {
        setSelectedRole((current) => [
          ...current, 'Developer'
        ]);
      }
      
      if (data.is_manager === 1) {
        setSelectedRole((current) => [
          ...current, 'Manager'
        ]);
      }
      
      if (data.is_admin === 1) {
        setSelectedRole((current) => [
          ...current, 'Admin'
        ]);
      }
      
      if (data.is_resepsionis === 1) {
        setSelectedRole((current) => [
          ...current, 'Resepsionis'
        ]);
      }
      
      if (data.is_perawat === 1) {
        setSelectedRole((current) => [
          ...current, 'Perawat'
        ]);
      }
      
      if (data.is_dokter === 1) {
        setSelectedRole((current) => [
          ...current, 'Dokter'
        ]);
      }
      
      if (data.is_manajemen === 1) {
        setSelectedRole((current) => [
          ...current, 'Manajemen'
        ]);
      }
      
      if (data.is_finance === 1) {
        setSelectedRole((current) => [
          ...current, 'Finance'
        ]);
      }
      
      if (data.is_cashier === 1) {
        setSelectedRole((current) => [
          ...current, 'Kasir'
        ]);
      }

      // console.log('selectedRole', selectedRole);
      setSelectedWP({tipe_izin: data.tipe_izin ? e.value : ''});
      setSelectedType({tipe: data.tipe ? e.value : ''});
      if (data.tipe === 'Dokter') {
        setDisabledSpecialist(false);
      }
      setSelectedSpecialist({spesialis: data.spesialis ? e.value : ''});
      setSelectedGender(data.jenis_kelamin);
      // setSelectedMaritalStatus(data.status_menikah);
      setSelectedMaritalStatus({status_menikah: data.status_menikah ? e.value : ''});

      setSelectProvince({provinsi: data.provinsi ? e.value : ''});
      setSelectCity({kota: data.kota ? e.value : ''});
      setSelectSubdistrict({kecamatan: data.kecamatan ? e.value : ''});
      setSelectWard({kelurahan: data.kelurahan ? e.value : ''});

      setEditAddress({
        status: 1,
        nama_kota: data.kota,
        nama_kecamatan: data.kecamatan,
        nama_kelurahan: data.kelurahan
      })

      if(data.provinsi && data.kota && data.kecamatan && data.kelurahan) {
        let id_provinsi = selectedProvince.find(item => item.value === data.provinsi).key || '';
        changeKota(id_provinsi, editAddress);
      }

      // let id_kota = selectedCity.find(item => item.value === data.kota).key || '';
      // console.log('id_kota: ', id_kota);
      // changeKecamatan(id_kota);

      // let id_kecamatan = selectedSubdistrict.find(item => item.value === data.kecamatan).key || '';
      // console.log('id_kecamatan ', id_kecamatan);
      // changeKelurahan(id_kecamatan);
        
      getContractByEmployeeId(data.id);
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  const getContractByEmployeeId = async (id) => {
    // e && e.preventDefault();
    // e && resetForm(e);

    try {
      const res = await contractAPI.getByEmployee(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setContractID(data.id);
      setContract({
        id: data.id,
        id_klinik: data.id_klinik,
        id_karyawan: data.id_karyawan
      });
      setClinicID(data.id_klinik);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, employeeID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, employeeID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (employeeID && employeeStatus == 1) {
        return <ButtonArchive/>;
      } else if (employeeID && employeeStatus == 0) {
        return <ButtonActive/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, employeeID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, employeeID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (employeeID && employeeStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (employeeID && employeeStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [employeePassword, setEmployeePassword] = useState({
    // id: employeeID,
    password: ''
  });

  const [employeeUsername, setEmployeeUsername] = useState('');

  const changePasswordById = async (e, id) => {
    e.preventDefault();
    // resetForm(e);
    setDataStatus("update");
    setFieldColumn({ username: 6, email: 6 });
    setOpenPassword('none');
    setModalPassword(true);

    try {
      const res = await employeeAPI.get(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setEmployeeID(data.id);
      setEmployeeUsername(data.username);
      setEmployeePassword({ password: '' });
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  const onChangePasswordSubmit = async (e) => {
    e.preventDefault();

    if (dataStatus === 'update') {
      try {
        const response = await employeeAPI.updatePassword(employeePassword, employeeID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah password karyawan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
          setModalPassword(false);
          setEmployeePassword({ password: '' });
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah password karyawan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e.response.data.message,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });
  
        console.log(e);
      }
    } else {
      console.log('dataStatus wrong')
    }
  };

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await employeeAPI.get(`/${id}`);
      let data = res.data.data[0];

      setEmployeeID(data.id);
      setEmployeeStatus(data.is_active);
      setEmployeeUsername(data.username);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employeeStatus == 1) {
        const response = await employeeAPI.archive("", employeeID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip karyawan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip karyawan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await employeeAPI.activate("", employeeID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi karyawan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi karyawan gagal: ${response.message}`,
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
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      !userData.roles.includes('isDev') ? getEmployee(`?searchKlinik=${userData.id_klinik}`) : getEmployee("");
      getEmployeeById("", employeeID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await employeeAPI.get(`/${id}`);
      let data = res.data.data[0];

      setEmployeeID(data.id);
      setEmployeeUsername(data.username);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await employeeAPI.delete(employeeID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus karyawan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus karyawan gagal: ${response.message}`,
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
        html: e.response.data.message,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    } finally {
      !userData.roles.includes('isDev') ? getEmployee(`?searchKlinik=${userData.id_klinik}`) : getEmployee("");
    }
  };

  const [search, setSearch] = useState("");
  const [searchTipe, setSearchTipe] = useState("");
  const [searchSpesialis, setSearchSpesialis] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchKlinik, setSearchKlinik] = useState(clinicID);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, search, searchTipe, searchSpesialis, searchStatus, searchKlinik, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
    
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (search !== "") {
      params = `${params}&search=${search}`;
    }
    if (searchTipe !== "") {
      params = `${params}&searchTipe=${searchTipe}`;
    }
    if (searchSpesialis !== "") {
      params = `${params}&searchSpesialis=${searchSpesialis}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (searchKlinik !== "") {
      params = `${params}&searchKlinik=${searchKlinik}`;
    }
    if (!userData.roles.includes('isDev')) {
      params = `${params}&searchKlinik=${userData.id_klinik}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    setRowSelected(false);
    getEmployee(params);

    onLoadKlinik();
    onLoadProvinsi();

    // if(selectedCity.length > 0 && editAddress.status === 2) {
    //   // console.log('changeKota', selectedCity);
    //   // console.log('status', editAddress.status);

    //   let id_kota = selectedCity.find(item => item.value === editAddress.nama_kota).key || '';
    //   changeKecamatan(id_kota, editAddress);
    // }

    // if(selectedSubdistrict.length > 0 && editAddress.status === 3) {
    //   // console.log('changeKecamatan', selectedSubdistrict);
    //   // console.log('status', editAddress.status);

    //   let id_kecamatan = selectedSubdistrict.find(item => item.value === editAddress.nama_kecamatan).key || '';
    //   changeKelurahan(id_kecamatan, editAddress);
    // }

    // if(dataStatus === "add") {
    //   if(selectedRole) {
    //     if (!selectedRole.includes('Developer')) {
    //       setEmployee(current => {
    //         return { ...current, is_dev: 0 }
    //       })
    //     }
        
    //     if (!selectedRole.includes('Manager')) {
    //       setEmployee(current => {
    //         return { ...current, is_manager: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Admin')) {
    //       setEmployee(current => {
    //         return { ...current, is_admin: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Resepsionis')) {
    //       setEmployee(current => {
    //         return { ...current, is_resepsionis: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Perawat')) {
    //       setEmployee(current => {
    //         return { ...current, is_perawat: 0 }
    //       })
    //     }
        
    //     if (!selectedRole.includes('Dokter')) {
    //       setEmployee(current => {
    //         return { ...current, is_dokter: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Manajemen')) {
    //       setEmployee(current => {
    //         return { ...current, is_manajemen: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Finance')) {
    //       setEmployee(current => {
    //         return { ...current, is_finance: 0 }
    //       })
    //     } 

    //     if (!selectedRole.includes('Kasir')) {
    //       setEmployee(current => {
    //         return { ...current, is_cashier: 0 }
    //       })
    //     } 
    //   }
    // } else if(dataStatus === "update") {
    //   if(selectedRole) {
    //     selectedRole.includes('Developer') ?
    //       setEmployee(current => {
    //           return { ...current, is_dev: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_dev: 0 }
    //       })

    //     selectedRole.includes('Manager') ?
    //       setEmployee(current => {
    //           return { ...current, is_manager: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_manager: 0 }
    //       })

    //     selectedRole.includes('Admin') ?
    //       setEmployee(current => {
    //           return { ...current, is_admin: 0 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_admin: 1 }
    //       })

    //     selectedRole.includes('Resepsionis') ?
    //       setEmployee(current => {
    //           return { ...current, is_resepsionis: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_resepsionis: 0 }
    //       })

    //     selectedRole.includes('Perawat') ?
    //       setEmployee(current => {
    //           return { ...current, is_perawat: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_perawat: 0 }
    //       })

    //     selectedRole.includes('Dokter') ?
    //       setEmployee(current => {
    //           return { ...current, is_dokter: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_dokter: 0 }
    //       })

    //     selectedRole.includes('Manajemen') ?
    //       setEmployee(current => {
    //           return { ...current, is_manajemen: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_manajemen: 0 }
    //       })

    //     selectedRole.includes('Finance') ?
    //       setEmployee(current => {
    //           return { ...current, is_finance: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_finance: 0 }
    //       })

    //     selectedRole.includes('Kasir') ?
    //       setEmployee(current => {
    //           return { ...current, is_cashier: 1 }
    //       }) : 
    //       setEmployee(current => {
    //           return { ...current, is_cashier: 0 }
    //       })

    //     // console.log('selectedRole onUpdate', selectedRole);
    //   }
    // }
  // }, [limit, search, searchTipe, searchSpesialis, searchStatus, sortBy, sortOrder, currentPage, editAddress, selectedRole ]);
  }, [limit, search, searchTipe, searchSpesialis, searchStatus, searchKlinik, sortBy, sortOrder, currentPage ]);

  useEffect(() => {
    if(selectedCity.length > 0 && editAddress.status === 2) {
      // console.log('changeKota', selectedCity);
      // console.log('status', editAddress.status);

      let id_kota = editAddress.nama_kota ? selectedCity.find(item => item.value === editAddress.nama_kota).key : '';
      changeKecamatan(id_kota, editAddress);
    }

    if(selectedSubdistrict.length > 0 && editAddress.status === 3) {
      // console.log('changeKecamatan', selectedSubdistrict);
      // console.log('status', editAddress.status);

      let id_kecamatan = editAddress.nama_kecamatan ? selectedSubdistrict.find(item => item.value === editAddress.nama_kecamatan).key : '';
      changeKelurahan(id_kecamatan, editAddress);
    }
  }, [ editAddress ]);

  useEffect(() => {
    if(dataStatus === "add") {
      if(selectedRole) {
        if (!selectedRole.includes('Developer')) {
          setEmployee(current => {
            return { ...current, is_dev: 0 }
          })
        }
        
        if (!selectedRole.includes('Manager')) {
          setEmployee(current => {
            return { ...current, is_manager: 0 }
          })
        } 

        if (!selectedRole.includes('Admin')) {
          setEmployee(current => {
            return { ...current, is_admin: 0 }
          })
        } 

        if (!selectedRole.includes('Resepsionis')) {
          setEmployee(current => {
            return { ...current, is_resepsionis: 0 }
          })
        } 

        if (!selectedRole.includes('Perawat')) {
          setEmployee(current => {
            return { ...current, is_perawat: 0 }
          })
        }
        
        if (!selectedRole.includes('Dokter')) {
          setEmployee(current => {
            return { ...current, is_dokter: 0 }
          })
        } 

        if (!selectedRole.includes('Manajemen')) {
          setEmployee(current => {
            return { ...current, is_manajemen: 0 }
          })
        } 

        if (!selectedRole.includes('Finance')) {
          setEmployee(current => {
            return { ...current, is_finance: 0 }
          })
        } 

        if (!selectedRole.includes('Kasir')) {
          setEmployee(current => {
            return { ...current, is_cashier: 0 }
          })
        } 
      }
    } else if(dataStatus === "update") {
      if(selectedRole) {
        selectedRole.includes('Developer') ?
          setEmployee(current => {
              return { ...current, is_dev: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_dev: 0 }
          })

        selectedRole.includes('Manager') ?
          setEmployee(current => {
              return { ...current, is_manager: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_manager: 0 }
          })

        selectedRole.includes('Admin') ?
          setEmployee(current => {
              return { ...current, is_admin: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_admin: 0 }
          })

        selectedRole.includes('Resepsionis') ?
          setEmployee(current => {
              return { ...current, is_resepsionis: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_resepsionis: 0 }
          })

        selectedRole.includes('Perawat') ?
          setEmployee(current => {
              return { ...current, is_perawat: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_perawat: 0 }
          })

        selectedRole.includes('Dokter') ?
          setEmployee(current => {
              return { ...current, is_dokter: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_dokter: 0 }
          })

        selectedRole.includes('Manajemen') ?
          setEmployee(current => {
              return { ...current, is_manajemen: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_manajemen: 0 }
          })

        selectedRole.includes('Finance') ?
          setEmployee(current => {
              return { ...current, is_finance: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_finance: 0 }
          })

        selectedRole.includes('Kasir') ?
          setEmployee(current => {
              return { ...current, is_cashier: 1 }
          }) : 
          setEmployee(current => {
              return { ...current, is_cashier: 0 }
          })

        // console.log('selectedRole onUpdate', selectedRole);
      }
    }
  }, [ selectedRole ]);
    
  useEffect(() => {
    if (employeeSubmit === "done") {
      setTimeout(() => {

        if(employee.username !== "" && employeeID) {
          onContractSubmit("");
        }

        setTimeout(() => {
          resetForm();
        }, 2000)
      }, 1000);
    };
  }, [ employeeSubmit ]);

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
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <Row>
                  <Colxx sm="8" md="8" xl="8" className="col-sm-8-mobile">
                    Data Karyawan & Tenaga Kesehatan
                  </Colxx>
                  <Colxx sm="4" md="4" xl="4" className="col-sm-4-mobile">
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      className="mb-4"
                      onClick={(e) => resetForm(e, true)}
                    >
                      Tambah
                    </Button>
                  </Colxx>
                </Row>
              </CardTitle>
              <FormGroup row style={{ margin: '0px', width: '100%' }}>
                { userData.roles.includes('isDev') &&
                <Colxx sm="12" md="12" style={{ paddingLeft: '0px', paddingRight: '0px' }} className="mb-3">
                  <Label for="klinik">
                    Klinik
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="klinik"
                    onChange={(e) => setSearchKlinik(e.value)}
                    options={selectedKlinikF}
                    defaultValue={{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }}
                  />
                </Colxx>
                }
                <Colxx sm="12" md="6" style={{ paddingLeft: '0px' }}>
                  <Label for="tipe">
                    Tipe
                  </Label>
                  { !userData.roles.includes('isDev') &&
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="tipe"
                    // value={selectedTypeF}
                    // onChange={setSelectedTypeF}
                    onChange={(e) => setSearchTipe(e.value)}
                    options={selectTypeF.filter(roleChoices => roleChoices.label != 'Manajemen').map(roleChoices => roleChoices)}
                    defaultValue={{ label: "Semua Tipe", value: "", key: 0, name: "tipe" }}
                    isSearchable={false}
                  /> }
                  { userData.roles.includes('isDev') &&
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="tipe"
                    // value={selectedTypeF}
                    // onChange={setSelectedTypeF}
                    onChange={(e) => setSearchTipe(e.value)}
                    options={selectTypeF}
                    defaultValue={{ label: "Semua Tipe", value: "", key: 0, name: "tipe" }}
                    isSearchable={false}
                  /> }
                </Colxx>
                <Colxx sm="12" md="6" style={{ paddingRight: '0px' }}>
                  <Label for="spesialis">
                    Spesialisasi
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="spesialis"
                    // value={selectedSpecialistF}
                    // onChange={setSelectedSpecialistF}
                    onChange={(e) => setSearchSpesialis(e.value)}
                    options={selectSpecialistF}
                    defaultValue={{ label: "Semua Spesialisasi", value: "", key: 0, name: "spesialis" }}
                  />
                </Colxx>
                <Colxx sm="12" md="12" style={{ paddingLeft: '0px', paddingRight: '0px' }} className="mt-3">
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
                    defaultValue={{ label: "Semua Status", value: "", key: 0, name: "status" }}
                    isSearchable={false}
                  />
                </Colxx>
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="search"
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
              <Table className={tableClass}>
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Karyawan / Tenaga Kesehatan</th>
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
                  ) : 
                  employeeData.length > 0 ? (
                    employeeData.map((data) => (
                      <tr key={data.id} onClick={(e) => getEmployeeById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          { userData.roles.includes('isDev') && data.klinik && data.klinik + ", "}{data.tipe ? data.tipe : "-"}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getEmployeeById(e, data.id)}
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
                totalPage={employeeTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={employeeTotalPage < 4 ? employeeTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4 manage-form" id="manage-form-tab-mobile">
          <Card className="mb-8">
            { dataStatus ?
            <CardBody>
              <CardTitle>
                <Row>
                  <Colxx sm="10" className="card-title-mobile">
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Karyawan & Tenaga Kesehatan' : 'Form Ubah Karyawan & Tenaga Kesehatan' }
                    {/* Form Manajemen Karyawan & Tenaga Kesehatan */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager') ||
                    userData.roles.includes('isAdmin')) && employeeID &&
                      <>
                        <Button color="light" size="xs"
                          onClick={(e) => changePasswordById(e, employeeID)}
                          >
                          <i className="simple-icon-lock"></i>&nbsp;Ganti Password
                        </Button>
                        <span>&nbsp;&nbsp;</span>
                      </>
                    }
                    {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && employeeID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, employeeID)}
                        >
                        <i className="simple-icon-trash"></i>&nbsp;Hapus
                      </Button>
                    } */}
                    {dataStatus === "update" && (userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager') ||
                    userData.roles.includes('isAdmin')) && employeeID &&
                      <UncontrolledDropdown>
                        <DropdownToggle color="default">
                          <i className="simple-icon-options-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem onClick={(e) => changePasswordById(e, employeeID)}>
                            <i className="simple-icon-lock"></i>&nbsp;Ganti Password
                          </DropdownItem>
                          {<IsActiveDropdown/>}
                          {(userData.roles.includes('isDev') ||
                          userData.roles.includes('isManager')) && employeeID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, employeeID)}>
                                <i className="simple-icon-trash"></i>&nbsp;Hapus
                              </DropdownItem>
                            </>
                          }
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    }
                  </Colxx>
                </Row>
              </CardTitle>
              <Form className="av-tooltip tooltip-right-top" onSubmit={onEmployeeSubmit}>
                <FormGroup row>
                  { userData.roles.includes('isDev') &&
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="id_klinik">Klinik
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
                        name="id_klinik"
                        id="id_klinik"
                        options={selectedKlinik}
                        value={selectedKlinik.find(item => item.value === contract.id_klinik)}
                        onChange={onChange}
                        placeholder="Pilih Klinik"
                      />
                      {errors.id_klinik && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.id_klinik}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>
                  }
                  <Colxx sm={fieldColumn.username}>
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
                        value={employee.username}
                        onChange={onChange}
                        // defaultValue={employee.username}
                      />
                      {errors.username && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.username}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={fieldColumn.email}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4} style={{ display: openPassword }}>
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
                        placeholder="Password"
                        value={employee.password}
                        onChange={onChange}
                      />
                      {errors.password && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

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
                      <Input
                        type="number"
                        name="nomor_kitas"
                        id="nomor_kitas"
                        placeholder="No. KITAS"
                        value={employee.nomor_kitas}
                        onChange={onChange}
                        pattern="[0-9]*"
                      />
                      {errors.nomor_kitas && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.nomor_kitas}
                        </div>
                      )}
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
                        placeholder="Nama Lengkap"
                        value={employee.nama}
                        onChange={onChange}
                      />
                      {errors.nama && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.nama}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="tipe">
                          Tipe
                          <span
                            className="required text-danger"
                            aria-required="true"
                          >
                            {" "}
                            *
                          </span>
                        </Label>
                        { !userData.roles.includes('isDev') &&
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="tipe"
                          // value={selectedTypeF}
                          // onChange={setSelectedTypeF}
                          onChange={(e) => setSearchTipe(e.value)}
                          options={selectType.filter(roleChoices => roleChoices.label != 'Manajemen').map(roleChoices => roleChoices) || { label: "Pilih Tipe", value: "", key: 0, name: "tipe" }}
                          isSearchable={false}
                        /> }
                        { userData.roles.includes('isDev') &&
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="tipe"
                          id="tipe"
                          value={selectType.find(item => item.value === employee.tipe) || { label: "Pilih Tipe", value: "", key: 0, name: "tipe" }}
                          // value={selectedType}
                          options={selectType}
                          onChange={onChange}
                        /> }
                        {errors.tipe && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.tipe}
                          </div>
                        )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="spesialis">Spesialisasi
                          { disabledSpecialist === false &&
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          }
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="spesialis"
                          id="spesialis"
                          value={selectSpecialist.find(item => item.value === employee.spesialis) || { label: "Pilih Spesialisasi", value: "", key: 0, name: "spesialis" }}
                          // value={selectedSpecialist}
                          options={selectSpecialist}
                          onChange={onChange}
                          isDisabled={disabledSpecialist}
                        />
                        {errors.spesialis && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.spesialis}
                          </div>
                        )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="alamat">Alamat</Label>
                      <Input
                        type="text"
                        name="alamat"
                        id="alamat"
                        placeholder="Alamat"
                        value={employee.alamat}
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
                        value={employee.kode_pos}
                        pattern="[0-9]*"
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
                        value={selectedProvince.find(item => item.value === employee.provinsi) || { label: "Pilih Provinsi", value: "", key: 0, name: 'provinsi' }}
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
                        value={selectedCity.find(item => item.value === employee.kota) || { label: "Pilih Kota / Kabupaten", value: "", key: 0, name: 'kota' }}
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
                        value={selectedSubdistrict.find(item => item.value === employee.kecamatan) || { label: "Pilih Kecamatan", value: "", key: 0, name: 'kecamatan' }}
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
                        value={selectedWard.find(item => item.value === employee.kelurahan) || { label: "Pilih Kelurahan", value: "", key: 0, name: 'kelurahan' }}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="nomor_hp">No. HP</Label>
                      <Input
                        type="number"
                        name="nomor_hp"
                        id="nomor_hp"
                        placeholder="No. HP"
                        value={employee.nomor_hp}
                        pattern="[0-9]*"
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="jenis_kelamin">
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
                        <Colxx sm={12} md={5} xl={5}>
                          <CustomInput
                            type="radio"
                            id="laki"
                            name="jenis_kelamin"
                            label="Laki-laki"
                            checked={employee.jenis_kelamin === 'Laki-laki'}
                            value={selectedGender}
                            onChange={onChange}
                          />
                        </Colxx>
                        <Colxx sm={12} md={7} xl={7}>
                          <CustomInput
                            type="radio"
                            id="perempuan"
                            name="jenis_kelamin"
                            label="Perempuan"
                            checked={employee.jenis_kelamin === 'Perempuan'}
                            value={selectedGender}
                            onChange={onChange}
                          />
                        </Colxx>
                      </Row>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="status_menikah">Status Menikah</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="status_menikah"
                        id="status_menikah"
                        options={selectMaritalStatus}
                        value={selectMaritalStatus.find(item => item.value === employee.status_menikah) || { label: "Pilih Status", value: "", key: 0, name: "status_menikah" }}
                        // value={selectedWP}
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
                        value={employee.tempat_lahir}
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
                        value={employee.tanggal_lahir}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="tipe_izin">
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
                        options={selectWP}
                        value={selectWP.find(item => item.value === employee.tipe_izin) || { label: "Pilih Tipe Izin", value: "", key: 0, name: "tipe_izin" }}
                        // value={selectedWP}
                        onChange={onChange}
                      />
                      {errors.tipe_izin && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.tipe_izin}
                          </div>
                        )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="nomor_izin">
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
                        name="nomor_izin"
                        id="nomor_izin"
                        placeholder="No. Izin"
                        value={employee.nomor_izin}
                        onChange={onChange}
                      />
                      {errors.nomor_izin && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.nomor_izin}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="kadaluarsa_izin">
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
                        name="kadaluarsa_izin"
                        id="kadaluarsa_izin"
                        placeholder="Kadaluarsa Izin"
                        value={employee.kadaluarsa_izin}
                        onChange={onChange}
                      />
                      {errors.kadaluarsa_izin && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.kadaluarsa_izin}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
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
                      { userData.roles.includes('isDev') ?
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            name="peran"
                            id="peran"
                            value={selectRole.filter(item => selectedRole.includes(item.value))}
                            options={selectRole.filter(roleChoices => roleChoices.label != 'Developer').map(roleChoices => roleChoices)}
                            onChange={onChange}
                            placeholder="Pilih Peran"
                          />
                        : userData.roles.includes('isManager') ?
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            name="peran"
                            id="peran"
                            value={selectRole.filter(item => selectedRole.includes(item.value))}
                            options={selectRole.filter(roleChoices => roleChoices.label != 'Developer' && roleChoices.label != 'Manager' && roleChoices.label != 'Admin' && roleChoices.label != 'Manajemen' && roleChoices.label != 'Finance').map(roleChoices => roleChoices)}
                            onChange={onChange}
                            placeholder="Pilih Peran"
                          />
                        : userData.roles.includes('isAdmin') ?
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            name="peran"
                            id="peran"
                            value={selectRole.filter(item => selectedRole.includes(item.value))}
                            options={selectRole.filter(roleChoices => roleChoices.label != 'Developer' && roleChoices.label != 'Manager' && roleChoices.label != 'Admin' && roleChoices.label != 'Manajemen' && roleChoices.label != 'Finance').map(roleChoices => roleChoices)}
                            onChange={onChange}
                            placeholder="Pilih Peran"
                          />
                        : ''
                      }
                      {errors.peran && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.peran}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>
                  
                  {/* { userData.roles.includes('isAdmin') &&
                    <Colxx sm={12}>
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
                          // value={selectedRole}
                          value={selectRole.filter(item => selectedRole.includes(item.value)) || 'Pilih Peran'}
                          options={selectRole.filter(roleChoices => roleChoices.label != 'Developer' && roleChoices.label != 'Manager' && roleChoices.label != 'Admin' && roleChoices.label != 'Manajemen' && roleChoices.label != 'Finance').map(roleChoices => roleChoices)}
                          onChange={onChange}
                        />
                        {errors.peran && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.peran}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx> }

                  { userData.roles.includes('isManager') &&
                    <Colxx sm={12}>
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
                          // value={selectedRole}
                          value={selectRole.filter(item => selectedRole.includes(item.value)) || 'Pilih Peran'}
                          options={selectRole.filter(roleChoices => roleChoices.label != 'Developer' && roleChoices.label != 'Manager' && roleChoices.label != 'Manajemen').map(roleChoices => roleChoices)}
                          onChange={onChange}
                        />
                        {errors.peran && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.peran}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  }

                  { userData.roles.includes('isDev') &&
                    <Colxx sm={12}>
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
                          // value={selectedRole}
                          value={selectRole.filter(item => selectedRole.includes(item.value)) || ''}
                          // options={selectRole}
                          options={selectRole.filter(roleChoices => roleChoices.label != 'Developer').map(roleChoices => roleChoices)}
                          onChange={onChange}
                        />
                        {errors.peran && (
                          <div className="rounded invalid-feedback d-block">
                            {errors.peran}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  } */}
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
                      // onClick={(e) => onEmployeeSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih karyawan / tenaga kesehatan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data karyawan / tenaga kesehatan.
                  Silahkan klik tombol tambah untuk menambahkan karyawan / tenaga kesehatan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalPassword}
          toggle={() => setModalPassword(!modalPassword)}
        >
          <ModalHeader>
            Ubah Password {employeeUsername}
          </ModalHeader>
          <ModalBody className="av-tooltip tooltip-right-top">
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
              name="password_update"
              placeholder="Password"
              value={employeePassword.password}
              onChange={onChange}
            />
            {errors.password_update && (
              <div className="rounded invalid-feedback d-block">
                {errors.password_update}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              outline
              color="danger"
              onClick={() => setModalPassword(false)}
            >
              Batal
            </Button>
            <Button
              color="primary"
              onClick={(e) => onChangePasswordSubmit(e)}
            >
              Simpan
            </Button>{' '}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Karyawan / Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {employeeStatus == 1 ?  'mengarsipkan akun'  : 'aktivasi akun' } <b>{employeeUsername}</b>?</h5>
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
          <ModalHeader>Hapus Karyawan / Tenaga Kesehatan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus akun <b>{employeeUsername}</b>?</h5>
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

      {/* <Button
        color="primary"
        className="float-btn"
        onClick={(e) => resetForm(e, true)}
      >
        <i className="iconsminds-male-female"></i> Tambah Karyawan
      </Button> */}
    </>
  );
};
export default Data;