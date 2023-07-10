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

import laboratoriumAPI from "api/lab";
import laboratoriumServicesAPI from "api/lab/treatment";
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
  const laboratoriumData = useSelector(state => state.lab);
  const laboratoriumTotalPage = useSelector(state => state.labTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [dataStatusLabServices, setDataStatusLabServices] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState([{ label: "Pilih Pemeriksaan", value: "", key: 0, name: 'id_pemeriksaan' }]);
  
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [laboratoriumID, setLaboratoriumID] = useState('');
  const [laboratoriumName, setLaboratoriumName] = useState('');
  const [laboratoriumStatus, setLaboratoriumStatus] = useState(0);
  const [laboratoriumSubmit, setLaboratoriumSubmit] = useState('');

  const [laboratorium, setLaboratorium] = useState({
    nama: '', nomor_telepon: '', alamat: ''
  });
  
  const [labServices, setLabServices] = useState([{
    id: '', id_lab: laboratoriumID, id_pemeriksaan: '', kategori: ''
  }]);
  
  const [tempLabServices, setTempLabServices] = useState([{
    id: '', id_lab: laboratoriumID, id_pemeriksaan: '', kategori: ''
  }]);

  const onLoadPemeriksaan = async () => {
    try {
      const response = await inspectAPI.get("?limit=1000");
      // console.log(response);

      setSelectedPemeriksaan([{ label: "Pilih Pemeriksaan", value: "", key: 0, name: 'id_pemeriksaan' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedPemeriksaan((current) => [
                ...current, { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_pemeriksaan' },
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

    setLaboratorium(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');

    // console.log('laboratorium', laboratorium);
  }

  const addLabServicesFields = () => {
    let newfieldLabServices = { id: '', id_lab: laboratoriumID, id_pemeriksaan: '', kategori: '' };
    setLabServices([...labServices, newfieldLabServices]);
  };

  const removeLabServicesFields = (id, index) => {
    let dataLabServices = [...labServices];
    dataLabServices.splice(index, 1);
    setLabServices(dataLabServices);

    if(dataStatusLabServices === "update"){
      setTempLabServices(dataLabServices);
      onDeleteLabServices(id);
    }
  };

  const handleLabServicesChange = (index, event) => {
    let dataLabServices = [...labServices];
    // console.log('event', event);

    if(event.name === "id_pemeriksaan"){
        dataLabServices[index]['id_pemeriksaan'] = event.value;
        validate(event, event.name, event.value);
    } else if (event.target.name === "kategori") {
        dataLabServices[index]['kategori'] = event.target.value;
        validate(event, 'kategori_layanan_lab', event.target.value);
    }

    setLabServices(dataLabServices);
  };

  const onLaboratoriumSubmit = async (e) => {
    e && e.preventDefault();
    setLaboratoriumSubmit("process");

    let isError = false;
    
    // console.log('laboratorium', laboratorium);
    // console.log('labServices', labServices);

    for(let [key, value] of Object.entries(laboratorium)) {
        if((key === 'nama' && value === '') || (key === 'nomor_telepon' && value === '') || (key === 'alamat' && value === '')){
          validate(e, key, value);
          isError = true;
          // return;
        }

        // console.log(key, value);
    }

    for (var i = 0; i < labServices.length; i++) {
        labServices[i].id_lab = laboratoriumID;
  
        for(let [key, value] of Object.entries(labServices[i])) {
            if((key === 'id_pemeriksaan' && value === '')){
                validate(e, key, value);
                isError = true;
                // return;
            }

            if((key === 'kategori' && value === '')){
                validate(e, 'kategori_layanan_lab', value);
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

    if(dataStatus === 'add') {
        try {
          const response = await laboratoriumAPI.add(laboratorium);
          // console.log(response);
    
          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);
    
            Swal.fire({
              title: "Sukses!",
              html: `Tambah laboratorium sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
    
            setLaboratoriumID(data.id);
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah laboratorium gagal: ${response.message}`,
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
        }
      } else if (dataStatus === 'update') {
        try {
          const response = await laboratoriumAPI.update(laboratorium, laboratoriumID);
          // console.log(response);
    
          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);
    
            Swal.fire({
              title: "Sukses!",
              html: `Ubah laboratorium sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
    
            // resetForm(e);
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah laboratorium gagal: ${response.message}`,
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
      } else {
        console.log('dataStatus undefined')
      }

    setLaboratoriumSubmit("done");
  }

  const onLabServicesSubmit = async (e) => {
    e && e.preventDefault();

    let isError = false;

    for (var i = 0; i < labServices.length; i++) {
        for(let [key, value] of Object.entries(labServices[i])) {
            if((key === 'id_pemeriksaan' && value === '')){
                validate(e, key, value);
                isError = true;
                // return;
            }

            if((key === 'kategori' && value === '')){
                validate(e, 'kategori_layanan_lab', value);
                isError = true;
                // return;
            }
    
            // console.log(key, value);
        }
    }

    if(isError === true) {
      return;
    }

    console.log('labServices', labServices);

    for (var i = 0; i < labServices.length; i++) {
      labServices[i].id_lab = laboratoriumID;
  
      if(labServices[i].id !== '' && labServices[i].kategori !== tempLabServices[i].kategori) {
        onLabServicesEdit(labServices[i]);
      } else if(labServices[i].id === '') {
        onLabServicesAdd(labServices[i]);
      }
    }

    getLaboratorium("");
    if(dataStatus === "update"){
      getLaboratoriumById("", laboratoriumID);
    }
  }

  const onLabServicesAdd = async (labServices) => {
    try {
      const response = await laboratoriumServicesAPI.add(labServices);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Tambah pelayanan laboratorium sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Tambah pelayanan laboratorium gagal: ${response.message}`,
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

  const onLabServicesEdit = async (labServices) => {
    try {
      const response = await laboratoriumServicesAPI.update(labServices, labServices.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Ubah pelayanan laboratorium sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Ubah pelayanan laboratorium gagal`,
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

    setLaboratoriumID('');
    setLaboratoriumStatus(0);

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

    setLaboratorium({ nama: '', nomor_telepon: '', alamat: '' });

    setLabServices([]);
    setLabServices([{ id: "", id_lab: laboratoriumID, id_pemeriksaan: "", kategori: "" }]);

    setDataStatus("add");
    setDataStatusLabServices("add");

    onLoadPemeriksaan();
  };

  const [isLoading, setIsLoading] = useState(false);

  const getLaboratorium = async (params) => {
    try {
      setIsLoading(true);
      const res = await laboratoriumAPI.get(params);
      dispatch({type: "GET_LAB", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_LAB", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getLaboratoriumById = async (e, id) => {
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
      const res = await laboratoriumAPI.get(`/${id}`);
      let data = res.data.data[0];
      // console.log(data);

      setLaboratoriumID(data.id);
      setLaboratorium({
        nama: data.nama,
        nomor_telepon: data.nomor_telepon,
        alamat: data.alamat
      });

      setLaboratoriumName(data.nama);
      setLaboratoriumStatus(data.is_active);
    } catch (e) {
      console.log(e);
    } finally {
      getLabServicesByLabId(id)
    }

    // console.log(dataStatusLaboratorium);
  };

  const getLabServicesByLabId = async (id) => {
    setLabServices([]);
    setTempLabServices([]);

    try {
      const res = await laboratoriumServicesAPI.getByLab(`/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {

          setLabServices((current) => [
            ...current, { id: data.id, id_lab: data.id_lab, id_pemeriksaan: data.id_pemeriksaan, kategori: data.kategori }
          ]);

          setTempLabServices((current) => [
            ...current, { id: data.id, id_lab: data.id_lab, id_pemeriksaan: data.id_pemeriksaan, kategori: data.kategori }
          ]);
        })
      }

      setDataStatusLabServices("update");
    } catch (e) {
      console.log(e);

      setLabServices([{ id: '', id_lab: '', id_pemeriksaan: '', kategori: '' }]);
      setTempLabServices([{ id: '', id_lab: '', id_pemeriksaan: '', kategori: '' }]);

      setDataStatusLabServices("add");
    }
  };

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, laboratoriumID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, laboratoriumID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (laboratoriumID && laboratoriumStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (laboratoriumID && laboratoriumStatus == 0) {
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
      const res = await laboratoriumAPI.get(`/${id}`);
      let data = res.data.data[0];

      setLaboratoriumID(data.id);
      setLaboratoriumStatus(data.is_active);
      setLaboratoriumName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (laboratoriumStatus == 1) {
        const response = await laboratoriumAPI.archive("", laboratoriumID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip laboratorium sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip laboratorium gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await laboratoriumAPI.activate("", laboratoriumID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi laboratorium sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi laboratorium gagal: ${response.message}`,
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
      getLaboratorium("");
      getLaboratoriumById("", laboratoriumID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await laboratoriumAPI.get(`/${id}`);
      let data = res.data.data[0];

      setLaboratoriumID(data.id);
      setLaboratoriumName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await laboratoriumAPI.delete(laboratoriumID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus laboratorium sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus laboratorium gagal: ${response.message}`,
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
      getLaboratorium("");
      resetForm();
    }
  };

  const onDeleteLabServices = async (id) => {
    try {
      const response = await laboratoriumServicesAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus pelayanan laboratorium sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus pelayanan laboratorium gagal: ${response.message}`,
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
    getLaboratorium(params);

    onLoadPemeriksaan();
  }, [limit, search, searchStatus, sortBy, sortOrder, currentPage ]);

  useEffect(() => {
    if (laboratoriumSubmit === "done") {
      setTimeout(() => {
        if(labServices.length > 0 && labServices[0].kategori !== "" && laboratoriumID) {
          onLabServicesSubmit("");
        }
        
        setTimeout(() => {
        //   resetForm();
        //   getLaboratorium("");
        }, 2000)
      }, 1000);
    };
  }, [ laboratoriumSubmit ]);

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
                    Data Laboratorium
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
                    <th>Laboratorium</th>
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
                  laboratoriumData.length > 0 ? (
                    laboratoriumData.map((data) => (
                      <tr key={data.id} onClick={(e) => getLaboratoriumById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          {data.alamat ? data.alamat : "-"}<br/>
                          {data.nomor_telepon ? data.nomor_telepon : "-"}<br/>
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            // onClick={(e) => getLaboratoriumById(e, data.id)}
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
                totalPage={laboratoriumTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={laboratoriumTotalPage < 4 ? laboratoriumTotalPage : 3}
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
                    { dataStatus && dataStatus === "add" ? 'Form Tambah Laboratorium' : 'Form Ubah Laboratorium' }
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
                          userData.roles.includes('isManager')) && laboratoriumID &&
                            <>
                              <DropdownItem divider />
                              <DropdownItem onClick={(e) => deleteById(e, laboratoriumID)}>
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
              <Form className="av-tooltip tooltip-right-top" onSubmit={onLaboratoriumSubmit}>
                <FormGroup row>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Row>
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
                                value={laboratorium.nama}
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
                            <Label for="nomor_telepon">
                                No. Telepon
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
                                name="nomor_telepon"
                                id="nomor_telepon"
                                placeholder="No. Telepon"
                                value={laboratorium.nomor_telepon}
                                pattern="[0-9]*"
                                onChange={onChange}
                            />
                            {errors.nomor_telepon && (
                                <div className="rounded invalid-feedback d-block">
                                {errors.nomor_telepon}
                                </div>
                            )}
                            </FormGroup>
                        </Colxx>

                        <Colxx sm={6}>
                            <FormGroup>
                            <Label for="alamat">
                                Alamat
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
                                name="alamat"
                                id="alamat"
                                placeholder="Alamat"
                                value={laboratorium.alamat}
                                onChange={onChange}
                            />
                            {errors.alamat && (
                                <div className="rounded invalid-feedback d-block">
                                {errors.alamat}
                                </div>
                            )}
                            </FormGroup>
                        </Colxx>

                        <Colxx sm={6}>
                          <Label>Pemeriksaan
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx sm={6}>
                          <Label>Kategori
                            <span
                              className="required text-danger"
                              aria-required="true"
                            >
                              {" "}
                              *
                            </span>
                          </Label>
                        </Colxx>
                      </Row>
                      {labServices.map((input, index) => {
                        return (
                        <Row key={index}>
                            <Colxx sm={6}>
                                <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="id_pemeriksaan"
                                    id="id_pemeriksaan"
                                    options={selectedPemeriksaan}
                                    value={selectedPemeriksaan.find(item => item.value === labServices[index].id_pemeriksaan) || { label: "Pilih Pemeriksaan", value: "", key: 0, name: 'id_pemeriksaan' }}
                                    onChange={(event) =>
                                      handleLabServicesChange(index, event)
                                    }
                                />
                                {errors.id_pemeriksaan && (
                                    <div className="rounded invalid-feedback d-block">
                                        {errors.id_pemeriksaan}
                                    </div>
                                )}
                            </Colxx>
                            <Colxx sm={6}>
                              <InputGroup className="input-group-laboratorium">
                                <Input
                                  name="kategori"
                                  placeholder="Kategori"
                                  value={labServices[index].kategori}
                                  onChange={(event) =>
                                    handleLabServicesChange(index, event)
                                  }
                                />
                                {errors.kategori_layanan_lab && (
                                  <div className="rounded invalid-feedback d-block">
                                    {errors.kategori_layanan_lab}
                                  </div>
                                )}
                                {index > 0 && (
                                  <Button
                                    color="danger"
                                    style={{ float: "right" }}
                                    onClick={() =>
                                      removeLabServicesFields(input.id, index)
                                    }
                                    className="remove-laboratorium"
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
                        onClick={addLabServicesFields}
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
                      // onClick={(e) => onLaboratoriumSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
            : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih laboratorium untuk melihat, mengubah, menghapus, mengarsipkan, dan mengaktifkan data laboratorium.
                  Silahkan klik tombol tambah untuk menambahkan laboratorium baru.</p>
            </CardBody> }
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Laboratorium</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {laboratoriumStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{laboratoriumName}</b>?</h5>
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
          <ModalHeader>Hapus Laboratorium</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin menghapus <b>{laboratoriumName}</b>?</h5>
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
        <i className="iconsminds-library"></i> Tambah Laboratorium
      </Button> */}
    </>
  );
};
export default Data;