import React, { useState, useEffect } from 'react';
import { 
  Row,
  Card,
  CardTitle,
  CardBody,
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
} from 'reactstrap';
import { useLocation, Link, NavLink } from 'react-router-dom';
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

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import ReactEcharts from "echarts-for-react"; 

import insuranceAPI from "api/insurance";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';
import { currencyFormat } from 'utils';

const userData = JSON.parse(localStorage.getItem('user_data'));

const Dashboard = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const insuranceData = useSelector(state => state.insurance);
  // const insuranceTotalPage = useSelector(state => state.insuranceTotalPage);
  const { errors, validate } = useForm();

  const [insuranceMetrics, setInsuranceMetrics] = useState({ peserta: 0, pendapatan: 0, total_biaya_layanan: 0, biaya_layanan: { low: 0, medium: 0, high: 0 }, komponen_layanan: { bhp: 0, bnmhp: 0, jasa_medis: 0 } });
  const [visitationMetrics, setVisitationMetrics] = useState({});
  const [visitationTypeMetrics, setVisitationTypeMetrics] = useState({
                                                                      januari: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      februari: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      maret: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      april: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      mei: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      juni: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      juli: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      agustus: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      september: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      oktober: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      november: { jalan: 0, inap: 0, promotif: 0, preventif: 0}, 
                                                                      desember: { jalan: 0, inap: 0, promotif: 0, preventif: 0},
                                                                    });
  const [referenceMetrics, setReferenceMetrics] = useState({});
  const [referenceTypeMetrics, setReferenceTypeMetrics] = useState({
                                                                      januari: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      februari: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      maret: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      april: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      mei: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      juni: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      juli: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      agustus: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      september: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      oktober: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      november: { spesialistik: 0, non_spesialistik: 0}, 
                                                                      desember: { spesialistik: 0, non_spesialistik: 0}, 
                                                                    });
  const [referenceData, setReferenceData] = useState([]);
  const [referenceTotalPage, setReferenceTotalPage] = useState(0);
  const [referenceByDoctorData, setReferenceByDoctorData] = useState([]);
  const [referenceByDoctorTotalPage, setReferenceByDoctorTotalPage] = useState(0);
  const [diseaseData, setDiseaseData] = useState([]);
  const [diseaseTotalPage, setDiseaseTotalPage] = useState(0);
  
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState('drp-none');

  const [tableClassReference, setTableClassReference] = useState('');
  const [tableClassDisease, setTableClassDisease] = useState('');
  const [tableClassReferenceByDoctor, setTableClassReferenceByDoctor] = useState('');
  const [rowSelectedReference, setRowSelectedReference] = useState(null);
  const [rowSelectedDisease, setRowSelectedDisease] = useState(null);
  const [rowSelectedReferenceByDoctor, setRowSelectedReferenceByDoctor] = useState(null);

  const [insuranceID, setInsuranceID] = useState('');
  const [insuranceClassID, setInsuranceClassID] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [modalDoctor, setModalDoctor] = useState(false);

  const handleShowDateRangePicker = (shown) => {
    shown ? setDateRangePicker('drp-inline') : setDateRangePicker('drp-none');
    setShowDateRangePicker(shown);
  }

  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }

  const [isLoading, setIsLoading] = useState(false);

  const totalKunjungan = {
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
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        data: [visitationMetrics.januari, visitationMetrics.februari, visitationMetrics.maret, visitationMetrics.april, visitationMetrics.mei, visitationMetrics.juni,
                visitationMetrics.juli, visitationMetrics.agustus, visitationMetrics.september, visitationMetrics.oktober, visitationMetrics.november, visitationMetrics.desember],
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

  const tipeKunjungan = {
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
      max: 750
    },
    series: [
      {
        name: 'Rawat Jalan',
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        data: [visitationTypeMetrics.januari.jalan, visitationTypeMetrics.februari.jalan, visitationTypeMetrics.maret.jalan,
                visitationTypeMetrics.april.jalan, visitationTypeMetrics.mei.jalan, visitationTypeMetrics.juni.jalan,
                visitationTypeMetrics.juli.jalan, visitationTypeMetrics.agustus.jalan, visitationTypeMetrics.september.jalan,
                visitationTypeMetrics.oktober.jalan, visitationTypeMetrics.november.jalan, visitationTypeMetrics.desember.jalan],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#006894' },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12, color: '#ffffff'
          }
        }
      },
      {
        name: 'Rawat Inap',
        // data: [1200, 901, 901, 932, 820, 1320, 1330, 1290, 934, 901, 932, 820],
        data: [visitationTypeMetrics.januari.inap, visitationTypeMetrics.februari.inap, visitationTypeMetrics.maret.inap,
          visitationTypeMetrics.april.inap, visitationTypeMetrics.mei.inap, visitationTypeMetrics.juni.inap,
          visitationTypeMetrics.juli.inap, visitationTypeMetrics.agustus.inap, visitationTypeMetrics.september.inap,
          visitationTypeMetrics.oktober.inap, visitationTypeMetrics.november.inap, visitationTypeMetrics.desember.inap],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#007fb6' },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12, color: '#ffffff'
          }
        }
      },
      {
        name: 'Promotif',
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        data: [visitationTypeMetrics.januari.promotif, visitationTypeMetrics.februari.promotif, visitationTypeMetrics.maret.promotif,
          visitationTypeMetrics.april.promotif, visitationTypeMetrics.mei.promotif, visitationTypeMetrics.juni.promotif,
          visitationTypeMetrics.juli.promotif, visitationTypeMetrics.agustus.promotif, visitationTypeMetrics.september.promotif,
          visitationTypeMetrics.oktober.promotif, visitationTypeMetrics.november.promotif, visitationTypeMetrics.desember.promotif],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#39addf' },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12, color: '#ffffff'
          }
        }
      },
      {
        name: 'Preventif',
        // data: [1200, 901, 901, 932, 820, 1320, 1330, 1290, 934, 901, 932, 820],
        data: [visitationTypeMetrics.januari.prefentif, visitationTypeMetrics.februari.preventif, visitationTypeMetrics.maret.preventif,
          visitationTypeMetrics.april.preventif, visitationTypeMetrics.mei.preventif, visitationTypeMetrics.juni.preventif,
          visitationTypeMetrics.juli.preventif, visitationTypeMetrics.agustus.preventif, visitationTypeMetrics.september.preventif,
          visitationTypeMetrics.oktober.preventif, visitationTypeMetrics.november.preventif, visitationTypeMetrics.desember.preventif],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#56c4f3' },
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

  const totalRujukan = {
    grid: { top: 8, right: 8, bottom: 24, left: 38 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      axisTick: {
        alignWithLabel: true
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        data: [referenceMetrics.januari, referenceMetrics.februari, referenceMetrics.maret,
                referenceMetrics.april, referenceMetrics.mei, referenceMetrics.juni,
                referenceMetrics.juli, referenceMetrics.agustus, referenceMetrics.september,
                referenceMetrics.oktober, referenceMetrics.november, referenceMetrics.desember],
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

  const tipeRujukan = {
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
        name: 'Spesialistik',
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
        data: [referenceTypeMetrics.januari.spesialistik, referenceTypeMetrics.februari.spesialistik, referenceTypeMetrics.maret.spesialistik,
                referenceTypeMetrics.april.spesialistik, referenceTypeMetrics.mei.spesialistik, referenceTypeMetrics.juni.spesialistik,
                referenceTypeMetrics.juli.spesialistik, referenceTypeMetrics.agustus.spesialistik, referenceTypeMetrics.september.spesialistik,
                referenceTypeMetrics.oktober.spesialistik, referenceTypeMetrics.november.spesialistik, referenceTypeMetrics.desember.spesialistik],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#006894' },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12, color: '#ffffff'
          }
        }
      },
      {
        name: 'Non-Spesialistik',
        // data: [1200, 901, 901, 932, 820, 1320, 1330, 1290, 934, 901, 932, 820],
        data: [referenceTypeMetrics.januari.non_spesialistik, referenceTypeMetrics.februari.non_spesialistik, referenceTypeMetrics.maret.non_spesialistik,
                referenceTypeMetrics.april.non_spesialistik, referenceTypeMetrics.mei.non_spesialistik, referenceTypeMetrics.juni.non_spesialistik,
                referenceTypeMetrics.juli.non_spesialistik, referenceTypeMetrics.agustus.non_spesialistik, referenceTypeMetrics.september.non_spesialistik,
                referenceTypeMetrics.oktober.non_spesialistik, referenceTypeMetrics.november.non_spesialistik, referenceTypeMetrics.desember.non_spesialistik],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#007fb6' },
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

  const biayaLayanan = {
    title: {
      left: 'center',
      top: 'top'
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: insuranceMetrics.biaya_layanan.low,
            name: 'Rendah',
            itemStyle: { color: '#006894' },
          },
          {
            value: insuranceMetrics.biaya_layanan.medium,
            name: 'Sedang',
            itemStyle: { color: '#007fb6' },
          },
          {
            value: insuranceMetrics.biaya_layanan.high,
            name: 'Tinggi',
            itemStyle: { color: '#39addf' },
          }
        ],
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
            formatter: (data) => {
              return data.value + '%';
            },
          }
        },
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: (data) => {
        return data.name + ' <b>' + data.value + '%</b>';
      },
    },
    legend: {
      bottom: '0%',
      left: 'right',
      // formatter: (name) => {
      //   var series = biayaLayanan.series[0];
      //   var value = series.data.filter(row => row.name === name)[0].value;
      //   return name + ': ' + value + '%';
      // },
    },
  }; 

  const komponenLayanan = {
    grid: { top: 8, right: 20, bottom: 24, left: '10%' },
    yAxis: {
      type: 'category',
      data: ['Jasa Medis', 'BNMHP', 'BHP' ],
      axisTick: {
        alignWithLabel: true,
        // length: -88
      },
      axisLabel: {
        // rotate: 30
      },
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        data: [{ 
            value: insuranceMetrics.komponen_layanan.bhp,
            itemStyle: { color: '#006894' },
           }, {
            value: insuranceMetrics.komponen_layanan.bnmhp,
            itemStyle: { color: '#007fb6' },
           },{ 
            value: insuranceMetrics.komponen_layanan.jasa_medis,
            itemStyle: { color: '#39addf' },
          }],
        type: 'bar',
        label: {
          show: true,
          // position: 'top',
          textStyle: {
            fontSize: 12, color: '#ffffff'
          }
        }
      },
      // {
      //   data: [1200],
      //   type: 'bar',
      //   itemStyle: { color: '#007fb6' },
      //   label: {
      //     show: true,
      //     // position: 'top',
      //     textStyle: {
      //       fontSize: 12, color: '#ffffff'
      //     }
      //   }
      // },
      // {
      //   data: [777],
      //   type: 'bar',
      //   itemStyle: { color: '#39addf' },
      //   label: {
      //     show: true,
      //     // position: 'top',
      //     textStyle: {
      //       fontSize: 12, color: '#ffffff'
      //     }
      //   }
      // },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  useEffect(() => {
    // console.log(location.state);

    if (location.state) {
      setInsuranceID(location.state.insuranceID);
      setInsuranceClassID(location.state.insuranceClassID);
      setInsuranceName(location.state.insuranceName);
      setInsuranceType(location.state.insuranceType);
      getInsuranceByInsuranceIdAndInsuranceClassId(location.state.insuranceID, location.state.insuranceClassID);
    }
  }, [ ]);

  const getInsuranceByInsuranceIdAndInsuranceClassId = async (insuranceID, insuranceClassID) => {
    setInsuranceMetrics({ peserta: 0, pendapatan: 0, total_biaya_layanan: 0, biaya_layanan: { low: 0, medium: 0, high: 0 }, komponen_layanan: { bhp: 0, bnmhp: 0, jasa_medis: 0 } });
    setReferenceData([]);
    setReferenceTotalPage(0);
    setDiseaseData([]);
    setDiseaseTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getPPSDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setInsuranceMetrics({ peserta: data.peserta, pendapatan: data.pendapatan, total_biaya_layanan: data.total_biaya_layanan, biaya_layanan: { low: data.biaya_layanan.low, medium: data.biaya_layanan.medium, high: data.biaya_layanan.high }, komponen_layanan: { bhp: data.komponen_layanan.bhp, bnmhp: data.komponen_layanan.bnmhp, jasa_medis: data.komponen_layanan.jasa_medis } });
        
        setVisitationMetrics(data.kunjungan);
        setVisitationTypeMetrics(data.tipe_kunjungan);
        setReferenceMetrics(data.total_rujukan);
        setReferenceTypeMetrics(data.tipe_rujukan);
        
        setReferenceData(data.analisa_rujukan);
        setReferenceTotalPage(data.pagination_ar);
        setDiseaseData(data.analisa_biaya_penyakit);
        setDiseaseTotalPage(data.pagination_ab);

        if(data.pagination_ar > 0) {
          setTableClassReference('table-hover');
        }

        if(data.pagination_ab > 0) {
          setTableClassDisease('table-hover');
        }
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
      setIsLoading(false);
    }
  }

  const getReferenceByDoctor = async (id, data, params = '') => {
    setReferenceByDoctorData([]);
    setReferenceByDoctorTotalPage(0);
    setRowSelectedReference(id);

    setModalDoctor(true);
    setDoctorName(data.dokter);

    try {
      // const res = await insuranceAPI.getPPSDashboardByDoctor(`/${id}${params}`);
      const res = await insuranceAPI.getPPSDashboardByDoctor(`/567${params}`);
      let data = res.data;
      // console.log(data);

      if(data) {
        setReferenceByDoctorData(data.data);
        setReferenceByDoctorTotalPage(data.pagination.totalPage);
      }
      
      // if(data.length > 0) {
      //   setTableClassReferenceByDoctor('table-hover');
      // }
    } catch (e) {
      console.log(e);
    }
  }

  const [currentPageReferenceByDoctor, setCurrentPageReferenceByDoctor] = useState(1);

  useEffect(() => {
    setCurrentPageReferenceByDoctor(1);
  }, [ limitReferenceByDoctor, sortByReferenceByDoctor, sortOrderReferenceByDoctor ]);

  // useEffect(() => {
  //   let params = "";
      
  //   if (limitReferenceByDoctor !== 10) {
  //     params = `${params}?limit=${limitReferenceByDoctor}`;
  //   } else {
  //     params = `${params}?limit=10`;
  //   }
  //   if (currentPageReferenceByDoctor !== 1) {
  //     params = `${params}&page=${currentPageReferenceByDoctor}`;
  //   }
    
  //   setRowSelectedReferenceByDoctor(false);
  //   getReferenceByDoctor("", doctorName, params);
  // }, [limitReferenceByDoctor, sortByReferenceByDoctor, sortOrderReferenceByDoctor, currentPageReferenceByDoctor ]);

  let startNumberReferenceByDoctor = 1;

  if (currentPageReferenceByDoctor !== 1) {
    startNumber = (currentPageReferenceByDoctor - 1) * 10 + 1;
  }

  const [limitReferenceByDoctor, setLimitReferenceByDoctor] = useState(10);
  const [sortByReferenceByDoctor, setSortByReferenceByDoctor] = useState("");
  const [sortOrderReferenceByDoctor, setSortOrderReferenceByDoctor] = useState("");

  const getReferenceData = async (insuranceID, insuranceClassID) => {
    setReferenceData([]);
    setReferenceTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getPPSDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setReferenceData(data.analisa_rujukan);
        setReferenceTotalPage(data.pagination_ar);
      }
      
      if(data.length > 0) {
        setTableClassReference('table-hover');
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
      setIsLoading(false);
    }
  }

  const [currentPageReference, setCurrentPageReference] = useState(1);

  useEffect(() => {
    setCurrentPageReference(1);
  }, [ limitReference, sortByReference, sortOrderReference ]);

  // useEffect(() => {
  //   let params = "";
      
  //   if (limitReference !== 10) {
  //     params = `${params}?limit=${limitReference}`;
  //   } else {
  //     params = `${params}?limit=10`;
  //   }
  //   if (currentPageReference !== 1) {
  //     params = `${params}&page=${currentPageReference}`;
  //   }
    
  //   setRowSelectedReference(false);
  //   getReferenceData(params);
  // }, [limitReference, sortByReference, sortOrderReference, currentPageReference ]);

  let startNumberReference = 1;

  if (currentPageReference !== 1) {
    startNumber = (currentPageReference - 1) * 10 + 1;
  }

  const [limitReference, setLimitReference] = useState(10);
  const [sortByReference, setSortByReference] = useState("");
  const [sortOrderReference, setSortOrderReference] = useState("");

  const [currentPageDisease, setCurrentPageDisease] = useState(1);

  useEffect(() => {
    setCurrentPageDisease(1);
  }, [ limitDisease, sortByDisease, sortOrderDisease ]);

  // useEffect(() => {
  //   let params = "";
      
  //   if (limitDisease !== 10) {
  //     params = `${params}?limit=${limitDisease}`;
  //   } else {
  //     params = `${params}?limit=10`;
  //   }
  //   if (currentPageDisease !== 1) {
  //     params = `${params}&page=${currentPageDisease}`;
  //   }
    
  //   setRowSelectedDisease(false);
  //   getDiseaseData(params);
  // }, [limitDisease, sortByDisease, sortOrderDisease, currentPageDisease ]);

  let startNumberDisease = 1;

  if (currentPageDisease !== 1) {
    startNumber = (currentPageDisease - 1) * 10 + 1;
  }

  const [limitDisease, setLimitDisease] = useState(10);
  const [sortByDisease, setSortByDisease] = useState("");
  const [sortOrderDisease, setSortOrderDisease] = useState("");

  const getDiseaseData = async (insuranceID, insuranceClassID) => {
    setDiseaseData([]);
    setDiseaseTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getPPSDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setDiseaseData(data.analisa_rujukan);
        setDiseaseTotalPage(data.pagination_ar);
      }
      
      if(data.length > 0) {
        setTableClassDisease('table-hover');
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
      setIsLoading(false);
    }
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Row>
            <Colxx sm="10">
              <h2><b>{ insuranceName ? insuranceName : '-' }</b></h2>
              <p>{ insuranceType === "PPSK" || insuranceType === "PPST" ? 'Prospective Payment System' : '-' }</p>
            </Colxx>
            <Colxx sm="2" className="d-block text-right">
              <Button
                // outline
                color="primary"
                style={{ borderRadius: '5px' }}
                className="mb-4"
                onClick={() => handleShowDateRangePicker(!showDateRangePicker)}
              >
                Tanggal
              </Button>
              <Link to={{
                    pathname: `/insurance/target-pps`,
                    // state: { insuranceID: insuranceID, insuranceType: insuranceType }
                    state: { insuranceID: 2, insuranceType: "PPS" }
                }}>
                <Button
                    // outline
                    color="primary"
                    style={{ float: "right", borderRadius: '5px', marginLeft: '5px' }}
                    className="mb-4"
                >
                    Target
                </Button>
              </Link>
              <DateRangePicker
                className={dateRangePicker}
                ranges={[{
                  startDate: new Date(),
                  endDate: new Date(),
                  key: 'selection',
                }]}
                onChange={(e) => handleSelect(e)}
                months={1}
                minDate={addDays(new Date(), -900)}
                maxDate={addDays(new Date(), 900)}
                direction="vertical"
                scroll={{ enabled: true }}
              />
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <Card className="progress-banner" style={{ cursor: 'initial' }}>
            <CardBody className="align-items-center text-center">
              <div>
                <i
                  className={`iconsminds-mens mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Total Peserta</p>
                  <h1 className="text-white">{ insuranceMetrics ? insuranceMetrics.peserta.toLocaleString('id-ID') : '0' } orang</h1>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Card className="progress-banner" style={{ cursor: 'initial' }}>
            <CardBody className="align-items-center text-center">
              <div>
                <i
                  className={`iconsminds-coins mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Total Pendapatan</p>
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(insuranceMetrics.pendapatan) : 'Rp0' }</h1>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Card className="progress-banner" style={{ cursor: 'initial' }}>
            <CardBody className="align-items-center text-center">
              <div>
                <i
                  className={`iconsminds-coins-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Biaya Layanan</p>
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(insuranceMetrics.total_biaya_layanan) : 'Rp0' }</h1>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Kunjungan
              </CardTitle>
              <ReactEcharts
                option={totalKunjungan}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Tipe Kunjungan
              </CardTitle>
              <ReactEcharts
                option={tipeKunjungan}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Total Rujukan
              </CardTitle>
              <ReactEcharts
                option={totalRujukan}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Tipe Rujukan
              </CardTitle>
              <ReactEcharts
                option={tipeRujukan}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                {/* <Row> */}
                  {/* <Colxx sm="8" md="8" xl="8" className="col-sm-8-mobile"> */}
                    Analisa Rujukan
                  {/* </Colxx> */}
                  {/* <Colxx sm="4" md="4" xl="4" className="col-sm-4-mobile">
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      className="mb-4"
                      onClick={(e) => resetForm(e, true)}
                    >
                      Tambah
                    </Button>
                  </Colxx> */}
                {/* </Row> */}
              </CardTitle>
              <Table
                className={tableClassReference}
                // hover
                responsive
              >
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Dokter</th>
                    <th className="center-xy">Jumlah RRNS</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelectedReference === false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center">
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) :
                  referenceData.length > 0 ? (
                    referenceData.map((data) => (
                      <tr key={data.id} onClick={(e) => getReferenceByDoctor(data.id, data)} style={{ cursor: 'pointer'}} className={`${rowSelectedReference == data.id && 'row-selected'} center-xy`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumberReference++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold', textAlign: 'left' }} className="max-text">{ data.dokter ? data.dokter : '-'}</h6>
                        </td>
                        <td className="center-xy">{ data.jumlah_rrns ? data.jumlah_rrns : 0}</td>
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
                currentPage={currentPageReference}
                totalPage={referenceTotalPage}
                onChangePage={(i) => setCurrentPageReference(i)}
                numberLimit={referenceTotalPage < 4 ? referenceTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Biaya Layanan
              </CardTitle>
              <ReactEcharts
                option={biayaLayanan}
                style={{ paddingBottom: '1.5rem' }}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Komponen Layanan
              </CardTitle>
              <ReactEcharts
                option={komponenLayanan}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                {/* <Row> */}
                  {/* <Colxx sm="8" md="8" xl="8" className="col-sm-8-mobile"> */}
                    Analisa Biaya Penyakit
                  {/* </Colxx> */}
                  {/* <Colxx sm="4" md="4" xl="4" className="col-sm-4-mobile">
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      className="mb-4"
                      onClick={(e) => resetForm(e, true)}
                    >
                      Tambah
                    </Button>
                  </Colxx> */}
                {/* </Row> */}
              </CardTitle>
              <Table
                className={tableClassDisease}
                // hover
                responsive
              >
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Penyakit</th>
                    <th className="center-xy">Jumlah Kasus</th>
                    <th>Rata-Rata Biaya</th>
                    <th className="center-xy">% Biaya</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelectedDisease === false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center" colSpan={3}>
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) :
                  diseaseData.length > 0 ? (
                    diseaseData.map((data, index) => (
                      <tr key={index} 
                        // onClick={(e) => getInsuranceById(e, data.id)} 
                        // style={{ cursor: 'pointer'}}
                        className={`${rowSelectedDisease == index && 'row-selected'} center-xy`}>
                        <th scope="row">
                          {startNumberDisease++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold', textAlign: 'left' }} className="max-text">{ data.penyakit ? data.penyakit : '-'}</h6>
                        </td>
                        <td className="center-xy">{ data.jumlah_kasus ? data.jumlah_kasus : 0  }</td>
                        <td style={{ textAlign: 'left' }}>{ data.rata_rata_biaya ? currencyFormat(data.rata_rata_biaya) : 'Rp0'  }</td>
                        <td className="center-xy">{ data.biaya ? `${data.biaya}%` : '0%'  }</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center" colSpan={3}>
                        <h5 style={{ marginTop: '1.5rem' }}><b>Data tidak ditemukan</b></h5>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPageDisease}
                totalPage={diseaseTotalPage}
                onChangePage={(i) => setCurrentPageDisease(i)}
                numberLimit={diseaseTotalPage < 4 ? diseaseTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
        
        <Modal
          isOpen={modalDoctor}
          toggle={() => setModalDoctor(!modalDoctor)}
          className='modal-pps'
        >
          <ModalHeader>Analisis Rujukan <b>{doctorName}</b></ModalHeader>
          <ModalBody>
            <Table
              className={tableClassReferenceByDoctor}
              // hover
              responsive
            >
              <thead>
                <tr>
                  <th className="center-xy" style={{ width: '40px' }}>#</th>
                  <th>Tanggal</th>
                  <th>Diagnosis</th>
                  <th>Alasan</th>
                </tr>
              </thead>
              <tbody>
              {isLoading && rowSelectedReferenceByDoctor === false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center" colSpan={2}>
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) :
                  referenceByDoctorData.length > 0 ? (
                    referenceByDoctorData.map((data) => (
                      <tr key={data.id} 
                        // onClick={(e) => getInsuranceById(e, data.id)} 
                        style={{ cursor: 'pointer'}} className={`${rowSelectedDisease == data.id && 'row-selected'} center-xy`}>
                        <th scope="row">
                          {startNumberReferenceByDoctor++}
                        </th>
                        <td style={{ textAlign: 'left' }}>{ data.tanggal ? moment(data.tanggal).format("DD MMM YYYY") : 'Tanggal'  }</td>
                        <td style={{ textAlign: 'left' }}>{ data.diagnosis ? data.diagnosis : '-'  }</td>
                        <td style={{ textAlign: 'left' }}>{ data.alasan ? data.alasan : '-'  }</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>&nbsp;</td>
                      <td align="center" colSpan={2}>
                        <h5 style={{ marginTop: '1.5rem' }}><b>Data tidak ditemukan</b></h5>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <Pagination
              currentPage={currentPageReferenceByDoctor}
              totalPage={referenceByDoctorTotalPage}
              onChangePage={(i) => setCurrentPage(i)}
              numberLimit={referenceByDoctorTotalPage < 4 ? referenceByDoctorTotalPage : 3}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="primary"
              onClick={() => setModalDoctor(false)}
            >
              Tutup
            </Button>
          </ModalFooter>
        </Modal>
      </Row>

    </>
  );
};
export default Dashboard;
