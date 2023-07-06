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

import treatmentAPI from "api/treatment/list";
import serviceAPI from "api/service/list";
import treatmentPriceAPI from "api/treatment/price";
import serviceClinicAPI from "api/service/clinic";
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

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const treatmentData = useSelector(state => state.treatmentPrice);
  const treatmentTotalPage = useSelector(state => state.treatmentPriceTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedTreatment, setSelectedTreatment] = useState([{ label: "Pilih Tindakan", value: "", key: 0, name: 'id_daftar_layanan' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAddList, setModalAddList] = useState(false);
  const [treatmentID, setTreatmentID] = useState('');
  const [treatmentStatus, setTreatmentStatus] = useState(0);
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');

  const [treatmentPrice, setTreatmentPrice] = useState({
    id_daftar_layanan: '',
    id_klinik: clinicID,
    harga_jasa: '',
    harga_jual: '',
  });

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

  const onLoadDaftarTindakan = async () => {
    try {
      const response = await serviceAPI.get("?limit=1000&searchTipe=Tindakan");
      // console.log(response);

      setSelectedTreatment([{ label: "Pilih Tindakan", value: "", key: 0, name: 'id_daftar_layanan' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedTreatment((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_daftar_layanan' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [treatment, setTreatment] = useState({
    nama: '',
    tipe: 'Tindakan'
  });

  const onChange = (e) => {
    // console.log('e', e);

    if (e.name === 'id_klinik') {
        setTreatmentPrice(current => {
            return { ...current, id_klinik: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'id_daftar_layanan') {
        setTreatmentPrice(current => {
            return { ...current, id_daftar_layanan: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else {
        setTreatmentPrice(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    }

    // console.log('treatmentPrice', treatmentPrice);
  }

  const onChangeList = (e) => {
    // console.log('e', e);

    setTreatment(current => {
        return { ...current, [e.target.name]: e.target.value }
    })
    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');

    // console.log('treatment', treatment);
  }

  const onTreatmentListSubmit = async (e) => {
    e.preventDefault();
    setModalAddList(false);

    for(let [key, value] of Object.entries(treatment)) {
      if((key === 'nama' && value === '')){
        validate(e, key, value);
        return;
      }
    }

    try {
      const response = await serviceAPI.add(treatment);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah tindakan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        resetForm(e);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah tindakan gagal: ${response.message}`,
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
      onLoadDaftarTindakan();
    }
  };

  const onTreatmentSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(treatmentPrice)) {
      if((key === 'id_klinik' && value === '') || (key === 'id_daftar_layanan' && value === '') || (key === 'harga_jasa' && value === '') || (key === 'harga_jual' && value === '')){
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
        const response = await serviceClinicAPI.add(treatmentPrice);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah harga tindakan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah harga tindakan gagal: ${response.message}`,
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
        !userData.roles.includes('isDev') ? getTreatmentPrice(`?searchTipeDaftarLayanan=Tindakan&searchKlinik=${userData.id_klinik}`) : getTreatmentPrice("?searchTipeDaftarLayanan=Tindakan");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await serviceClinicAPI.update(treatmentPrice, treatmentID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah harga tindakan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah harga tindakan gagal: ${response.message}`,
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
        !userData.roles.includes('isDev') ? getTreatmentPrice(`?searchTipeDaftarLayanan=Tindakan&searchKlinik=${userData.id_klinik}`) : getTreatmentPrice("?searchTipeDaftarLayanan=Tindakan");
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setTreatmentID('');
    setTreatmentName('');
    setTreatmentStatus(0);
    setTreatment({
      nama: '',
      tipe: 'Tindakan'
    });

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

    setTreatmentPrice({
      id_daftar_layanan: treatmentID,
      id_klinik: clinicID,
      harga_jasa: '',
      harga_jual: '',
    });
    
    setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedTreatment([{ label: "Pilih Tindakan", value: "", key: 0, name: 'id_daftar_layanan' }]);

    setDataStatus("add");
    onLoadKlinik();
    onLoadDaftarTindakan();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getTreatmentPrice = async (params) => {
    try {
      setIsLoading(true);
      const res = await serviceClinicAPI.get(params);
      dispatch({type: "GET_TREATMENT_PRICE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_TREATMENT_PRICE", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getTreatmentPriceById = async (e, id) => {
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
      const res = await serviceClinicAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setTreatmentID(data.id);
      setTreatmentPrice({
        id_daftar_layanan: data.id_daftar_layanan,
        id_klinik: data.id_klinik,
        harga_jasa: data.harga_jasa,
        harga_jual: data.harga_jual
      });
      setTreatmentStatus(data.is_active);

    //   console.log(treatmentPrice);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, treatmentID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, treatmentID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (treatmentID && treatmentStatus == 1) {
        return <ButtonArchive/>;
      } else if (treatmentID && treatmentStatus == 0) {
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
      <DropdownItem onClick={(e) => statusById(e, treatmentID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, treatmentID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (treatmentID && treatmentStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (treatmentID && treatmentStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [treatmentName, setTreatmentName] = useState('');

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await serviceClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setTreatmentID(data.id);
      setTreatmentStatus(data.is_active);
      setTreatmentName(data.nama_daftar_layanan);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (treatmentStatus == 1) {
        const response = await serviceClinicAPI.archive("", treatmentID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip harga tindakan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip harga tindakan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await serviceClinicAPI.activate("", treatmentID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi harga tindakan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi harga tindakan gagal: ${response.message}`,
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
      !userData.roles.includes('isDev') ? getTreatmentPrice(`?searchTipeDaftarLayanan=Tindakan&searchKlinik=${userData.id_klinik}`) : getTreatmentPrice("?searchTipeDaftarLayanan=Tindakan");
      getTreatmentPriceById("", treatmentID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await serviceClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setTreatmentID(data.id);
      setTreatmentName(data.nama_daftar_layanan);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await serviceClinicAPI.delete(treatmentID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus harga tindakan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus harga tindakan gagal: ${response.message}`,
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
      !userData.roles.includes('isDev') ? getTreatmentPrice(`?searchTipeDaftarLayanan=Tindakan&searchKlinik=${userData.id_klinik}`) : getTreatmentPrice("?searchTipeDaftarLayanan=Tindakan");
    }
  };

  const [searchDaftarTindakan, setSearchName] = useState("");
  const [searchKlinik, setSearchKlinik] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, searchDaftarTindakan, searchKlinik, searchStatus, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
    
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchDaftarTindakan !== "") {
      params = `${params}&searchDaftarTindakan=${searchDaftarTindakan}`;
    }
    if (searchKlinik !== "") {
      params = `${params}&searchKlinik=${searchKlinik}`;
    }
    if (!userData.roles.includes('isDev')) {
      params = `${params}&searchKlinik=${userData.id_klinik}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    params = `${params}&searchTipeDaftarLayanan=Tindakan`;

    setRowSelected(false);
    getTreatmentPrice(params);

    onLoadKlinik();
    onLoadDaftarTindakan();
  }, [limit, searchDaftarTindakan, searchKlinik, searchStatus, sortBy, sortOrder, currentPage ]);

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
                    Data Harga Tindakan
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
                  onChange={(e) => setSearchName(e.target.value)}
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
                    <th>Tindakan</th>
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
                  treatmentData.length > 0 ? (
                    treatmentData.map((data) => (
                      <tr key={data.id} onClick={(e) => getTreatmentPriceById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama_daftar_layanan}</h6>
                          Jasa: {data.harga_jasa ? currencyFormat(data.harga_jasa) : "-"}, Jual: {data.harga_jual ? currencyFormat(data.harga_jual) : "-"}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getTreatmentPriceById(e, data.id)}
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
                totalPage={treatmentTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={treatmentTotalPage < 4 ? treatmentTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Harga Tindakan' : 'Form Ubah Harga Tindakan' }
                    {/* Form Manajemen Harga Tindakan */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && treatmentID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, treatmentID)}
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
                          userData.roles.includes('isManager')) && treatmentID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, treatmentID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onTreatmentSubmit}>
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
                        value={selectedKlinik.find(item => item.value === treatmentPrice.id_klinik) || { label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }}
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

                  <Colxx lg={3} className="col-tp-3" style={{ paddingRight: '0px' }}>
                    <FormGroup>
                      <Label for="id_daftar_layanan">
                        Tindakan
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
                        name="id_daftar_layanan"
                        id="id_daftar_layanan"
                        options={selectedTreatment}
                        value={selectedTreatment.find(item => item.value === treatmentPrice.id_daftar_layanan) || { label: "Pilih Tindakan", value: "", key: 0, name: 'id_daftar_layanan' }}
                        onChange={onChange}
                        // required
                      />
                      {errors.id_daftar_layanan && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.id_daftar_layanan}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={1} className="col-tp-1" style={{ paddingLeft: '0px' }}>
                    <FormGroup>
                      <Label>
                        &nbsp;
                      </Label>
                      <br/>
                      <Button
                        color="primary"
                        className="btn-sm"
                        onClick={() => { setModalAddList(true), setTreatment({nama: '', tipe: 'Tindakan'}) }}
                        style={{ borderRadius: '0 5px 5px 0', padding: '0.45rem', border: '2px solid #008ecc' }}
                      >
                        Tambah
                      </Button>
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={4} className="col-tp-4">
                    <FormGroup>
                      <Label for="harga_jasa">
                        Harga Jasa (Rp)
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
                        name="harga_jasa"
                        id="harga_jasa"
                        placeholder="Harga Jasa"
                        value={treatmentPrice.harga_jasa}
                        pattern="[0-9]*"
                        onChange={onChange}
                        // required={true}
                      />
                      {errors.harga_jasa && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.harga_jasa}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={4} className="col-tp-4">
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
                      <Input
                        type="number"
                        name="harga_jual"
                        id="harga_jual"
                        placeholder="Harga Jual"
                        value={treatmentPrice.harga_jual}
                        pattern="[0-9]*"
                        onChange={onChange}
                        // required={true}
                      />
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
                      // onClick={(e) => onTreatmentSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih harga tindakan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data harga tindakan.
                  Silahkan klik tombol tambah untuk menambahkan harga tindakan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Tindakan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {treatmentStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{treatmentName}</b>?</h5>
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
          <ModalHeader>Hapus Tindakan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{treatmentName}</b>?</h5>
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
          <Form className="av-tooltip tooltip-right-top" onSubmit={onTreatmentListSubmit}>
          <ModalHeader>Tambah Tindakan</ModalHeader>
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
                value={treatment.nama}
                onChange={onChangeList}
                // required={true}
              />
              {errors.nama && (
                <div className="rounded invalid-feedback d-block">
                  {errors.nama}
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
                // onClick={(e) => onTreatmentListSubmit(e)}
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
        <i className="iconsminds-wallet"></i> Tambah Tindakan
      </Button> */}
    </>
  );
};
export default Data;