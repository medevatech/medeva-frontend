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

const userData = JSON.parse(localStorage.getItem('user_data'));

const Dashboard = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const insuranceData = useSelector(state => state.insurance);
  // const insuranceTotalPage = useSelector(state => state.insuranceTotalPage);
  const { errors, validate } = useForm();
  
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState('drp-none');

  const [insuranceID, setInsuranceID] = useState('');
  const [insuranceClassID, setInsuranceClassID] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [tableClass, setTableClass] = useState('');
  const [rowSelected, setRowSelected] = useState(null);

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

  const getInsurance = async (params) => {
    try {
      setIsLoading(true);
      // const res = await insuranceAPI.get(params);
      // dispatch({type: "GET_INSURANCE", payload: res.data.data});
      // dispatch({type: "GET_TOTAL_PAGE_INSURANCE", payload: res.data.pagination.totalPage});

      // if(res.data.data.length > 0) {
      //   setTableClass('table-hover');
      // }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
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
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 901, 1200],
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
        data: [1200, 901, 901, 932, 820, 1320, 1330, 1290, 934, 901, 932, 820],
        type: 'bar',
        stack: 'x',
        itemStyle: { color: '#39addf' },
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
            value: 26,
            name: 'Diterima',
            itemStyle: { color: '#006894' },
          },
          {
            value: 75,
            name: 'Ditolak',
            itemStyle: { color: '#007fb6' },
          },
          {
            value: 23,
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

  const alasanPenolakan = {
    grid: { top: 8, right: 20, bottom: 24, left: 46 },
    yAxis: {
      type: 'category',
      data: ['Kurang Privilege', 'Kurang Kaya', 'Kurang Ganteng' ],
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
            value: 932,
            itemStyle: { color: '#006894' },
           }, {
            value: 1200,
            itemStyle: { color: '#007fb6' },
           },{ 
            value: 777,
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

  const layananTerklaim = {
    grid: { top: 8, right: 20, bottom: 24, left: 46 },
    yAxis: {
      type: 'category',
      data: ['Melayani Sejiwa Janji', 'Melayani Setengah Mati', 'Melayani Separuh Hari' ],
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
            value: 932,
            itemStyle: { color: '#006894' },
           }, {
            value: 1200,
            itemStyle: { color: '#007fb6' },
           },{ 
            value: 777,
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
            value: 35,
            name: 'Low',
            itemStyle: { color: '#006894' },
          },
          {
            value: 23,
            name: 'Med',
            itemStyle: { color: '#007fb6' },
          },
          {
            value: 48,
            name: 'High',
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
    grid: { top: 8, right: 20, bottom: 24, left: 46 },
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
            value: 932,
            itemStyle: { color: '#006894' },
           }, {
            value: 1200,
            itemStyle: { color: '#007fb6' },
           },{ 
            value: 777,
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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Row>
            <Colxx sm="10">
              <h2><b>MILA Plus</b></h2>
              <p>Fee For Services - Non Package</p>
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
                  <h1 className="text-white">Rp9.999.999.999</h1>
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
                  <h1 className="text-white">Rp9.999.999.999</h1>
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
                  <h1 className="text-white">999.999 orang</h1>
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
        <Colxx sm="12" md="4" className="mb-4">
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
        <Colxx sm="12" md="4" className="mb-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        Layanan Terklaim
                    </CardTitle>
                    <ReactEcharts
                        option={layananTerklaim}
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
                // className={tableClass}
                hover
                responsive
              >
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Layanan</th>
                    <th>Harga Jual</th>
                    <th>Unit Cost</th>
                    <th className="center-xy">% Unit Cost</th>
                  </tr>
                </thead>
                <tbody>
                {/* {isLoading && rowSelected === false ? (
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
                          {data.is_active == 1 ? (
                            <Badge color="success" className="mt-2">Aktif</Badge>
                          ) : (
                            <Badge color="warning" className="mt-2">Non-Aktif</Badge>
                          )}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          <Button color="secondary" size="xs" className="button-xs"
                            onClick={(e) => getInsuranceById(e, data.id)}
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
                } */}
                  <tr>
                    <th>1</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Layanan A</h6></td>
                    <td>Rp9.999.999</td>
                    <td>Rp24.242.424</td>
                    <td className="center-xy">23%</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Layanan X</h6></td>
                    <td>Rp9.999.999</td>
                    <td>Rp24.242.424</td>
                    <td className="center-xy">23%</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Layanan F</h6></td>
                    <td>Rp9.999.999</td>
                    <td>Rp222.222.222</td>
                    <td className="center-xy">11%</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Layanan O</h6></td>
                    <td>Rp9.999.999</td>
                    <td>Rp999.999.999</td>
                    <td className="center-xy">88%</td>
                  </tr>
                </tbody>
              </Table>
              <Pagination
                // currentPage={currentPage}
                // totalPage={insuranceTotalPage}
                // onChangePage={(i) => setCurrentPage(i)}
                // numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}

                currentPage={1}
                totalPage={3}
                numberLimit={3}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};
export default Dashboard;