import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  InputGroup,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Form,
  Table,
  Badge,
  Collapse
} from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import useForm from 'utils/useForm';

import moment from "moment";
import Select from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import CustomSelectInput from 'components/common/CustomSelectInput';

import vitalSignsAPI from "api/vital-signs";
import diagnoseAPI from "api/diagnose";
import diseaseAPI from "api/disease";
import recieptAPI from "api/reciept"
import medicineAPI from "api/medicine";
import inspectSupportAPI from 'api/inspect/support';
import labAPI from "api/lab";
import labTreatmentAPI from "api/lab/treatment";
import treatmentAPI from "api/treatment"
import treatmentListAPI from "api/treatment/list";
import serviceAPI from "api/service"
import serviceListAPI from "api/service/list";
import referenceAPI from "api/reference"
import diagnoseReferenceAPI from "api/reference/diagnose"
import divisionReferenceAPI from "api/reference/division";
import hospitalReferenceAPI from "api/reference/hospital";
import recordAPI from "api/record";
import Swal from "sweetalert2";

import loader from '../../assets/img/loading.gif';

const userData = JSON.parse(localStorage.getItem('user_data'));

const selectVisitation = [
  { label: 'Pilih Status Pulang', value: '', key: 0, name: 'status_pulang' },
  { label: 'Meninggal', value: 'Meninggal', key: 1, name: 'status_pulang' },
  { label: 'Berobat Jalan', value: 'Berobat Jalan', key: 2, name: 'status_pulang' },
  { label: 'Rujuk', value: 'Rujuk', key: 3, name: 'status_pulang' }
];

const selectPrognosa = [
  { label: 'Pilih Prognosa', value: '', key: 0, name: 'prognosa' },
  { label: 'Sanam (Sembuh)', value: 'Sanam (Sembuh)', key: 1, name: 'prognosa' },
  { label: 'Bonam (Baik)', value: 'Bonam (Baik)', key: 2, name: 'prognosa' },
  { label: 'Malam (Buruk/Jelek)', value: 'Malam (Buruk/Jelek)', key: 3, name: 'prognosa' },
  { label: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', value: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', key: 4, name: 'prognosa' },
  { label: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', value: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', key: 5, name: 'prognosa' },
];

const selectType = [
  { label: 'Pilih Tipe', value: '', key: 0, name: 'tipe' },
  { label: 'Rawat Jalan', value: 'Rawat Jalan', key: 1, name: 'tipe' },
  { label: 'Rawat Inap', value: 'Rawat Inap', key: 2, name: 'tipe' },
  { label: 'Promotif', value: 'Promotif', key: 3, name: 'tipe' },
  { label: 'Preventif', value: 'Preventif', key: 4, name: 'tipe' }
];

const selectPcs = [
  { label: 'Pilih Satuan', value: '', key: 0, name: 'satuan' },
  { label: 'Kapsul', value: 'Kapsul', key: 1, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 2, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 3, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 4, name: 'satuan' },
  { label: 'mL (mililiter)', value: 'mL', key: 5, name: 'satuan' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 6, name: 'satuan' },
];

const selectPeriod = [
  { label: 'Pilih Frekuensi', value: '', key: 0, name: 'periode' },
  { label: 'Jam', value: 'Jam', key: 1, name: 'periode' },
  { label: 'Hari', value: 'Hari', key: 2, name: 'periode' }
];

const selectRules = [
  { label: 'Pilih Aturan Pakai', value: '', key: 0, name: 'aturan_pakai' },
  { label: 'Sebelum Makan', value: 'Sebelum Makan', key: 1, name: 'aturan_pakai' },
  { label: 'Setelah Makan', value: 'Setelah Makan', key: 2, name: 'aturan_pakai' },
  { label: 'Kapan Saja', value: 'Kapan Saja', key: 3, name: 'aturan_pakai' }
];

const selectConsume = [
  { label: 'Pilih Metode Konsumsi', value: '', key: 0, name: 'metode_konsumsi' },
  { label: 'Dikunyah', value: 'Dikunyah', key: 1, name: 'metode_konsumsi' },
  { label: 'Ditelan', value: 'Ditelan', key: 2, name: 'metode_konsumsi' },
  { label: 'Disuntik', value: 'Disuntik', key: 3, name: 'metode_konsumsi' },
  { label: 'Dihirup', value: 'Dihirup', key: 4, name: 'metode_konsumsi' },
  { label: 'Lainnya', value: 'Lainnya', key: 5, name: 'metode_konsumsi' }
];

let selectInspectByLabTreatmentArray = [];
let selectLabTreatmentArray = [];

let patientID = "";
let patientData = "";
let recordID = "";
let watchID = "";

const FormRecord = ({ match, history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { errors, validate } = useForm();

  const [dataStatusRecord, setDataStatusRecord] = useState("add");
  const [dataStatusDiagnose, setDataStatusDiagnose] = useState("add");
  const [dataStatusReciept, setDataStatusReciept] = useState("add");
  const [dataStatusCheckup, setDataStatusCheckup] = useState("add");
  const [dataStatusTreatment, setDataStatusTreatment] = useState("add");
  const [dataStatusService, setDataStatusService] = useState("add");
  const [dataStatusReference, setDataStatusReference] = useState("add");
  const [dataStatusDiagnoseReference, setDataStatusDiagnoseReference] = useState("add");

  const [selectedAccordion, setSelectedAccordion] = useState(0);
  // const [patientID, setPatientID] = useState("");
  // const [patientData, setPatientData] = useState("");
  // const [recordID, setRecordID] = useState("");
  // const [watchID, setWatchID] = useState('');

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const [recordSubmit, setRecordSubmit] = useState('');
  const [referenceSubmit, setReferenceSubmit] = useState('');

  const [vitalSignsID, setVitalSignsID] = useState('');
  const [referenceID, setReferenceID] = useState('');

  const [ vitalSigns, setVitalSigns ] = useState({
    id_pasien: patientID,
    keluhan: '-',
    kesadaran: '-',
    temperatur: 0,
    tinggi_badan: 0,
    berat_badan: 0,
    lingkar_perut: 0,
    imt: 0,
    sistole: 0,
    diastole: 0,
    respiratory_rate: 0,
    heart_rate: 0,
    catatan_tambahan: '-',
    created_at: ''
  });

  const [ record, setRecord ] = useState({
    id_jaga: watchID,
    id_vs: vitalSignsID,
    id_pasien: patientID,
    waktu_mulai: startDateTime,
    waktu_selesai: endDateTime,
    tipe: '',
    anamnesis: '',
    pemeriksaan_fisik: '',
    prognosa: '',
    kasus_kll: false,
    status_pulang: '',
    keluhan: '',
    catatan_tambahan: '',
  });

  const onChange = (e, name = "") => {
    // console.log('e', e);

    if (e.name === 'tipe') {
      setRecord(current => {
          return { ...current, tipe: e.value }
      })
    } else if (e.name === 'status_pulang') {
      setRecord(current => {
          return { ...current, status_pulang: e.value }
      })
      validate(e, e.name !== undefined ? e.name : e.target.name ? e.target.name : '', e.value !== undefined ? e.value : e.target.value ? e.target.value : '');
    } else if (e.name === 'prognosa') {
      setRecord(current => {
          return { ...current, prognosa: e.value }
      })
    } else if (name === 'waktu_mulai') {
      const sd = new Date(e);
      setStartDateTime(sd);

      setRecord(current => {
          return { ...current, waktu_mulai: moment(ed).format("yyyy-MM-DD HH:mm") }
      })
    } else if (name === 'waktu_selesai') {
      const ed = new Date(e);
      setEndDateTime(ed);

      setRecord(current => {
          return { ...current, waktu_selesai: moment(ed).format("yyyy-MM-DD HH:mm") }
      })
    } else if (e.target.name === 'kasus_kll' && e.target.checked === false) {
      setRecord(current => {
          return { ...current, kasus_kll: false }
      })

      setIsChecked(false);
    } else if (e.target.name === 'kasus_kll' && e.target.checked === true) {
      setRecord(current => {
          return { ...current, kasus_kll: true }
      })

      setIsChecked(true);
    } else {
      setRecord(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    // console.log('record', record);
  }

  const [diagnosis, setDiagnosis] = useState([
    { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);

  const [tempDiagnosis, setTempDiagnosis] = useState([
    { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);

  const addDiagnosisFields = () => {
    let newfieldDiagnosis = { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnosis([...diagnosis, newfieldDiagnosis]);

    let newfieldDiagnoseReference = { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnoseReference([...diagnoseReference, newfieldDiagnoseReference]);
  };

  const removeDiagnosisFields = (id, index) => {
    let dataDiagnosis = [...diagnosis];
    let dataDiagnoseReference = [...diagnoseReference];

    dataDiagnosis.splice(index, 1);
    dataDiagnoseReference.splice(index, 1);

    setDiagnosis(dataDiagnosis);
    setDiagnoseReference(dataDiagnoseReference);

    if(dataStatusDiagnose === "update"){
      setTempDiagnosis(dataDiagnosis);
      onDeleteRecordDiagnose(id);
    }
    if(dataStatusDiagnoseReference === "update"){
      setTempDiagnoseReference(dataDiagnoseReference);
      onDeleteDiagnoseReference(id);
    }
  };

  let wd = false; let dd = false;

  const handleDiagnosisChange = (index, event) => {
    // console.log('handleDiagnosisChange', event);

    let dataDiagnosis = [...diagnosis];
    let dataDiagnoseReference = [...diagnoseReference];

    if (event.name === "id_penyakit"){
      dataDiagnosis[index][event.name] = event.value;
      dataDiagnoseReference[index][event.name] = event.value;

      validate(event, event.name !== undefined ? event.name : event.target.name ? event.target.name : '', event.value !== undefined ? event.value : event.target.value ? event.target.value : '');
    } else if(event.target.name === "tipe_diagnosis") {
      if(event.target.id === 'tipe_wd' && event.target.checked === true) {
        wd = true;
        wd_rujukan = true;
        
        validate(event, 'wd', true);
      } else if(event.target.id === 'tipe_wd' && event.target.checked === false) {
        wd = false;
        wd_rujukan = false;

        validate(event, 'wd', false);
      }
      
      if(event.target.id === 'tipe_dd' && event.target.checked === true) {
        dd = true;
        dd_rujukan = true;

        validate(event, 'dd', true);
      } else if(event.target.id === 'tipe_wd' && event.target.checked === false) {
        dd = false;
        dd_rujukan = false;

        validate(event, 'dd', false);
      }

      if(dataDiagnosis[index]['id_penyakit'] === '') {
        wd = false; dd = false;
        wd_rujukan = false; dd_rujukan = false;

        validate(event, 'id_penyakit', '');
        validate(event, 'wd', '');
        validate(event, 'dd', '');
      }

      dataDiagnosis[index]['tipe_wd'] = wd;
      dataDiagnosis[index]['tipe_dd'] = dd;
      dataDiagnoseReference[index]['tipe_wd'] = wd_rujukan;
      dataDiagnoseReference[index]['tipe_dd'] = dd_rujukan;
    }

    setDiagnosis(dataDiagnosis);
    setDiagnoseReference(dataDiagnoseReference);
  };

  const [reciept, setReciept] = useState([
    { id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
  ]);

  const [tempReciept, setTempReciept] = useState([
    { id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
  ]);

  const addRecieptFields = () => {
    let newfieldReciept = { id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
    setReciept([...reciept, newfieldReciept]);
  };

  const removeRecieptFields = (id, index) => {
    let dataReciept = [...reciept];

    dataReciept.splice(index, 1);

    setReciept(dataReciept);

    if(dataStatusReciept === "update"){
      setTempReciept(dataReciept);
      onDeleteRecordReciept(id);
    }
  };

  const handleRecieptChange = (index, event) => {
    // console.log('handleRecieptChange', event);

    let dataReciept = [...reciept];

    if (event.name === "id_obat" || event.name === "satuan" || event.name === "periode" || event.name === "aturan_pakai" || event.name === "metode_konsumsi"){
      dataReciept[index][event.name] = event.value;
    } else {
      dataReciept[index][event.target.name] = event.target.value;
    }

    setReciept(dataReciept);
  };

  const [checkup, setCheckup] = useState([
    { id: '', id_kunjungan: recordID, id_lab: "", id_pemeriksaan: "" }
  ]);

  const [tempCheckup, setTempCheckup] = useState([
    { id: '', id_kunjungan: recordID, id_lab: "", id_pemeriksaan: "" }
  ]);

  const addCheckupFields = () => {
    let newfieldCheckup = { id: '', id_kunjungan: recordID, id_lab: "", id_pemeriksaan: "" }
    setCheckup([...checkup, newfieldCheckup]);
  };

  const removeCheckupFields = (id, index) => {
    let dataCheckup = [...checkup];
    let displaySelectTreatmentArray = selectLabTreatmentArray;

    dataCheckup.splice(index, 1);
    displaySelectTreatmentArray.splice(index, 1);

    setCheckup(dataCheckup);
    selectLabTreatmentArray = displaySelectTreatmentArray;
    
    if(dataStatusCheckup === "update"){
      setTempCheckup(dataCheckup);
      onDeleteRecordCheckup(id);
    }
  };

  const handleCheckupChange = (index, event) => {
    let dataCheckup = [...checkup];
    let displaySelectTreatmentArray = selectLabTreatmentArray;

    if (event.name === "id_lab"){
      dataCheckup[index][event.name] = event.value;
      changeLayananLab(index, event.value);
    } else if (event.name === "id_pemeriksaan"){
      dataCheckup[index][event.name] = event.value;
    } else {
      dataCheckup[index][event.target.name] = event.target.value;
    }

    // console.log(dataCheckup);

    setCheckup(dataCheckup);
    selectLabTreatmentArray = displaySelectTreatmentArray;
  };

  const [treatment, setTreatment] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }
  ]);

  const [tempTreatment, setTempTreatment] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }
  ]);

  const addTreatmentFields = () => {
    let newfieldTreatment = { id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }
    setTreatment([...treatment, newfieldTreatment]);
  };

  const removeTreatmentFields = (id, index) => {
    let dataTreatment = [...treatment];

    dataTreatment.splice(index, 1);

    setTreatment(dataTreatment);
    
    if(dataStatusTreatment === "update"){
      setTempTreatment(dataTreatment);
      onDeleteRecordTreatment(id);
    }
  };

  const handleTreatmentChange = (index, event) => {
    let dataTreatment = [...treatment];

    if (event.name === "id_daftar_tindakan"){
        dataTreatment[index][event.name] = event.value;
    } else {
        dataTreatment[index][event.target.name] = event.target.value;
    }

    setTreatment(dataTreatment);
  };

  const [service, setService] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }
  ]);

  const [tempService, setTempService] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }
  ]);

  const addServiceFields = () => {
    let newfieldService = { id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }
    setService([...service, newfieldService]);
  };

  const removeServiceFields = (id, index) => {
    let dataService = [...service];

    dataService.splice(index, 1);

    setService(dataService);

    if(dataStatusService === "update"){
      setTempService(dataService);
      onDeleteRecordService(id);
    }
  };

  const handleServiceChange = (index, event) => {
    let dataService = [...service];

    if (event.name === "id_daftar_layanan"){
        dataService[index][event.name] = event.value;
    } else {
        dataService[index][event.target.name] = event.target.value;
    }

    setService(dataService);
  };

  const [reference, setReference] = useState(
    { id: '', id_kunjungan: recordID, id_poli: "", id_rs: "", anamnesis: "", terapi: "", catatan: "" }
  );
  
  const [diagnoseReference, setDiagnoseReference] = useState([
    { id: '', id_rujukan: referenceID, id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);

  const [tempDiagnoseReference, setTempDiagnoseReference] = useState([
    { id: '', id_rujukan: referenceID, id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);

  const addDiagnoseReferenceFields = () => {
    let newfieldDiagnoseReference = { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnoseReference([...diagnoseReference, newfieldDiagnoseReference]);
  };

  const removeDiagnoseReferenceFields = (id, index) => {
    let dataDiagnoseReference = [...diagnoseReference];

    dataDiagnoseReference.splice(index, 1);

    setDiagnoseReference(dataDiagnoseReference);

    if(dataStatusDiagnoseReference === "update"){
      setTempDiagnoseReference(dataDiagnoseReference);
      onDeleteDiagnoseReference(id);
    }
  };

  let wd_rujukan = false; let dd_rujukan = false;

  const handleDiagnoseReferenceChange = (index, event) => {
    let dataDiagnoseReference = [...diagnoseReference];

    if (event.name === "id_penyakit"){
      dataDiagnoseReference[index][event.name] = event.value;
    } else if(event.target.name === "tipe_diagnosis_rujukan") {

      if(event.target.id === 'tipe_wd_rujukan' && event.target.checked === true) {
        wd_rujukan = true;
      } else if(event.target.id === 'tipe_wd_rujukan' && event.target.checked === false) {
        wd_rujukan = false;
      }
      
      if(event.target.id === 'tipe_dd_rujukan' && event.target.checked === true) {
        dd_rujukan = true;
      } else if(event.target.id === 'tipe_dd_rujukan' && event.target.checked === false) {
        dd_rujukan = false;
      }

      if(dataDiagnoseReference[index]['id_penyakit'] === '') {
        wd_rujukan = false; dd_rujukan = false;
      }

      dataDiagnoseReference[index]['tipe_wd'] = wd_rujukan;
      dataDiagnoseReference[index]['tipe_dd'] = dd_rujukan;
    }

    setDiagnoseReference(dataDiagnoseReference);
  };

  const handleReferenceChange = (e) => {
    // console.log('handleReferenceChange', e);

    if (e.name === 'id_poli') {
      setReference(current => {
          return { ...current, id_poli: e.value }
      })
    } else if (e.name === 'id_rs') {
      setReference(current => {
          return { ...current, id_rs: e.value }
      })
    } else {
      setReference(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    // console.log('reference', reference);
  };

  const onRecordSubmit = async (e) => {
    e.preventDefault();

    setRecordSubmit("process");
    record.id_vs = vitalSignsID;
    record.id_pasien = patientID;
    record.id_jaga = watchID;

    for(let [key, value] of Object.entries(record)) {
      if((key === 'status_pulang' && value === '')){
        validate(e, key, value);
        return;
      }
    }

    let isError = false;

    for(let [key, value] of Object.entries(diagnosis)) {
      if((key === 'id_penyakit' && value === '')){
        validate(e, key, value);
        isError = true;
        // return;
      }
      
      if((key === 'wd' && value === '')){
        validate(e, key, value);
        isError = true;
        // return;
      }
      
      if((key === 'dd' && value === '')){
        validate(e, key, value);
        isError = true;
        // return;
      }
    }

    if(isError === true) {
      return;
    }

    // console.log(record);
    if(dataStatusRecord === 'add') {
      try {
        const response = await recordAPI.add(record);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah rekam medis sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // setRecordID(data.id);
          recordID = data.id;
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah rekam medis gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if(dataStatusRecord === 'update' && recordID) {
      try {
        const response = await recordAPI.update(record, recordID);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Ubah rekam medis sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });

          // setRecordID(recordID);
          recordID = recordID;
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah rekam medis gagal: ${response.message}`,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else {
      console.log('dataStatusRecord undefined');
    }

    setRecordSubmit("done");

    // setTimeout(() => {
      // console.log('recordSubmit', recordSubmit);
      // console.log('recordID', recordID);

      // if (recordID) {
        if(reference.id_poli !== "" && recordID) {
          // console.log('reference', reference);
          onReferenceSubmit();
        }
      // }
    // }, 1000);
  };

  const onDiagnosisSubmit = async (e) => {
    // e.preventDefault();

    let isError = false;

    for(let [key, value] of Object.entries(diagnosis)) {
      if((key === 'id_penyakit' && value === '') || (key === 'wd' && value === '') || (key === 'dd' && value === '')){
        validate(e, key, value);
        isError = true;
        // return;
      }
    }

    if(isError === true) {
      return;
    }

    for (var i = 0; i < diagnosis.length; i++) {
      diagnosis[i].id_kunjungan = recordID;

      if(diagnosis[i].id !== '' && diagnosis[i].id_penyakit !== tempDiagnosis[i].id_penyakit ||
          diagnosis[i].id !== '' && diagnosis[i].tipe_wd !== tempDiagnosis[i].tipe_wd ||
          diagnosis[i].id !== '' && diagnosis[i].tipe_dd !== tempDiagnosis[i].tipe_dd) {
        onDiagnoseEdit(diagnosis[i]);
      } else if(diagnosis[i].id === '') {
        onDiagnoseAdd(diagnosis[i]);
      }
    }
  };

  const onDiagnoseAdd = async (diagnosis) => {
    try {
      const response = await diagnoseAPI.add(diagnosis);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah diagnosa rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah diagnosa rekam medis gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onDiagnoseEdit = async (diagnosis) => {
    try {
      const response = await diagnoseAPI.update(diagnosis, diagnosis.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah diagnosa rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah diagnosa rekam medis gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const onRecieptSubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < reciept.length; i++) {
      reciept[i].id_kunjungan = recordID;

      if(reciept[i].id !== '' && reciept[i].id_obat !== tempReciept[i].id_obat ||
          reciept[i].id !== '' && reciept[i].jumlah !== tempReciept[i].jumlah ||
          reciept[i].id !== '' && reciept[i].satuan !== tempReciept[i].satuan ||
          reciept[i].id !== '' && reciept[i].frekuensi !== tempReciept[i].frekuensi ||
          reciept[i].id !== '' && reciept[i].periode !== tempReciept[i].periode ||
          reciept[i].id !== '' && reciept[i].aturan_pakai !== tempReciept[i].aturan_pakai ||
          reciept[i].id !== '' && reciept[i].metode_konsumsi !== tempReciept[i].metode_konsumsi) {
        onRecieptEdit(reciept[i]);
      } else if(reciept[i].id === '') {
        onRecieptAdd(reciept[i]);
      }
    }
  };

  const onRecieptAdd = async (reciept) => {
    try {
      const response = await recieptAPI.add(reciept);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah resep rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah resep rekam medis gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onRecieptEdit = async (reciept) => {
    try {
      const response = await recieptAPI.update(reciept, reciept.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah resep rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah resep rekam medis gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const onCheckupSubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < checkup.length; i++) {
      checkup[i].id_kunjungan = recordID;

      if(checkup[i].id !== '' && checkup[i].id_lab !== tempCheckup[i].id_lab ||
          checkup[i].id !== '' && checkup[i].id_pemeriksaan !== tempCheckup[i].id_pemeriksaan) {
        onCheckupEdit(checkup[i]);
      } else if(checkup[i].id === '') {
        onCheckupAdd(checkup[i]);
      }
    }
  };

  const onCheckupAdd = async (checkup) => {
    try {
      const response = await inspectSupportAPI.add(checkup);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah pemeriksaan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah pemeriksaan rekam medis gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onCheckupEdit = async (checkup) => {
    try {
      const response = await inspectSupportAPI.update(checkup, checkup.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah pemeriksaan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah pemeriksaan rekam medis gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const onTreatmentSubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < treatment.length; i++) {
      treatment[i].id_kunjungan = recordID;

      if(treatment[i].id !== '' && treatment[i].id_daftar_tindakan !== tempTreatment[i].id_daftar_tindakan ||
        treatment[i].id !== '' && treatment[i].catatan !== tempTreatment[i].catatan) {
        onTreatmentEdit(treatment[i]);
      } else if(treatment[i].id === '') {
        onTreatmentAdd(treatment[i]);
      }
    }
  };

  const onTreatmentAdd = async (treatment) => {
    try {
      const response = await treatmentAPI.add(treatment);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah tindakan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah tindakan rekam medis gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onTreatmentEdit = async (treatment) => {
    try {
      const response = await treatmentAPI.update(treatment, treatment.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah tindakan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah tindakan rekam medis gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const onServiceSubmit = async (e) => {
    // e.preventDefault();

    for (var i = 0; i < service.length; i++) {
      service[i].id_kunjungan = recordID;

      if(service[i].id !== '' && service[i].id_daftar_layanan !== tempService[i].id_daftar_layanan ||
        service[i].id !== '' && service[i].catatan !== tempService[i].catatan) {
        onServiceEdit(service[i]);
      } else if(service[i].id === '') {
        onServiceAdd(service[i]);
      }
    }
  };

  const onServiceAdd = async (service) => {
    try {
      const response = await serviceAPI.add(service);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah layanan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah layanan rekam medis gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onServiceEdit = async (service) => {
    try {
      const response = await serviceAPI.update(service, service.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah layanan rekam medis sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah layanan rekam medis gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const onReferenceSubmit = async (e) => {
    // e.preventDefault();

    setReferenceSubmit("process");
    reference.id_kunjungan = recordID;

    // console.log(reference);
    if(dataStatusReference === 'add') {
      try {
        const response = await referenceAPI.add(reference);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          setReferenceID(data.id);

          // Swal.fire({
          //   title: "Sukses!",
          //   html: `Tambah rujukan sukses`,
          //   icon: "success",
          //   confirmButtonColor: "#008ecc",
          // });
          
          if(diagnoseReference.length > 0){
            onDiagnoseReferenceSubmit(data.id);
          }
        } else {
          // Swal.fire({
          //   title: "Gagal!",
          //   html: `Tambah rujukan gagal: ${response.message}`,
          //   icon: "error",
          //   confirmButtonColor: "#008ecc",
          //   confirmButtonText: "Coba lagi",
          // });

          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else if(dataStatusReference === 'update') {
      try {
        const response = await referenceAPI.update(reference, reference.id);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          setReferenceID(reference.id);

          // Swal.fire({
          //   title: "Sukses!",
          //   html: `Ubah rujukan sukses`,
          //   icon: "success",
          //   confirmButtonColor: "#008ecc",
          // });
          
          if(diagnoseReference.length > 0){
            onDiagnoseReferenceSubmit(reference.id);
          }
        } else {
          // Swal.fire({
          //   title: "Gagal!",
          //   html: `Ubah rujukan gagal: ${response.message}`,
          //   icon: "error",
          //   confirmButtonColor: "#008ecc",
          //   confirmButtonText: "Coba lagi",
          // });

          throw Error(`Error status: ${response.status}`);
        }
      } catch (e) {
        Swal.fire({
          title: "Gagal!",
          html: e,
          icon: "error",
          confirmButtonColor: "#008ecc",
          confirmButtonText: "Coba lagi",
        });

        console.log(e);
      }
    } else {
      console.log('dataStatusRecord undefined')
    }
    
    // setTimeout(() => {
      // console.log('referenceSubmit', referenceSubmit);
      // console.log('referenceID', referenceID);

      // if (referenceID) {
        // setTimeout(() => {
          // if(diagnoseReference.length > 0 && referenceID) {
            // console.log('diagnoseReference', diagnoseReference);
            // onDiagnoseReferenceSubmit();
          // }
        // }, 2000)
      // }
    // }, 1000);

    setReferenceSubmit("done");
    setRecordSubmit("idle");
  };

  const onDiagnoseReferenceSubmit = async (id_rujukan) => {
    // e.preventDefault();

    for (var i = 0; i < diagnoseReference.length; i++) {
      diagnoseReference[i].id_rujukan = id_rujukan;

      if(diagnoseReference[i].id !== '' && diagnoseReference[i].id_penyakit !== tempDiagnoseReference[i].id_penyakit ||
        diagnoseReference[i].id !== '' && diagnoseReference[i].tipe_wd !== tempDiagnoseReference[i].tipe_wd ||
        diagnoseReference[i].id !== '' && diagnoseReference[i].tipe_dd !== tempDiagnoseReference[i].tipe_dd) {
        onDiagnosisReferenceEdit(diagnoseReference[i]);
      } else if(diagnoseReference[i].id === '') {
        onDiagnosisReferenceAdd(diagnoseReference[i]);
      }
    }
  };

  const onDiagnosisReferenceAdd = async (diagnoseReference) => {
    try {
      const response = await diagnoseReferenceAPI.add(diagnoseReference);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Tambah diagnosa rujukan sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Tambah diagnosa rujukan gagal: ${response.message}`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  } 

  const onDiagnosisReferenceEdit = async (diagnoseReference) => {
    try {
      const response = await diagnoseReferenceAPI.update(diagnoseReference, diagnoseReference.id);
      // console.log(response);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        // Swal.fire({
        //   title: "Sukses!",
        //   html: `Ubah diagnosa rujukan sukses`,
        //   icon: "success",
        //   confirmButtonColor: "#008ecc",
        // });
      } else {
        // Swal.fire({
        //   title: "Gagal!",
        //   html: `Ubah diagnosa rujukan gagal`,
        //   icon: "error",
        //   confirmButtonColor: "#008ecc",
        //   confirmButtonText: "Coba lagi",
        // });

        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      Swal.fire({
        title: "Gagal!",
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  }

  const resetForm = (e) => {
    // e.preventDefault();

    setRecord({
      id_jaga: watchID,
      id_vs: vitalSignsID,
      id_pasien: patientID,
      waktu_mulai: startDateTime,
      // waktu_selesai: endDateTime,
      tipe: '',
      anamnesis: '',
      pemeriksaan_fisik: '',
      prognosa: '',
      kasus_kll: false,
      status_pulang: '',
      keluhan: '',
      catatan_tambahan: ''
    });
    
    setIsChecked(false);

    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
    onLoadLayanan();
    onLoadPoliRujukan();
    onLoadRSRujukan();
  };

  const [selectDisease, setSelectDisease] = useState([{ label: "Pilih Penyakit" , value: "", key: 0, name: 'id_penyakit' }]);

  const onLoadPenyakit = async () => {
    try {
      const response = await diseaseAPI.getAll();
      // console.log(response);

      // currentPage === 1 && setSelectDisease([{ label: "Pilih Penyakit" , value: "", key: 0, name: 'id_penyakit' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          // setSelectDisease((current) => [
          //   ...current,
          //   { label: data[i].kode_icd10 + " - " + data[i].nama_penyakit  , value: data[i].id, key: data[i].id, name: 'id_penyakit' },
          // ]);

          selectDisease.push({ label: data[i].kode_icd10 + " - " + data[i].nama_penyakit  , value: data[i].id, key: data[i].id, name: 'id_penyakit' });
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectMedicine, setSelectMedicine] = useState([]);

  const onLoadObat = async () => {
    try {
      const response = await medicineAPI.get("?limit=1000");
      // console.log(response);

      setSelectMedicine([{ label: "Pilih Obat" , value: "", key: 0, name: 'id_obat' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectMedicine((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_obat' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectLab, setSelectLab] = useState([]);
  const [selectLabTreatment, setSelectLabTreatment] = useState([]);

  const onLoadLab = async () => {
    try {
      const response = await labAPI.get("?limit=1000");
      // console.log(response);

      setSelectLab([{ label: "Pilih Laboratorium" , value: "", key: 0, name: 'id_lab' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectLab((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_lab' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadPemeriksaanByLayananLab = async (index, id_lab, kategori) => {
    try {
      const response = await labTreatmentAPI.get(`?limit=1000&searchLaboratorium=${id_lab}&searchKategori=${kategori}`);
      // console.log(response);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          selectInspectByLabTreatmentArray.push({
            label: data[i].nama_pemeriksaan, value: data[i].id_pemeriksaan, key: data[i].id_pemeriksaan, name: 'id_pemeriksaan'
          });
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if(selectLabTreatment[index] !== undefined) {
        selectLabTreatment[index].push({ 
          label: kategori,
          options: selectInspectByLabTreatmentArray
        });
      }

      selectLabTreatmentArray[index].push({ 
        label: kategori,
        options: selectInspectByLabTreatmentArray
      });

      selectInspectByLabTreatmentArray = [];
    }
  };

  const changeLayananLab = async (index, id_lab) => {
    selectLabTreatment[index] = [];
    selectLabTreatmentArray[index] = [];
    selectInspectByLabTreatmentArray = [];

    try {
      const response = await labTreatmentAPI.getDistinct("", `?limit=1000&searchLaboratorium=${id_lab}`);
      // console.log(response);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          onLoadPemeriksaanByLayananLab(index, id_lab, data[i].kategori);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectTreatment, setSelectTreatment] = useState([]);

  const onLoadTindakan = async () => {
    try {
      const response = await treatmentListAPI.get("?limit=1000");
      // console.log(response);

      setSelectTreatment([{ label: "Pilih Tindakan" , value: "", key: 0, name: 'id_daftar_tindakan' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectTreatment((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_daftar_tindakan' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectService, setSelectService] = useState([]);

  const onLoadLayanan = async () => {
    try {
      const response = await serviceListAPI.get("?limit=1000");
      // console.log(response);

      setSelectService([{ label: "Pilih Layanan" , value: "", key: 0, name: 'id_daftar_layanan' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectService((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_daftar_layanan' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectDivisionReference, setSelectDivisionReference] = useState([]);

  const onLoadPoliRujukan = async () => {
    try {
      const response = await divisionReferenceAPI.get("?limit=1000");
      // console.log(response);

      setSelectDivisionReference([{ label: "Pilih Poli / Divisi" , value: "", key: 0, name: 'id_poli' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectDivisionReference((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_poli' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [selectHospitalReference, setSelectHospitalReference] = useState([]);

  const onLoadRSRujukan = async () => {
    try {
      const response = await hospitalReferenceAPI.get("?limit=1000");
      // console.log(response);

      setSelectHospitalReference([{ label: "Pilih Rumah Sakit" , value: "", key: 0, name: 'id_rs' }]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectHospitalReference((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_rs' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const getVitalSignsByPatientId = async (id, data) => {
    setVitalSigns({
      id_pasien: patientID,
      keluhan: '-',
      kesadaran: '-',
      temperatur: 0,
      tinggi_badan: 0,
      berat_badan: 0,
      lingkar_perut: 0,
      imt: 0,
      sistole: 0,
      diastole: 0,
      respiratory_rate: 0,
      heart_rate: 0,
      catatan_tambahan: '-',
      created_at: ''
    });

    // console.log('patientID', patientID);
    // console.log('patientData', patientData);

    try {
      const res = await vitalSignsAPI.getByPatient("", `/${id}?tanggal=${moment(new Date()).format("YYYY-MM-DD")}`);
      // const res = await vitalSignsAPI.getByPatient("", `/${id}`);
      let data = res.data.data[0];
      // console.log('vitalSigns', data);

      setVitalSigns({
        id_pasien: data.id_pasien,
        keluhan: data.keluhan,
        kesadaran: data.kesadaran,
        temperatur: data.temperatur,
        tinggi_badan: data.tinggi_badan,
        berat_badan: data.berat_badan,
        lingkar_perut: data.lingkar_perut,
        imt: data.imt,
        sistole: data.sistole,
        diastole: data.diastole,
        respiratory_rate: data.respiratory_rate,
        heart_rate: data.heart_rate,
        catatan_tambahan: data.catatan_tambahan,
        created_at: data.created_at
      });

      setVitalSignsID(data.id);

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);
    }
  };

  const getRecordByPatientId = async (id) => {
    setDataStatusRecord("update");

    let data = null;

    try {
      const res = await recordAPI.getByPatient("", `/${id}`);
      data = res.data.data[0];

      // console.log(data);

      setRecord({
        id_jaga: data.id_jaga,
        id_vs: vitalSignsID,
        id_pasien: patientID,
        waktu_mulai: data.waktu_mulai,
        waktu_selesai: data.waktu_selesai,
        tipe: data.tipe,
        anamnesis: data.anamnesis,
        pemeriksaan_fisik: data.pemeriksaan_fisik,
        prognosa: data.prognosa,
        kasus_kll: data.kasus_kll,
        status_pulang: data.status_pulang,
        keluhan: data.keluhan,
        catatan_tambahan: data.catatan_tambahan ? data.catatan_tambahan : "",
      });

      // setRecordID(data.id);
      recordID = data.id;

      if (data.kasus_kll === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }

      // console.log(record);
    } catch (e) {
      console.log(e);
    } finally {
      if(recordID && recordSubmit === ""){
        getDiagnoseByRecordId(recordID);
        getRecieptByRecordId(recordID);
        getCheckupByRecordId(recordID);
        getTreatmentByRecordId(recordID);
        getServiceByRecordId(recordID);
        getReferenceByRecordId(recordID);
      }
    }

    // console.log(dataStatusRecord);
  };

  const getRecordById = async (id) => {
    setDataStatusRecord("update");  

    let data = null;

    try {
      const res = await recordAPI.get(`/${id}`);
      data = res.data.data[0];

      // console.log(data);

      setRecord({
        id_jaga: data.id_jaga,
        id_vs: vitalSignsID,
        id_pasien: patientID,
        waktu_mulai: data.waktu_mulai,
        waktu_selesai: data.waktu_selesai,
        tipe: data.tipe,
        anamnesis: data.anamnesis,
        pemeriksaan_fisik: data.pemeriksaan_fisik,
        prognosa: data.prognosa,
        kasus_kll: data.kasus_kll,
        status_pulang: data.status_pulang,
        keluhan: data.keluhan,
        catatan_tambahan: data.catatan_tambahan ? data.catatan_tambahan : "",
      });

      if (data.kasus_kll === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }

      // console.log(record);
    } catch (e) {
      console.log(e);
    } finally {
      if(recordID && recordSubmit === ""){
        getDiagnoseByRecordId(recordID);
        getRecieptByRecordId(recordID);
        getCheckupByRecordId(recordID);
        getTreatmentByRecordId(recordID);
        getServiceByRecordId(recordID);
        getReferenceByRecordId(recordID);
      }
    }

    // console.log(dataStatusRecord);
  };

  const getDiagnoseByRecordId = async (id) => {
    setDiagnosis([]);
    setTempDiagnosis([]);

    try {
      const res = await diagnoseAPI.getByRecord("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setDiagnosis((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_penyakit: data.id_penyakit, tipe_wd: data.tipe_wd, tipe_dd: data.tipe_dd }
          ]);

          setTempDiagnosis((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_penyakit: data.id_penyakit, tipe_wd: data.tipe_wd, tipe_dd: data.tipe_dd }
          ]);
        })
      }

      setDataStatusDiagnose("update");
    } catch (e) {
      console.log(e);

      setDiagnosis([{ id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false }]);
      setTempDiagnosis([{ id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false }]);

      setDataStatusDiagnose("add");
    }
  };

  const getRecieptByRecordId = async (id) => {
    setReciept([]);
    setTempReciept([]);

    try {
      const res = await recieptAPI.getByRecord("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setReciept((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_obat: data.id_obat, jumlah: data.jumlah, satuan: data.satuan,
                          frekuensi: data.frekuensi, periode: data.periode, aturan_pakai: data.aturan_pakai, metode_konsumsi: data.metode_konsumsi }
          ]);

          setTempReciept((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_obat: data.id_obat, jumlah: data.jumlah, satuan: data.satuan,
                          frekuensi: data.frekuensi, periode: data.periode, aturan_pakai: data.aturan_pakai, metode_konsumsi: data.metode_konsumsi }
          ]);
        })
      }

      setDataStatusReciept("update");
    } catch (e) {
      console.log(e);

      setReciept([{ id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }]);
      setTempReciept([{ id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }]);

      setDataStatusReciept("add");
    }
  };

  const getCheckupByRecordId = async (id) => {
    setCheckup([]);
    setTempCheckup([]);

    try {
      const res = await inspectSupportAPI.getByRecord("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setCheckup((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_lab: data.id_lab, id_pemeriksaan: data.id_pemeriksaan }
          ]);
          changeLayananLab(index, data.id_lab);

          setTempCheckup((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_lab: data.id_lab, id_pemeriksaan: data.id_pemeriksaan }
          ]);
        })
      }

      setDataStatusCheckup("update");
    } catch (e) {
      console.log(e);

      setCheckup([{ id: '', id_kunjungan: recordID, id_lab: "", id_pemeriksaan: "" }]);
      setTempCheckup([{ id: '', id_kunjungan: recordID, id_lab: "", id_pemeriksaan: "" }]);

      setDataStatusCheckup("add");
    }
  };

  const getTreatmentByRecordId = async (id) => {
    setTreatment([]);
    setTempTreatment([]);

    try {
      const res = await treatmentAPI.getByRecord("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setTreatment((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_daftar_tindakan: data.id_daftar_tindakan, catatan: data.catatan ? data.catatan : "" }
          ]);

          setTempTreatment((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_daftar_tindakan: data.id_daftar_tindakan, catatan: data.catatan ? data.catatan : "" }
          ]);
        })
      }

      setDataStatusTreatment("update");
    } catch (e) {
      console.log(e);

      setTreatment([{ id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }]);
      setTempTreatment([{ id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }]);

      setDataStatusTreatment("add");
    }
  };

  const getServiceByRecordId = async (id) => {
    setService([]);
    setTempService([]);

    try {
      const res = await serviceAPI.getByRecord("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setService((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_daftar_layanan: data.id_daftar_layanan, catatan: data.catatan ? data.catatan : "" }
          ]);

          setTempService((current) => [
            ...current, { id: data.id, id_kunjungan: data.id_kunjungan, id_daftar_layanan: data.id_daftar_layanan, catatan: data.catatan ? data.catatan : "" }
          ]);
        })
      }

      setDataStatusService("update");
    } catch (e) {
      console.log(e);

      setService([{ id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }]);
      setTempService([{ id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }]);

      setDataStatusService("add");
    }
  };

  const getReferenceByRecordId = async (id) => {
    setDataStatusReference("update");

    let data = null;

    try {
      const res = await referenceAPI.getByRecord("", `/${id}`);
      data = res.data.data[0];

      // console.log(data);

      setReferenceID(data.id);

      setReference({
        id: data.id,
        id_kunjungan: data.id_kunjungan,
        id_poli: data.id_poli,
        id_rs: data.id_rs,
        anamnesis: data.anamnesis,
        terapi: data.terapi,
        catatan: data.catatan ? data.catatan : ""
      });

      // console.log(record);
    } catch (e) {
      console.log(e);
    } finally {
      data && getDiagnoseReferenceByReferenceId(data.id);
    }

    // console.log(dataStatusRecord);
  };

  const getDiagnoseReferenceByReferenceId = async (id) => {
    setDiagnoseReference([]);
    setTempDiagnoseReference([]);

    try {
      const res = await diagnoseReferenceAPI.getByReference("", `/${id}`);
      let data = res.data.data;
      // console.log('data', data);

      if(data) {
        data.map((data, index) => {
          setDiagnoseReference((current) => [
            ...current, { id: data.id, id_rujukan: data.id_rujukan, id_penyakit: data.id_penyakit, tipe_wd: data.tipe_wd, tipe_dd: data.tipe_dd }
          ]);

          setTempDiagnoseReference((current) => [
            ...current, { id: data.id, id_rujukan: data.id_rujukan, id_penyakit: data.id_penyakit, tipe_wd: data.tipe_wd, tipe_dd: data.tipe_dd }
          ]);
        })
      }

      setDataStatusDiagnoseReference("update");
    } catch (e) {
      console.log(e);

      setDiagnoseReference([{ id: '', id_rujukan: referenceID, id_penyakit: "", tipe_wd: false, tipe_dd: false }]);
      setTempDiagnoseReference([{ id: '', id_rujukan: "", id_penyakit: referenceID, tipe_wd: false, tipe_dd: false }]);

      setDataStatusDiagnoseReference("add");
    }
  };

  useEffect(() => {
    if (location.state) {
      // setPatientID(location.state.patientID);
      // setPatientData(location.state.patientData);
      // setWatchID(location.state.watchID);
  
      // if (location.state.recordID) {
      //   setRecordID(location.state.recordID);
      // }

      patientID = location.state.patientID;
      patientData = location.state.patientData;
      watchID = location.state.watchID;

      if (location.state.recordID) {
        recordID = location.state.recordID;
      }

      // console.log('recordID', recordID);
      // console.log('patientID', patientID);
      // console.log('patientData', patientData);
      // console.log('watchID', watchID);
    } else {
      Swal.fire({
          title: "Gagal!",
          html: `Data pasien tidak ditemukan`,
          icon: "error",
          confirmButtonColor: "#008ecc",
      });
  
      history.push({
        pathname: "/record",
        state: { patientID: patientID, patientData: patientData }
      });
    }

    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
    onLoadLayanan();
    onLoadPoliRujukan();
    onLoadRSRujukan();

    getVitalSignsByPatientId(patientID, patientData);
    // getRecordByPatientId(patientID);
    if (recordID) {
      getRecordById(recordID);
    }
  }, [ ]);

  useEffect(() => {
    if (recordSubmit === "done" && recordID) {
      setTimeout(() => {

        if(diagnosis.length > 0 && recordID) {
          // console.log('diagnosis', diagnosis);
          onDiagnosisSubmit();
        }
        
        if(reciept.length > 0 && recordID) {
          // console.log('reciept', reciept);
          onRecieptSubmit();
        }

        if(checkup.length > 0 && recordID) {
          // console.log('checkup', checkup);
          onCheckupSubmit();
        }
        
        if(treatment.length > 0 && recordID) {
          // console.log('treatment', treatment);
          onTreatmentSubmit();
        }
        
        if(service.length > 0 && recordID) {
          // console.log('service', service);
          onServiceSubmit();
        }

        setTimeout(() => {
          // if (recordSubmit === "idle") {
            // resetForm();
            history.push("/record", patientID);
          // }
        }, 5000);
      }, 3000);
    }
  }, [ recordSubmit ]);

  useEffect(() => {
    if(dataStatusCheckup === "update" && checkup[0].id !== ''){
      let dataCheckup = [...checkup];

      for (var i = 0; i < dataCheckup.length; i++) {
        dataCheckup[i]['id_pemeriksaan'] = checkup[i].id_pemeriksaan;
      }

      setTimeout(() => {
        setCheckup(dataCheckup);
      }, 5000);
    }
  }, [ dataStatusCheckup ]);

  const onDeleteRecordDiagnose = async (id) => {
    try {
      const response = await diagnoseAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus diagnosis rekam medis sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus diagnosis rekam medis gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onDeleteRecordReciept = async (id) => {
    try {
      const response = await recieptAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus resep rekam medis sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus resep rekam medis gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onDeleteRecordCheckup = async (id) => {
    try {
      const response = await inspectSupportAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus pemeriksaan rekam medis sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus pemeriksaan rekam medis gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onDeleteRecordTreatment = async (id) => {
    try {
      const response = await treatmentAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus tindakan rekam medis sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus tindakan rekam medis gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onDeleteRecordService = async (id) => {
    try {
      const response = await serviceAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus layanan rekam medis sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus layanan rekam medis gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const onDeleteDiagnoseReference = async (id) => {
    try {
      const response = await diagnoseReferenceAPI.delete(id);

      if (response.status == 200) {
        let data = await response.data.data;
        // console.log(data);

        Swal.fire({
          title: "Sukses!",
          html: `Hapus diagnosa rujukan sukses`,
          icon: "success",
          confirmButtonColor: "#008ecc",
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          html: `Hapus diagnosa rujukan gagal: ${response.message}`,
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
        html: e,
        icon: "error",
        confirmButtonColor: "#008ecc",
        confirmButtonText: "Coba lagi",
      });

      console.log(e);
    }
  };

  const options = selectDisease;

  const sleep = (ms = number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, ms);
  });

  const loadOptions = async (search, prevOptions) => {
    await sleep(1000);
  
    let filteredOptions = [{value: 0, label: ''}];
    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = options.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 10
    );
  
    return {
      options: slicedOptions,
      hasMore
    };
  };

  return (
    <>
      <Row>
          <Colxx sm="12" md="12" xl="4" className="mb-4">
          <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <Row>
                    <Colxx sm="6" md="6" xl="6">
                      { patientData ? patientData.nama_lengkap : 'Pasien' }<br/>
                      <Label>{ patientData ? `${patientData.jenis_kelamin}, ${new Date().getFullYear() - patientData.tanggal_lahir.substring(0,4)} tahun`  : 'Jenis Kelamin, Umur' }</Label><br/>
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-microscope"></i>
                      </Badge>
                      {' '}
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-ambulance"></i>
                      </Badge>
                      {' '}
                      <Badge color="dark" pill className="mt-2 patient-badge">
                        <i className="iconsminds-atom"></i>
                      </Badge>
                      {' '}
                    </Colxx>
                    <Colxx sm="6" md="6" xl="6">
                      <Label style={{ float: 'right', lineHeight: 2 }}>
                        { vitalSigns.id_pasien && vitalSigns.created_at ? moment(vitalSigns.created_at).format("DD MMM YYYY - HH:mm") : 'Tanggal / Waktu' }
                      </Label><br/>
                    </Colxx>
                  </Row>
                </CardTitle>
                <Table bordered>
                  <tbody>
                    <tr>
                      <th>Keluhan</th>
                      <td style={{ width: '65%' }}>{ vitalSigns.id_pasien ? vitalSigns.keluhan : '-' }</td>
                    </tr>
                    <tr>
                      <th>Kesadaran</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.kesadaran : '-' }</td>
                    </tr>
                    <tr>
                      <th>Temperatur</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.temperatur : '0' } <sup>0</sup>C</td>
                    </tr>
                    <tr>
                      <th>Tinggi Badan</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.tinggi_badan : '0' } cm</td>
                    </tr>
                    <tr>
                      <th>Berat Badan</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.berat_badan : '0' } kg</td>
                    </tr>
                    <tr>
                      <th>Lingkar Perut</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.lingkar_perut : '0' } cm</td>
                    </tr>
                    <tr>
                      <th>Tekanan Darah</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.sistole : '0' } mmHg / { vitalSigns ? vitalSigns.diastole : '0' } mmHg</td>
                    </tr>
                    <tr>
                      <th>IMT</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.imt : '0' } kg/m<sup>2</sup></td>
                    </tr>
                    <tr>
                      <th>Tingkat Pernapasan</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.respiratory_rate : '0' } / menit</td>
                    </tr>
                    <tr>
                      <th>Detak Jantung</th>
                      <td>{ vitalSigns.id_pasien ? vitalSigns.heart_rate : '0' } bpm</td>
                    </tr>
                    <tr>
                      <th>Catatan Tambahan</th>
                      <td style={{ width: '65%' }}>{ vitalSigns.id_pasien ? vitalSigns.catatan_tambahan : '-' }</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx sm="12" md="12" xl="8" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                    Form Registrasi Rekam Medis
                    {/* <span style={{ fontWeight: 'bold' }}>{patientData.nama_lengkap}</span> */}
                </CardTitle>
                <Form className="av-tooltip tooltip-right-top" onSubmit={onRecordSubmit}>
                  <FormGroup row>
                    <Colxx sm={6}>
                        <FormGroup>
                            <Label for="tipe">
                              Tipe Rekam Medis
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="tipe"
                              value={selectType.find(item => item.value === record.tipe) || ''}
                              options={selectType}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={5}>
                        <FormGroup>
                            <Label>
                              Kasus Kecelakaan Lalu Lintas
                            </Label>
                            <CustomInput
                              checked={isChecked}
                              type="checkbox"
                              name="kasus_kll"
                              id="kasus_kll"
                              label="Kecelakaan Lalu Lintas"
                              value={record.kasus_kll}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={11}>
                        <FormGroup>
                            <Label for="keluhan">
                              Keluhan
                            </Label>
                            <Input
                              type="textarea"
                              name="keluhan"
                              id="keluhan"
                              placeholder="Keluhan"
                              style={{minHeight: '250px'}}
                              value={record.keluhan}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                        <FormGroup>
                            <Label for="anamnesis">
                              Anamnesis
                            </Label>
                            <Input
                              type="textarea"
                              name="anamnesis"
                              id="anamnesis"
                              placeholder="Anamnesis"
                              style={{minHeight: '250px'}}
                              value={record.anamnesis}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={5}>
                        <FormGroup>
                            <Label for="pemeriksaan_fisik">
                              Pemeriksaan Fisik
                            </Label>
                            <Input
                              type="textarea"
                              name="pemeriksaan_fisik"
                              id="pemeriksaan_fisik"
                              placeholder="Pemeriksaan Fisik"
                              style={{minHeight: '250px'}}
                              value={record.pemeriksaan_fisik}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                        <FormGroup>
                            <Label for="prognosa">
                              Prognosa
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="prognosa"
                              value={selectPrognosa.find(item => item.value === record.prognosa) || ''}
                              options={selectPrognosa}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={5}>
                        <FormGroup>
                            <Label for="status_pulang">
                              Status Pulang<span className="required text-danger" aria-required="true"> *</span>
                            </Label>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="status_pulang"
                              value={selectVisitation.find(item => item.value === record.status_pulang) || ''}
                              options={selectVisitation}
                              // required
                              onChange={onChange}
                            />
                            {errors.status_pulang && (
                              <div className="rounded invalid-feedback d-block">
                                {errors.status_pulang}
                              </div>
                            )}
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <CardTitle className="my-4">
                      Diagnosis
                  </CardTitle>

                  <FormGroup row>
                    {diagnosis.map((input, index) => {
                        return (
                          <React.Fragment key={index}>
                              <Colxx sm={6}>
                                  <FormGroup>
                                      <Label for="id_penyakit">
                                          Penyakit
                                          <span
                                            className="required text-danger"
                                            aria-required="true"
                                            >
                                            {" "}
                                            *
                                          </span>
                                      </Label>
                                      {/* <Select
                                          components={{ Input: CustomSelectInput }}
                                          className="react-select"
                                          classNamePrefix="react-select"
                                          name="id_penyakit"
                                          value={selectDisease.find(item => item.value === diagnosis[index].id_penyakit) || ''}
                                          options={selectDisease}
                                          onChange={(event) => handleDiagnosisChange(index, event)}
                                          cacheOptions
                                      /> */}
                                      <AsyncPaginate
                                        loadOptions={loadOptions}
                                        additional={{
                                          page: 1,
                                        }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="id_penyakit"
                                        value={selectDisease.find(item => item.value === diagnosis[index].id_penyakit) || ''}
                                        onChange={(event) => handleDiagnosisChange(index, event)}
                                      />
                                      {errors.id_penyakit && (
                                        <div className="rounded invalid-feedback d-block">
                                          {errors.id_penyakit}
                                        </div>
                                      )}
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={5}>
                                  <FormGroup>
                                      <Label for="tipe_diagnosis">
                                          Tipe
                                      </Label>
                                      <span
                                        className="required text-danger"
                                        aria-required="true"
                                        >
                                        {" "}
                                        *
                                      </span>
                                      <Row>
                                        <Colxx sm={6} md={5} xl={5}>
                                          <CustomInput
                                            checked={diagnosis[index].tipe_wd}
                                            type="checkbox"
                                            name="tipe_diagnosis"
                                            id="tipe_wd"
                                            label="Working Diagnosis"
                                            onChange={(event) => handleDiagnosisChange(index, event)}
                                          />
                                          {/* {errors.wd && (
                                            <div className="rounded invalid-feedback d-block">
                                              {errors.wd}
                                            </div>
                                          )} */}
                                        </Colxx>
                                        <Colxx sm={5} md={6} xl={6}>
                                          <CustomInput
                                            checked={diagnosis[index].tipe_dd}
                                            type="checkbox"
                                            name="tipe_diagnosis"
                                            id="tipe_dd"
                                            label="Differential Diagnosis"
                                            onChange={(event) => handleDiagnosisChange(index, event)}
                                          />
                                          {errors.dd && (
                                            <div className="rounded invalid-feedback d-block" style={{ bottom: '170%', padding: '0.75rem 0.65rem' }}>
                                              {errors.dd}
                                            </div>
                                          )}
                                        </Colxx>
                                      </Row>
                                  </FormGroup>
                              </Colxx>
                              {index > 0 && (
                                <Colxx sm={1} md={1} xl={1}>
                                  <FormGroup>
                                    <Label>
                                      &nbsp;&nbsp;
                                    </Label>
                                    <br/>
                                    <Button
                                      color="danger"
                                      style={{ float: "right" }}
                                      onClick={() =>
                                          removeDiagnosisFields(input.id, index)
                                      }
                                      className="remove-diagnosis"
                                    >
                                      <i className="simple-icon-trash"></i>
                                    </Button>
                                  </FormGroup>
                                </Colxx>
                              )}
                          </React.Fragment>
                        )
                    })}

                    <Colxx sm={12} className="mt-2">
                      <Button
                        color="primary"
                        // style={{ float: "right" }}
                        // className="mb-2"
                        onClick={addDiagnosisFields}
                      >
                        Tambah Diagnosis
                      </Button>
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Colxx sm={11}>
                        <FormGroup>
                            <Label for="catatan_tambahan">
                              Catatan Tambahan
                            </Label>
                            <Input
                              type="textarea"
                              name="catatan_tambahan"
                              id="catatan_tambahan"
                              placeholder="Catatan Tambahan"
                              style={{minHeight: '150px'}}
                              value={record.catatan_tambahan}
                              onChange={onChange}
                            />
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <CardTitle className="my-4">
                    Tata Laksana
                  </CardTitle>

                  <FormGroup id="record-accordion">
                    <div className="border">
                      <Button
                        color="link"
                        onClick={() => setSelectedAccordion(1)}
                        aria-expanded={selectedAccordion === 1}
                      >
                        Resep
                      </Button>
                      <Collapse isOpen={selectedAccordion === 1}>
                        <div className="p-4">
                          <FormGroup>
                            {reciept.map((input, index) => {
                                return (
                                  <div key={index} className="med-record-form">
                                      <FormGroup row>
                                          <Colxx sm={6} md={6} xl={6}>
                                              <FormGroup>
                                                  <Label for="id_obat">
                                                      Obat
                                                  </Label>
                                                  <Select
                                                      components={{ Input: CustomSelectInput }}
                                                      className="react-select"
                                                      classNamePrefix="react-select"
                                                      name="id_obat"
                                                      value={selectMedicine.find(item => item.value === reciept[index].id_obat) || ''}
                                                      options={selectMedicine}
                                                      onChange={(event) => handleRecieptChange(index, event)}
                                                  />
                                              </FormGroup>
                                          </Colxx>
                                          <Colxx sm={2} md={2} xl={2} className="custom-column-record-reciept custom-column-record-reciept-pcs">
                                              <FormGroup>
                                                <Label for="jumlah">
                                                    Jumlah
                                                </Label>
                                                <InputGroup>
                                                    <Input
                                                        type="number"
                                                        name="jumlah"
                                                        id="jumlah"
                                                        placeholder="Jumlah"
                                                        className="input-reciept"
                                                        value={reciept[index].jumlah}
                                                        pattern="[0-9]*"
                                                        onChange={(event) => handleRecieptChange(index, event)}
                                                    />
                                                    <Select
                                                        addonType="prepend"
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select select-reciept"
                                                        classNamePrefix="react-select"
                                                        name="satuan"
                                                        value={selectPcs.find(item => item.value === reciept[index].satuan) || ''}
                                                        options={selectPcs}
                                                        onChange={(event) => handleRecieptChange(index, event)}
                                                    />
                                                </InputGroup>
                                              </FormGroup>
                                          </Colxx>
                                          <Colxx sm={2} md={2} xl={2} className="custom-column-record-reciept">
                                              <FormGroup>
                                                <Label for="frekuensi">
                                                    Frekuensi
                                                </Label>
                                                <InputGroup>
                                                    <Input
                                                        type="number"
                                                        name="frekuensi"
                                                        id="frekuensi"
                                                        placeholder="Frekuensi"
                                                        className="input-reciept"
                                                        value={reciept[index].frekuensi}
                                                        pattern="[0-9]*"
                                                        onChange={(event) => handleRecieptChange(index, event)}
                                                    />
                                                    <Select
                                                        addonType="prepend"
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select select-reciept"
                                                        classNamePrefix="react-select"
                                                        name="periode"
                                                        value={selectPeriod.find(item => item.value === reciept[index].periode) || ''}
                                                        options={selectPeriod}
                                                        onChange={(event) => handleRecieptChange(index, event)}
                                                    />
                                                </InputGroup>
                                              </FormGroup>
                                          </Colxx>
                                      </FormGroup>
                                      <FormGroup row>
                                          <Colxx sm={6} md={6} xl={6}>
                                              <FormGroup>
                                                <Label for="aturan_pakai">
                                                    Aturan Pakai
                                                </Label>
                                                <Select
                                                    components={{ Input: CustomSelectInput }}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    name="aturan_pakai"
                                                    value={selectRules.find(item => item.value === reciept[index].aturan_pakai) || ''}
                                                    options={selectRules}
                                                    onChange={(event) => handleRecieptChange(index, event)}
                                                />
                                              </FormGroup>
                                          </Colxx>
                                          <Colxx sm={5} md={5} xl={5}>
                                              <FormGroup>
                                                  <Label for="metode_konsumsi">
                                                      Metode Konsumsi
                                                  </Label>
                                                  <Select
                                                      components={{ Input: CustomSelectInput }}
                                                      className="react-select"
                                                      classNamePrefix="react-select"
                                                      name="metode_konsumsi"
                                                      value={selectConsume.find(item => item.value === reciept[index].metode_konsumsi) || ''}
                                                      options={selectConsume}
                                                      onChange={(event) => handleRecieptChange(index, event)}
                                                  />
                                              </FormGroup>
                                          </Colxx>
                                          {index > 0 && (
                                              <Colxx sm={1} md={1} xl={1}>
                                                  <FormGroup>
                                                    <Label>
                                                        &nbsp;&nbsp;
                                                    </Label>
                                                    <br/>
                                                    <Button
                                                      color="danger"
                                                      // style={{ float: "right" }}
                                                      onClick={() =>
                                                          removeRecieptFields(input.id, index)
                                                      }
                                                      className="remove-reciept"
                                                    >
                                                      <i className="simple-icon-trash"></i>
                                                    </Button>
                                                  </FormGroup>
                                              </Colxx>
                                          )}
                                      </FormGroup>
                                  </div>
                                )
                            })}

                            <Button
                              color="primary"
                              // style={{ float: "right" }}
                              // className="mb-2"
                              onClick={addRecieptFields}
                            >
                              Tambah Resep
                            </Button>
                          </FormGroup>
                        </div>
                      </Collapse>
                    </div>
                    <div className="border">
                      <Button
                        color="link"
                        onClick={() => setSelectedAccordion(2)}
                        aria-expanded={selectedAccordion === 2}
                      >
                        Pemeriksaan
                      </Button>
                      <Collapse isOpen={selectedAccordion === 2}>
                        <div className="p-4">
                          <FormGroup>
                            {checkup.map((input, index) => {
                                return (
                                  <FormGroup row key={index}>
                                    <Colxx sm={6} md={6} xl={6}>
                                        <FormGroup>
                                            <Label for="id_lab">
                                                Laboratorium
                                            </Label>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="id_lab"
                                                value={selectLab.find(item => item.value === checkup[index].id_lab) || ''}
                                                options={selectLab}
                                                onChange={(event) => handleCheckupChange(index, event)}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx sm={5} md={5} xl={5}>
                                        <FormGroup>
                                          <Label for="id_pemeriksaan">
                                            Layanan (pilih laboratorium dahulu)
                                          </Label>
                                          <Select
                                              components={{ Input: CustomSelectInput }}
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              name="id_pemeriksaan"
                                              value={
                                                selectLabTreatment[index] !== undefined &&
                                                selectLabTreatment[index].map((data, i) => 
                                                  data.options.find(item => item.value === checkup[index].id_pemeriksaan) || ''
                                                )
                                              }
                                              options={selectLabTreatment[index]}
                                              onChange={(event) => handleCheckupChange(index, event)}
                                          />
                                        </FormGroup>
                                    </Colxx>
                                    {index > 0 && (
                                        <Colxx sm={1} md={1} xl={1}>
                                            <FormGroup>
                                              <Label>
                                                  &nbsp;&nbsp;
                                              </Label>
                                              <br/>
                                              <Button
                                                color="danger"
                                                // style={{ float: "right" }}
                                                onClick={(event) =>
                                                    removeCheckupFields(input.id, index)
                                                }
                                                className="remove-reciept"
                                              >
                                                <i className="simple-icon-trash"></i>
                                              </Button>
                                            </FormGroup>
                                        </Colxx>
                                    )}
                                  </FormGroup>
                                )
                            })}

                            <Button
                              color="primary"
                              // style={{ float: "right" }}
                              // className="mb-2"
                              onClick={addCheckupFields}
                            >
                              Tambah Pemeriksaan
                            </Button>
                          </FormGroup>
                        </div>
                      </Collapse>
                    </div>
                    <div className="border">
                      <Button
                        color="link"
                        onClick={() => setSelectedAccordion(3)}
                        aria-expanded={selectedAccordion === 3}
                      >
                        Tindakan
                      </Button>
                      <Collapse isOpen={selectedAccordion === 3}>
                        <div className="p-4">
                          <FormGroup>
                            {treatment.map((input, index) => {
                                return (
                                  <FormGroup row key={index}>
                                    <Colxx sm={6} md={6} xl={6}>
                                        <FormGroup>
                                            <Label for="id_daftar_tindakan">
                                                Tindakan
                                            </Label>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="id_daftar_tindakan"
                                                value={selectTreatment.find(item => item.value === treatment[index].id_daftar_tindakan) || ''}
                                                options={selectTreatment}
                                                onChange={(event) => handleTreatmentChange(index, event)}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx sm={5} md={5} xl={5}>
                                        <FormGroup>
                                          <Label for="catatan">
                                            Catatan Tambahan
                                          </Label>
                                          <Input
                                              type="textarea"
                                              name="catatan"
                                              id="catatan"
                                              placeholder="Catatan"
                                              style={{minHeight: '150px'}}
                                              value={treatment[index].catatan}
                                              onChange={(event) => handleTreatmentChange(index, event)}
                                          />
                                        </FormGroup>
                                    </Colxx>
                                    {index > 0 && (
                                        <Colxx sm={1} md={1} xl={1}>
                                            <FormGroup>
                                              <Label>
                                                  &nbsp;&nbsp;
                                              </Label>
                                              <br/>
                                              <Button
                                                color="danger"
                                                // style={{ float: "right" }}
                                                onClick={() =>
                                                    removeTreatmentFields(input.id, index)
                                                }
                                                className="remove-reciept"
                                              >
                                                <i className="simple-icon-trash"></i>
                                              </Button>
                                            </FormGroup>
                                        </Colxx>
                                    )}
                                  </FormGroup>
                                )
                            })}

                            <Button
                              color="primary"
                              // style={{ float: "right" }}
                              // className="mb-2"
                              onClick={addTreatmentFields}
                            >
                              Tambah Tindakan
                            </Button>
                          </FormGroup>
                        </div>
                      </Collapse>
                    </div>
                    <div className="border">
                      <Button
                        color="link"
                        onClick={() => setSelectedAccordion(4)}
                        aria-expanded={selectedAccordion === 4}
                      >
                        Layanan
                      </Button>
                      <Collapse isOpen={selectedAccordion === 4}>
                        <div className="p-4">
                          <FormGroup>
                            {service.map((input, index) => {
                                return (
                                  <FormGroup row key={index}>
                                    <Colxx sm={6} md={6} xl={6}>
                                        <FormGroup>
                                            <Label for="id_daftar_layanan">
                                                Layanan
                                            </Label>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="id_daftar_layanan"
                                                value={selectService.find(item => item.value === service[index].id_daftar_layanan) || ''}
                                                options={selectService}
                                                onChange={(event) => handleServiceChange(index, event)}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx sm={5} md={5} xl={5}>
                                        <FormGroup>
                                          <Label for="catatan">
                                            Catatan Tambahan
                                          </Label>
                                          <Input
                                              type="textarea"
                                              name="catatan"
                                              id="catatan"
                                              placeholder="Catatan"
                                              style={{minHeight: '150px'}}
                                              value={service[index].catatan}
                                              onChange={(event) => handleServiceChange(index, event)}
                                          />
                                        </FormGroup>
                                    </Colxx>
                                    {index > 0 && (
                                        <Colxx sm={1} md={1} xl={1}>
                                            <FormGroup>
                                              <Label>
                                                  &nbsp;&nbsp;
                                              </Label>
                                              <br/>
                                              <Button
                                                color="danger"
                                                // style={{ float: "right" }}
                                                onClick={() =>
                                                    removeServiceFields(input.id, index)
                                                }
                                                className="remove-reciept"
                                              >
                                                <i className="simple-icon-trash"></i>
                                              </Button>
                                            </FormGroup>
                                        </Colxx>
                                    )}
                                  </FormGroup>
                                )
                            })}

                            <Button
                              color="primary"
                              // style={{ float: "right" }}
                              // className="mb-2"
                              onClick={addServiceFields}
                            >
                              Tambah Layanan
                            </Button>
                          </FormGroup>
                        </div>
                      </Collapse>
                    </div>
                    <div className="border">
                      <Button
                        color="link"
                        onClick={() => setSelectedAccordion(5)}
                        aria-expanded={selectedAccordion === 5}
                      >
                        Rujukan
                      </Button>
                      <Collapse isOpen={selectedAccordion === 5}>
                        <div className="p-4">
                          <FormGroup>
                            <FormGroup row>
                              {diagnoseReference.map((input, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                        <Colxx sm={6}>
                                            <FormGroup>
                                                <Label for="id_penyakit">
                                                    Penyakit
                                                    {/* <span
                                                    className="required text-danger"
                                                    aria-required="true"
                                                    >
                                                    {" "}
                                                    *
                                                    </span> */}
                                                </Label>
                                                {/* <Select
                                                    components={{ Input: CustomSelectInput }}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    name="id_penyakit_rujukan"
                                                    value={selectDisease.find(item => item.value === diagnoseReference[index].id_penyakit) || ''}
                                                    options={selectDisease}
                                                    onChange={(event) => handleDiagnoseReferenceChange(index, event)}
                                                /> */}
                                                <AsyncPaginate
                                                  loadOptions={loadOptions}
                                                  additional={{
                                                    page: 1,
                                                  }}
                                                  className="react-select"
                                                  classNamePrefix="react-select"
                                                  name="id_penyakit_rujukan"
                                                  value={selectDisease.find(item => item.value === diagnoseReference[index].id_penyakit) || ''}
                                                  onChange={(event) => handleDiagnoseReferenceChange(index, event)}
                                                />
                                            </FormGroup>
                                        </Colxx>
                                        <Colxx sm={5}>
                                            <FormGroup>
                                                <Label for="tipe_diagnosis_rujukan">
                                                    Tipe
                                                </Label>
                                                <Row>
                                                    <Colxx sm={6} md={5} xl={5}>
                                                        <CustomInput
                                                          checked={diagnoseReference[index].tipe_wd}
                                                          type="checkbox"
                                                          name="tipe_diagnosis_rujukan"
                                                          id="tipe_wd_rujukan"
                                                          label="Working Diagnosis"
                                                          // value={diagnoseReference.tipe_wd}
                                                          onChange={(event) => handleDiagnoseReferenceChange(index, event)}
                                                        />
                                                    </Colxx>
                                                    <Colxx sm={5} md={6} xl={6}>
                                                        <CustomInput
                                                          checked={diagnoseReference[index].tipe_dd}
                                                          type="checkbox"
                                                          name="tipe_diagnosis_rujukan"
                                                          id="tipe_dd_rujukan"
                                                          label="Differential Diagnosis"
                                                          // value={diagnoseReference.tipe_dd}
                                                          onChange={(event) => handleDiagnoseReferenceChange(index, event)}
                                                        />
                                                    </Colxx>
                                                </Row>
                                            </FormGroup>
                                        </Colxx>
                                        {index > 0 && (
                                          <Colxx sm={1} md={1} xl={1}>
                                            <FormGroup>
                                              <Label>
                                                &nbsp;&nbsp;
                                              </Label>
                                              <br/>
                                              <Button
                                                color="danger"
                                                style={{ float: "right" }}
                                                onClick={() =>
                                                  removeDiagnoseReferenceFields(input.id, index)
                                                }
                                                className="remove-diagnosis"
                                              >
                                                <i className="simple-icon-trash"></i>
                                              </Button>
                                            </FormGroup>
                                          </Colxx>
                                        )}
                                    </React.Fragment>
                                  )
                              })}

                              <Colxx sm={12} className="mt-2">
                                <FormGroup>
                                  <Button
                                    color="primary"
                                    // style={{ float: "right" }}
                                    // className="mb-2"
                                    onClick={addDiagnoseReferenceFields}
                                  >
                                    Tambah diagnosa rujukan
                                  </Button>
                                </FormGroup>
                              </Colxx>

                              <Colxx sm={6} md={6} xl={6}>
                                  <FormGroup>
                                      <Label for="id_poli">
                                          Poli / Divisi
                                          {/* <span className="required text-danger" aria-required="true"> *</span> */}
                                      </Label>
                                      <Select
                                          components={{ Input: CustomSelectInput }}
                                          className="react-select"
                                          classNamePrefix="react-select"
                                          name="id_poli"
                                          value={selectDivisionReference.find(item => item.value === reference.id_poli) || ''}
                                          options={selectDivisionReference}
                                          onChange={(event) => handleReferenceChange(event)}
                                      />
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={5} md={5} xl={5}>
                                  <FormGroup>
                                      <Label for="id_poli">
                                          Rumah Sakit
                                      </Label>
                                      <Select
                                          components={{ Input: CustomSelectInput }}
                                          className="react-select"
                                          classNamePrefix="react-select"
                                          name="id_rs"
                                          value={selectHospitalReference.find(item => item.value === reference.id_rs) || ''}
                                          options={selectHospitalReference}
                                          onChange={(event) => handleReferenceChange(event)}
                                      />
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={6} md={6} xl={6}>
                                  <FormGroup>
                                    <Label for="anamnesis">
                                      Anamnesis
                                    </Label>
                                    <Input
                                        type="textarea"
                                        name="anamnesis"
                                        id="anamnesis"
                                        placeholder="Anamnesis"
                                        style={{minHeight: '250px'}}
                                        value={reference.anamnesis}
                                        onChange={(event) => handleReferenceChange(event)}
                                    />
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={5} md={5} xl={5}>
                                  <FormGroup>
                                    <Label for="terapi">
                                      Terapi
                                    </Label>
                                    <Input
                                        type="textarea"
                                        name="terapi"
                                        id="terapi"
                                        placeholder="Terapi"
                                        style={{minHeight: '250px'}}
                                        value={reference.terapi}
                                        onChange={(event) => handleReferenceChange(event)}
                                    />
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={11} md={11} xl={11}>
                                  <FormGroup>
                                    <Label for="catatan">
                                      Catatan Tambahan
                                    </Label>
                                    <Input
                                        type="textarea"
                                        name="catatan"
                                        id="catatan"
                                        placeholder="Catatan"
                                        style={{minHeight: '150px'}}
                                        value={reference.catatan}
                                        onChange={(event) => handleReferenceChange(event)}
                                    />
                                  </FormGroup>
                              </Colxx>
                            </FormGroup>
                          </FormGroup>
                        </div>
                      </Collapse>
                    </div>
                  </FormGroup>

                  <Row>
                    <Colxx sm={6}>
                        <Label>
                            * ) Wajib diisi
                        </Label>
                    </Colxx>
                    <Colxx sm={6} className="text-right">
                        <Button
                            type="button"
                            color="light"
                            onClick={(e) => history.push("/record")}>
                                Kembali
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                            type="button"
                            outline
                            color="danger"
                            onClick={(e) => resetForm(e)}>
                                Batal
                        </Button>
                        &nbsp;&nbsp;
                        <Button color="primary" 
                            // onClick={(e) => onRecordSubmit(e)}
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
export default FormRecord;