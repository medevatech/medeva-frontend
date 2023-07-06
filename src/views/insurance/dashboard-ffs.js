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

  const [insuranceMetrics, setInsuranceMetrics] = useState({ total_klaim: 0, total_klaim_ditolak: 0, jumlah_anggota: 0, biaya_layanan: { biaya: 0, pendapatan: 0 }, komponen_layanan: { bhp: 0, bnmhp: 0, jasa_medis: 0 }, status_klaim: { ditolak: 0, dipertimbangkan: 0, diterima: 0 }, alasan_penolakan: { berkas_tidak_lengkap: 0, diagnosa_tidak_tepat: 0, penanganan_tidak_tepat: 0, tidak_ditanggung: 0, lainnya: 0 }, layanan_terklaim: { tambal_gigi: 0, suntik_vitamin: 0, penanganan_luka: 0 } });
  const [incomeMetrics, setIncomeMetrics] = useState({});
  const [visitationMetrics, setVisitationMetrics] = useState({});
  const [unitCostData, setUnitCostData] = useState([]);
  const [unitCostTotalPage, setUnitCostTotalPage] = useState(0);
  
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState('drp-none');

  const [tableClass, setTableClass] = useState('');
  const [rowSelected, setRowSelected] = useState(null);

  const [insuranceID, setInsuranceID] = useState('');
  const [insuranceClassID, setInsuranceClassID] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceType, setInsuranceType] = useState('');

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

  const totalPendapatan = {
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
        data: [incomeMetrics.januari, incomeMetrics.februari, incomeMetrics.maret, incomeMetrics.april, incomeMetrics.mei, incomeMetrics.juni,
                incomeMetrics.juli, incomeMetrics.agustus, incomeMetrics.september, incomeMetrics.oktober, incomeMetrics.november, incomeMetrics.desember],
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

  const statusKlaim = {
    title: {
      left: 'center',
      top: 'top'
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: insuranceMetrics.status_klaim.diterima,
            name: 'Diterima',
            itemStyle: { color: '#006894' },
          },
          {
            value:  insuranceMetrics.status_klaim.ditolak,
            name: 'Ditolak',
            itemStyle: { color: '#007fb6' },
          },
          {
            value:  insuranceMetrics.status_klaim.dipertimbangkan,
            name: 'Dipertimbangkan',
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

  const layananTerklaim = {
    grid: { top: 8, right: 42, bottom: 24, left: '12%' },
    yAxis: {
      type: 'category',
      data: ['Tambal Gigi', 'Suntik Vitamin', 'Penanganan Luka' ],
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
      max: 120000000
    },
    series: [
      {
        data: [{ 
            value: insuranceMetrics.layanan_terklaim.tambal_gigi,
            itemStyle: { color: '#006894' },
           }, {
            value: insuranceMetrics.layanan_terklaim.suntik_vitamin,
            itemStyle: { color: '#007fb6' },
           },{ 
            value: insuranceMetrics.layanan_terklaim.penanganan_luka,
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

  const alasanPenolakan = {
    grid: { top: 8, right: 20, bottom: 24, left: '10%' },
    yAxis: {
      type: 'category',
      data: ['Berkas Tidak Lengkap', 'Diagnosa Tidak Tepat', 'Penanganan Tidak Tepat', 'Tidak Ditanggung', 'Lainnya' ],
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
            value: insuranceMetrics.alasan_penolakan.berkas_tidak_lengkap,
            itemStyle: { color: '#006894' },
           }, {
            value: insuranceMetrics.alasan_penolakan.diagnosa_tidak_tepat,
            itemStyle: { color: '#007fb6' },
           }, { 
            value: insuranceMetrics.alasan_penolakan.penanganan_tidak_tepat,
            itemStyle: { color: '#37b9f1' },
          }, { 
            value: insuranceMetrics.alasan_penolakan.tidak_ditanggung,
            itemStyle: { color: '#56c4f3' },
          }, { 
            value: insuranceMetrics.alasan_penolakan.lainnya,
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
            value: insuranceMetrics.biaya_layanan.biaya,
            name: 'Biaya',
            itemStyle: { color: '#006894' },
          },
          {
            value: insuranceMetrics.biaya_layanan.pendapatan,
            name: 'Total Pendapatan',
            itemStyle: { color: '#007fb6' },
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

  const biayaLayananGauge = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ffffff'
          }
        },
        axisLine: {
          lineStyle: {
            width: 20
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [
                {
                  value: insuranceMetrics.biaya_layanan.pendapatan,
                  name: 'Total Pendapatan',
                  title: {
                    offsetCenter: ['0%', '20%'],
                    fontSize: 12
                  },
                  itemStyle: { color: '#006894' },
                  detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '50%'],
                    fontSize: 12
                  }
                },{
                  value: insuranceMetrics.biaya_layanan.biaya,
                  name: 'Biaya',
                  title: {
                    offsetCenter: ['0%', '-50%'],
                    fontSize: 12
                  },
                  itemStyle: { color: '#39addf' },
                  detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-20%'],
                    fontSize: 12
                  }
                },],
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
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
      axisLabel: {
        formatter: (value) => {
          return currencyFormat(value);
        }
      },
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
          },
          formatter: (data) => {
            return currencyFormat(data.value);
          },
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
      valueFormatter: (value) => currencyFormat(value)
    },
  }; 

  useEffect(() => {
    // console.log(location.state);

    if (location.state) {
      setInsuranceID(location.state.insuranceID);
      setInsuranceClassID(location.state.insuranceClassID);
      setInsuranceName(location.state.insuranceName);
      setInsuranceType(location.state.insuranceType);
      if(location.state.insuranceType === "FFSP") {
        getInsuranceByInsuranceIdAndInsuranceClassIdFFSP(location.state.insuranceID, location.state.insuranceClassID);
      } else if (location.state.insuranceType === "FFSNP") {
        getInsuranceByInsuranceIdAndInsuranceClassIdFFSNP(location.state.insuranceID, location.state.insuranceClassID);
      }
    }
  }, [ ]);

  const getInsuranceByInsuranceIdAndInsuranceClassIdFFSP = async (insuranceID, insuranceClassID) => {
    setInsuranceMetrics({ total_klaim: 0, total_klaim_ditolak: 0, jumlah_anggota: 0, biaya_layanan: { biaya: 0, pendapatan: 0 }, komponen_layanan: { bhp: 0, bnmhp: 0, jasa_medis: 0 }, status_klaim: { ditolak: 0, dipertimbangkan: 0, diterima: 0 }, alasan_penolakan: { berkas_tidak_lengkap: 0, diagnosa_tidak_tepat: 0, penanganan_tidak_tepat: 0, tidak_ditanggung: 0, lainnya: 0 }, layanan_terklaim: { tambal_gigi: 0, suntik_vitamin: 0, penanganan_luka: 0 } });
    setIncomeMetrics({});
    setVisitationMetrics({});
    setUnitCostData([]);
    setUnitCostTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getFFSPDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setInsuranceMetrics({ total_klaim: data.total_klaim, total_klaim_ditolak: data.total_klaim_ditolak, jumlah_anggota: data.jumlah_anggota, biaya_layanan: { biaya: data.biaya_layanan.biaya, pendapatan: data.biaya_layanan.pendapatan }, komponen_layanan: { bhp: data.komponen_layanan.bhp, bnmhp: data.komponen_layanan.bnmhp, jasa_medis: data.komponen_layanan.jasa_medis }, status_klaim: { ditolak: data.status_klaim.ditolak, dipertimbangkan: data.status_klaim.dipertimbangkan, diterima: data.status_klaim.diterima }, alasan_penolakan: { berkas_tidak_lengkap: data.alasan_penolakan.berkas_tidak_lengkap, diagnosa_tidak_tepat: data.alasan_penolakan.diagnosa_tidak_tepat, penanganan_tidak_tepat: data.alasan_penolakan.penanganan_tidak_tepat, tidak_ditanggung: data.alasan_penolakan.tidak_ditanggung, lainnya: data.alasan_penolakan.lainnya }, layanan_terklaim: { tambal_gigi: data.layanan_terklaim.tambal_gigi, suntik_vitamin: data.layanan_terklaim.suntik_vitamin, penanganan_luka: data.layanan_terklaim.penanganan_luka } });
        setIncomeMetrics(data.total_pendapatan);
        setVisitationMetrics(data.total_kunjungan);
        setUnitCostData(data.analisa_unit_cost);
        setUnitCostTotalPage(data.pagination.totalPage);

        if(data.pagination > 0) {
          setTableClass('table-hover');
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

  const getInsuranceByInsuranceIdAndInsuranceClassIdFFSNP = async (insuranceID, insuranceClassID) => {
    setInsuranceMetrics({ total_klaim: 0, total_klaim_ditolak: 0, jumlah_anggota: 0, biaya_layanan: { biaya: 0, pendapatan: 0 }, komponen_layanan: { bhp: 0, bnmhp: 0, jasa_medis: 0 }, status_klaim: { ditolak: 0, dipertimbangkan: 0, diterima: 0 }, alasan_penolakan: { berkas_tidak_lengkap: 0, diagnosa_tidak_tepat: 0, penanganan_tidak_tepat: 0, tidak_ditanggung: 0, lainnya: 0 }, layanan_terklaim: { tambal_gigi: 0, suntik_vitamin: 0, penanganan_luka: 0 } });
    setIncomeMetrics({});
    setVisitationMetrics({});
    setUnitCostData([]);
    setUnitCostTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getFFSNPDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setInsuranceMetrics({ total_klaim: data.total_klaim, total_klaim_ditolak: data.total_klaim_ditolak, jumlah_anggota: data.jumlah_anggota, biaya_layanan: { biaya: data.biaya_layanan.biaya, pendapatan: data.biaya_layanan.pendapatan }, komponen_layanan: { bhp: data.komponen_layanan.bhp, bnmhp: data.komponen_layanan.bnmhp, jasa_medis: data.komponen_layanan.jasa_medis }, status_klaim: { ditolak: data.status_klaim.ditolak, dipertimbangkan: data.status_klaim.dipertimbangkan, diterima: data.status_klaim.diterima }, alasan_penolakan: { berkas_tidak_lengkap: data.alasan_penolakan.berkas_tidak_lengkap, diagnosa_tidak_tepat: data.alasan_penolakan.diagnosa_tidak_tepat, penanganan_tidak_tepat: data.alasan_penolakan.penanganan_tidak_tepat, tidak_ditanggung: data.alasan_penolakan.tidak_ditanggung, lainnya: data.alasan_penolakan.lainnya }, layanan_terklaim: { tambal_gigi: data.layanan_terklaim.tambal_gigi, suntik_vitamin: data.layanan_terklaim.suntik_vitamin, penanganan_luka: data.layanan_terklaim.penanganan_luka } });
        setIncomeMetrics(data.total_pendapatan);
        setVisitationMetrics(data.total_kunjungan);
        setUnitCostData(data.analisa_unit_cost);
        setUnitCostTotalPage(data.pagination.totalPage);

        if(data.pagination > 0) {
          setTableClass('table-hover');
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

  const getUnitCostData = async (insuranceID, insuranceClassID) => {
    setUnitCostData([]);
    setUnitCostTotalPage(0);

    try {
      setIsLoading(true);
      const res = await insuranceAPI.getFFSPDashboard(`?id_asuransi=${insuranceID}&id_asuransi_kelas=${insuranceClassID}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        setUnitCostData(data.analisa_unit_cost);
        setUnitCostTotalPage(data.pagination.totalPage);

        if(data.pagination > 0) {
          setTableClass('table-hover');
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

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ limit, sortBy, sortOrder ]);

  // useEffect(() => {
  //   let params = "";
      
  //   if (limit !== 10) {
  //     params = `${params}?limit=${limit}`;
  //   } else {
  //     params = `${params}?limit=10`;
  //   }
  //   if (currentPage !== 1) {
  //     params = `${params}&page=${currentPage}`;
  //   }
    
  //   setRowSelected(false);
  //   getUnitCostData(params);
  // }, [limit, sortBy, sortOrder, currentPage ]);

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
        <Colxx xxs="12">
          <Row>
            <Colxx sm="10">
            <h2><b>{ insuranceName ? insuranceName : '-' }</b></h2>
            <p>{ insuranceType === "FFSP" ? 'Fee For Services - Package' : 'Fee For Services - Non Package' }</p>
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
                    pathname: `/insurance/target-ffs`,
                    // state: { insuranceID: insuranceID, insuranceType: insuranceType }
                    state: { insuranceID: 2, insuranceType: "FFSNP" }
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
        <Colxx sm="12" md="6" className="mb-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        Total Pendapatan
                    </CardTitle>
                    <ReactEcharts
                        option={totalPendapatan}
                    />
                </CardBody>
            </Card>
        </Colxx>
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
      </Row>

      <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <Card className="progress-banner" style={{ cursor: 'initial' }}>
            <CardBody className="align-items-center text-center">
              <div>
                <i
                  className={`iconsminds-coins mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Total Klaim</p>
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(insuranceMetrics.total_klaim) : 'Rp0' }</h1>
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
                  className={`iconsminds-close text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Biaya Klaim Ditolak</p>
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(insuranceMetrics.total_klaim_ditolak) : 'Rp0' }</h1>
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
                  className={`iconsminds-mens mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Jumlah Anggota</p>
                  <h1 className="text-white">{ insuranceMetrics ? insuranceMetrics.jumlah_anggota.toLocaleString('id-ID') : '0' } orang</h1>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="4" className="mb-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        Status Klaim
                    </CardTitle>
                    <ReactEcharts
                        option={statusKlaim}
                        style={{ paddingBottom: '1.5rem' }}
                    />
                </CardBody>
            </Card>
        </Colxx>
        <Colxx sm="12" md="8" className="mb-4">
            <Card>
                <CardBody>
                    <CardTitle>
                      { insuranceType === "FFSP" ? 'Paket' : 'Layanan' } Terklaim
                    </CardTitle>
                    <ReactEcharts
                        option={layananTerklaim}
                    />
                </CardBody>
            </Card>
        </Colxx>
        <Colxx sm="12" md="12" className="mb-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        Alasan Penolakan
                    </CardTitle>
                    <ReactEcharts
                        option={alasanPenolakan}
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
                Biaya { insuranceType === "FFSP" ? 'Paket' : 'Layanan' }
              </CardTitle>
              <ReactEcharts
                option={biayaLayananGauge}
                style={{ paddingBottom: '1.5rem' }}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Komponen { insuranceType === "FFSP" ? 'Paket' : 'Layanan' }
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
                    Analisa Unit Cost
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
                className={tableClass}
                // hover
                responsive
              >
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>{ insuranceType === "FFSP" ? 'Paket' : 'Layanan' }</th>
                    <th>Harga Jual</th>
                    <th>Unit Cost</th>
                    <th className="center-xy">% Unit Cost</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelected === false ? (
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center" colSpan={3}>
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  ) :
                  unitCostData.length > 0 ? (
                    unitCostData.map((data) => (
                      <tr key={data.id}
                        // onClick={(e) => getInsuranceById(e, data.id)}
                        // style={{ cursor: 'pointer'}}
                        className={`${rowSelected == data.id && 'row-selected'} center-xy`}>
                        <th scope="row">
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold', textAlign: 'left' }} className="max-text">{ data.layanan ? data.layanan : '-' }</h6>
                        </td>
                        <td style={{ textAlign: 'left' }}>{ data.harga_jual ? currencyFormat(data.harga_jual) : 'Rp0'  }</td>
                        <td style={{ textAlign: 'left' }}>{ data.unit_cost ? currencyFormat(data.unit_cost) : 'Rp0'  }</td>
                        <td className="center-xy">{ data.persen_unit_cost ? `${data.persen_unit_cost}%` : '0%'  }</td>
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
                currentPage={currentPage}
                totalPage={unitCostTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={unitCostTotalPage < 4 ? unitCostTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};
export default Dashboard;