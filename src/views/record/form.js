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
} from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import moment from "moment";
import Select from 'react-select';
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
  { label: 'Meninggal', value: 'Meninggal', key: 0, name: 'status_pulang' },
  { label: 'Berobat Jalan', value: 'Berobat Jalan', key: 1, name: 'status_pulang' },
  { label: 'Rujuk', value: 'Rujuk', key: 2, name: 'status_pulang' }
];

const selectPrognosa = [
  { label: 'Sanam (Sembuh)', value: 'Sanam (Sembuh)', key: 0, name: 'prognosa' },
  { label: 'Bonam (Baik)', value: 'Bonam (Baik)', key: 1, name: 'prognosa' },
  { label: 'Malam (Buruk/Jelek)', value: 'Malam (Buruk/Jelek)', key: 2, name: 'prognosa' },
  { label: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', value: 'Dubia Ad Sanam/Bonam (Tidak tentu/Ragu-ragu, Cenderung Sembuh/Baik)', key: 3, name: 'prognosa' },
  { label: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', value: 'Dubia Ad Malam (Tidak tentu/Ragu-ragu, Cenderung Buruk/Jelek)', key: 4, name: 'prognosa' },
];

const selectType = [
  { label: 'Rawat Jalan', value: 'Rawat Jalan', key: 0, name: 'tipe' },
  { label: 'Rawat Inap', value: 'Rawat Inap', key: 1, name: 'tipe' },
  { label: 'Promotif', value: 'Promotif', key: 2, name: 'tipe' },
  { label: 'Preventif', value: 'Preventif', key: 3, name: 'tipe' }
];

const selectPcs = [
  { label: 'Kapsul', value: 'Kapsul', key: 0, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 1, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 2, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 3, name: 'satuan' },
  { label: 'Mili Liter', value: 'Mili Liter', key: 4, name: 'satuan' },
  { label: 'Sendok Makan', value: 'Sendok Makan', key: 5, name: 'satuan' },
];

const selectPeriod = [
  { label: 'Jam', value: 'Jam', key: 0, name: 'periode' },
  { label: 'Hari', value: 'Hari', key: 1, name: 'periode' }
];

const selectRules = [
  { label: 'Sebelum Makan', value: 'Sebelum Makan', key: 0, name: 'aturan_pakai' },
  { label: 'Setelah Makan', value: 'Setelah Makan', key: 1, name: 'aturan_pakai' },
  { label: 'Kapan Saja', value: 'Kapan Saja', key: 2, name: 'aturan_pakai' }
];

const selectConsume = [
  { label: 'Dikunyah', value: 'Dikunyah', key: 0, name: 'metode_konsumsi' },
  { label: 'Ditelan', value: 'Ditelan', key: 1, name: 'metode_konsumsi' },
  { label: 'Disuntik', value: 'Disuntik', key: 2, name: 'metode_konsumsi' },
  { label: 'Dihirup', value: 'Dihirup', key: 3, name: 'metode_konsumsi' },
  { label: 'Lainnya', value: 'Lainnya', key: 4, name: 'metode_konsumsi' }
];

let selectInspectByLabTreatmentArray = [];
let selectLabTreatmentArray = [];

const FormRecord = ({ match, history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataStatusRecord, setDataRecord] = useState("add");
  const [dataStatusDiagnosis, setDataDiagnosis] = useState("add");
  const [dataStatusReciept, setDataReciept] = useState("add");
  const [dataStatusCheckup, setDataCheckup] = useState("add");
  const [dataStatusTreatment, setDataTreatment] = useState("add");
  const [dataStatusService, setDataService] = useState("add");
  const [dataStatusReference, setDataStatusReference] = useState("add");
  const [dataStatusDiagnoseReference, setDataStatusDiagnoseReference] = useState("add");

  let patientID = "";
  let patientData = "";
  let recordID = "";

  if (location.state) {
    patientID = location.state.patientID;
    patientData = location.state.patientData;

    if (location.state.recordID) {
      recordID = location.state.recordID;
    }
  } else {
    Swal.fire({
        title: "Gagal!",
        html: `Data pasien tidak ditemukan`,
        icon: "error",
        confirmButtonColor: "#008ecc",
    });

    history.push("/record");
  }

  const [selectedType, setSelectedType] = useState('');
  const [selectedVisitation, setSelectedVisitation] = useState('');
  const [selectedPrognosa, setSelectedPrognosa] = useState('');

  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState([]);

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const [vitalSignsID, setVitalSignsID] = useState('');
  const [watchID, setWatchID] = useState('');

  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

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
    id_vs: '',
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

      setSelectedType(e);
    } else if (e.name === 'status_pulang') {
      setRecord(current => {
          return { ...current, status_pulang: e.value }
      })

      setSelectedVisitation(e);
    } else if (e.name === 'prognosa') {
      setRecord(current => {
          return { ...current, prognosa: e.value }
      })

      setSelectedPrognosa(e);
    } else if (name === 'waktu_mulai') {
      const sd = new Date(e);
      // console.log('sd', sd);
      // setStartDate(sd);
      setStartDateTime(sd);

      setRecord(current => {
          return { ...current, waktu_mulai: moment(ed).format("yyyy-MM-DD HH:mm") }
      })
    } else if (name === 'waktu_selesai') {
      const ed = new Date(e);
      // console.log('ed', ed);
      // setEndDate(ed);
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
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([{ label: ""}]);

  const addDiagnosisFields = () => {
    let newfieldDiagnosis = { id: '', id_kunjungan: recordID, id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnosis([...diagnosis, newfieldDiagnosis]);

    let newfieldDropdownDiagnosis = { label: "" };
    setSelectedDiagnosis([...selectedDiagnosis, newfieldDropdownDiagnosis]);
  };

  const removeDiagnosisFields = (id, index) => {
    let dataDiagnosis = [...diagnosis];
    let displaySelectDiagnosis = [...selectedDiagnosis];

    dataDiagnosis.splice(index, 1);
    displaySelectDiagnosis.splice(index, 1);

    setDiagnosis(dataDiagnosis);
    setSelectedDiagnosis(displaySelectDiagnosis);

    // console.log('remove diagnosis', dataDiagnosis);
    // console.log('remove selectedDiagnosis', selectedDiagnosis);
  };

  let wd = false; let dd = false;

  const handleDiagnosisChange = (index, event) => {
    // console.log('handleDiagnosisChange', event);

    let dataDiagnosis = [...diagnosis];
    let displaySelectDiagnosis = [...selectedDiagnosis];

    if (event.name === "id_penyakit"){
      dataDiagnosis[index][event.name] = event.value;
      displaySelectDiagnosis[index]["label"] = event.label;
    } else if(event.target.name === "tipe_diagnosis") {
      if(event.target.id === 'tipe_wd' && event.target.checked === true) {
        wd = true;
      } else if(event.target.id === 'tipe_wd' && event.target.checked === false) {
        wd = false;
      }
      
      if(event.target.id === 'tipe_dd' && event.target.checked === true) {
        dd = true;
      } else if(event.target.id === 'tipe_wd' && event.target.checked === false) {
        dd = false;
      }

      dataDiagnosis[index]['tipe_wd'] = wd;
      dataDiagnosis[index]['tipe_dd'] = dd;
    }

    setDiagnosis(dataDiagnosis);
    setSelectedDiagnosis(displaySelectDiagnosis);

    // console.log('handle diagnosis', diagnosis);
    // console.log('handle selectedDiagnosis', selectedDiagnosis);
  };

  const [reciept, setReciept] = useState([
    { id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
  ]);
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [selectedPcs, setSelectedPcs] = useState([{ label: '' }]);
  const [selectedPeriod, setSelectedPeriod] = useState([{ label: '' }]);
  const [selectedRules, setSelectedRules] = useState([{ label: '' }]);
  const [selectedConsume, setSelectedConsume] = useState([{ label: '' }]);

  const addRecieptFields = () => {
    let newfieldReciept = { id: '', id_kunjungan: recordID, id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
    setReciept([...reciept, newfieldReciept]);

    // let newfieldDropdownMedicine = { label: "" };
    // setSelectedMedicine([...selectedMedicine, newfieldDropdownMedicine]);

    let newfieldDropdownPcs = { label: "" };
    setSelectedPcs([...selectedPcs, newfieldDropdownPcs]);

    let newfieldDropdownPeriod = { label: "" };
    setSelectedPeriod([...selectedPeriod, newfieldDropdownPeriod]);

    let newfieldDropdownRules = { label: "" };
    setSelectedRules([...selectedRules, newfieldDropdownRules]);

    let newfieldDropdownConsume = { label: "" };
    setSelectedConsume([...selectedConsume, newfieldDropdownConsume]);
  };

  const removeRecieptFields = (id, index) => {
    let dataReciept = [...reciept];
    let displaySelectMedicine = [...selectedMedicine];
    let displaySelectPcs = [...selectedPcs];
    let displaySelectPeriod = [...selectedPeriod];
    let displaySelectRules = [...selectedRules];
    let displaySelectConsume = [...selectedConsume];

    dataReciept.splice(index, 1);
    displaySelectMedicine.splice(index, 1);
    displaySelectPcs.splice(index, 1);
    displaySelectPeriod.splice(index, 1);
    displaySelectRules.splice(index, 1);
    displaySelectConsume.splice(index, 1);

    setReciept(dataReciept);
    setSelectedMedicine(displaySelectMedicine);
    setSelectedPcs(displaySelectPcs);
    setSelectedPeriod(displaySelectPeriod);
    setSelectedRules(displaySelectRules);
    setSelectedConsume(displaySelectConsume);

    // console.log('remove reciept', reciept);
    // console.log('remove selectedMedicine', selectedMedicine);
    // console.log('remove selectedPcs', selectedPcs);
    // console.log('remove selectedPeriod', selectedPeriod);
    // console.log('remove selectedRules', selectedRules);
    // console.log('remove selectedConsume', selectedConsume);
  };

  const handleRecieptChange = (index, event) => {
    // console.log('handleRecieptChange', event);

    let dataReciept = [...reciept];
    let displaySelectMedicine = [...selectedMedicine];
    let displaySelectPcs = [...selectedPcs];
    let displaySelectPeriod = [...selectedPeriod];
    let displaySelectRules = [...selectedRules];
    let displaySelectConsume = [...selectedConsume];

    if (event.name === "id_obat"){
      dataReciept[index][event.name] = event.value;
      displaySelectMedicine[index]["label"] = event.label;
    } else if (event.name === "satuan"){
      dataReciept[index][event.name] = event.value;
      displaySelectPcs[index]["label"] = event.label;
    } else if (event.name === "periode"){
      dataReciept[index][event.name] = event.value;
      displaySelectPeriod[index]["label"] = event.label;
    } else if (event.name === "aturan_pakai"){
      dataReciept[index][event.name] = event.value;
      displaySelectRules[index]["label"] = event.label;
    } else if (event.name === "metode_konsumsi"){
      dataReciept[index][event.name] = event.value;
      displaySelectConsume[index]["label"] = event.label;
    } else {
      dataReciept[index][event.target.name] = event.target.value;
    }

    setReciept(dataReciept);
    setSelectedMedicine(displaySelectMedicine);
    setSelectedPcs(displaySelectPcs);
    setSelectedPeriod(displaySelectPeriod);
    setSelectedRules(displaySelectRules);
    setSelectedConsume(displaySelectConsume);

    // console.log('handle reciept', reciept);
    // console.log('handle selectedMedicine', selectedMedicine);
    // console.log('handle selectedPcs', selectedPcs);
    // console.log('handle selectedPeriod', selectedPeriod);
    // console.log('handle selectedRules', selectedRules);
    // console.log('handle selectedConsume', selectedConsume);
  };

  const [checkup, setCheckup] = useState([
    { id: '', id_kunjungan: recordID, id_laboratorium: "", id_pemeriksaan: "" }
  ]);
  const [selectLab, setSelectLab] = useState([]);
  const [selectedLab, setSelectedLab] = useState([{ label: "" }]);
  const [selectLabTreatment, setSelectLabTreatment] = useState([]);
  const [selectedInspect, setSelectedInspect] = useState([{ label: "" }]);

  const addCheckupFields = () => {
    let newfieldCheckup = { id: '', id_kunjungan: recordID, id_laboratorium: "", id_pemeriksaan: "" }
    setCheckup([...checkup, newfieldCheckup]);

    let newfieldDropdownLab = { label: "" };
    setSelectedLab([...selectedLab, newfieldDropdownLab]);

    let newfieldDropdownInspect = { label: "" };
    setSelectedInspect([...selectedInspect, newfieldDropdownInspect]);

    let newfieldDropdownLayananLab = [];
    setSelectLabTreatment([...selectLabTreatment, newfieldDropdownLayananLab]);

    let newfieldDropdownLayananLabArray = [];
    selectLabTreatmentArray.push(newfieldDropdownLayananLabArray);
  };

  const removeCheckupFields = (id, index) => {
    let dataCheckup = [...checkup];
    let displaySelectLab = [...selectedLab];
    let displaySelectInspect = [...selectedInspect];
    let displaySelectTreatment = [...selectLabTreatment];
    let displaySelectTreatmentArray = selectLabTreatmentArray;

    dataCheckup.splice(index, 1);
    displaySelectLab.splice(index, 1);
    displaySelectInspect.splice(index, 1);
    displaySelectTreatment.splice(index, 1);
    displaySelectTreatmentArray.splice(index, 1);

    setCheckup(dataCheckup);
    setSelectedLab(displaySelectLab);
    setSelectedInspect(displaySelectInspect);
    setSelectLabTreatment(displaySelectTreatment);
    selectLabTreatmentArray = displaySelectTreatmentArray;

    // console.log('remove checkup', checkup);
    // console.log('remove selectedLab', selectedLab);
    // console.log('remove selectedInspect', selectedInspect);
    // console.log('remove selectLabTreatment', selectLabTreatment);
    // console.log('remove selectLabTreatmentArray', selectLabTreatmentArray);
  };

  const handleCheckupChange = (index, event) => {
    // console.log('handleCheckupChange', event);

    let dataCheckup = [...checkup];
    let displaySelectLab = [...selectedLab];
    let displaySelectInspect = [...selectedInspect];
    // let displaySelectTreatment = [...selectLabTreatment];
    let displaySelectTreatmentArray = selectLabTreatmentArray;

    if (event.name === "id_laboratorium"){
      changeLayananLab(index, event.value);
      dataCheckup[index][event.name] = event.value;
      displaySelectLab[index]["label"] = event.label;
    } else if (event.name === "id_pemeriksaan"){
      dataCheckup[index][event.name] = event.value;
      displaySelectInspect[index]["label"] = event.label;
    } else {
      dataCheckup[index][event.target.name] = event.target.value;
    }

    setCheckup(dataCheckup);
    setSelectedLab(displaySelectLab);
    setSelectedInspect(displaySelectInspect);
    // setSelectLabTreatment(displaySelectTreatment);
    selectLabTreatmentArray = displaySelectTreatmentArray;

    // console.log('handle checkup', checkup);
    // console.log('handle selectedLab', selectedLab);
    // console.log('handle selectedInspect', selectedInspect);
    // console.log('handle selectLabTreatment', selectLabTreatment);
    // console.log('handle selectLabTreatmentArray', selectLabTreatmentArray);
  };

  const [treatment, setTreatment] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }
  ]);
  const [selectTreatment, setSelectTreatment] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState([{ label: ""}]);

  const addTreatmentFields = () => {
    let newfieldTreatment = { id: '', id_kunjungan: recordID, id_daftar_tindakan: "", catatan: "" }
    setTreatment([...treatment, newfieldTreatment]);

    let newfieldDropdownTreatment = { label: "" };
    setSelectedTreatment([...selectedTreatment, newfieldDropdownTreatment]);
  };

  const removeTreatmentFields = (id, index) => {
    let dataTreatment = [...treatment];
    let displaySelectTreatment = [...selectedTreatment];

    dataTreatment.splice(index, 1);
    displaySelectTreatment.splice(index, 1);

    setTreatment(dataTreatment);
    setSelectedTreatment(displaySelectTreatment);

    // console.log('remove treatment', treatment);
    // console.log('remove selectedTreatment', selectedTreatment);
  };

  const handleTreatmentChange = (index, event) => {
    // console.log('handleTreatmentChange', event);

    let dataTreatment = [...treatment];
    let displaySelectTreatment = [...selectedTreatment];

    if (event.name === "id_daftar_tindakan"){
        dataTreatment[index][event.name] = event.value;
        displaySelectTreatment[index]["label"] = event.label;
    } else {
        dataTreatment[index][event.target.name] = event.target.value;
    }

    setTreatment(dataTreatment);
    setSelectedTreatment(displaySelectTreatment);

    // console.log('handle treatment', treatment);
    // console.log('handle selectedTreatment', selectedTreatment);
  };

  const [service, setService] = useState([
    { id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }
  ]);
  const [selectService, setSelectService] = useState([]);
  const [selectedService, setSelectedService] = useState([{ label: ""}]);

  const addServiceFields = () => {
    let newfieldService = { id: '', id_kunjungan: recordID, id_daftar_layanan: "", catatan: "" }
    setService([...service, newfieldService]);

    let newfieldDropdownService = { label: "" };
    setSelectedService([...selectedService, newfieldDropdownService]);
  };

  const removeServiceFields = (id, index) => {
    let dataService = [...service];
    let displaySelectService = [...selectedService];

    dataService.splice(index, 1);
    displaySelectService.splice(index, 1);

    setService(dataService);
    setSelectedService(displaySelectService);

    // console.log('remove service', service);
    // console.log('remove selectedService', selectedService);
  };

  const handleServiceChange = (index, event) => {
    // console.log('handleServiceChange', event);

    let dataService = [...service];
    let displaySelectService = [...selectedService];

    if (event.name === "id_daftar_layanan"){
        dataService[index][event.name] = event.value;
        displaySelectService[index]["label"] = event.label;
    } else {
        dataService[index][event.target.name] = event.target.value;
    }

    setService(dataService);
    setSelectedService(displaySelectService);

    // console.log('handle service', service);
    // console.log('handle selectedService', selectedService);
  };

  const [reference, setReference] = useState([
    { id: '', id_rujukan: "", id_poli: "", id_rs: "", anamnesis: "", terapi: "", catatan: "" }
  ]);
  const [diagnoseReference, setDiagnoseReference] = useState([
    { id: '', id_rujukan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);
  const [selectedDiagnoseReference, setSelectedDiagnoseReference] = useState([{ label: ""}]);

  const addDiagnoseReferenceFields = () => {
    let newfieldDiagnoseReference = { id: '', id_rujukan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnoseReference([...diagnoseReference, newfieldDiagnoseReference]);

    let newfieldDropdownDiagnoseReference = { label: "" };
    setSelectedDiagnoseReference([...selectedDiagnoseReference, newfieldDropdownDiagnoseReference]);
  };

  const removeDiagnoseReferenceFields = (id, index) => {
    let dataDiagnoseReference = [...diagnoseReference];
    let displaySelectDiagnoseReference = [...selectedDiagnoseReference];

    dataDiagnoseReference.splice(index, 1);
    displaySelectDiagnoseReference.splice(index, 1);

    setDiagnoseReference(dataDiagnoseReference);
    setSelectedDiagnoseReference(displaySelectDiagnoseReference);

    // console.log('remove diagnoseReference', diagnoseReference);
    // console.log('remove selectedDiagnoseReference', selectedDiagnoseReference);
  };

  let wd_rujukan = false; let dd_rujukan = false;

  const handleDiagnoseReferenceChange = (index, event) => {
    // console.log('handleDiagnoseReferenceChange', event);

    let dataDiagnoseReference = [...diagnoseReference];
    let displaySelectDiagnoseReference = [...selectedDiagnoseReference];

    if (event.name === "id_penyakit"){
      dataDiagnoseReference[index][event.name] = event.value;
      displaySelectDiagnoseReference[index]["label"] = event.label;
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

      dataDiagnoseReference[index]['tipe_wd'] = wd_rujukan;
      dataDiagnoseReference[index]['tipe_dd'] = dd_rujukan;
    }

    setDiagnoseReference(dataDiagnoseReference);
    setSelectedDiagnoseReference(displaySelectDiagnoseReference);

    console.log('handle diagnoseReference', diagnoseReference);
    // console.log('handle selectedDiagnoseReference', selectedDiagnoseReference);
  };

  const handleReferenceChange = (e) => {
    // console.log('handleReferenceChange', e);

    if (e.name === 'id_poli') {
      setReference(current => {
          return { ...current, id_poli: e.value }
      })

      setSelectedDivision(e);
    } else  if (e.name === 'id_rs') {
      setReference(current => {
          return { ...current, id_rs: e.value }
      })

      setSelectedDivision(e);
    } else {
      setReference(current => {
          return { ...current, [e.target.name]: e.target.value }
      })
    }

    // console.log('reference', reference);
  };

  const getRecordByPatientId = async (e, id) => {
    // resetForm(e);

    if(id){
      setDataRecord("update");

      try {
        const res = await recordAPI.get("", `/${id}`);
        let data = res.data.data[0];

        // console.log(data);

        setRecord({
          id_jaga: data.id_jaga,
          id_vs: data.id_vs,
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
          catatan_tambahan: data.catatan_tambahan,
        });

        setSelectedType({tipe: data.tipe ? e.value : ''});
        setSelectedVisitation({status_pulang: data.status_pulang ? e.value : ''});
        setSelectedPrognosa({prognosa: data.prognosa ? e.value : ''});

        if (data.kasus_kll === true) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }

        // console.log(record);
      } catch (e) {
        console.log(e);
      }
    } else {
      setDataRecord("add");

      setRecord({
        id_jaga: watchID,
        id_vs: vitalSignsID,
        id_pasien: patientID,
        // waktu_mulai: moment(patientData.created_at).format("YYYY-MM-DD HH:mm"),
        tipe: '',
        anamnesis: '',
        pemeriksaan_fisik: '',
        prognosa: '',
        kasus_kll: '',
        status_pulang: '',
        keluhan: '',
        catatan_tambahan: ''
      });
    }

    // console.log(dataStatusRecord);
  };

  const onRecordSubmit = async (e) => {
    e.preventDefault();

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

          // resetForm(e);
          // history.push("/record");

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

          // resetForm(e);
          // history.push("/record");
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
      } finally {
        // onDiagnosisSubmit(e);
        // onRecieptSubmit(e);
        // onCheckupSubmit(e);
	      // onTreatmentSubmit(e);
	      // onServiceSubmit(e);
        // onReferenceSubmit(e);
        // onDiagnoseReferenceSubmit(e);
      }
    } else {
      console.log('dataStatusRecord undefined')
    }
  };

  const onDiagnosisSubmit = async (e) => {
    e.preventDefault();

    // console.log(diagnosis);
    for (var i = 0; i < diagnosis.length; i++) {
      if(diagnosis[i].id === '') {
        try {
          const response = await diagnoseAPI.add(diagnosis[i]);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Tambah diagnosis sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah diagnosis gagal: ${response.message}`,
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
        try {
          const response = await recieptAPI.update(diagnosis[i], diagnosis[i].id);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Ubah diagnosis sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah diagnosis gagal: ${response.message}`,
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
      }
    }
  };

  const onRecieptSubmit = async (e) => {
    e.preventDefault();

    // console.log(reciept);
    for (var i = 0; i < reciept.length; i++) {
      if(reciept[i].id === '') {
        try {
          const response = await recieptAPI.add(reciept[i]);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Tambah resep sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah resep gagal: ${response.message}`,
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
        try {
          const response = await recieptAPI.update(reciept[i], reciept[i].id);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Ubah resep sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah resep gagal: ${response.message}`,
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
      }
    }
  };

  const onCheckupSubmit = async (e) => {
    e.preventDefault();

    // console.log(checkup);
    for (var i = 0; i < checkup.length; i++) {
      if(checkup[i].id === '') {
        try {
          const response = await inspectSupportAPI.add(checkup[i]);
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
            html: e,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });
          console.log(e);
        }
      } else {
        try {
          const response = await inspectSupportAPI.update(checkup[i], checkup[i].id);
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
            html: e,
            icon: "error",
            confirmButtonColor: "#008ecc",
            confirmButtonText: "Coba lagi",
          });

          console.log(e);
        }
      }
    }
  };

  const onTreatmentSubmit = async (e) => {
    e.preventDefault();

    // console.log(treatment);
    for (var i = 0; i < treatment.length; i++) {
      if(treatment[i].id === '') {
        try {
          const response = await treatmentAPI.add(treatment[i]);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Tambah tindakan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah tindakan gagal: ${response.message}`,
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
        try {
          const response = await treatmentAPI.update(treatment[i], treatment[i].id);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Ubah tindakan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah tindakan gagal: ${response.message}`,
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
      }
    }
  };

  const onServiceSubmit = async (e) => {
    e.preventDefault();

    // console.log(service);
    for (var i = 0; i < service.length; i++) {
      if(service[i].id === '') {
        try {
          const response = await serviceAPI.add(service[i]);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Tambah layanan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah layanan gagal: ${response.message}`,
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
        try {
          const response = await serviceAPI.update(service[i], service[i].id);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Ubah layanan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah layanan gagal: ${response.message}`,
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
      }
    }
  };

  const onReferenceSubmit = async (e) => {
    e.preventDefault();

    // console.log(reference);
    if(dataStatusReference === 'add') {
      try {
        const response = await referenceAPI.add(reference);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Tambah rujukan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
          
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Tambah rujukan gagal: ${response.message}`,
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
    } else if(dataStatusReference === 'update') {
      try {
        const response = await referenceAPI.update(reference, reference.id);
        // console.log(response);

        if (response.status == 200) {
          let data = await response.data.data;
          // console.log(data);

          Swal.fire({
            title: "Sukses!",
            html: `Ubah rujukan sukses`,
            icon: "success",
            confirmButtonColor: "#008ecc",
          });
          
        } else {
          Swal.fire({
            title: "Gagal!",
            html: `Ubah rujukan gagal: ${response.message}`,
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
      console.log('dataStatusRecord undefined')
    }
  };

  const onDiagnoseReferenceSubmit = async (e) => {
    e.preventDefault();

    // console.log(diagnoseReference);
    for (var i = 0; i < diagnoseReference.length; i++) {
      if(diagnoseReference[i].id === '') {
        try {
          const response = await diagnoseReferenceAPI.add(diagnoseReference[i]);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Tambah diagnosis rujukan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Tambah diagnosis rujukan gagal: ${response.message}`,
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
        try {
          const response = await diagnoseReferenceAPI.update(diagnoseReference[i], diagnoseReference[i].id);
          // console.log(response);

          if (response.status == 200) {
            let data = await response.data.data;
            // console.log(data);

            Swal.fire({
              title: "Sukses!",
              html: `Ubah diagnosis rujukan sukses`,
              icon: "success",
              confirmButtonColor: "#008ecc",
            });
            
          } else {
            Swal.fire({
              title: "Gagal!",
              html: `Ubah diagnosis rujukan gagal: ${response.message}`,
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
      }
    }
  };

  const resetForm = (e) => {
    e.preventDefault();

    setRecord({
      id_jaga: watchID,
      id_vs: '',
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
    setSelectedType("");
    setSelectedVisitation("");
    setSelectedPrognosa("");

    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
    onLoadLayanan();
    onLoadPoliRujukan();
    onLoadRSRujukan();
  };

  const [selectedDisease, setSelectedDisease] = useState([]);

  const onLoadPenyakit = async () => {
    try {
      const response = await diseaseAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedDisease([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
          setSelectedDisease((current) => [
            ...current,
            { label: data[i].kode_icd10 + " - " + data[i].nama_penyakit  , value: data[i].id, key: data[i].id, name: 'id_penyakit' },
          ]);
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadObat = async () => {
    try {
      const response = await medicineAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedMedicine([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedMedicine((current) => [
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

  const onLoadLab = async () => {
    try {
      const response = await labAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectLab([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectLab((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_laboratorium' },
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
    // selectInspectByLabTreatmentArray = [];

    try {
      const response = await labTreatmentAPI.get("", `?limit=1000&searchLaboratorium=${id_lab}&searchKategori=${kategori}`);
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
      // var newLoopTreatmentByLab = { label: kategori, options: selectInspectByLabTreatmentArray };
      
      // setSelectLabTreatment((current) => [
      //   ...current, { label: kategori, options: selectInspectByLabTreatmentArray }
      // ]);

      // setSelectLabTreatment(current => [
      //     ...current,
      //     {
      //       label: kategori,
      //       options: selectInspectByLabTreatmentArray
      //     }
      // ])

      // setSelectLabTreatment({ label: kategori, options: selectInspectByLabTreatmentArray });

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

      // console.log('selectLabTreatment', selectLabTreatment);
      // console.log('selectLabTreatmentArray', selectLabTreatmentArray);
    }
  };

  const changeLayananLab = async (index, id_lab) => {
    // setSelectLabTreatment([]);
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

          // selectLabTreatmentArray.push({ 
          //   label: data[i].kategori,
          //   key: data[i].id,
          //   options: selectInspectByLabTreatmentArray
          // });

          // selectInspectByLabTreatmentArray = [];
        }
      } else {
        throw Error(`Error status: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // console.log('selectLabTreatmentArray', selectLabTreatmentArray);
    }
  };

  const valueOfSelectTreatment = (index, event = null) => {
    // if(selectLabTreatmentArray[index] !== undefined){
    //   selectLabTreatmentArray[index].map((data, i) => 
    //     data.options.find(item => item.value === checkup[index].id_pemeriksaan) || ''
    //   )
    // }

    if(selectLabTreatment[index] !== undefined){
      // changeLayananLab(index, event);
      // changeLayananLab(index, checkup[index].id_laboratorium);

      selectLabTreatment[index].map((data, i) => 
        data.options.find(item => item.value === checkup[index].id_pemeriksaan) || ''
      )
    }
  }

  const onLoadTindakan = async () => {
    try {
      const response = await treatmentListAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectTreatment([]);

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

  const onLoadLayanan = async () => {
    try {
      const response = await serviceListAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectService([]);

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

  const onLoadPoliRujukan = async () => {
    try {
      const response = await divisionReferenceAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedDivision([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedDivision((current) => [
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

  const onLoadRSRujukan = async () => {
    try {
      const response = await hospitalReferenceAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedHospital([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedHospital((current) => [
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

    setWatchID(data.id_jaga);

    // console.log('patientID', patientID);
    // console.log('patientData', patientData);

    try {
      const res = await vitalSignsAPI.getByPatient("", `/${id}`);
      let data = res.data.data[0];
      // console.log('vitalSigns', data);

      setVitalSignsID(data.id);

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

      // console.log(vitalSigns);
    } catch (e) {
      console.log(e);
    } finally {
        recordID &&
        getRecordByPatientId("", recordID);
      // getDiagnosisByRecordId(recordID);
      // getRecieptByRecordId(recordID);
      // getCheckupByRecordId(recordID);
      // getTreatmentByRecordId(recordID);
      // getReferenceByRecordId(recordID);
      // getDiagnoseReferenceByRecordId(recordID);
    }
  };

  useEffect(() => {
    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
    onLoadLayanan();
    onLoadPoliRujukan();
    onLoadRSRujukan();

    getVitalSignsByPatientId(patientID, patientData);
  }, [ ]);

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
                <Form>
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
                            // value={selectedType}
                            // onChange={setSelectedType}
                            options={selectType}
                            // value={record.tipe}
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
                            // value={selectedPrognosa}
                            // onChange={setSelectedPrognosa}
                            options={selectPrognosa}
                            // value={record.prognosa}
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
                            // value={selectedVisitation}
                            value={selectVisitation.find(item => item.value === record.status_pulang) || ''}
                            // onChange={setSelectedVisitation}
                            options={selectVisitation}
                            required
                            // value={record.status_pulang}
                            onChange={onChange}
                            />
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
                                          {/* <span
                                          className="required text-danger"
                                          aria-required="true"
                                          >
                                          {" "}
                                          *
                                          </span> */}
                                      </Label>
                                      <Select
                                          components={{ Input: CustomSelectInput }}
                                          className="react-select"
                                          classNamePrefix="react-select"
                                          name="id_penyakit"
                                          value={selectedDisease.find(item => item.value === diagnosis[index].id_penyakit) || ''}
                                          options={selectedDisease}
                                          onChange={(event) => handleDiagnosisChange(index, event)}
                                      />
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={5}>
                                  <FormGroup>
                                      <Label for="tipe_diagnosis">
                                          Tipe
                                      </Label>
                                      <Row>
                                          <Colxx sm={6} md={5} xl={5}>
                                              <CustomInput
                                                checked={diagnosis[index].tipe_wd}
                                                type="checkbox"
                                                name="tipe_diagnosis"
                                                id="tipe_wd"
                                                label="Working Diagnosis"
                                                // value={diagnosis[index].tipe_wd}
                                                onChange={(event) => handleDiagnosisChange(index, event)}
                                              />
                                          </Colxx>
                                          <Colxx sm={5} md={6} xl={6}>
                                              <CustomInput
                                                checked={diagnosis[index].tipe_dd}
                                                type="checkbox"
                                                name="tipe_diagnosis"
                                                id="tipe_dd"
                                                label="Differential Diagnosis"
                                                // value={diagnosis[index].tipe_dd}
                                                onChange={(event) => handleDiagnosisChange(index, event)}
                                              />
                                          </Colxx>
                                      </Row>
                                  </FormGroup>
                              </Colxx>
                              <Colxx sm={1} md={1} xl={1}>
                                  {index > 0 && (
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
                                  )}
                              </Colxx>
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
                    Tata Laksana | Resep
                  </CardTitle>

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
                                              value={selectedMedicine.find(item => item.value === reciept[index].id_obat) || ''}
                                              options={selectedMedicine}
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
                                                value={selectedPcs.find(item => item.label === reciept[index].satuan) || ''}
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
                                                value={selectedPeriod.find(item => item.label === reciept[index].periode) || ''}
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
                                            value={selectedRules.find(item => item.label === reciept[index].aturan_pakai) || ''}
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
                                              value={selectedConsume.find(item => item.label === reciept[index].metode_konsumsi) || ''}
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

                  <CardTitle className="my-4">
                    Tata Laksana | Pemeriksaan
                  </CardTitle>

                  <FormGroup>
                    {checkup.map((input, index) => {
                        return (
                          <FormGroup row key={index}>
                            <Colxx sm={6} md={6} xl={6}>
                                <FormGroup>
                                    <Label for="id_laboratorium">
                                        Laboratorium
                                    </Label>
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="id_laboratorium"
                                        value={selectLab.find(item => item.value === checkup[index].id_laboratorium) || ''}
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
                                      // value={selectLabTreatment[index].find(item => item.value === checkup[index].id_pemeriksaan) || ''}
                                      // options={selectLabTreatmentArray[index]}
                                      // value={selectLabTreatmentArray.find(item => item.value === checkup[index].id_pemeriksaan) || ''}
                                      // value={valueOfSelectTreatment(index)}
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

                  <CardTitle className="my-4">
                    Tata Laksana | Tindakan
                  </CardTitle>

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

                  

                  <CardTitle className="my-4">
                    Tata Laksana | Layanan
                  </CardTitle>

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

                  <CardTitle className="my-4">
                    Tata Laksana | Rujukan
                  </CardTitle>

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
                                        <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            name="id_penyakit_rujukan"
                                            value={selectedDisease.find(item => item.value === diagnoseReference[index].id_penyakit) || ''}
                                            options={selectedDisease}
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
                                <Colxx sm={1} md={1} xl={1}>
                                    {index > 0 && (
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
                                    )}
                                </Colxx>
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
                            Tambah Diagnosis Rujukan
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
                                  // value={selectedDivision.find(item => item.value === reference.id_poli) || ''}
                                  options={selectedDivision}
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
                                  name="id_poli"
                                  // value={selectedHospital.find(item => item.value === reference.id_poli) || ''}
                                  options={selectedHospital}
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
                            onClick={(e) => onRecordSubmit(e)}>
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