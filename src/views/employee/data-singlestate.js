import React, { useEffect, useState, useRef } from "react";
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

import employeeAPI from "api/employee";
import Swal from "sweetalert2";

const selectRole = [
  // { label: 'Developer', value: 'Developer', key: 0 },
  // { label: 'Manager', value: 'Manager', key: 1 },
  { label: "Admin", value: "Admin", key: 2, name: "peran" },
  { label: "Resepsionis", value: "Resepsionis", key: 3, name: "peran" },
  { label: "Perawat", value: "Perawat", key: 4, name: "peran" },
  { label: "Dokter", value: "Dokter", key: 5, name: "peran" },
  { label: "Manajemen", value: "Manajemen", key: 6, name: "peran" },
];

const selectType = [
  { label: "Admin", value: "Admin", key: 1, name: "tipe" },
  { label: "Resepsionis", value: "Resepsionis", key: 2, name: "tipe" },
  { label: "Perawat", value: "Perawat", key: 3, name: "tipe" },
  { label: "Dokter", value: "Dokter", key: 4, name: "tipe" },
  { label: "Manajemen", value: "Manajemen", key: 5, name: "tipe" },
];

const selectWP = [
  { label: "SIP", value: "SIP", key: 0, name: 'tipe_izin' },
  { label: "STR", value: "STR", key: 1, name: 'tipe_izin' },
];

const selectSpecialist = [
  { label: "Anak", value: "Anak", key: 0, name: 'spesialis' },
  { label: "Andrologi", value: "Andrologi", key: 1, name: 'spesialis' },
  { label: "Anestesiologi dan Terapi Intensif", value: "Anestesiologi dan Terapi Intensif", key: 2, name: 'spesialis' },
  { label: "Akupunktur Medik", value: "Akupunktur Medik", key: 3, name: 'spesialis' },
  { label: "Bedah", value: "Bedah", key: 4, name: 'spesialis' },
  { label: "Bedah Anak", value: "Bedah Anak", key: 5, name: 'spesialis' },
  { label: "Bedah Plastik, Rekonstruksi, dan Estetik", value: "Bedah Plastik, Rekonstruksi, dan Estetik", key: 6, name: 'spesialis' },
  { label: "Bedah Saraf", value: "Bedah Saraf", key: 7, name: 'spesialis' },
  { label: "Bedah Toraks, Kardiak, dan Vaskular", value: "Bedah Toraks, Kardiak, dan Vaskular", key: 8, name: 'spesialis' },
  { label: "Dermatologi dan Venereologi", value: "Dermatologi dan Venereologi", key: 9, name: 'spesialis' },
  { label: "Kegawatdaruratan Medik", value: "Kegawatdaruratan Medik", key: 10, name: 'spesialis' },
  { label: "Farmakologi Klinik", value: "Farmakologi Klinik", key: 11, name: 'spesialis' },
  { label: "Forensik dan Medikolegal", value: "Forensik dan Medikolegal", key: 12, name: 'spesialis' },
  { label: "Gizi Klinik", value: "Gizi Klinik", key: 13, name: 'spesialis' },
  { label: "Jantung dan Pembuluh Darah", value: "Jantung dan Pembuluh Darah", key: 14, name: 'spesialis' },
  { label: "Kedokteran Fisik dan Rehabilitasi", value: "Kedokteran Fisik dan Rehabilitasi", key: 15, name: 'spesialis' },
  { label: "Kedokteran Jiwa", value: "Kedokteran Jiwa", key: 16, name: 'spesialis' },
  { label: "Kedokteran Kelautan", value: "Kedokteran Kelautan", key: 17, name: 'spesialis' },
  { label: "Kedokteran Keluarga Layanan Primer", value: "Kedokteran Keluarga Layanan Primer", key: 18, name: 'spesialis' },
  { label: "Kedokteran Nuklir dan Teranostik Molekuler", value: "Kedokteran Nuklir dan Teranostik Molekuler", key: 19, name: 'spesialis' },
  { label: "Kedokteran Okupasi", value: "Kedokteran Okupasi", key: 20, name: 'spesialis' },
  { label: "Kedokteran Olahraga", value: "Kedokteran Olahraga", key: 21, name: 'spesialis' },
  { label: "Kedokteran Penerbangan", value: "Kedokteran Penerbangan", key: 22, name: 'spesialis' },
  { label: "Mikrobiologi Klinik", value: "Mikrobiologi Klinik", key: 23, name: 'spesialis' },
  { label: "Neurologi", value: "Neurologi", key: 24, name: 'spesialis' },
  { label: "Obstetri dan Ginekologi", value: "Obstetri dan Ginekologi", key: 25, name: 'spesialis' },
  { label: "Oftalmologi", value: "Oftalmologi", key: 26, name: 'spesialis' },
  { label: "Onkologi Radiasi", value: "Onkologi Radiasi", key: 27, name: 'spesialis' },
  { label: "Orthopaedi dan Traumatologi", value: "Orthopaedi dan Traumatologi", key: 28, name: 'spesialis' },
  { label: "Parasitologi Klinik", value: "Parasitologi Klinik", key: 29, name: 'spesialis' },
  { label: "Patologi Anatomi", value: "Patologi Anatomi", key: 30, name: 'spesialis' },
  { label: "Patologi Klinik", value: "Patologi Klinik", key: 31, name: 'spesialis' },
  { label: "Penyakit Dalam", value: "Penyakit Dalam", key: 32, name: 'spesialis' },
  { label: "Pulmonologi dan Kedokteran Respirasi", value: "Pulmonologi dan Kedokteran Respirasi", key: 33, name: 'spesialis' },
  { label: "Radiologi", value: "Radiologi", key: 34, name: 'spesialis' },
  { label: "Telinga Hidung Tenggorok Bedah Kepala Leher", value: "Telinga Hidung Tenggorok Bedah Kepala Leher", key: 35, name: 'spesialis' },
  { label: "Urologi", value: "Urologi", key: 36, name: 'spesialis' },
  { label: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", value: "Bedah Mulut dan Maksilofasial (Dokter Gigi)", key: 37, name: 'spesialis' },
  { label: "Kedokteran Gigi Anak (Dokter Gigi)", value: "Kedokteran Gigi Anak (Dokter Gigi)", key: 38, name: 'spesialis' },
  { label: "Konservasi Gigi (Dokter Gigi)", value: "Konservasi Gigi (Dokter Gigi)", key: 39, name: 'spesialis' },
  { label: "Ortodonsia (Dokter Gigi)", value: "Ortodonsia (Dokter Gigi)", key: 40, name: 'spesialis' },
  { label: "Odontologi Forensik (Dokter Gigi)", value: "Odontologi Forensik (Dokter Gigi)", key: 41, name: 'spesialis' },
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
  const [dataStatus, setDataStatus] = useState("add");

  const [selectedTypeF, setSelectedTypeF] = useState("");
  const [selectedSpecialistF, setSelectedSpecialistF] = useState("");

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedWP, setSelectedWP] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
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

  const [disabledSpecialist, setDisabledSpecialist] = useState(true);
  const [employeeID, setEmployeeID] = useState('');

  const [ employee, setEmployee ] = useState({
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

    if (e.length > 0 && e[0].name === "peran") {
      for (var i = 0; i < e.length; i++) {
        if (e[i].value === "Developer") {
          setEmployee(current => {
              return { ...current, 'is_dev': 1 }
          })
        } 
        
        if (e[i].value === "Manager") {
          setEmployee(current => {
              return { ...current, 'is_manager': 1 }
          })
        } 
        
        if (e[i].value === "Admin") {
          setEmployee(current => {
              return { ...current, 'is_admin': 1 }
          })
        } 
        
        if (e[i].value === "Resepsionis") {
          setEmployee(current => {
              return { ...current, 'is_resepsionis': 1 }
          })
        } 
        
        if (e[i].value === "Perawat") {
          setEmployee(current => {
              return { ...current, 'is_perawat': 1 }
          })
        } 
        
        if (e[i].value === "Dokter") {
          setEmployee(current => {
              return { ...current, 'is_dokter': 1 }
          })
        } 
        
        if (e[i].value === "Manajemen") {
          setEmployee(current => {
              return { ...current, 'is_manajemen': 1 }
          })
        }
      }

    //   setSelectedRole(e);
      setSelectedRole(Array.isArray(e) ? e.map(x => x.value) : []);

      // console.log('selectedRole onChange', selectedRole);
    } else {
      if (e.name === 'provinsi') {
        setEmployee(current => {
            // return { ...current, provinsi: e.value }
            return { ...current, provinsi: e ? e.value : ''}
        })
        setSelectProvince(e); changeKota(e.key, "");
      } else if (e.name === 'kota') {
        setEmployee(current => {
            // return { ...current, kota: e.value }
            return { ...current, kota: e ? e.value : ''}
        })
        setSelectCity(e); changeKecamatan(e.key);
      } else if (e.name === 'kecamatan') {
        setEmployee(current => {
            // return { ...current, kecamatan: e.value }
            return { ...current, kecamatan: e ? e.value : ''}
        })
        setSelectSubdistrict(e); changeKelurahan(e.key);
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
      } else if (e.name === 'tipe') {
        setEmployee(current => {
            // return { ...current, tipe: e.value }
            return { ...current, tipe: e ? e.value : ''}
        })
        setSelectedType(e);

        if (e.value === 'Dokter') {
          setDisabledSpecialist(false);
        } else {
          setDisabledSpecialist(true);
          setEmployee(current => {
              return { ...current, spesialis: ''}
          })
        }
      } else if (e.name === 'spesialis') {
        setEmployee(current => {
            // return { ...current, spesialis: e.value }
            return { ...current, spesialis: e ? e.value : ''}
        })
        // setSelectedSpecialist(e);
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
        } else if (e.target.name && e.target.name === 'status_menikah') {
          if(e.target.id === 'menikah') {
            setEmployee(current => {
              return { ...current, status_menikah: 'Menikah' }
            })
          } else if(e.target.id === 'belumMenikah') {
            setEmployee(current => {
              return { ...current, status_menikah: 'Belum Menikah' }
            })
          }
        } else if (e.target.name && e.target.name !== 'jenis_kelamin' && e.target.name !== 'status_menikah') {
          setEmployee(current => {
              return { ...current, [e.target.name]: e.target.value }
          })
        } else {
          console.log(e);
        }
      }
    }

    console.log('employee', employee);
  }

  const onEmployeeSubmit = async (e) => {
    e.preventDefault();

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
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah karyawan gagal: ${response.message}`,
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
        const response = await employeeAPI.update(employee, employeeID);
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
            html: `Tambah karyawan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
  
          throw Error(`Error status: ${response.statusCode}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah karyawan gagal: ${e}`,
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

    setDataStatus("add");
    onLoadProvinsi();
  };

  const getEmployee = async (params) => {
    try {
      const res = await employeeAPI.get("", params);
      dispatch({type: "GET_EMPLOYEE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_EMPLOYEE", payload: res.data.pagination.totalPage});
    } catch (e) {
      console.log(e);
    }
  };

  const [ editAddress, setEditAddress ] = useState({
    status: 0,
    nama_kota: '',
    nama_kecamatan: '',
    nama_kelurahan: ''
  });

  const getEmployeeById = async (e, id) => {
    e.preventDefault();
    resetForm(e);
    setDataStatus("update");

    try {
      const res = await employeeAPI.get("", id);
      let data = res.data.data.result[0];

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
        jenis_kelamin: data.jenis_kelamin,
        nomor_kitas: data.nomor_kitas,
        tipe_izin: data.tipe_izin,
        nomor_izin: data.nomor_izin,
        kadaluarsa_izin: data.kadaluarsa_izin.substring(0, 10),
        nomor_hp: data.nomor_hp,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: data.tanggal_lahir.substring(0, 10),
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

      // console.log('selectedRole', selectedRole);
      setSelectedWP({tipe_izin: data.tipe_izin ? e.value : ''});
      setSelectedType({tipe: data.tipe ? e.value : ''});
      if (data.tipe === 'Dokter') {
        setDisabledSpecialist(false);
      }
      setSelectedSpecialist({spesialis: data.spesialis ? e.value : ''});
      setSelectedGender(data.jenis_kelamin);
      setSelectedMaritalStatus(data.status_menikah);

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

      // let id_kota = selectedCity.find(item => item.value === data.kota).key;
      // console.log('id_kota: ', id_kota);
      // changeKecamatan(id_kota);

      // let id_kecamatan = selectedSubdistrict.find(item => item.value === data.kecamatan).key;
      // console.log('id_kecamatan ', id_kecamatan);
      // changeKelurahan(id_kecamatan);
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

    getEmployee(params);
    onLoadProvinsi();

    if(selectedCity.length > 0 && editAddress.status === 2) {
      // console.log('changeKecamatan', selectedCity);
      // console.log('status', editAddress.status);

      let id_kota = selectedCity.find(item => item.value === editAddress.nama_kota).key;
      changeKecamatan(id_kota, editAddress);
    }

    if(selectedSubdistrict.length > 0 && editAddress.status === 3) {
      // console.log('changeKelurahan', selectedSubdistrict);
      // console.log('status', editAddress.status);

      let id_kecamatan = selectedSubdistrict.find(item => item.value === editAddress.nama_kecamatan).key;
      changeKelurahan(id_kecamatan, editAddress);
    }

    if(dataStatus === "update") {
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
              return { ...current, is_admin: 0 }
          }) : 
          setEmployee(current => {
              return { ...current, is_admin: 1 }
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

        // console.log('selectedRole onUpdate', selectedRole);
      }
    }
  }, [limit, search, sortBy, sortOrder, currentPage, editAddress, selectedRole ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [page, setPage] = useState(1);
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
                Data Karyawan & Tenaga Kesehatan
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  className="mb-4"
                  onClick={resetForm}
                >
                  Tambah
                </Button>
              </CardTitle>
              <FormGroup row style={{ margin: '0px', width: '100%' }}>
                <Colxx sm="12" md="6" style={{ paddingLeft: '0px' }}>
                  <Label for="tipe">
                    Tipe
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="tipe"
                    value={selectedTypeF}
                    onChange={setSelectedTypeF}
                    options={selectType}
                  />
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
                    value={selectedSpecialistF}
                    onChange={setSelectedSpecialistF}
                    options={selectSpecialist}
                  />
                </Colxx>
              </FormGroup>
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
              <Table className="overflow-table-employee">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", verticalAlign: 'middle' }}>#</th>
                    <th>Karyawan / Tenaga Kesehatan</th>
                    <th style={{ textAlign: "center", width: '150px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData ? (
                    employeeData.map((data) => (
                      <tr key={data.id}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }}>{data.nama}</h6>
                          {data.tipe ? data.tipe : "-"}  
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs"
                            onClick={(e) => getEmployeeById(e, data.id)}
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
                  )}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPage={employeeTotalPage}
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
                        value={employee.username}
                        onChange={onChange}
                        // defaultValue={employee.username}
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
                        value={employee.email}
                        onChange={onChange}
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
                        value={employee.password}
                        onChange={onChange}
                      />
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
                        type="text"
                        name="nomor_kitas"
                        id="nomor_kitas"
                        value={employee.nomor_kitas}
                        onChange={onChange}
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
                        value={employee.nama}
                        onChange={onChange}
                      />
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
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="tipe"
                          id="tipe"
                          value={selectType.find(item => item.value === employee.tipe) || ''}
                          // value={selectedType}
                          options={selectType}
                          onChange={onChange}
                        />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="spesialis">Spesialisasi</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="spesialis"
                          id="spesialis"
                          value={selectSpecialist.find(item => item.value === employee.spesialis) || ''}
                          // value={selectedSpecialist}
                          options={selectSpecialist}
                          onChange={onChange}
                          isDisabled={disabledSpecialist}
                        />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="alamat">Alamat</Label>
                      <Input
                        type="text"
                        name="alamat"
                        id="alamat"
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
                        // value={selectedProvince}
                        // onChange={setSelectedProvince}
                        // options={selectProvince}
                        options={selectedProvince}
                        // value={selectProvince}
                        value={selectedProvince.find(item => item.value === employee.provinsi) || ''}
                        onChange={onChange}
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
                        // value={selectCity}
                        value={selectedCity.find(item => item.value === employee.kota) || ''}
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
                        // value={selectedSubdistrict}
                        // onChange={setSelectedSubdistrict}
                        // options={selectSubdistrict}
                        options={selectedSubdistrict}
                        // value={selectSubdistrict}
                        value={selectedSubdistrict.find(item => item.value === employee.kecamatan) || ''}
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
                        // value={selectedWard}
                        // onChange={setSelectedWard}
                        // options={selectWard}
                        options={selectedWard}
                        // value={selectWard}
                        value={selectedWard.find(item => item.value === employee.kelurahan) || ''}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label for="noHP">No. HP</Label>
                      <Input
                        type="number"
                        name="nomor_hp"
                        id="nomor_hp"
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
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
                      </Label>
                      <Row>
                        <Colxx sm={12} md={12} xl={5}>
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
                        <Colxx sm={12} md={12} xl={7}>
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
                      <Row>
                        <Colxx sm={12} md={12} xl={4}>
                          <CustomInput
                            type="radio"
                            id="menikah"
                            name="status_menikah"
                            label="Menikah"
                            checked={employee.status_menikah === 'Menikah'}
                            value={selectedMaritalStatus}
                            onChange={onChange}
                          />
                        </Colxx>
                        <Colxx sm={12} md={12} xl={8}>
                          <CustomInput
                            type="radio"
                            id="belumMenikah"
                            name="status_menikah"
                            label="Belum Menikah"
                            checked={employee.status_menikah === 'Belum Menikah'}
                            value={selectedMaritalStatus}
                            onChange={onChange}
                          />
                        </Colxx>
                      </Row>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="tempat_lahir">Tempat Lahir</Label>
                      <Input
                        type="text"
                        name="tempat_lahir"
                        id="tempat_lahir"
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
                        value={selectWP.find(item => item.value === employee.tipe_izin)}
                        // value={selectedWP}
                        onChange={onChange}
                      />
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
                        value={employee.nomor_izin}
                        onChange={onChange}
                      />
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
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        isMulti
                        name="peran"
                        id="peran"
                        // value={selectedRole}
                        value={selectRole.filter(item => selectedRole.includes(item.value)) || ''}
                        options={selectRole}
                        onChange={onChange}
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
                      onClick={(e) => onEmployeeSubmit(e)}
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