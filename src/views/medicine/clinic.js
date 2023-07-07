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

import medicineAPI from "api/medicine";
import medicineClinicAPI from "api/medicine/clinic";
import clinicAPI from "api/clinic";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';
import { currencyFormat } from "utils";

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectStatusF = [
  { label: "Semua Status", value: "", key: 0, name: "status" },
  { label: "Aktif", value: "1", key: 1, name: "status" },
  { label: "Non-Aktif", value: "0", key: 2, name: "status" }
];

const selectGroup = [
  { label: "Pilih Golongan", value: "", key: 0, name: 'golongan' },
  { label: "Obat Bebas", value: "Obat Bebas", key: 1, name: 'golongan' },
  { label: "Obat Bebas Terbatas", value: "Obat Bebas Terbatas", key: 2, name: 'golongan' },
  { label: "Obat Keras", value: "Obat Keras", key: 3, name: 'golongan' },
  { label: "Obat Narkotika", value: "Obat Narkotika", key: 4, name: 'golongan' },
  { label: "Obat Fitofarmaka", value: " Obat Fitofarmaka", key: 5, name: 'golongan' },
  { label: "Obat Herbal Terstandar", value: "Obat Herbal Terstandar", key: 6, name: 'golongan' },
  { label: "Obat Herbal", value: "Obat Herbal", key: 7, name: 'golongan' },
];

const selectCategory = [
  { label: "Pilih Kategori", value: "", key: 0, name: 'kategori' },
  { label: "Obat Bebas", value: "Obat Bebas", key: 1, name: 'kategori' },
  { label: "Obat Bebas Terbatas", value: "Obat Bebas Terbatas", key: 2, name: 'kategori' },
  { label: "Obat Keras", value: "Obat Keras", key: 3, name: 'kategori' },
  { label: "Obat Narkotika", value: "Obat Narkotika", key: 4, name: 'kategori' },
  { label: "Obat Fitofarmaka", value: " Obat Fitofarmaka", key: 5, name: 'kategori' },
  { label: "Obat Herbal Terstandar", value: "Obat Herbal Terstandar", key: 6, name: 'kategori' },
  { label: "Obat Herbal", value: "Obat Herbal", key: 7, name: 'kategori' },
];

const selectDose = [
  { label: 'Pilih Satuan', value: '', key: 0, name: 'satuan_dosis' },
  { label: 'Kapsul', value: 'Kapsul', key: 1, name: 'satuan_dosis' },
  { label: 'Tablet', value: 'Tablet', key: 2, name: 'satuan_dosis' },
  { label: 'Kaplet', value: 'Kaplet', key: 3, name: 'satuan_dosis' },
  { label: 'Puyer', value: 'Puyer', key: 4, name: 'satuan_dosis' },
  { label: 'mL (mililiter)', value: 'mL', key: 5, name: 'satuan_dosis' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 6, name: 'satuan_dosis' },
];

const selectPcs = [
  { label: 'Pilih Satuan', value: '', key: 0, name: 'satuan' },
  { label: 'Kapsul', value: 'Kapsul', key: 1, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 2, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 3, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 4, name: 'satuan' },
  { label: 'mL (mililiter)', value: 'mL', key: 5, name: 'satuan' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 6, name: 'satuan' },
];

const selectSell = [
  { label: 'Pilih Metode Penjualan', value: '', key: 0, name: 'jual_per' },
  { label: 'Kapsul', value: 'Kapsul', key: 1, name: 'jual_per' },
  { label: 'Tablet', value: 'Tablet', key: 2, name: 'jual_per' },
  { label: 'Kaplet', value: 'Kaplet', key: 3, name: 'jual_per' },
  { label: 'Puyer', value: 'Puyer', key: 4, name: 'jual_per' },
  { label: 'mL (mililiter)', value: 'mL', key: 5, name: 'jual_per' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 6, name: 'jual_per' },
];

const selectProducer = [
  { label: 'Pilih Produsen', value: '', key: 0, name: 'produsen' },
  { label: 'Produsen A', value: 'Produsen A', key: 1, name: 'produsen' },
  { label: 'Produsen B', value: 'Produsen B', key: 2, name: 'produsen' },
  { label: 'Produsen C', value: 'Produsen C', key: 3, name: 'produsen' },
  { label: 'Produsen D', value: 'Produsen D', key: 4, name: 'produsen' },
  { label: 'Produsen E', value: 'Produsen E', key: 5, name: 'produsen' }
];

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const medicineData = useSelector(state => state.medicineClinic);
  const medicineTotalPage = useSelector(state => state.medicineClinicTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedMedicine, setSelectedMedicine] = useState([{ label: "Pilih Obat", value: "", key: 0, name: 'id_obat' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAddList, setModalAddList] = useState(false);
  const [medicineID, setMedicineID] = useState('');
  const [medicineStatus, setMedicineStatus] = useState(0);
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');

  const [medicineClinic, setMedicineClinic] = useState({
    id_obat: '',
    id_klinik: clinicID,
    harga_jual: '',
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

  const onLoadObat = async () => {
    try {
      const response = await medicineAPI.get("?limit=1000");
      // console.log(response);

      setSelectedMedicine([{ label: "Pilih Obat", value: "", key: 0, name: 'id_obat' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedMedicine((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_obat' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [medicine, setMedicine] = useState({
    nama: '',
    golongan: '',
    kategori: '',
    dosis: 0,
    satuan_dosis: '',
    satuan: '',
    jual_per: '',
    produsen: '',
    deskripsi: '',
    indikasi: ''
  });

  const onChange = (e) => {
    // console.log('e', e);

    if (e.name === 'id_klinik') {
        setMedicineClinic(current => {
            return { ...current, id_klinik: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'id_obat') {
        setMedicineClinic(current => {
            return { ...current, id_obat: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else {
        setMedicineClinic(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value ? e.value !== undefined : e.target.value ? e.target.value : '');
    }

    // console.log('medicineClinic', medicineClinic);
  }

  const onChangeList = (e) => {
    // console.log('e', e);

    if(e.name) {
      setMedicine(current => {
          return { ...current, [e.name]: e.value }
      })
    } else {
        setMedicine(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
    }

    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');

    // console.log('medicine', medicine);
  }

  const onMedicineListSubmit = async (e) => {
    e.preventDefault();
    setModalAddList(false);
    onLoadKlinik();
    onLoadObat();

    let isError = false;

    for(let [key, value] of Object.entries(medicine)) {
      if((key === 'nama' && value === '') || (key === 'golongan' && value === '') || (key === 'kategori' && value === '') || (key === 'dosis' && value === '') ||
          (key === 'satuan_dosis' && value === '') || (key === 'satuan' && value === '') || (key === 'jual_per' && value === '') || (key === 'deskripsi' && value === '') || (key === 'indikasi' && value === '')){
        validate(e, key, value);
        isError = true;
        // return;
      }
    }

    if(isError === true){
      return;
    }

    try {
      const response = await medicineAPI.add(medicine);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah obat sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        resetForm(e);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah obat gagal: ${response.message}`,
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
      onLoadObat();
    }
  };

  const onMedicineSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(medicineClinic)) {
      if((key === 'id_klinik' && value === '') || (key === 'id_obat' && value === '') || (key === 'harga_jual' && value === '')){
        validate(e, key, value);
        isError = true;
      //   return;
      }
    }

    if(isError === true){
      return;
    }

    if(dataStatus === 'add') {
      try {
        const response = await medicineClinicAPI.add(medicineClinic);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah harga obat sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah harga obat gagal: ${response.message}`,
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
        getMedicineClinic("");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await medicineClinicAPI.update(medicineClinic, medicineID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah harga obat sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah harga obat gagal: ${response.message}`,
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
        getMedicineClinic("");
        getMedicineClinicById("", medicineID);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setMedicineID('');
    setMedicineName('');
    setMedicineStatus(0);
    setMedicine({nama: ''});

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

    setMedicineClinic({
      id_obat: medicineID,
      id_klinik: clinicID,
      harga_jual: '',
    });
    
    setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedMedicine([{ label: "Pilih Obat", value: "", key: 0, name: 'id_obat' }]);

    setDataStatus("add");
    onLoadKlinik();
    onLoadObat();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getMedicineClinic = async (params) => {
    try {
      setIsLoading(true);
      const res = await medicineClinicAPI.get(params);
      dispatch({type: "GET_MEDICINE_CLINIC", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_MEDICINE_CLINIC", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getMedicineClinicById = async (e, id) => {
    e && e.preventDefault();
    e && resetForm(e);
    setDataStatus("update");
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
      const res = await medicineClinicAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setMedicineID(data.id);
      setMedicineClinic({
        id_obat: data.id_obat,
        id_klinik: data.id_klinik,
        harga_jual: data.harga_jual
      });
      setMedicineStatus(data.is_active);

    //   console.log(medicineClinic);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, medicineID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, medicineID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (medicineID && medicineStatus == 1) {
        return <ButtonArchive/>;
      } else if (medicineID && medicineStatus == 0) {
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
      <DropdownItem onClick={(e) => statusById(e, medicineID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, medicineID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (medicineID && medicineStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (medicineID && medicineStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [medicineName, setMedicineName] = useState('');

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await medicineClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setMedicineID(data.id);
      setMedicineStatus(data.is_active);
      setMedicineName(data.nama_obat);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (medicineStatus == 1) {
        const response = await medicineClinicAPI.archive("", medicineID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip harga obat sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip harga obat gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await medicineClinicAPI.activate("", medicineID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi harga obat sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi harga obat gagal: ${response.message}`,
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
      getMedicineClinic("");
      getMedicineClinicById("", medicineID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await medicineClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setMedicineID(data.id);
      setMedicineName(data.nama_obat);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await medicineClinicAPI.delete(medicineID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus harga obat sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus harga obat gagal: ${response.message}`,
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
      getMedicineClinic("");
    }
  };

  const [search, setSearch] = useState("");
  const [searchKlinik, setSearchKlinik] = useState(clinicID);
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, search, searchKlinik, searchStatus, sortBy, sortOrder ]);

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
    if (searchKlinik !== "") {
      params = `${params}&searchKlinik=${searchKlinik}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    setRowSelected(false);
    getMedicineClinic(params);

    onLoadKlinik();
    onLoadObat();
  }, [limit, search, searchKlinik, searchStatus, sortBy, sortOrder, currentPage ]);

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
                    Data Harga Obat
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
              { !userData.roles.includes('isDev') ?
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
                          isSearchable={false}
                          defaultValue={{ label: "Semua Status", value: "", key: 0, name: "status" }}
                        />
                    </Colxx>
                  :
                    <>
                        <Colxx sm="12" md="6" style={{ paddingLeft: '0px' }}>
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
                        <Colxx sm="12" md="6" style={{ paddingRight: '0px' }}>
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
                              isSearchable={false}
                              defaultValue={{ label: "Semua Status", value: "", key: 0, name: "status" }}
                            />
                        </Colxx>
                    </>
                }
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
                    <th>Obat</th>
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
                  medicineData.length > 0 ? (
                    medicineData.map((data) => (
                      <tr key={data.id} onClick={(e) => getMedicineClinicById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama_obat}</h6>
                          Jual: {data.harga_jual ? currencyFormat(data.harga_jual) : "Rp0"}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getMedicineClinicById(e, data.id)}
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
                totalPage={medicineTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={medicineTotalPage < 4 ? medicineTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Harga Obat' : 'Form Ubah Harga Obat' }
                    {/* Form Manajemen Harga Obat */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && medicineID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, medicineID)}
                        >
                        <i className="simple-icon-trash"></i>&nbsp;Hapus
                      </Button>
                    } */}
                    { dataStatus === "update" && 
                      <UncontrolledDropdown>
                        <DropdownToggle color="default">
                          <i className="simple-icon-options-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {<IsActiveDropdown/>}
                          {(userData.roles.includes('isDev') ||
                          userData.roles.includes('isManager')) && medicineID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, medicineID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onMedicineSubmit}>
                <FormGroup row>
                  { userData.roles.includes('isDev') &&
                  <Colxx lg={12}>
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
                        value={selectedKlinik.find(item => item.value === medicineClinic.id_klinik) || { label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }}
                        onChange={onChange}
                        // required
                      />
                      {errors.id_klinik && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.id_klinik}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>
                  }

                  <Colxx lg={5} className="col-tp-5" style={{ paddingRight: '0px' }}>
                    <FormGroup>
                      <Label for="id_obat">
                        Obat
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
                        name="id_obat"
                        id="id_obat"
                        options={selectedMedicine}
                        value={selectedMedicine.find(item => item.value === medicineClinic.id_obat) || { label: "Pilih Obat", value: "", key: 0, name: 'id_obat' }}
                        onChange={onChange}
                        // required
                      />
                      {errors.id_obat && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.id_obat}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={1} className="col-tp-1 col-tp-1-50" style={{ paddingLeft: '0px' }}>
                    <FormGroup>
                      <Label>
                        &nbsp;
                      </Label>
                      <br/>
                      <Button
                        color="primary"
                        className="btn-sm"
                        onClick={() => { setModalAddList(true), setMedicine({nama: ''}) }}
                        style={{ borderRadius: '0 5px 5px 0', padding: '0.45rem', border: '2px solid #008ecc' }}
                      >
                        Tambah
                      </Button>
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={6} className="col-tp-6">
                    <FormGroup>
                      <Label for="harga_jual">
                        Harga Jual (Rp)
                        <span
                          className="required text-danger"
                          aria-required="true"
                        >
                          {" "}
                          *
                        </span>
                      </Label>
                        
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
                        <Input
                            type="number"
                            name="harga_jual"
                            id="harga_jual"
                            placeholder="Harga Jual"
                            value={medicineClinic.harga_jual}
                            onChange={onChange}
                            pattern="[0-9]*"
                            // required={true}
                        />
                      </InputGroup>
                      {errors.harga_jual && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.harga_jual}
                        </div>
                      )}
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
                      // onClick={(e) => onMedicineSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih harga obat untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data harga obat.
                  Silahkan klik tombol tambah untuk menambahkan harga obat baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Obat</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {medicineStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{medicineName}</b>?</h5>
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
          <ModalHeader>Hapus Obat</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{medicineName}</b>?</h5>
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

        <Modal
          isOpen={modalAddList}
          toggle={() => setModalAddList(!modalAddList)}
        >
          <Form className="av-tooltip tooltip-right-top" onSubmit={onMedicineListSubmit}>
          <ModalHeader>Tambah Obat</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="nama">
                Nama
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
                placeholder="Nama"
                value={medicine.nama}
                onChange={onChangeList}
                // required={true}
              />
              {errors.nama && (
                <div className="rounded invalid-feedback d-block">
                  {errors.nama}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="golongan">
                Golongan
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Select
                addonType="prepend"
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="golongan"
                value={selectGroup.find(item => item.value === medicine.golongan) || { label: "Pilih Golongan", value: "", key: 0, name: 'golongan' }}
                options={selectGroup}
                onChange={onChangeList}
                isSearchable={false}
              />
              {errors.golongan && (
                <div className="rounded invalid-feedback d-block">
                  {errors.golongan}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="kategori">
                Kategori
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Select
                addonType="prepend"
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="kategori"
                value={selectCategory.find(item => item.value === medicine.kategori) || { label: "Pilih Kategori", value: "", key: 0, name: 'kategori' }}
                options={selectCategory}
                onChange={onChangeList}
                isSearchable={false}
              />
              {errors.kategori && (
                <div className="rounded invalid-feedback d-block">
                  {errors.kategori}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="dosis">
                Dosis
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <InputGroup>
                <Input
                  type="number"
                  name="dosis"
                  id="dosis"
                  placeholder="Dosis"
                  value={medicine.dosis}
                  onChange={onChangeList}
                  pattern="[0-9]*"
                  // required
                />
                <Select
                    addonType="prepend"
                    components={{ Input: CustomSelectInput }}
                    className="react-select select-pcs"
                    classNamePrefix="react-select"
                    name="satuan_dosis"
                    value={selectDose.find(item => item.value === medicine.satuan_dosis) || { label: "Pilih Satuan", value: "", key: 0, name: 'satuan_dosis' }}
                    options={selectDose}
                    onChange={onChangeList}
                />
              </InputGroup>
              {errors.dosis || errors.satuan_dosis && (
                <div className="rounded invalid-feedback d-block">
                  {errors.dosis || errors.satuan_dosis}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="satuan">
                Satuan
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              {/* <Input
                type="number"
                name="satuan"
                id="satuan"
                placeholder="Satuan"
                value={medicine.satuan}
                onChange={onChangeList}
                pattern="[0-9]*"
                // required
              /> */}
              <Select
                addonType="prepend"
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="satuan"
                value={selectPcs.find(item => item.value === medicine.satuan) || { label: "Pilih Satuan", value: "", key: 0, name: 'satuan' }}
                options={selectPcs}
                onChange={onChangeList}
              />
              {errors.satuan && (
                <div className="rounded invalid-feedback d-block">
                  {errors.satuan}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="jual_per">
                Metode Penjualan
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Select
                  addonType="prepend"
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="jual_per"
                  value={selectSell.find(item => item.value === medicine.jual_per) || { label: "Pilih Metode Penjualan", value: "", key: 0, name: 'jual_per' }}
                  options={selectSell}
                  onChange={onChangeList}
              />
              {errors.jual_per && (
                <div className="rounded invalid-feedback d-block">
                  {errors.jual_per}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="jual_per">
                Produsen
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Select
                  addonType="prepend"
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="produsen"
                  value={selectProducer.find(item => item.value === medicine.produsen) || { label: "Pilih Produsen", value: "", key: 0, name: 'produsen' }}
                  options={selectProducer}
                  onChange={onChangeList}
              />
              {errors.produsen && (
                <div className="rounded invalid-feedback d-block">
                  {errors.produsen}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="deskripsi">
                Deskripsi
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Input
                type="textarea"
                name="deskripsi"
                id="deskripsi"
                placeholder="Deskripsi"
                style={{minHeight: '250px'}}
                value={medicine.deskripsi}
                onChange={onChangeList}
              />
              {errors.deskripsi && (
                <div className="rounded invalid-feedback d-block">
                  {errors.deskripsi}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="indikasi">
                Indikasi
                <span
                  className="required text-danger"
                  aria-required="true"
                >
                  {" "}
                  *
                </span>
              </Label>
              <Input
                type="textarea"
                name="indikasi"
                id="indikasi"
                placeholder="Indikasi"
                style={{minHeight: '250px'}}
                value={medicine.indikasi}
                onChange={onChangeList}
              />
              {errors.indikasi && (
                <div className="rounded invalid-feedback d-block">
                  {errors.indikasi}
                </div>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Colxx sm={6} className="responsive-modal-button">
              <Label className="text-left">* ) Wajib diisi</Label>
            </Colxx>
            <Colxx sm={6} className="responsive-modal-button text-right">
              <Button
                type="button"
                outline
                color="danger"
                onClick={() => setModalAddList(false)}
              >
                Batal
              </Button>
              &nbsp;&nbsp;
              <Button color="primary"
                // onClick={(e) => onMedicineListSubmit(e)}
              >
                Simpan
              </Button>
            </Colxx>
          </ModalFooter>
          </Form>
        </Modal>
          
      </Row>

      {/* <Button
        color="primary"
        className="float-btn"
        onClick={(e) => resetForm(e, true)}
      >
        <i className="iconsminds-wallet"></i> Tambah Obat
      </Button> */}
    </>
  );
};
export default Data;