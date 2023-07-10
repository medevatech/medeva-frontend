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

import inspectAPI from "api/inspect";
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
  const inspectData = useSelector(state => state.inspectList);
  const inspectTotalPage = useSelector(state => state.inspectListTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [rowSelected, setRowSelected] = useState(null);
  
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [inspectID, setInspectID] = useState('');
  const [inspectName, setInspectName] = useState('');
  const [inspectStatus, setInspectStatus] = useState(0);
  
  const [inspect, setInspect] = useState({
    nama: ''
  });

  const onChange = (e) => {
    // console.log('e', e);

    setInspect(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');

    // console.log('inspect', inspect);
  }

  const onInspectSubmit = async (e) => {
    e && e.preventDefault();
    
    // console.log('inspect', inspect);

    for(let [key, value] of Object.entries(inspect)) {
      if((key === 'nama' && value === '')){
        validate(e, 'nama_pemeriksaan', value);
        // isError = true;
        return;
      }

      // console.log(key, value);
    }

    // console.log('errors', errors);

    if(dataStatus === 'add') {
        try {
          const response = await inspectAPI.add(inspect);
          // console.log(response);
    
          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);
    
            Swal.fire({
              title: "Sukses!",
              html: `Tambah pemeriksaan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
    
            setInspectID(data.id);
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah pemeriksaan gagal: ${response.message}`,
              icon: "error",
              confirmButtonColor: "#008ecc",
              confirmButtonText: "Coba lagi",
            });
    
            throw Error(`Error status: ${response.status}`);
          }
        } catch (e) {
          Swal.fire({
            title: "Gagal!",
            html: e.response.data.message.response.data.message,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
    
          console.log(e);
        } finally {
          getInspect("");
        }
      } else if (dataStatus === 'update') {
        try {
          const response = await inspectAPI.update(inspect, inspectID);
          // console.log(response);
    
          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);
    
            Swal.fire({
              title: "Sukses!",
              html: `Ubah pemeriksaan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
    
            resetForm(e);
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah pemeriksaan gagal: ${response.message}`,
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
          getInspect("");
          getInspectById("", inspectID);
        }
      } else {
        console.log('dataStatus undefined')
      }
  }

  const resetForm = (e, scroll = false) => {
    e && e.preventDefault();

    setInspectID('');
    setInspectStatus(0);

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

    setInspect({ nama: "" });
    setDataStatus("add");
  };

  const [isLoading, setIsLoading] = useState(false);

  const getInspect = async (params) => {
    try {
      setIsLoading(true);
      const res = await inspectAPI.get(params);
      dispatch({type: "GET_INSPECT_LIST", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_INSPECT_LIST", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getInspectById = async (e, id) => {
    e && e.preventDefault();
    // e && resetForm(e);

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
      const res = await inspectAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setInspectID(data.id);
      setInspect({
        nama: data.nama,
      });

      setInspectName(data.nama);
      setInspectStatus(data.is_active);
    } catch (e) {
      console.log(e);
    }

    // console.log(dataStatus);
  }

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, inspectID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, inspectID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (inspectID && inspectStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (inspectID && inspectStatus == 0) {
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
      const res = await inspectAPI.get(`/${id}`);
      let data = res.data.data[0];

      setInspectID(data.id);
      setInspectStatus(data.is_active);
      setInspectName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (inspectStatus == 1) {
        const response = await inspectAPI.archive("", inspectID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip pemeriksaan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip pemeriksaan gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await inspectAPI.activate("", inspectID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi pemeriksaan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi pemeriksaan gagal: ${response.message}`,
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
      getInspect("");
      getInspectById("", inspectID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await inspectAPI.get(`/${id}`);
      let data = res.data.data[0];

      setInspectID(data.id);
      setInspectName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await inspectAPI.delete(inspectID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus pemeriksaan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus pemeriksaan gagal: ${response.message}`,
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
      getInspect("");
      resetForm();
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
    getInspect(params);
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
                    Data Pemeriksaan
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
                        defaultValue={{ label: "Semua Status", value: "", key: 0, name: 'status' }}
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
                    <th>Pemeriksaan</th>
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
                  inspectData.length > 0 ? (
                    inspectData.map((data) => (
                      <tr key={data.id} onClick={(e) => getInspectById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
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
                            // onClick={(e) => getInspectById(e, data.id)}
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
                totalPage={inspectTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={inspectTotalPage < 4 ? inspectTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Pemeriksaan' : 'Form Ubah Pemeriksaan' }
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
                          userData.roles.includes('isManager')) && inspectID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, inspectID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onInspectSubmit}>
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
                          value={inspect.nama}
                          onChange={onChange}
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
                      // onClick={(e) => onInspectSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih pemeriksaan untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data pemeriksaan.
                  Silahkan klik tombol tambah untuk menambahkan pemeriksaan baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Pemeriksaan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {inspectStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{inspectName}</b>?</h5>
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
          <ModalHeader>Hapus Pemeriksaan</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{inspectName}</b>?</h5>
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
        <i className="iconsminds-library"></i> Tambah Pemeriksaan
      </Button> */}
    </>
  );
};
export default Data;