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

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import CustomSelectInput from "components/common/CustomSelectInput";

import partnershipAPI from "api/partnership";
import insuranceAPI from "api/insurance";
import insuranceClassAPI from "api/insurance/class";
import clinicAPI from "api/clinic";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectStatusF = [
  { label: "Semua Status", value: "", key: 0, name: "status" },
  { label: "Aktif", value: "1", key: 1, name: "status" },
  { label: "Non-Aktif", value: "0", key: 2, name: "status" }
];

const selectType = [
  { label: "Pilih Tipe", value: "", key: 0, name: 'tipe' },
  { label: "PPS / Kapitasi", value: "PPSK", key: 1, name: "tipe" },
  { label: "FFS Paket", value: "FFSP", key: 2, name: "tipe" },
  { label: "FFS Non-Paket", value: "FFSNP", key: 3, name: "tipe" },
];

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const partnershipData = useSelector(state => state.partnership);
  const partnershipTotalPage = useSelector(state => state.partnershipTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [dataStatusInsurance, setDataStatusInsurance] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectInsurance, setSelectInsurance] = useState([{ label: "Pilih Asuransi", value: "", key: 0, name: 'id_asuransi' }]);
  const [selectInsuranceClass, setSelectInsuranceClass] = useState([{ label: "Pilih Kelas", value: "", key: 0, name: 'id_asuransi_kelas' }]);
  
  const [disabledInsuranceClass, setDisabledInsuranceClass] = useState([]);
  const [disabledClinic, setDisabledClinic] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [partnershipID, setPartnershipID] = useState('');
  const [clinicID, setClinicID] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [partnershipStatus, setPartnershipStatus] = useState(0);

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

      setSelectInsuranceClass([{ label: "Pilih Kelas", value: "", key: 0, name: 'id_asuransi_kelas' }]);

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
    selectInsuranceClassByInsurance[index] = [{ label: "Pilih Kelas", value: "", key: 0, name: 'id_asuransi_kelas' }];
    
    let dataDisabledInsuranceClass = [...disabledInsuranceClass];

    try {
      const response = await insuranceClassAPI.getByInsurance(`/${id_asuransi}`);
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

        // dataDisabledInsuranceClass[index] = false;
      } else {
        // dataDisabledInsuranceClass[index] = true;

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      // if(id_asuransi_kelas) {
      //   dataDisabledInsuranceClass[index] = false;
      // }

      setDisabledInsuranceClass(dataDisabledInsuranceClass);
    }
  };

  const [partnership, setPartnership] = useState([{
    id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: '', besar_klaim: ''
  }]);

  const [tempPartnership, setTempPartnership] = useState([{
    id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: '', besar_klaim: ''
  }]);

  const onChange = (e) => {
    // console.log('e', e);

    setClinicID(e.value);
    validate(e, e.name , e.value);

    // console.log('partnership', partnership);
  }

  const addPartnershipFields = () => {
    let newfieldPartnership = { id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: '', besar_klaim: '' };
    setPartnership([...partnership, newfieldPartnership]);

    // disabledInsuranceClass[partnership.length] = true;
  };

  const removePartnershipFields = (id, index) => {
    let dataPartnership = [...partnership];

    dataPartnership.splice(index, 1);

    setPartnership(dataPartnership);

    if(dataStatusInsurance === "update"){
      setTempPartnership(dataPartnership);
      onDeletePartnership(id);
    }
  };

  const handlePartnershipChange = (index, event) => {
    let dataPartnership = [...partnership];
    // console.log('event', event);

    if (event.name === "id_asuransi"){
      dataPartnership[index][event.name] = event.value;
      changeKelasAsuransi(index, event.value);

      validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else if (event.name === "id_asuransi_kelas"){
      dataPartnership[index][event.name] = event.value;
      validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else if (event.name === "tipe"){
      dataPartnership[index][event.name] = event.value;
      validate(event, 'tipe_kerjasama', event.value);
    } else {
      dataPartnership[index][event.target.name] = event.target.value;
    }

    setPartnership(dataPartnership);
  };

  const onPartnershipSubmit = async (e) => {
    e && e.preventDefault();

    let isError = false;
    
    // console.log('partnership', partnership);

    for (var i = 0; i < partnership.length; i++) {
      partnership[i].id_klinik = clinicID;

      for(let [key, value] of Object.entries(partnership[i])) {
        if((key === 'id_klinik' && value === '') || (key === 'id_asuransi' && value === '') || (key === 'id_asuransi_kelas' && value === '')){
          validate(e, key, value);
          isError = true;
          // return;
        }

        if((key === 'tipe' && value === '')){
          validate(e, 'tipe_kerjasama', value);
          isError = true;
          // return;
        }

        // console.log(key, value);
      }
    }

    // console.log('errors', errors);

    if(isError === true) {
      return;
    }

    for (var i = 0; i < partnership.length; i++) {
      partnership[i].id_klinik = clinicID;

      if(partnership[i].id !== '' && ((partnership[i].id_asuransi !== tempPartnership[i].id_asuransi) || (partnership[i].id_asuransi_kelas !== tempPartnership[i].id_asuransi_kelas) || (partnership[i].tipe !== tempPartnership[i].tipe))) {
        onPartnershipEdit(partnership[i]);
      } else if(partnership[i].id === '') {
        onPartnershipAdd(partnership[i]);
      }
    }

    getPartnership("");
    if(dataStatus === "update"){
      getPartnershipByClinicId(clinicID);
    }
  }

  const onPartnershipAdd = async (partnership) => {
    try {
      const response = await partnershipAPI.add(partnership);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah kelas asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah kelas asuransi gagal: ${response.message}`,
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
  } 

  const onPartnershipEdit = async (partnership) => {
    try {
      const response = await partnershipAPI.update(partnership, partnership.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Ubah kelas asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Ubah kelas asuransi gagal`,
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
  }

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setPartnershipID('');
    setClinicName('');
    setPartnershipStatus(0);

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

    setClinicID('');
    setPartnership([]);
    setPartnership([{ id: "", id_klinik: "", id_asuransi: "", id_asuransi_kelas: "", tipe: "", besar_klaim: "" }]);

    // console.log(partnership);

    setDisabledClinic(false);
    setDataStatus("add");
    // setDisabledInsuranceClass([true]);
    setSelectInsuranceClassByInsurance([]);

    onLoadKlinik();
    // onLoadAsuransi();
    // onLoadKelasAsuransi();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getPartnership = async (params) => {
    try {
      setIsLoading(true);
      const res = await partnershipAPI.getDistinct(params);
      dispatch({type: "GET_PARTNERSHIP", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_PARTNERSHIP", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getPartnershipByClinicId = async (e, id) => {
    e && e.preventDefault();
    // e && resetForm(e);

    setPartnership([]);
    setTempPartnership([]);
    // setDisabledInsuranceClass([]);

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
      const res = await partnershipAPI.getByClinic(`/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      setClinicID(id);
      setDisabledClinic(true);

      let isActive = false;

      if(data) {
        data.map((data, index) => {
          setPartnership((current) => [
            ...current, { id: data.id, id_klinik: data.id_klinik, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, tipe: data.tipe, besar_klaim: data.besar_klaim }
          ]);
          changeKelasAsuransi(index, data.id_asuransi, data.id_asuransi_kelas);

          setTempPartnership((current) => [
            ...current, { id: data.id, id_klinik: data.id_klinik, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, tipe: data.tipe, besar_klaim: data.besar_klaim }
          ]);
        })

        for (var i = 0; i < data.length; i++) {
          for(let [key, value] of Object.entries(data[i])) {
            // console.log(key, value);

            if(key === 'is_active' && value === 1){
              // console.log('isActive', isActive);
              isActive = true;
            }
          }
        }

        isActive ? setPartnershipStatus(1) : setPartnershipStatus(0);

        setDataStatus("update");
        setDataStatusInsurance("update");
      }

      // console.log('partnership', partnership);
    } catch (e) {
      console.log(e);

      setPartnership([{ id: '', id_klinik: '', id_asuransi: '', id_asuransi_kelas: '', tipe: '', besar_klaim: '' }]);
      setTempPartnership([{ id: '', id_klinik: '', id_asuransi: '', id_asuransi_kelas: '', tipe: '', besar_klaim: '' }]);

      setDataStatusInsurance("add");
    }

    // console.log(dataStatus);
  };

  // useEffect(() => {
  //   console.log('dataStatus', dataStatus);

  //   if(dataStatus === "add") {
  //     // setDisabledInsuranceClass([true]);
  //   } else {
  //     // setDisabledInsuranceClass([]);
  //   }
  // }, [ dataStatus ]);

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusByClinicId(e, clinicID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusByClinicId(e, clinicID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (clinicID && partnershipStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (clinicID && partnershipStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const statusByClinicId = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await partnershipAPI.getByClinic(`/${id}`);
      let data = res.data.data;

      // setPartnershipID(data.id);
      // setPartnershipStatus(data.is_active);
      setClinicName(data[0].nama_klinik);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (partnershipStatus == 1) {
        const response = await partnershipAPI.archiveByClinic("", clinicID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip kerjasama asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip kerjasama asuransi gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await partnershipAPI.activateByClinic("", clinicID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi kerjasama asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi kerjasama asuransi gagal: ${response.message}`,
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
      getPartnership("");
      getPartnershipByClinicId("", clinicID);
    }
  };

  const deleteByClinicId = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await partnershipAPI.getByClinic(`/${id}`);
      let data = res.data.data;

      // setPartnershipID(data.id);
      setClinicName(data[0].nama_klinik);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await partnershipAPI.deleteByClinic(clinicID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus kerjasama asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus kerjasama asuransi gagal: ${response.message}`,
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
      getPartnership("");
      resetForm();
    }
  };

  const onDeletePartnership = async (id) => {
    try {
      const response = await partnershipAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus kerjasama asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus kerjasama asuransi gagal: ${response.message}`,
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
    }
  };

  const [searchKlinik, setSearchKlinik] = useState(clinicID);
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, searchKlinik, searchStatus, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
      
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
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
    getPartnership(params);

    onLoadKlinik();
    onLoadAsuransi();
    onLoadKelasAsuransi();
  }, [limit, searchKlinik, searchStatus, sortBy, sortOrder, currentPage ]);

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
                    Data Kerjasama Asuransi
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
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Pencarian"
                  onChange={(e) => setSearchKlinik(e.target.value)}
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
                    <th>Kerjasama</th>
                    <th className="center-xy" style={{ width: '55px' }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelected === false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center">
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) : 
                  partnershipData.length > 0 ? (
                    partnershipData.map((data) => (
                      <tr key={data.id} onClick={(e) => getPartnershipByClinicId(e, data.id_klinik)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama_klinik}</h6>
                          {/* {data.nama ? data.nama : "-"}<br/> */}
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getPartnershipByClinicId(e, data.id_klinik)}
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
                totalPage={partnershipTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={partnershipTotalPage < 4 ? partnershipTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Kerjasama Asuransi' : 'Form Ubah Kerjasama Asuransi' }
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    { dataStatus === "update" && 
                      <UncontrolledDropdown>
                        <DropdownToggle color="default">
                          <i className="simple-icon-options-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {<IsActiveDropdown/>}
                          {(userData.roles.includes('isDev') ||
                          userData.roles.includes('isManager')) && clinicID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteByClinicId(e, clinicID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onPartnershipSubmit}>
                <FormGroup row>
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
                        value={selectedKlinik.find(item => item.value === clinicID)}
                        onChange={onChange}
                        isDisabled={disabledClinic}
                        placeholder="Pilih Klinik"
                      />
                      {errors.id_klinik && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.id_klinik}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup className="partnership-form">
                      <Row>
                        <Colxx sm={3}>
                          <Label>Asuransi
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx sm={3}>
                          <Label>Kelas (pilih asuransi dahulu)
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx sm={3}>
                          <Label>Tipe
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx sm={3}>
                          <Label>Besar Klaim (Rp)
                            {/* <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span> */}
                          </Label>
                        </Colxx>
                      </Row>
                      {partnership.map((input, index) => {
                        return (
                          <Row key={index} className="partnership-row">
                            <Colxx sm={3}>
                              <FormGroup>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi"
                                  value={selectInsurance.find(item => item.value === partnership[index].id_asuransi) || { label: "Pilih Asuransi", value: "", key: 0, name: 'id_asuransi' }}
                                  options={selectInsurance}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  // placeholder="Pilih Asuransi"
                                />
                                {errors.id_asuransi && (
                                  <div className="rounded invalid-feedback d-block" style={{ bottom: '140%' }}>
                                    {errors.id_asuransi}
                                  </div>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={3}>
                              <FormGroup>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi_kelas"
                                  value={
                                    partnership[index].id_asuransi_kelas !== undefined && selectInsuranceClassByInsurance[index] !== undefined
                                    && selectInsuranceClassByInsurance[index].find(item => item.value === partnership[index].id_asuransi_kelas) || { label: "Pilih Kelas", value: "", key: 0, name: 'id_asuransi_kelas' }
                                  }
                                  options={selectInsuranceClassByInsurance[index]}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  // isDisabled={disabledInsuranceClass[index]}
                                  // placeholder="Pilih Kelas"
                                />
                                {errors.id_asuransi_kelas && (
                                  <div className="rounded invalid-feedback d-block" style={{ bottom: '140%' }}>
                                    {errors.id_asuransi_kelas}
                                  </div>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={3}>
                              <FormGroup>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="tipe"
                                  value={selectType.find(item => item.value === partnership[index].tipe) || { label: "Pilih Tipe", value: "", key: 0, name: 'tipe' }}
                                  // value={selectType.find(item => item.value === partnership[index].tipe)}
                                  options={selectType}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  // placeholder="Pilih Tipe"
                                />
                                {errors.tipe_kerjasama && (
                                  <div className="rounded invalid-feedback d-block" style={{ bottom: '140%' }}>
                                    {errors.tipe_kerjasama}
                                  </div>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={3}>
                              <InputGroup className="input-group-partnership">
                                <Input
                                  type="number"
                                  name="besar_klaim"
                                  id="besar_klaim"
                                  placeholder="Besar Klaim"
                                  value={partnership[index].besar_klaim}
                                  pattern="[0-9]*"
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  // required={true}
                                />
                                {index > 0 && (
                                  <Button
                                    color="danger"
                                    style={{ float: "right" }}
                                    onClick={() =>
                                      removePartnershipFields(input.id, index)
                                    }
                                    className="remove-partnership"
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
                        onClick={addPartnershipFields}
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
                      // onClick={(e) => onPartnershipSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih kerjasama asuransi untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data kerjasama asuransi.
                  Silahkan klik tombol tambah untuk menambahkan kerjasama asuransi baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Kerjasama Asuransi</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {partnershipStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{clinicName}</b>?</h5>
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
          <ModalHeader>Hapus Kerjasama Asuransi</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{clinicName}</b>?</h5>
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
        <i className="iconsminds-library"></i> Tambah Asuransi
      </Button> */}
    </>
  );
};
export default Data;