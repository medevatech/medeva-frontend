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
  { label: "PPS / Kapitasi", value: "PPS", key: 1, name: "tipe" },
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

  const [selectedKlinik, setSelectedKlinik] = useState([]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectInsurance, setSelectInsurance] = useState([]);
  const [selectInsuranceClass, setSelectInsuranceClass] = useState([]);
  
  const [disabledInsuranceClass, setDisabledInsuranceClass] = useState([false]);
  const [disabledClinic, setDisabledClinic] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [partnershipID, setPartnershipID] = useState('');
  const [clinicID, setClinicID] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [partnershipStatus, setPartnershipStatus] = useState(0);
  const [partnershipFetch, setPartnershipFetch] = useState("");

  const onLoadKlinik = async () => {
    try {
      const response = await clinicAPI.get("?limit=1000");
      // console.log(response);

      setSelectedKlinik([]);
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

      setSelectInsurance([]);

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

      setSelectInsuranceClass([]);

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
    selectInsuranceClassByInsurance[index] = [];
    
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

        dataDisabledInsuranceClass[index] = false;
      } else {
        dataDisabledInsuranceClass[index] = true;

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if(id_asuransi_kelas) {
        dataDisabledInsuranceClass[index] = false;
      }

      setDisabledInsuranceClass(dataDisabledInsuranceClass);
    }
  };

  const [partnership, setPartnership] = useState([{
    id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: ''
  }]);

  const [tempPartnership, setTempPartnership] = useState([{
    id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: ''
  }]);

  const onChange = (e) => {
    // console.log('e', e);

    setClinicID(e.value);
    validate(e, e.name !== undefined ? e.name : e.name ? e.name : '', e.value !== undefined ? e.value : e.value ? e.value : '');

    // console.log('partnership', partnership);
  }

  const addPartnershipFields = () => {
    let newfieldPartnership = { id: '', id_klinik: clinicID, id_asuransi: '', id_asuransi_kelas: '', tipe: '' };
    setPartnership([...partnership, newfieldPartnership]);

    disabledInsuranceClass[partnership.length] = true;
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
    console.log('event', event);

    if (event.name === "id_asuransi"){
      dataPartnership[index][event.name] = event.value;
      changeKelasAsuransi(index, event.value);

      // validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else if (event.name === "id_asuransi_kelas"){
      dataPartnership[index][event.name] = event.value;
      validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else if (event.name === "tipe"){
      dataPartnership[index][event.name] = event.value;
      validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else {
      dataPartnership[index][event.target.name] = event.target.value;
    }

    setPartnership(dataPartnership);
  };

  const onPartnershipSubmit = async (e) => {
    e && e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(partnership)) {
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
    }

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
    setInsuranceName('');
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

    setPartnershipStatus(0);
    setInsuranceName('');
    setPartnershipID('');
    setClinicID('');

    // setPartnership([]);
    setPartnership([{ id: "", id_klinik: "", id_asuransi: "", id_asuransi_kelas: "", tipe: "" }]);

    if(dataStatus !== "update") {
      setDisabledInsuranceClass([true]);
    }
    setDisabledClinic(false);
    setDataStatus("add");

    onLoadKlinik();
    onLoadAsuransi();
    onLoadKelasAsuransi();
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
    e && resetForm(e);
    setDataStatus("update");
    setPartnershipFetch("process");
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

      setPartnership([]);
      setTempPartnership([]);
      setDisabledClinic(true);
      setDisabledInsuranceClass([]);

      if(data) {
        data.map((data, index) => {
          setPartnership((current) => [
            ...current, { id: data.id, id_klinik: data.id_klinik, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, tipe: data.tipe }
          ]);
          changeKelasAsuransi(index, data.id_asuransi, data.id_asuransi_kelas);

          setTempPartnership((current) => [
            ...current, { id: data.id, id_klinik: data.id_klinik, id_asuransi: data.id_asuransi, id_asuransi_kelas: data.id_asuransi_kelas, tipe: data.tipe }
          ]);
        })

        setDataStatus("update");
        setDataStatusInsurance("update");
      }

      // console.log('partnership', partnership);
    } catch (e) {
      console.log(e);

      setPartnership([{ id: '', id_klinik: '', id_asuransi: '', id_asuransi_kelas: '', tipe: '' }]);
      setTempPartnership([{ id: '', id_klinik: '', id_asuransi: '', id_asuransi_kelas: '', tipe: '' }]);

      setDataStatusInsurance("add");
    } finally {
      setPartnershipFetch("done");
      // console.log('disabledInsuranceClass', disabledInsuranceClass);
    }

    // console.log(dataStatus);
  };

  useEffect(() => {
    console.log('disabledInsuranceClass', disabledInsuranceClass);

    // if(partnershipFetch === "done" && disabledInsuranceClass){
    //   let dataDisabledInsuranceClass = [...disabledInsuranceClass];

    //   for(var index = 0; index < partnership.length; index++){
    //   //   console.log('partnership[' + index + ']', partnership[index]);

    //     if (partnership[index].id_asuransi_kelas){
    //       dataDisabledInsuranceClass[index] = false;
    //     } else {
    //       dataDisabledInsuranceClass[index] = true;
    //     }

    //     console.log('disabledInsuranceClass[' + index + "]", disabledInsuranceClass[index]);
    //   }

    //   setDisabledInsuranceClass(dataDisabledInsuranceClass);
    //   setPartnershipFetch("idle");
    // }
  }, [ disabledInsuranceClass ]);

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusByClinicId(e, partnershipID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusByClinicId(e, partnershipID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (partnershipID && partnershipStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (partnershipID && partnershipStatus == 0) {
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
      const res = await partnershipAPI.get(`/${id}`);
      let data = res.data.data[0];

      setPartnershipID(data.id);
      setPartnershipStatus(data.is_active);
      setInsuranceName(data.nama);
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
      const res = await insuranceAPI.get(`/${id}`);
      let data = res.data.data[0];

      setPartnershipID(data.id);
      setInsuranceName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await partnershipAPI.deleteByClinic("", clinicID);

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
    }
  };

  const onDeletePartnership = async (id_klinik) => {
    try {
      const response = await partnershipAPI.delete(partnershipID);

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

  const [searchKlinik, setSearchKlinik] = useState("");
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
                      // className="mb-4"
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
                          userData.roles.includes('isManager')) && partnershipID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteByClinicId(e, partnershipID)}>
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
                        <Colxx sm={4}>
                          <Label>Asuransi</Label>
                        </Colxx>
                        <Colxx sm={4}>
                          <Label>Kelas Asuransi</Label>
                        </Colxx>
                        <Colxx sm={4}>
                          <Label>Tipe</Label>
                        </Colxx>
                      </Row>
                      {partnership.map((input, index) => {
                        return (
                          <Row key={index} className="partnership-row">
                            <Colxx sm={4}>
                              <FormGroup>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi"
                                  value={selectInsurance.find(item => item.value === partnership[index].id_asuransi)}
                                  options={selectInsurance}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  placeholder="Pilih Asuransi"
                                />
                                {errors.id_asuransi && (
                                  <div className="rounded invalid-feedback d-block">
                                    {errors.id_asuransi}
                                  </div>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="id_asuransi_kelas"
                                  value={
                                    partnership[index].id_asuransi_kelas !== undefined && selectInsuranceClassByInsurance[index] !== undefined
                                    && selectInsuranceClassByInsurance[index].find(item => item.value === partnership[index].id_asuransi_kelas)
                                  }
                                  options={selectInsuranceClassByInsurance[index]}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                  isDisabled={disabledInsuranceClass[index]}
                                  placeholder="Pilih Kelas"
                                />
                                {errors.id_asuransi_kelas && (
                                  <div className="rounded invalid-feedback d-block">
                                    {errors.id_asuransi_kelas}
                                  </div>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <React.Fragment>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select select-partnership"
                                  classNamePrefix="react-select"
                                  name="tipe"
                                  value={selectType.find(item => item.value === partnership[index].tipe) || { label: "Pilih Tipe", value: "", key: 0, name: 'tipe' }}
                                  options={selectType}
                                  onChange={(event) =>
                                    handlePartnershipChange(index, event)
                                  }
                                />
                                {errors.tipe_kerjasama && (
                                  <div className="rounded invalid-feedback d-block">
                                    {errors.tipe_kerjasama}
                                  </div>
                                )}
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
                              </React.Fragment>
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
            <h5>Apakah Anda ingin {partnershipStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{insuranceName}</b>?</h5>
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
            <h5>Apakah Anda ingin menghapus <b>{insuranceName}</b>?</h5>
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