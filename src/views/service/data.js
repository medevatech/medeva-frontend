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

import serviceAPI from "api/service/list";
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
  const serviceData = useSelector(state => state.serviceList);
  const serviceTotalPage = useSelector(state => state.serviceListTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedKlinik, setSelectedKlinik] = useState([]);
  
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [serviceID, setServiceID] = useState('');
  const [serviceStatus, setServiceStatus] = useState(0);

  const [service, setService] = useState({
    nama: '',
    tipe: 'Layanan'
  });

  const onChange = (e) => {
    // console.log('e', e);

    setService(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    // console.log('service', service);
  }

  const onServiceSubmit = async (e) => {
    e.preventDefault();

    for(let [key, value] of Object.entries(service)) {
      if((key === 'nama' && value === '')){
        validate(e, key, value);
        return;
      }
    }

    if(dataStatus === 'add') {
      try {
        const response = await serviceAPI.add(service);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah layanan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah layanan gagal: ${response.message}`,
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
        !userData.roles.includes('isDev') ? getService(`?searchTipe=Layanan&searchKlinik=${userData.id_klinik}`) : getService("?searchTipe=Layanan");
      }
    } else if (dataStatus === 'update') {
      try {
        const response = await serviceAPI.update(service, serviceID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah layanan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
  
          resetForm(e);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah layanan gagal: ${response.message}`,
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
        !userData.roles.includes('isDev') ? getService(`?searchTipe=Layanan&searchKlinik=${userData.id_klinik}`) : getService("?searchTipe=Layanan");
      }
    } else {
      console.log('dataStatus undefined')
    }
  };

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setServiceID('');
    setServiceName('');
    setServiceStatus(0);

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

    setService({
      nama: '',
      tipe: 'Layanan'
    });

    setDataStatus("add");
  };

  const [isLoading, setIsLoading] = useState(false);

  const getService = async (params) => {
    try {
      setIsLoading(true);
      const res = await serviceAPI.get(params);
      dispatch({type: "GET_SERVICE_LIST", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_SERVICE_LIST", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceById = async (e, id) => {
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
      const res = await serviceAPI.get(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setServiceID(data.id);
      setService({
        nama: data.nama,
        tipe: data.tipe
      });
      setServiceStatus(data.is_active);

      // console.log(service);

    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  };

  function ButtonActive() {
    return <>
    <Button color="success" size="xs" onClick={(e) => statusById(e, serviceID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function ButtonArchive() {
    return <>
    <Button color="warning" size="xs" onClick={(e) => statusById(e, serviceID)}>
      <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
    </Button><span>&nbsp;&nbsp;</span>
    </>;
  }

  function IsActive() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (serviceID && serviceStatus == 1) {
        return <ButtonArchive/>;
      } else if (serviceID && serviceStatus == 0) {
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
      <DropdownItem onClick={(e) => statusById(e, serviceID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, serviceID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (serviceID && serviceStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (serviceID && serviceStatus == 0) {
        return <ActiveDropdown/>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const [serviceName, setServiceName] = useState('');

  const statusById = async (e, id) => {
    e.preventDefault();

    setModalArchive(true);
    try {
      const res = await serviceAPI.get(`/${id}`);
      let data = res.data.data[0];

      setServiceID(data.id);
      setServiceStatus(data.is_active);
      setServiceName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (serviceStatus == 1) {
        const response = await serviceAPI.archive("", serviceID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip layanan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip layanan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await serviceAPI.activate("", serviceID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi layanan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi layanan gagal: ${response.message}`,
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
      !userData.roles.includes('isDev') ? getService(`?searchTipe=Layanan&searchKlinik=${userData.id_klinik}`) : getService("?searchTipe=Layanan");
      getServiceById("", serviceID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await serviceAPI.get(`/${id}`);
      let data = res.data.data[0];

      setServiceID(data.id);
      setServiceName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await serviceAPI.delete(serviceID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus layanan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus layanan gagal: ${response.message}`,
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
      !userData.roles.includes('isDev') ? getService(`?searchTipe=Layanan&searchKlinik=${userData.id_klinik}`) : getService("?searchTipe=Layanan");
    }
  };

  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
      params = `${params}&searchDaftarLayanan=${searchName}`;
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

    params = `${params}&searchTipe=Layanan`;
    
    setRowSelected(false);
    getService(params);
  }, [limit, searchName, searchStatus, sortBy, sortOrder, currentPage ]);

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
                    Data Layanan
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
                    <th>Layanan</th>
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
                  serviceData.length > 0 ? (
                    serviceData.map((data) => (
                      <tr key={data.id} onClick={(e) => getServiceById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
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
                            onClick={(e) => getServiceById(e, data.id)}
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
                totalPage={serviceTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={serviceTotalPage < 4 ? serviceTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Layanan' : 'Form Ubah Layanan' }
                    {/* Form Manajemen Layanan */}
                  </Colxx>
                  <Colxx sm="2" className="three-dots-menu">
                    {/* {<IsActive/>}
                    {(userData.roles.includes('isDev') ||
                    userData.roles.includes('isManager')) && serviceID &&
                      <Button color="danger" size="xs"
                        onClick={(e) => deleteById(e, serviceID)}
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
                          userData.roles.includes('isManager')) && serviceID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, serviceID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onServiceSubmit}>
                <FormGroup row>
                  <Colxx sm={12}>
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
                        value={service.nama}
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
                      // onClick={(e) => onServiceSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih layanan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data layanan.
                  Silahkan klik tombol tambah untuk menambahkan layanan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Layanan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {serviceStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{serviceName}</b>?</h5>
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
          <ModalHeader>Hapus Layanan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{serviceName}</b>?</h5>
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
        <i className="iconsminds-library"></i> Tambah Layanan
      </Button> */}
    </>
  );
};
export default Data;