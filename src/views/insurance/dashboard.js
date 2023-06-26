import React, { useState } from 'react';
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

  const goToInsuranceDashboard = async (e, id) => {
    // e && e.preventDefault();
    // setRowSelected(id);

    // try {
    //   const res = await insuranceAPI.get(`/${id}`);
    //   let data = res.data.data[0];
    //   // console.log(data);

    //   if(data.tipe === "PPS") {
    //     history.push({
    //       pathname: "/insurance/dashboard-pps",
    //       state: { insuranceID: data.id, insuranceType: data.tipe }
    //     });
    //   } else if (data.tipe === "FFSP" || data.tipe === "FFSNP") {
    //     history.push({
    //       pathname: "/insurance/dashboard-ffs",
    //       state: { insuranceID: data.id, insuranceType: data.tipe }
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "Gagal!",
    //       html: "Tipe asuransi tidak valid, silahkan memvalidasi ulang data asuransi",
    //       icon: "error",
    //       confirmButtonColor: "#008ecc",
    //       // confirmButtonText: "Coba lagi",
    //     });
    //   }

    //   // console.log(insurance);
    // } catch (e) {
    //   Swal.fire({
    //     title: "Gagal!",
    //     html: e.response.data.message,
    //     icon: "error",
    //     confirmButtonColor: "#008ecc",
    //     confirmButtonText: "Coba lagi",
    //   });

    //   console.log(e);
    // }

    if(id === "PPS") {
      history.push({
        pathname: "/insurance/dashboard-pps",
        state: { insuranceID: 1, insuranceType: "PPS" }
      });
    } else if (id === "FFSP" || id === "FFSNP") {
      history.push({
        pathname: "/insurance/dashboard-ffs",
        state: { insuranceID: 2, insuranceType: "FFSNP" }
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
  };

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
                  className={`iconsminds-coins mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Total Pendapatan</p>
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
                  className={`iconsminds-check mr-2 text-white align-text-bottom d-inline-block`}
                />
                <div>
                  <p className="text-small text-white">Klaim Berhasil</p>
                  <h1 className="text-white">99.9999%</h1>
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
                {/* <Row> */}
                  {/* <Colxx sm="8" md="8" xl="8" className="col-sm-8-mobile"> */}
                    Analisa Asuransi
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
                    <th>Produk</th>
                    <th>Asuransi</th>
                    <th>Jumlah Klaim</th>
                    <th>Pendapatan</th>
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
                      <tr key={data.id} onClick={(e) => goToInsuranceDashboard(e, data.id)} style={{ cursor: 'pointer'}} className={`${rowSelected == data.id && 'row-selected'}`}>
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
                            onClick={(e) => goToInsuranceDashboard(e, data.id)}
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
                    <td><h6 style={{ fontWeight: 'bold' }}>Kelas A</h6></td>
                    <td>BPJS</td>
                    <td>Rp24.242.424</td>
                    <td>Rp23.230.230</td>
                  </tr>
                  <tr 
                    onClick={(e) => goToInsuranceDashboard("", "PPS")}
                    // onClick={(e) => goToInsuranceDashboard(e, data.id)}
                    style={{ cursor: 'pointer'}}
                    // className={`${rowSelected == data.id && 'row-selected'}`}
                  >
                    <th>2</th>
                    <td><h6 style={{ fontWeight: 'bold' }}>Kelas B (PPS)</h6></td>
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
