import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import DatePicker from "react-datepicker";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";

import CustomSelectInput from "components/common/CustomSelectInput";

import Pagination from "reactstrap/es/Pagination";

import shiftAPI from "api/shift";
import divisionAPI from "api/division";
import clinicAPI from "api/clinic";
import employeeAPI from "api/employee";

import Swal from "sweetalert2";
import moment from "moment";

import loader from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";

const Data = ({ match }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle className="mb-4">Data Shift</CardTitle>
              <FormGroup className="mt-4">
                <Label for="clinic">Klinik</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="division">Divisi</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                />
              </FormGroup>
              <InputGroup className="my-4">
                <Input
                  type="text"
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
              <Table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>#</th>
                    <th>Divisi</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx sm="12" md="12" xl="8" className="mb-4">
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Form Manajemen Shift</CardTitle>
              <Colxx sm={12} className="my-4">
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  className="mb-2"
                  onClick={addShiftFields}
                >
                  Tambah
                </Button>
                <h6>Shift Rutin</h6>
                <Separator className="schedule-separator" />
              </Colxx>
              <Form>
                <Row>
                  <Colxx sm={6}>
                    <Label>* ) Wajib diisi</Label>
                    <br />
                    <Label>
                      ** ) Boleh diisi salah satu namun tidak boleh kosong
                      keduanya
                    </Label>
                  </Colxx>
                  <Colxx sm={6} className="text-right">
                    <Button outline color="danger" onClick={handleCancelInput}>
                      Batal
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      color="primary"
                      type="submit"
                      onClick={onShiftSubmit}
                    >
                      Simpan
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default Data;
