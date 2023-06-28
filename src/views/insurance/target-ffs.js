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
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import { useLocation, Link, NavLink } from 'react-router-dom';
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

import classnames from 'classnames';
import { Wizard, Steps, Step } from 'react-albus';

import ReactEcharts from "echarts-for-react"; 

import insuranceAPI from "api/insurance";
import insuranceClassAPI from "api/insurance/class";
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
  const location = useLocation();
  const insuranceData = useSelector(state => state.insurance);
  const insuranceTotalPage = useSelector(state => state.insuranceTotalPage);
  const { errors, validate } = useForm();

  const [tableClass, setTableClass] = useState('');
  const [dataStatus, setDataStatus] = useState("");
  const [dataStatusInsuranceClass, setDataStatusInsuranceClass] = useState("add");
  const [rowSelected, setRowSelected] = useState(null);

  const [activeTab, setActiveTab] = useState('pendapatan');
  
  const [modalArchive, setModalArchive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [insuranceID, setInsuranceID] = useState('');
  const [insuranceClassID, setInsuranceClassID] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [insuranceStatus, setInsuranceStatus] = useState(0);
  const [insuranceSubmit, setInsuranceSubmit] = useState('');

  const [insurance, setInsurance] = useState({
    nama: ''
  });

  const onChange = (e) => {
    // console.log('e', e);

    setInsurance(current => {
        return { ...current, [e.target.name]: e.target.value }
    })

    validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    // console.log('insurance', insurance);
  }

  const onInsuranceSubmit = async (e) => {
    e.preventDefault();
    setInsuranceSubmit("process");

    // console.log('insurance', insurance);

    for(let [key, value] of Object.entries(insurance)) {
      // console.log(key, value);

      if((key === 'nama' && value === '')){
        validate(e, key, value);

        // console.log('errors', errors);
        return;
      }
    }

    for (var i = 0; i < insuranceClass.length; i++) {
      for(let [key, value] of Object.entries(insuranceClass[i])) {
        if((key === 'nama_kelas' && value === '')){
          validate(e, key, value);
          return;
        }
      }
    }

    if(dataStatus === 'add') {
      try {
        const response = await insuranceAPI.add(insurance);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Tambah asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setInsuranceID(data.id);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah asuransi gagal: ${response.message}`,
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
    } else if (dataStatus === 'update') {
      try {
        const response = await insuranceAPI.update(insurance, insuranceID);
        // console.log(response);
  
        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);
  
          Swal.fire({
            title: "Sukses!",
            html: `Ubah asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setInsuranceID(insuranceID);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah asuransi gagal: ${response.message}`,
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

    setInsuranceSubmit("done");
  };

  const [insuranceClass, setInsuranceClass] = useState([{
      id: "",
      id_asuransi: insuranceID,
      nama_kelas: "",
  }]);

  const [tempInsuranceClass, setTempInsuranceClass] = useState([{
    id: "",
    id_asuransi: insuranceID,
    nama_kelas: "",
  }]);

  const addInsuranceClassFields = () => {
    let newfieldInsuranceClass = { id: "", id_asuransi: insuranceID, nama_kelas: "" };
    setInsuranceClass([...insuranceClass, newfieldInsuranceClass]);
  };

  const removeInsuranceClassFields = (id, index) => {
    let dataInsuranceClass = [...insuranceClass];

    dataInsuranceClass.splice(index, 1);

    setInsuranceClass(dataInsuranceClass);

    if(dataStatusInsuranceClass === "update"){
      setTempInsuranceClass(dataInsuranceClass);
      onDeleteInsuranceClass(id);
    }
  };

  const handleInsuranceClassChange = (index, event) => {
    let dataInsuranceClass = [...insuranceClass];

    dataInsuranceClass[index][event.target.name] = event.target.value;
    validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');

    setInsuranceClass(dataInsuranceClass);
  };

  const onInsuranceClassSubmit = async (e) => {
    e && e.preventDefault();

    for (var i = 0; i < insuranceClass.length; i++) {
      insuranceClass[i].id_asuransi = insuranceID;

      if(insuranceClass[i].id !== '' && (insuranceClass[i].nama_kelas !== tempInsuranceClass[i].nama_kelas)) {
        onInsuranceClassEdit(insuranceClass[i]);
      } else if(insuranceClass[i].id === '') {
        onInsuranceClassAdd(insuranceClass[i]);
      }
    }
    
    getInsurance("");
    if(insuranceID){
      getInsuranceById("", insuranceID);
    } else {
      resetForm();
    }
  }

  const onInsuranceClassAdd = async (insuranceClass) => {
    try {
      const response = await insuranceClassAPI.add(insuranceClass);
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

  const onInsuranceClassEdit = async (insuranceClass) => {
    try {
      const response = await insuranceClassAPI.update(insuranceClass, insuranceClass.id);
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

    setInsuranceID('');
    setInsuranceName('');
    setInsuranceStatus(0);

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

    setInsuranceStatus(0);
    setInsuranceName('');
    setInsuranceID('');

    setInsurance({
      nama: '',
    });

    setInsuranceClass([{ id: "", id_asuransi: insuranceID, nama_kelas: "" }]);

    setDataStatus("add");
    setDataStatusInsuranceClass("add");
  };

  const [isLoading, setIsLoading] = useState(false);

  const getInsurance = async (params) => {
    try {
      setIsLoading(true);
      const res = await insuranceAPI.get(params);
      dispatch({type: "GET_INSURANCE", payload: res.data.data});
      dispatch({type: "GET_TOTAL_PAGE_INSURANCE", payload: res.data.pagination.totalPage});

      if(res.data.data.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getInsuranceById = async (e, id) => {
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
      const res = await insuranceAPI.get(`/${id}`);
      let data = res.data.data[0];

      // console.log(data);

      setInsuranceID(data.id);
      setInsurance({
        nama: data.nama,
      });
      setInsuranceStatus(data.is_active);

      // console.log(insurance);

    } catch (e) {
      console.log(e);
    } finally {
      getInsuranceClassByInsuranceId(id);
    }

    // console.log(dataStatus);
  };

  const getInsuranceClassByInsuranceId = async (id) => {
    setInsuranceClass([]);
    setTempInsuranceClass([]);

    try {
      const res = await insuranceClassAPI.getByInsurance(`/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {

          setInsuranceClass((current) => [
            ...current, { id: data.id, id_asuransi: data.id_asuransi, nama_kelas: data.nama_kelas }
          ]);

          setTempInsuranceClass((current) => [
            ...current, { id: data.id, id_asuransi: data.id_asuransi, nama_kelas: data.nama_kelas }
          ]);
        })
      }

      setDataStatusInsuranceClass("update");
    } catch (e) {
      console.log(e);

      setInsuranceClass([{ id: '', id_asuransi: insuranceID, nama_kelas: "" }]);
      setTempInsuranceClass([{ id: '', id_asuransi: insuranceID, nama_kelas: "" }]);

      setDataStatusInsuranceClass("add");
    }
  };

  function ActiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, insuranceID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Aktifkan
      </DropdownItem>
    </>;
  }

  function ArchiveDropdown() {
    return <>
      <DropdownItem onClick={(e) => statusById(e, insuranceID)}>
        <i className="simple-icon-drawer"></i>&nbsp;Arsipkan
      </DropdownItem>
    </>;
  }

  function IsActiveDropdown() {
    if(userData.roles.includes('isDev') ||
      userData.roles.includes('isManager') ||
      userData.roles.includes('isAdmin')) {
      if (insuranceID && insuranceStatus == 1) {
        return <ArchiveDropdown/>;
      } else if (insuranceID && insuranceStatus == 0) {
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
      const res = await insuranceAPI.get(`/${id}`);
      let data = res.data.data[0];

      setInsuranceID(data.id);
      setInsuranceStatus(data.is_active);
      setInsuranceName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (insuranceStatus == 1) {
        const response = await insuranceAPI.archive("", insuranceID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Arsip asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Arsip asuransi gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } else {
        const response = await insuranceAPI.activate("", insuranceID);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Aktivasi asuransi sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          setModalArchive(false);
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Aktivasi asuransi gagal: ${response.message}`,
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
      getInsurance("");
      getInsuranceById("", insuranceID);
    }
  };

  const deleteById = async (e, id) => {
    e.preventDefault();

    setModalDelete(true);
    try {
      const res = await insuranceAPI.get(`/${id}`);
      let data = res.data.data[0];

      setInsuranceID(data.id);
      setInsuranceName(data.nama);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await insuranceAPI.delete(insuranceID);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });

        setModalDelete(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus asuransi gagal: ${response.message}`,
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
      getInsurance("");
    }
  };

  const onDeleteInsuranceClass = async (id) => {
    try {
      const response = await insuranceClassAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus kelas asuransi sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus kelas asuransi gagal: ${response.message}`,
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

  const [searchAsuransi, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, searchAsuransi, searchStatus, sortBy, sortOrder ]);

  useEffect(() => {
    let params = "";
      
    if (limit !== 10) {
      params = `${params}?limit=${limit}`;
    } else {
      params = `${params}?limit=10`;
    }
    if (searchAsuransi !== "") {
      params = `${params}&searchAsuransi=${searchAsuransi}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }
    
    setRowSelected(false);
    getInsurance(params);
  }, [limit, searchAsuransi, searchStatus, sortBy, sortOrder, currentPage ]);

  useEffect(() => {
    if (insuranceSubmit === "done") {
      setTimeout(() => {
        
        if(insuranceClass.length > 0 && insuranceClass[0].nama_kelas !== "") {
          onInsuranceClassSubmit("");
        }

        setTimeout(() => {
          // resetForm();
        }, 2000)
      }, 1000);
    };
  }, [ insuranceSubmit ]);

  useEffect(() => {
    console.log(location.state);

    if (location.state) {
      setInsuranceID(location.state.insuranceID);
      setInsuranceType(location.state.insuranceType);
    //   getInsuranceById("", location.state.insuranceID, location.state.insuranceType);
    }
  }, [ ]);

  let startNumber = 1;

  if (currentPage !== 1) {
    startNumber = (currentPage - 1) * 10 + 1;
  }

  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dataPendapatan = {
    grid: { top: 8, right: 8, bottom: 24, left: 38 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      axisTick: {
        alignWithLabel: true,
        // length: -88
      },
      axisLabel: {
        // rotate: 30
      },
    },
    yAxis: {
      type: 'value',
      // max: 2000,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#39addf',
            width: 4,
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12
          }
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  const dataPeserta = {
    grid: { top: 8, right: 8, bottom: 24, left: 38 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      axisTick: {
        alignWithLabel: true,
        // length: -88
      },
      axisLabel: {
        // rotate: 30
      },
    },
    yAxis: {
      type: 'value',
      // max: 2000,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#39addf',
            width: 4,
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12
          }
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  const dataKlaim = {
    grid: { top: 8, right: 8, bottom: 24, left: 38 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      axisTick: {
        alignWithLabel: true,
        // length: -88
      },
      axisLabel: {
        // rotate: 30
      },
    },
    yAxis: {
      type: 'value',
      // max: 2000,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#39addf',
            width: 4,
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12
          }
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  const dataBiaya = {
    grid: { top: 8, right: 8, bottom: 24, left: 38 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      axisTick: {
        alignWithLabel: true,
        // length: -88
      },
      axisLabel: {
        // rotate: 30
      },
    },
    yAxis: {
      type: 'value',
      // max: 2000,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#39addf',
            width: 4,
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12
          }
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                Data Produk
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
                    <th>Asuransi</th>
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
                  insuranceData.length > 0 ? (
                    insuranceData.map((data) => (
                      <tr key={data.id} onClick={(e) => getInsuranceById(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">{data.nama}</h6>
                          {data.nama_kelas}
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            // onClick={(e) => getInsuranceById(e, data.id)}
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
                totalPage={insuranceTotalPage}
                // onChangePage={(i) => setCurrentPage(i)}
                numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4 manage-form" id="manage-form-tab-mobile">
          <Card className="mb-8">
            {/* { dataStatus ? */}
            <CardBody>
              <Form className="wizard wizard-default">
                <Wizard>
                  <div id="nav-target-asuransi">
                    <Nav tabs className="separator-tabs ml-0">
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'pendapatan',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('pendapatan')}
                            >
                                Pendapatan
                            </a>
                        </NavItem>
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'peserta',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('peserta')}
                            >
                                Peserta
                            </a>
                        </NavItem>
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'ak',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('ak')}
                            >
                                AK
                            </a>
                        </NavItem>
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'rrns',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('rrns')}
                            >
                                RRNS
                            </a>
                        </NavItem>
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'rppt',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('rppt')}
                            >
                                RPPT
                            </a>
                        </NavItem>
                        <NavItem>
                            <a
                                className={classnames({
                                  active: activeTab === 'biaya',
                                  'nav-link': true,
                                })}
                                aria-disabled="true"
                                onClick={() => setActiveTab('biaya')}
                            >
                                Biaya Layanan
                            </a>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="pendapatan">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataPendapatan}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th>Target</th>
                                    <th>Pendapatan</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp222.222.222</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp999.999.999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="peserta">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataPeserta}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th className="center-xy">Target</th>
                                    <th className="center-xy">Kunjungan</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td className="center-xy">99</td>
                                    <td className="center-xy">24</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td className="center-xy">99</td>
                                    <td className="center-xy">24</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td className="center-xy">99</td>
                                    <td className="center-xy">22</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td className="center-xy">99</td>
                                    <td className="center-xy">999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="ak">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataBiaya}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th>Target</th>
                                    <th>Biaya</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp222.222.222</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp999.999.999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="rrns">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataBiaya}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th>Target</th>
                                    <th>Biaya</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp222.222.222</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp999.999.999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="rppt">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataBiaya}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th>Target</th>
                                    <th>Biaya</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp222.222.222</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp999.999.999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="biaya">
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <ReactEcharts
                                option={dataBiaya}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: '2rem' }}>
                              <Table
                                // className={tableClass}
                                hover
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                                    <th>Bulan</th>
                                    <th>Target</th>
                                    <th>Biaya</th>
                                    <th className="center-xy">Pemenuhan</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className="center-xy">1</th>
                                    <td>Januari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">2</th>
                                    <td>Februari 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp24.242.424</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">3</th>
                                    <td>Maret 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp222.222.222</td>
                                    <td className="center-xy">20%</td>
                                  </tr>
                                  <tr>
                                    <th className="center-xy">4</th>
                                    <td>April 2023</td>
                                    <td>Rp99.999.999</td>
                                    <td>Rp999.999.999</td>
                                    <td className="center-xy">100%</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                color="primary"
                                // style={{ float: "right" }}
                                className="mb-2"
                                // onClick={addPartnershipFields}
                              >
                                Tambah
                              </Button>
                              <Pagination
                                // currentPage={currentPage}
                                // totalPage={insuranceTotalPage}
                                // onChangePage={(i) => setCurrentPage(i)}
                                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
                                currentPage={1}
                                totalPage={3}
                                numberLimit={3}
                              />
                            </FormGroup>
                        </TabPane>
                    </TabContent>
                  </div>
                </Wizard>
              </Form>
            </CardBody>
            {/* : <CardBody style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                <img src="/assets/empty.svg" width={150} className="mt-5 mb-3"/>
                <p className="mb-5">Silahkan memilih produk untuk melihat pendapatan, kunjungan, % klaim disetujui, dan % biaya layanan pada setiap produk.</p>
            </CardBody> } */}
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalArchive}
          toggle={() => setModalArchive(!modalArchive)}
        >
          <ModalHeader>Arsip Asuransi</ModalHeader>
          <ModalBody>
            <h5>Apakah Anda ingin {insuranceStatus == 1 ?  'mengarsipkan'  : 'aktivasi' } <b>{insuranceName}</b>?</h5>
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
          <ModalHeader>Hapus Asuransi</ModalHeader>
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
    </>
  );
};
export default Data;