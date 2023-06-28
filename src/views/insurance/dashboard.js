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
  Table, 
} from 'reactstrap';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import Pagination from "components/common/Pagination";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import insuranceAPI from "api/insurance";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

import { currencyFormat } from 'utils';

const userData = JSON.parse(localStorage.getItem('user_data'));

const Dashboard = ({ match, history, loading, error }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const insuranceMetrics = useSelector(state => state.insuranceMetrics);
  const insuranceData = useSelector(state => state.insuranceDashboard);
  const insuranceTotalPage = useSelector(state => state.insuranceDashboardTotalPage);

  const [claimTotal, setClaimTotal] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState([]);
  const [successClaim, setSuccessClaim] = useState([]);
  
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState('drp-none');

  const [tableClass, setTableClass] = useState('');
  const [rowSelected, setRowSelected] = useState(null);

  const [insuranceID, setInsuranceID] = useState('');

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

  const onLoadInsuranceDashboard = async (params) => {
    try {
      setIsLoading(true);
      const res = await insuranceAPI.getMainDashboard(params);
      // console.log('res', res);

      dispatch({type: "GET_METRICS_INSURANCE_DASHBOARD", payload: res.data.data});
      dispatch({type: "GET_INSURANCE_DASHBOARD", payload: res.data.data.tabel.result});
      dispatch({type: "GET_TOTAL_PAGE_INSURANCE_DASHBOARD", payload: res.data.data.tabel.pagination.totalPage});
      
      setClaimTotal(res.data.data.total_klaim);
      setIncomeTotal(res.data.data.total_pendapatan);
      setSuccessClaim(res.data.data.klaim_berhasil);

      if(res.data.data.tabel.result.length > 0) {
        setTableClass('table-hover');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const goToInsuranceDashboard = async (e, dataReq) => {
    e && e.preventDefault();
    setRowSelected(dataReq.id);

    try {
      const res = await insuranceAPI.getTypeDashboard(`?id_asuransi=${dataReq.id_asuransi}&id_asuransi_kelas=${dataReq.id_asuransi_kelas}`);
      let data = res.data.data;
      // console.log(data);

      if(data){
        if(dataReq.tipe === "PPSK" || dataReq.tipe === "PPST") {
          history.push({
            pathname: "/insurance/dashboard-pps",
            state: { insuranceID: dataReq.id_asuransi, insuranceClassID: dataReq.id_asuransi_kelas, insuranceType: dataReq.tipe }
          });
        } else if (dataReq.tipe === "FFSP" || data.tipe === "FFSNP") {
          history.push({
            pathname: "/insurance/dashboard-ffs",
            state: { insuranceID: dataReq.id_asuransi, insuranceClassID: dataReq.id_asuransi_kelas, insuranceType: dataReq.tipe }
          });
        } else {
          Swal.fire({
            title: "Gagal!",
            html: "Tipe asuransi tidak valid, silahkan memvalidasi ulang data asuransi",
            icon: "error",
            confirmButtonColor: "#008ecc",
            // confirmButtonText: "Coba lagi",
          });
        }
      }

      // console.log(insurance);
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

    // if(id === "PPSK") {
    //   history.push({
    //     pathname: "/insurance/dashboard-pps",
    //     state: { insuranceID: 1, insuranceType: "PPSK" }
    //   });
    // } else if (id === "FFSP" || id === "FFSNP") {
    //   history.push({
    //     pathname: "/insurance/dashboard-ffs",
    //     state: { insuranceID: 2, insuranceType: "FFSNP" }
    //   });
    // } else {
    //   Swal.fire({
    //     title: "Gagal!",
    //     html: "Tipe asuransi tidak valid, silahkan memvalidasi ulang data asuransi",
    //     icon: "error",
    //     confirmButtonColor: "#008ecc",
    //     // confirmButtonText: "Coba lagi",
    //   });
    // }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

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
      params = `${params}&search=${searchName}`;
    }
    if (searchStatus !== "") {
      params = `${params}&searchStatus=${searchStatus}`;
    }
    if (currentPage !== 1) {
      params = `${params}&page=${currentPage}`;
    }

    setRowSelected(false);
    onLoadInsuranceDashboard(params);
  }, [limit, searchName, searchStatus, sortBy, sortOrder, currentPage]);

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
          <h2 style={{ display: 'inline' }}>
            <b>Dashboard Asuransi</b>
          </h2>
          <Button
            // outline
            color="primary"
            style={{ float: "right", borderRadius: '5px' }}
            className="text-right mb-4"
            onClick={() => handleShowDateRangePicker(!showDateRangePicker)}
          >
            Tanggal
          </Button>
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

      <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <Card className="progress-banner" style={{ cursor: 'initial' }}>
            <CardBody className="align-items-center text-center">
              <div>
                <i
                  className={`iconsminds-newspaper mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Total Klaim</p>
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(claimTotal.result) : 'Rp0' }</h1>
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
                  <h1 className="text-white">{ insuranceMetrics ? currencyFormat(incomeTotal.result) : 'Rp0' }</h1>
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
                  className={`iconsminds-check mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Klaim Berhasil</p>
                  <h1 className="text-white">{ insuranceMetrics ? parseFloat(successClaim.result).toFixed(2) + '%' : '0%' }</h1>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx sm="12" md="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Analisa Asuransi
              </CardTitle>
              <Table
                className={tableClass}
                responsive
              >
                <thead>
                  <tr>
                    <th className="center-xy" style={{ width: '40px' }}>#</th>
                    <th>Produk</th>
                    <th>Asuransi</th>
                    <th className="center-xy">Kunjungan</th>
                    <th>Jumlah Klaim</th>
                    <th>Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading && rowSelected === false ? (
                  <tr>
                    <td align="center" colSpan={6}>
                      <img src={loader} alt="loading..." width="100"/>
                    </td>
                  </tr>
                  ) :
                  insuranceData.length > 0 ? (
                    insuranceData.map((data, index) => (
                      <tr key={data.id} onClick={(e) => goToInsuranceDashboard(e, data, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: 'middle' }}>
                          {startNumber++}
                        </th>
                        <td>
                          <h6 style={{ fontWeight: 'bold' }} className="max-text">
                            [{data.tipe}] 
                            {data.produk}
                          </h6>
                        </td>
                        <td>{ data.asuransi ? data.asuransi : '-' }</td>
                        <td className="center-xy">{ data.kunjungan ? data.kunjungan : '0' }</td>
                        <td>{ data.total_klaim ? currencyFormat(data.total_klaim) : 'Rp0' }</td>
                        <td>{ data.pendapatan ? currencyFormat(data.pendapatan) : 'Rp0' }</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td align="center" colSpan={6}>
                        <h5 style={{ marginTop: '1.5rem' }}><b>Data tidak ditemukan</b></h5>
                      </td>
                    </tr>
                  )
                }
                  {/* <tr>
                    <th>1</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Kelas A</h6></td>
                    <td>BPJS</td>
                    <td>Rp24.242.424</td>
                    <td>Rp23.230.230</td>
                  </tr>
                  <tr 
                    onClick={(e) => goToInsuranceDashboard("", "PPSK")}
                    // onClick={(e) => goToInsuranceDashboard(e, data.id)}
                    style={{ cursor: 'pointer'}}
                    // className={`${rowSelected == data.id && 'row-selected'}`}
                  >
                    <th>2</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Kelas B (PPSK)</h6></td>
                    <td>BPJS</td>
                    <td>Rp24.242.424</td>
                    <td>Rp23.230.230</td>
                  </tr>
                  <tr 
                    onClick={(e) => goToInsuranceDashboard("", "FFSNP")}
                    // onClick={(e) => goToInsuranceDashboard(e, data.id)}
                    style={{ cursor: 'pointer'}}
                    // className={`${rowSelected == data.id && 'row-selected'}`}
                  >
                    <th>3</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>MILA Plus (FFS-P)</h6></td>
                    <td>AIA</td>
                    <td>Rp222.222.222</td>
                    <td>Rp111.111.111</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Optima Accident Pro.</h6></td>
                    <td>AIA</td>
                    <td>Rp999.999.999</td>
                    <td>Rp888.888.888</td>
                  </tr> */}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPage={insuranceTotalPage}
                onChangePage={(i) => setCurrentPage(i)}
                numberLimit={insuranceTotalPage < 4 ? insuranceTotalPage : 3}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};
export default Dashboard;
