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

import vendorAPI from "api/vendor/";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectStatusF = [
  { label: "Semua Status", value: "", key: 0, name: "status" },
  { label: "Aktif", value: "1", key: 1, name: "status" },
  { label: "Non-Aktif", value: "0", key: 2, name: "status" }
];

const Data = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const vendorData = useSelector(state => state.vendor);
  const vendorTotalPage = useSelector(state => state.vendorTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);
  
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [vendorID, setVendorID] = useState('');
  const [vendorStatus, setVendorStatus] = useState(0);

  const [vendor, setVendor] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    facebook: ''
  });

  const onChange = (e) => {
    // console.log('e', e);

    setVendor(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    if(e.target.name === "nama") {
        validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    }
    // console.log('vendor', vendor);
  }

  const onVendorSubmit = async (e) => {
    e.preventDefault();

    for(let [key, value] of Object.entries(vendor)) {
      if((key === 'nama' && value === '')){
        validate(e, key, value);
        return;
      }
    }

    setVendor(current => {
        return { ...current, instagram: `@${vendor.instagram}`, facebook: `https://facebook.com/${vendor.facebook}` }
    })

    if(dataStatus === 'add') {
      try {
        const response = await vendorAPI.add(vendor);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah vendor sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah vendor gagal: ${response.message}`,
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
        getVendor("");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await vendorAPI.update(vendor, vendorID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah vendor sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah vendor gagal: ${response.message}`,
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
        getVendor("");
        getVendorById("", vendorID);
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setVendorID('');
    setVendorName('');
    setVendorStatus(0);

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

    setVendor({
      nama: '',
      alamat: '',
      telepon: '',
      whatsapp: '',
      email: '',
      website: '',
      instagram: '',
      facebook: ''
    });

    setDataStatus("add");
  };

  const [isLoading, setIsLoading] = useState(false);

  const getVendor = async (params) => {
    try {
      setIsLoading(true);
      const res = await vendorAPI.get(params);
      dispatch({type: "GET_VENDOR", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_VENDOR", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getVendorById = async (e, id) => {
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
      const res = await vendorAPI.get(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setVendorID(data.id);
      setVendor({
        nama: data.nama,
        alamat: data.alamat,
        telepon: data.telepon,
        whatsapp: data.whatsapp,
        email: data.email,
        website: data.website,
        instagram: data.instagram.replace('@',''),
        facebook: data.facebook.replace('https://facebook.com','')
      });
      setVendorStatus(data.is_active);

      // console.log(vendor);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, vendorID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, vendorID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    console.log(vendorID, vendorStatus);
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (vendorID && vendorStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (vendorID && vendorStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [vendorName, setVendorName] = useState('');

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await vendorAPI.get(`/${id}`);
      let data = res.data.data[0];

      setVendorID(data.id);
      setVendorStatus(data.is_active);
      setVendorName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (vendorStatus == 1) {
        const response = await vendorAPI.archive("", vendorID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip vendor sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip vendor gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await vendorAPI.activate("", vendorID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi vendor sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi vendor gagal: ${response.message}`,
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
      getVendor("");
      getVendorById("", vendorID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await vendorAPI.get(`/${id}`);
      let data = res.data.data[0];

      setVendorID(data.id);
      setVendorName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await vendorAPI.delete(vendorID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus vendor sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus vendor gagal: ${response.message}`,
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
      getVendor("");
    }
  };

  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, search, searchStatus, sortBy, sortOrder ]);

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
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }
    
    setRowSelected(false);
    getVendor(params);
  }, [limit, search, searchStatus, sortBy, sortOrder, currentPage ]);

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
                    Data Vendor
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
                    <th>Vendor</th>
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
                  vendorData.length > 0 ? (
                    vendorData.map((data) => (
                      <tr key={data.id} onClick={(e) => getVendorById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getVendorById(e, data.id)}
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
                totalPage={vendorTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={vendorTotalPage < 4 ? vendorTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Vendor' : 'Form Ubah Vendor' }
                    {/* Form Manajemen Vendor */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && vendorID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, vendorID)}
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
                          userData.roles.includes('isManager')) && vendorID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, vendorID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onVendorSubmit}>
                <FormGroup row>
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
                        value={vendor.nama}
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
                        <Label for="alamat">
                            Alamat
                        </Label>
                        <Input
                            type="text"
                            name="alamat"
                            id="alamat"
                            placeholder="Alamat"
                            value={vendor.alamat}
                            onChange={onChange}
                        />
                    </FormGroup>
                </Colxx>
                  
                  <Colxx sm={6}>
                    <FormGroup>
                        <Label for="telepon">
                            No. Telepon
                            {/* <span
                                className="required text-danger"
                                aria-required="true"
                                >
                                {" "}
                                *
                            </span> */}
                        </Label>
                        <Input
                            type="number"
                            name="telepon"
                            id="telepon"
                            placeholder="No. Telepon"
                            value={vendor.telepon}
                            pattern="[0-9]*"
                            onChange={onChange}
                        />
                    </FormGroup>
                  </Colxx>
                  
                  <Colxx sm={6}>
                    <FormGroup>
                        <Label for="whatsapp">
                            No. WhatsApp
                            {/* <span
                                className="required text-danger"
                                aria-required="true"
                                >
                                {" "}
                                *
                            </span> */}
                        </Label>
                        <Input
                            type="number"
                            name="whatsapp"
                            id="whatsapp"
                            placeholder="No. WhatsApp"
                            value={vendor.whatsapp}
                            pattern="[0-9]*"
                            onChange={onChange}
                        />
                    </FormGroup>
                  </Colxx>

                <Colxx sm={6}>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={vendor.email}
                            onChange={onChange}
                        />
                    </FormGroup>
                </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="website">
                        Website
                      </Label>
                      <Input
                        type="text"
                        name="website"
                        id="website"
                        placeholder="Website"
                        value={vendor.website}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="instagram">
                        Instagram
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <Input
                            type="text"
                            name="instagram"
                            id="instagram"
                            placeholder="Instagram"
                            value={vendor.instagram}
                            onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="facebook">
                        Facebook
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">https://facebook.com/</InputGroupAddon>
                        <Input
                            type="text"
                            name="facebook"
                            id="facebook"
                            placeholder="Facebook"
                            value={vendor.facebook}
                            onChange={onChange}
                        />
                      </InputGroup>
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
                      // onClick={(e) => onVendorSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih vendor untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data vendor.
                  Silahkan klik tombol tambah untuk menambahkan vendor baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Vendor</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {vendorStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{vendorName}</b>?</h5>
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
          <ModalHeader>Hapus Vendor</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{vendorName}</b>?</h5>
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
        <i className="iconsminds-library"></i> Tambah Vendor
      </Button> */}
    </>
  );
};
export default Data;