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

import consumablesClinicAPI from "api/consumables/clinic";
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

const selectPcs = [
  { label: 'Pilih Satuan', value: '', key: 0, name: 'satuan' },
  { label: 'Kapsul', value: 'Kapsul', key: 1, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 2, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 3, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 4, name: 'satuan' },
  { label: 'mL (mililiter)', value: 'mL', key: 5, name: 'satuan' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 6, name: 'satuan' },
];

const selectType = [
  { label: 'Pilih Tipe', value: '', key: 0, name: 'tipe' },
  { label: 'BHP (Bahan Habis Pakai)', value: 'BHP', key: 1, name: 'tipe' },
  { label: 'BNMHP (Bahan Non-Medis Habis Pakai)', value: 'BNMHP', key: 2, name: 'tipe' },
];

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const consumablesData = useSelector(state => state.consumablesClinic);
  const consumablesTotalPage = useSelector(state => state.consumablesClinicTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [consumablesID, setConsumablesID] = useState('');
  const [consumablesStatus, setConsumablesStatus] = useState(0);
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');

  const [consumablesClinic, setConsumablesClinic] = useState({
    id_klinik: clinicID,
    nama: '',
    merk: '',
    satuan: '',
    harga_jual: '',
    tipe: '',
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

  const onChange = (e) => {
    // console.log('e', e);

    if (e.name) {
        setConsumablesClinic(current => {
            return { ...current, [e.name]: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else {
        setConsumablesClinic(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value ? e.value !== undefined : e.target.value ? e.target.value : '');
    }

    // console.log('consumablesClinic', consumablesClinic);
  }

  const onConsumablesSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(consumablesClinic)) {
      if((key === 'id_klinik' && value === '') || (key === 'nama' && value === '') || (key === 'merk' && value === '') || (key === 'satuan' && value === '') ||
          (key === 'harga_jual' && value === '')){
        validate(e, key, value);
        isError = true;
      //   return;
      }

      if((key === 'tipe' && value === '')){
        validate(e, 'tipe_bhp', value);
        isError = true;
      //   return;
      }
    }

    if(isError === true){
      return;
    }

    if(dataStatus === 'add') {
      try {
        const response = await consumablesClinicAPI.add(consumablesClinic);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah harga bahan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah harga bahan gagal: ${response.message}`,
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
        getConsumablesClinic("");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await consumablesClinicAPI.update(consumablesClinic, consumablesID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah harga bahan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah harga bahan gagal: ${response.message}`,
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
        getConsumablesClinic("");
        getConsumablesClinicById("", consumablesID);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setConsumablesID('');
    setConsumablesName('');
    setConsumablesStatus(0);

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

    setConsumablesClinic({
      id_klinik: clinicID,
      nama: '',
      merk: '',
      satuan: '',
      harga_jual: '',
      tipe: '',
    });
    
    setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

    setDataStatus("add");
    onLoadKlinik();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getConsumablesClinic = async (params) => {
    try {
      setIsLoading(true);
      const res = await consumablesClinicAPI.get(params);
      dispatch({type: "GET_CONSUMABLES_CLINIC", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_CONSUMABLES_CLINIC", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getConsumablesClinicById = async (e, id) => {
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
      const res = await consumablesClinicAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setConsumablesID(data.id);
      setConsumablesClinic({
        id_klinik: data.id_klinik,
        nama: data.nama,
        merk: data.merk,
        satuan: data.satuan,
        harga_jual: data.harga_jual,
        tipe: data.tipe,
      });
      setConsumablesStatus(data.is_active);

    //   console.log(consumablesClinic);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, consumablesID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, consumablesID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (consumablesID && consumablesStatus == 1) {
        return <ButtonArchive/>;
      } else if (consumablesID && consumablesStatus == 0) {
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
      <DropdownItem onClick={(e) => statusById(e, consumablesID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, consumablesID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (consumablesID && consumablesStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (consumablesID && consumablesStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [consumablesName, setConsumablesName] = useState('');

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await consumablesClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setConsumablesID(data.id);
      setConsumablesStatus(data.is_active);
      setConsumablesName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (consumablesStatus == 1) {
        const response = await consumablesClinicAPI.archive("", consumablesID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip harga bahan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip harga bahan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await consumablesClinicAPI.activate("", consumablesID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi harga bahan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi harga bahan gagal: ${response.message}`,
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
      getConsumablesClinic("");
      getConsumablesClinicById("", consumablesID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await consumablesClinicAPI.get(`/${id}`);
      let data = res.data.data[0];

      setConsumablesID(data.id);
      setConsumablesName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await consumablesClinicAPI.delete(consumablesID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus harga bahan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus harga bahan gagal: ${response.message}`,
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
      getConsumablesClinic("");
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
    getConsumablesClinic(params);

    onLoadKlinik();
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
                    Data Harga Bahan
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
                    <th>Bahan</th>
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
                  consumablesData.length > 0 ? (
                    consumablesData.map((data) => (
                      <tr key={data.id} onClick={(e) => getConsumablesClinicById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          {data.merk ? data.merk : "-"}, {data.harga_jual ? currencyFormat(data.harga_jual) : "Rp0"} / { data.satuan ? data.satuan : "-" }<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getConsumablesClinicById(e, data.id)}
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
                totalPage={consumablesTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={consumablesTotalPage < 4 ? consumablesTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Harga Bahan' : 'Form Ubah Harga Bahan' }
                    {/* Form Manajemen Harga Bahan */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && consumablesID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, consumablesID)}
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
                          userData.roles.includes('isManager')) && consumablesID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, consumablesID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onConsumablesSubmit}>
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
                        value={selectedKlinik.find(item => item.value === consumablesClinic.id_klinik) || { label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }}
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

                  <Colxx sm={6}>
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
                        value={consumablesClinic.nama}
                        onChange={onChange}
                        // required
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
                      <Label for="merk">
                        Merk
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
                        name="merk"
                        id="merk"
                        placeholder="Merk"
                        value={consumablesClinic.merk}
                        onChange={onChange}
                        // required
                      />
                      {errors.merk && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.merk}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
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
                        value={consumablesClinic.satuan}
                        onChange={onChange}
                        pattern="[0-9]*"
                        // required
                      /> */}
                      <Select
                        addonType="prepend"
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="satuan"
                        value={selectPcs.find(item => item.value === consumablesClinic.satuan) || { label: "Pilih Satuan", value: "", key: 0, name: 'satuan' }}
                        options={selectPcs}
                        onChange={onChange}
                      />
                      {errors.satuan && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.satuan}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={4}>
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
                            value={consumablesClinic.harga_jual}
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

                  <Colxx sm={4}>
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
                        addonType="prepend"
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="tipe"
                        value={selectType.find(item => item.value === consumablesClinic.tipe) || { label: "Pilih Tipe", value: "", key: 0, name: 'tipe' }}
                        options={selectType}
                        onChange={onChange}
                      />
                      {errors.tipe_bhp && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.tipe_bhp}
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
                      // onClick={(e) => onConsumablesSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih harga bahan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data harga bahan.
                  Silahkan klik tombol tambah untuk menambahkan harga bahan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Bahan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {consumablesStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{consumablesName}</b>?</h5>
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
          <ModalHeader>Hapus Bahan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{consumablesName}</b>?</h5>
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
        <i className="iconsminds-wallet"></i> Tambah Bahan
      </Button> */}
    </>
  );
};
export default Data;