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

import propertyAPI from "api/property/clinic";
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

const selectType = [
  { label: "Pilih Tipe", value: "", key: 0, name: "tipe" },
  { label: "Tanah", value: "Tanah", key: 1, name: "tipe" },
  { label: "Bangunan", value: "Bangunan", key: 2, name: "tipe" }
];

const selectMethod = [
  { label: "Pilih Metode", value: "", key: 0, name: "metode_depresiasi" },
  { label: "Metode Garis Lurus", value: "Garis Lurus", key: 1, name: "metode_depresiasi" },
  { label: "Metode Beban Menurun", value: "Beban Menurun", key: 2, name: "metode_depresiasi" },
  { label: "Metode Aktivitas", value: "Aktivitas", key: 3, name: "metode_depresiasi" },
  { label: "Metode Depresiasi Khusus", value: "Depresiasi Khusus", key: 4, name: "metode_depresiasi" },
  { label: "Metode Saldo Menurun", value: "Saldo Menurun", key: 5, name: "metode_depresiasi" },
  { label: "Metode Unit Produksi", value: "Unit Produksi", key: 6, name: "metode_depresiasi" }
];

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const propertyData = useSelector(state => state.propertyClinic);
  const propertyTotalPage = useSelector(state => state.propertyClinicTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
  const [selectedKlinikF, setSelectedKlinikF] = useState([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [propertyID, setPropertyID] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyStatus, setPropertyStatus] = useState(0);
  const [clinicID, setClinicID] = useState(!userData.roles.includes('isDev') ? userData.id_klinik : '');

  const [property, setProperty] = useState({
    id_klinik: clinicID,
    nama: '',
    tanggal_beli: '',
    harga_beli: '',
    tipe: '',
    habis_masa_hidup: '',
    metode_depresiasi: ''
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
        setProperty(current => {
            return { ...current, [e.name]: e ? e.value : ''}
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else {
        setProperty(current => {
            return { ...current, [e.target.name]: e.target.value }
        })
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value ? e.value !== undefined : e.target.value ? e.target.value : '');
    }

    // console.log('property', property);
  }

  const onPropertySubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(property)) {
      if((key === 'id_klinik' && value === '') || (key === 'nama' && value === '') || (key === 'tanggal_beli' && value === '') || (key === 'harga_beli' && value === '') ||
          (key === 'tipe' && value === '') || (key === 'habis_masa_hidup' && value === '') || (key === 'metode_depresiasi' && value === '')){
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
        const response = await propertyAPI.add(property);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah tanah & bangunan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah tanah & bangunan gagal: ${response.message}`,
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
        getProperty("");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await propertyAPI.update(property, propertyID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah tanah & bangunan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah tanah & bangunan gagal: ${response.message}`,
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
        getProperty("");
        getPropertyById("", propertyID);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setPropertyID('');
    setPropertyName('');
    setPropertyStatus(0);

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

    setProperty({
      id_klinik: clinicID,
      nama: '',
      tanggal_beli: '',
      harga_beli: '',
      tipe: '',
      habis_masa_hidup: '',
      metode_depresiasi: ''
    });
    
    setSelectedKlinik([{ label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }]);
    setSelectedKlinikF([{ label: "Semua Klinik", value: "", key: 0, name: 'id_klinik' }]);

    setDataStatus("add");
    onLoadKlinik();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getProperty = async (params) => {
    try {
      setIsLoading(true);
      const res = await propertyAPI.get(params);
      dispatch({type: "GET_PROPERTY_CLINIC", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_PROPERTY_CLINIC", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyById = async (e, id) => {
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
      const res = await propertyAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setPropertyID(data.id);
      setProperty({
        id_klinik: data.id_klinik,
        nama: data.nama,
        tanggal_beli: data.tanggal_beli.substring(0, 10),
        harga_beli: data.harga_beli,
        tipe: data.tipe,
        habis_masa_hidup: data.habis_masa_hidup,
        metode_depresiasi: data.metode_depresiasi
      });
      setPropertyStatus(data.is_active);

    //   console.log(property);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, propertyID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, propertyID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (propertyID && propertyStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (propertyID && propertyStatus == 0) {
        return <ActiveDropdown/>;
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
      const res = await propertyAPI.get(`/${id}`);
      let data = res.data.data[0];

      setPropertyID(data.id);
      setPropertyStatus(data.is_active);
      setPropertyName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (propertyStatus == 1) {
        const response = await propertyAPI.archive("", propertyID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip tanah & bangunan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip tanah & bangunan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await propertyAPI.activate("", propertyID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi tanah & bangunan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi tanah & bangunan gagal: ${response.message}`,
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
      getProperty("");
      getPropertyById("", propertyID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await propertyAPI.get(`/${id}`);
      let data = res.data.data[0];

      setPropertyID(data.id);
      setPropertyName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await propertyAPI.delete(propertyID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus tanah & bangunan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus tanah & bangunan gagal: ${response.message}`,
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
      getProperty("");
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
    getProperty(params);

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
                    Data Tanah & Bangunan
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
                    <th>Tanah & Bangunan</th>
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
                  propertyData.length > 0 ? (
                    propertyData.map((data) => (
                      <tr key={data.id} onClick={(e) => getPropertyById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          {data.harga_beli ? currencyFormat(data.harga_beli) : "Rp0"}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            // onClick={(e) => getPropertyById(e, data.id)}
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
                totalPage={propertyTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={propertyTotalPage < 4 ? propertyTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Tanah & Bangunan' : 'Form Ubah Tanah & Bangunan' }
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
                          userData.roles.includes('isManager')) && propertyID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, propertyID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onPropertySubmit}>
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
                        value={selectedKlinik.find(item => item.value === property.id_klinik) || { label: "Pilih Klinik", value: "", key: 0, name: 'id_klinik' }}
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

                  <Colxx lg={6} className="col-tp-6">
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
                        value={property.nama}
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
                      <Label for="tanggal_beli">
                        Tanggal Beli
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
                        name="tanggal_beli"
                        id="tanggal_beli"
                        placeholder="Tanggal Beli"
                        value={property.tanggal_beli}
                        onChange={onChange}
                      />
                      {errors.tanggal_beli && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.tanggal_beli}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={6} className="col-tp-6">
                    <FormGroup>
                      <Label for="harga_beli">
                        Harga Beli (Rp)
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
                            name="harga_beli"
                            id="harga_beli"
                            placeholder="Harga Beli"
                            value={property.harga_beli}
                            onChange={onChange}
                            pattern="[0-9]*"
                        />
                      </InputGroup>
                      {errors.harga_beli && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.harga_beli}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={6}>
                    <FormGroup>
                      <Label for="tipe">Tipe
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
                        options={selectType}
                        value={selectType.find(item => item.value === property.tipe) || { label: "Pilih Tipe", value: "", key: 0, name: 'tipe' }}
                        onChange={onChange}
                      />
                      {errors.tipe_properti && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.tipe_properti}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="habis_masa_hidup">
                        Proyeksi Masa Pakai
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
                        name="habis_masa_hidup"
                        id="habis_masa_hidup"
                        placeholder="Proyeksi Masa Pakai"
                        value={property.habis_masa_hidup}
                        onChange={onChange}
                      />
                      {errors.habis_masa_hidup && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.habis_masa_hidup}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>

                  <Colxx lg={6}>
                    <FormGroup>
                      <Label for="tipe">Metode Depresiasi
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
                        name="metode_depresiasi"
                        id="metode_depresiasi"
                        options={selectMethod}
                        value={selectMethod.find(item => item.value === property.metode_depresiasi) || { label: "Pilih Tipe", value: "", key: 0, name: 'metode_depresiasi' }}
                        onChange={onChange}
                      />
                      {errors.metode_depresiasi && (
                        <div className="rounded invalid-feedback d-block">
                          {errors.metode_depresiasi}
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
                      // onClick={(e) => onPropertySubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih tanah & bangunan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data tanah & bangunan.
                  Silahkan klik tombol tambah untuk menambahkan tanah & bangunan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Tanah & Bangunan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {propertyStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{propertyName}</b>?</h5>
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
          <ModalHeader>Hapus Tanah & Bangunan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{propertyName}</b>?</h5>
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
        <i className="iconsminds-wallet"></i> Tambah Tanah & Bangunan
      </Button> */}
    </>
  );
};
export default Data;