import React, { useState, useEffect } from 'react';
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
  Badge,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';
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

import { Wizard, Steps, Step } from 'react-albus';
import TopNavigation from 'components/wizard/TopNavigation';

import vitalSignsAPI from "api/vital-signs";
import diseaseAPI from "api/disease";
import medicineAPI from "api/medicine";
import labAPI from "api/lab";
import treatmentListAPI from "api/treatment-list";
import divisionReferenceAPI from "api/division-reference";
import hospitalReferenceAPI from "api/hospital-reference";
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
  { label: 'Promotif', value: 'Promotif', key: 0, name: 'tipe' },
  { label: 'Preventif', value: 'Preventif', key: 1, name: 'tipe' },
  { label: 'Rawat Inap', value: 'Rawat Inap', key: 2, name: 'tipe' },
  { label: 'Rawat Jalan', value: 'Rawat Jalan', key: 3, name: 'tipe' }
];

const selectPcs = [
  { label: 'Kapsul', value: 'Kapsul', key: 0, name: 'satuan' },
  { label: 'Tablet', value: 'Tablet', key: 1, name: 'satuan' },
  { label: 'Kaplet', value: 'Kaplet', key: 2, name: 'satuan' },
  { label: 'Puyer', value: 'Puyer', key: 3, name: 'satuan' },
  { label: 'Mililiter', value: 'Mililiter', key: 4, name: 'satuan' },
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

const FormRecord = ({ match, history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataStatus, setDataStatus] = useState("add");

  let patientID = null;
  let patientData = null;
  let recordID = null;

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

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('resep');

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
    keluhan: ''
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
    { id: Math.random(), id_kunjungan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([{ label: ""}]);

  const addDiagnosisFields = () => {
    let newfieldDiagnosis = { id: Math.random(), id_kunjungan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setDiagnosis([...diagnosis, newfieldDiagnosis]);

    let newfieldDropdownDiagnosis = { label: "" };
    setSelectedDiagnosis([...selectedDiagnosis, newfieldDropdownDiagnosis]);
  };

  const removeDiagnosisFields = (id, index) => {
    let dataDiagnosis1 = [...diagnosis]; let displaySelectDiagnosis1 = [...selectedDiagnosis];
    dataDiagnosis1.splice(index, 1);
    displaySelectDiagnosis1.splice(index, 1);
    setDiagnosis(dataDiagnosis1);
    setSelectedDiagnosis(displaySelectDiagnosis1);
  };

  const handleDiagnosisChange = (index, event) => {
    console.log('handleDiagnosisChange', event);

    let dataDiagnosis2 = [...diagnosis]; let displaySelectDiagnosis = [...selectedDiagnosis];

    if (event.name === "id_penyakit"){
      dataDiagnosis2[index][event.name] = event.value;
      displaySelectDiagnosis[index]["label"] = event.label;

    } else if(event.target.name === "tipe_diagnosis") {
      let wd = false; let dd = false;

      if(event.target.id === 'tipe_wd') {
        wd = true;
      }
      
      if(event.target.id === 'tipe_dd') {
        dd = true;
      }

      dataDiagnosis2[index]['tipe_wd'] = wd;
      dataDiagnosis2[index]['tipe_dd'] = dd;
    }

    setDiagnosis(dataDiagnosis2);
    setSelectedDiagnosis(displaySelectDiagnosis);

    // console.log('diagnosis', diagnosis);
    // console.log('selectedDiagnosis', selectedDiagnosis);
  };

  const [reciept, setReciept] = useState([
    { id: Math.random(), id_kunjungan: "", id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
  ]);
  const [selectedMedicine, setSelectedMedicine] = useState([{ label: ""}]);
  const [selectedReciept, setSelectedReciept] = useState([{ label: ""}]);
  const [selectedPcs, setSelectedPcs] = useState([{ label: ""}]);
  const [selectedPeriod, setSelectedPeriod] = useState([{ label: ""}]);
  const [selectedRules, setSelectedRules] = useState([{ label: ""}]);
  const [selectedConsume, setSelectedConsume] = useState([{ label: ""}]);

  const addRecieptFields = () => {
    let newfieldReciept = { id: Math.random(), id_kunjungan: "", id_obat: "", jumlah: 0, satuan: "", frekuensi: 0, periode: "", aturan_pakai: "", metode_konsumsi: "" }
    setReciept([...reciept, newfieldReciept]);

    let newfieldDropdownMedicine = { label: "" };
    setSelectedMedicine([...selectedMedicine, newfieldDropdownMedicine]);

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
  };

  const handleRecieptChange = (index, event) => {
    console.log('handleRecieptChange', event);

    let dataReciept = [...reciept];
    let displaySelectMedicine = [...selectedMedicine];
    let displaySelectPcs = [...selectedPcs];
    let displaySelectPeriod = [...selectedPeriod];
    let displaySelectRules = [...selectedRules];
    let displaySelectConsume = [...selectedConsume];

    if (event.name === "id_obat"){
      dataReciept[index][event.name] = event.value;
      displaySelectMedicine[index]["label"] = event.label;
    } else if (event.name === "id_obat"){
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

    console.log('reciept', reciept);
    console.log('selectedMedicine', selectedMedicine);
    console.log('selectedPcs', selectedPcs);
    console.log('selectedPeriod', selectedPeriod);
    console.log('selectedRules', selectedRules);
    console.log('selectedConsume', selectedConsume);
  };

  const [checkup, setCheckup] = useState([
    { id: Math.random(), id_kunjungan: "", id_laboratorium: "", id_pemeriksaan: "" }
  ]);
  const [selectedLab, setSelectedLab] = useState([{ label: ""}]);
  const [selectedTreatment, setSelectedTreatment] = useState([]);

  const addCheckupFields = () => {
    let newfieldCheckup = { id: Math.random(), id_kunjungan: "", id_laboratorium: "", id_pemeriksaan: "" }
    setCheckup([...checkup, newfieldCheckup]);

    let newfieldDropdownLab = { label: "" };
    setSelectedLab([...selectedLab, newfieldDropdownLab]);

    let newfieldDropdownTreatment = [];
    setSelectedTreatment([...selectedTreatment, newfieldDropdownTreatment]);
  };

  const removeCheckupFields = (id, index) => {
    let dataCheckup = [...checkup];
    let displaySelectLab = [...selectedLab];
    let displaySelectTreatment = [...selectedTreatment];

    dataCheckup.splice(index, 1);
    displaySelectLab.splice(index, 1);
    displaySelectTreatment.splice(index, 1);

    setCheckup(dataCheckup);
    setSelectedLab(displaySelectLab);
    setSelectedTreatment(displaySelectTreatment);
  };

  const handleCheckupChange = (index, event) => {
    console.log('handleCheckupChange', event);

    let dataCheckup = [...checkup];
    let displaySelectLab = [...selectedLab];
    let displaySelectTreatment = [...selectedTreatment];

    if (event.name === "id_laboratorium"){
      dataCheckup[index][event.name] = event.value;
      displaySelectLab[index]["label"] = event.label;
    } else if (event.name === "id_pemeriksaan"){
      dataCheckup[index][event.name] = event.value;
      displaySelectTreatment[index]["label"] = event.label;
    } else {
      dataCheckup[index][event.target.name] = event.target.value;
    }

    setCheckup(dataCheckup);
    setSelectedLab(displaySelectLab);
    setSelectedTreatment(displaySelectTreatment);

    console.log('checkup', checkup);
    console.log('selectedLab', selectedLab);
    console.log('selectedTreatment', selectedTreatment);
  };

  const [action, setAction] = useState([
    { id: Math.random(), id_kunjungan: "", id_tindakan: "", catatan: "" }
  ]);
  const [selectedAction, setSelectedAction] = useState([{ label: ""}]);

  const addActionFields = () => {
    let newfieldAction = { id: Math.random(), id_kunjungan: "", id_tindakan: "", catatan: "" }
    setAction([...action, newfieldAction]);

    let newfieldDropdownAction = { label: "" };
    setSelectedAction([...selectedAction, newfieldDropdownAction]);
  };

  const removeActionFields = (id, index) => {
    let dataAction = [...action];
    let displaySelectAction = [...selectedAction];

    dataAction.splice(index, 1);
    displaySelectAction.splice(index, 1);

    setAction(dataAction);
    setSelectedAction(displaySelectAction);
  };

  const handleActionChange = (index, event) => {
    console.log('handleActionChange', event);

    let dataAction = [...action];
    let displaySelectAction = [...selectedAction];

    if (event.name === "id_tindakan"){
        dataAction[index][event.name] = event.value;
        displaySelectAction[index]["label"] = event.label;
    } else {
        dataAction[index][event.target.name] = event.target.value;
    }

    setAction(dataAction);
    setSelectedAction(displaySelectAction);

    console.log('action', action);
    console.log('selectedAction', selectedAction);
  };

  const [reference, setReference] = useState([
    { id: Math.random(), id_rujukan: "", id_poli: "", id_rs: "", anamnesis: "", terapi: "", catatan: "" }
  ]);
  const [referenceDiagnosis, setReferenceDiagnosis] = useState([
    { id: Math.random(), id_rujukan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false }
  ]);
  const [selectedReferenceDiagnosis, setSelectedReferenceDiagnosis] = useState([{ label: ""}]);

  const addReferenceDiagnosisFields = () => {
    let newfieldReferenceDiagnosis = { id: Math.random(), id_rujukan: "", id_penyakit: "", tipe_wd: false, tipe_dd: false };
    setReferenceDiagnosis([...referenceDiagnosis, newfieldReferenceDiagnosis]);

    let newfieldDropdownReferenceDiagnosis = { label: "" };
    setSelectedReferenceDiagnosis([...selectedReferenceDiagnosis, newfieldDropdownReferenceDiagnosis]);
  };

  const removeReferenceDiagnosisFields = (id, index) => {
    let dataReferenceDiagnosis = [...referenceDiagnosis];
    let displaySelectReferenceDiagnosis = [...selectedReferenceDiagnosis];

    dataReferenceDiagnosis.splice(index, 1);
    displaySelectReferenceDiagnosis.splice(index, 1);

    setReferenceDiagnosis(dataReferenceDiagnosis);
    setSelectedReferenceDiagnosis(displaySelectReferenceDiagnosis);
  };

  const handleReferenceDiagnosisChange = (index, event) => {
    console.log('handleReferenceDiagnosisChange', event);

    let dataReferenceDiagnosis = [...referenceDiagnosis];
    let displaySelectReferenceDiagnosis = [...selectedReferenceDiagnosis];

    if (event.name === "id_penyakit"){
      dataReferenceDiagnosis[index][event.name] = event.value;
      displaySelectReferenceDiagnosis[index]["label"] = event.label;
    } else if(event.target.name === "tipe_diagnosis") {
      let wd = false; let dd = false;

      if(event.target.id === 'tipe_wd') {
        wd = true;
      }
      
      if(event.target.id === 'tipe_dd') {
        dd = true;
      }

      displaySelectReferenceDiagnosis[index]['tipe_wd'] = wd;
      displaySelectReferenceDiagnosis[index]['tipe_dd'] = dd;
    }

    setReferenceDiagnosis(dataReferenceDiagnosis);
    setSelectedReferenceDiagnosis(displaySelectReferenceDiagnosis);

    // console.log('diagnosis', diagnosis);
    // console.log('selectedDiagnosis', selectedDiagnosis);
  };

  const getRecordByPatientId = async (e, id) => {
    // resetForm(e);

    if(id){
      setDataStatus("update");

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
          keluhan: data.keluhan
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
      setDataStatus("add");

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
        keluhan: ''
      });
    }

    // console.log(dataStatus);
  };

  const onRecordSubmit = async (e) => {
    e.preventDefault();

    // console.log(record);
    if(dataStatus === 'add') {
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

          resetForm(e);
          history.push("/record");
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
    } else if(dataStatus === 'update') {
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

          resetForm(e);
          history.push("/record");
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
      console.log('dataStatus undefined')
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
      keluhan: ''
    });
    
    setIsChecked(false);
    setSelectedType("");
    setSelectedVisitation("");
    setSelectedPrognosa("");

    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
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

      setSelectedLab([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedLab((current) => [
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

  const onLoadTindakan = async () => {
    try {
      const response = await treatmentListAPI.get("", "?limit=1000");
      // console.log(response);

      setSelectedTreatment([]);

      if (response.status === 200) {
        let data = response.data.data;
        // console.log(data);
      
        for (var i = 0; i < data.length; i++) {
            setSelectedTreatment((current) => [
            ...current,
            { label: data[i].nama, value: data[i].id, key: data[i].id, name: 'id_tindakan' },
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
        recordID && getRecordByPatientId("", recordID);
    }
  };

  useEffect(() => {
    onLoadPenyakit();
    onLoadObat();
    onLoadLab();
    onLoadTindakan();
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
                        { vitalSigns.id_pasien ? moment(vitalSigns.created_at).format("DD MMM YYYY - HH:mm") : 'Tanggal / Waktu' }
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
                <Form className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation
                            className="justify-content-center"
                            disableNav={false}
                            topNavClick={topNavClick}
                        />
                        <Steps>
                            <Step
                                id="step1"
                                name="Rekam Medis"
                            >
                                <div className="wizard-basic-step">
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

                                    <Colxx sm={6}>
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

                                    <Colxx sm={12}>
                                        <FormGroup>
                                            <Label for="anamnesis">
                                            Anamnesis
                                            </Label>
                                            <Input
                                            type="textarea"
                                            name="anamnesis"
                                            id="anamnesis"
                                            placeholder="Anamnesis"
                                            style={{minHeight: '100'}}
                                            value={record.anamnesis}
                                            onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={12}>
                                        <FormGroup>
                                            <Label for="pemeriksaan_fisik">
                                            Pemeriksaan Fisik
                                            </Label>
                                            <Input
                                            type="textarea"
                                            name="pemeriksaan_fisik"
                                            id="pemeriksaan_fisik"
                                            placeholder="Pemeriksaan Fisik"
                                            style={{minHeight: '100'}}
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

                                    <Colxx sm={6}>
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

                                    <Colxx sm={12}>
                                        <FormGroup>
                                            <Label for="keluhan">
                                            Keluhan
                                            </Label>
                                            <Input
                                            type="textarea"
                                            name="keluhan"
                                            id="keluhan"
                                            placeholder="Keluhan"
                                            style={{minHeight: '100'}}
                                            value={record.keluhan}
                                            onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </FormGroup>
                                </div>
                            </Step>
                            <Step id="step2" name="Diagnosis">
                                <div className="wizard-basic-step">
                                    <FormGroup row>
                                        <Colxx sm={5}>
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
                                        </Colxx>
                                        <Colxx sm={7}>
                                            <Label for="tipe_diagnosis">
                                                Tipe
                                            </Label>
                                        </Colxx>

                                        {diagnosis.map((input, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Colxx sm={5}>
                                                        <FormGroup>
                                                            <Select
                                                                components={{ Input: CustomSelectInput }}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                name="id_penyakit"
                                                                // value={selectedDisease.find(item => item.value === diagnosis.id_penyakit) || ''}
                                                                options={selectedDisease}
                                                                onChange={(event) => handleDiagnosisChange(index, event)}
                                                            />
                                                        </FormGroup>
                                                    </Colxx>
                                                    <Colxx sm={7}>
                                                        <FormGroup>
                                                            <Row>
                                                                <Colxx sm={6} md={5} xl={5}>
                                                                    <CustomInput
                                                                        // checked={record.tipe_wd}
                                                                        type="checkbox"
                                                                        name="tipe_diagnosis"
                                                                        id="tipe_wd"
                                                                        label="Working Diagnosis"
                                                                        // value={diagnosis.tipe_wd}
                                                                        onChange={(event) => handleDiagnosisChange(index, event)}
                                                                    />
                                                                </Colxx>
                                                                <Colxx sm={5} md={6} xl={6}>
                                                                    <CustomInput
                                                                        // checked={record.tipe_dd}
                                                                        type="checkbox"
                                                                        name="tipe_diagnosis"
                                                                        id="tipe_dd"
                                                                        label="Differential Diagnosis"
                                                                        // value={diagnosis.tipe_dd}
                                                                        onChange={(event) => handleDiagnosisChange(index, event)}
                                                                    />
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
                                                            </Row>
                                                        </FormGroup>
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
                                </div>
                            </Step>
                            <Step id="step3" name="Tata Laksana">
                                <div className="wizard-basic-step" id="nav-tata-laksana">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="resep">
                                            <FormGroup>
                                                {reciept.map((input, index) => {
                                                    return (
                                                        <div key={index} className="med-record-form">
                                                            <FormGroup row>
                                                                <Colxx sm={10} md={10} xl={10}>
                                                                    <FormGroup>
                                                                        <Label for="id_obat">
                                                                            Obat
                                                                        </Label>
                                                                        <Select
                                                                            components={{ Input: CustomSelectInput }}
                                                                            className="react-select"
                                                                            classNamePrefix="react-select"
                                                                            name="id_obat"
                                                                            // value={selectedMedicine.find(item => item.value === reciept.id_obat) || ''}
                                                                            options={selectedMedicine}
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                    </FormGroup>
                                                                </Colxx>
                                                                {index > 0 && (
                                                                    <Colxx sm={1} md={1} xl={1} rowSpan="3">
                                                                        <Label>
                                                                            &nbsp;&nbsp;
                                                                        </Label>
                                                                        <Button
                                                                            color="danger"
                                                                            style={{ float: "right" }}
                                                                            onClick={() =>
                                                                                removeRecieptFields(input.id, index)
                                                                            }
                                                                            className="remove-reciept"
                                                                        >
                                                                            <i className="simple-icon-trash"></i>
                                                                        </Button>
                                                                    </Colxx>
                                                                )}
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Colxx sm={5} md={5} xl={5}>
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
                                                                            value={reciept.jumlah}
                                                                            pattern="[0-9]*"
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                        <Select
                                                                            addonType="prepend"
                                                                            components={{ Input: CustomSelectInput }}
                                                                            className="react-select select-reciept"
                                                                            classNamePrefix="react-select"
                                                                            name="satuan"
                                                                            value={selectedPcs.find(item => item.value === reciept.satuan) || ''}
                                                                            options={selectPcs}
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                    </InputGroup>
                                                                </Colxx>
                                                                <Colxx sm={5} md={5} xl={5}>
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
                                                                            value={reciept.frekuensi}
                                                                            pattern="[0-9]*"
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                        <Select
                                                                            addonType="prepend"
                                                                            components={{ Input: CustomSelectInput }}
                                                                            className="react-select select-reciept"
                                                                            classNamePrefix="react-select"
                                                                            name="periode"
                                                                            value={selectedPeriod.find(item => item.value === reciept.periode) || ''}
                                                                            options={selectPeriod}
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                    </InputGroup>
                                                                </Colxx>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Colxx sm={5} md={5} xl={5}>
                                                                    <Label for="aturan_pakai">
                                                                        Aturan Pakai
                                                                    </Label>
                                                                    <Select
                                                                        components={{ Input: CustomSelectInput }}
                                                                        className="react-select"
                                                                        classNamePrefix="react-select"
                                                                        name="aturan_pakai"
                                                                        // value={selectedRules.find(item => item.value === reciept.aturan_pakai) || ''}
                                                                        options={selectRules}
                                                                        onChange={(event) => handleRecieptChange(index, event)}
                                                                    />
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
                                                                            // value={selectedConsume.find(item => item.value === reciept.metode_konsumsi) || ''}
                                                                            options={selectConsume}
                                                                            onChange={(event) => handleRecieptChange(index, event)}
                                                                        />
                                                                    </FormGroup>
                                                                </Colxx>
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
                                        </TabPane>
                                        <TabPane tabId="pemeriksaan">
                                            <Row>
                                                <Colxx xxs="12" lg="12">
                                                    <h3>Ini Pemeriksaan</h3>
                                                </Colxx>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="tindakan">
                                            <Row>
                                                <Colxx xxs="12" lg="12">
                                                    <h3>Ini Tindakan</h3>
                                                </Colxx>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="rujukan">
                                            <Row>
                                                <Colxx xxs="12" lg="12">
                                                    <h3>Ini Rujukan</h3>
                                                </Colxx>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                    
                                    <Nav tabs className="separator-tabs ml-0 mt-5">
                                        <NavItem>
                                            <a
                                                className={classnames({
                                                active: activeTab === 'resep',
                                                'nav-link': true,
                                                'nav-tata-laksana': true,
                                                })}
                                                aria-disabled="true"
                                                onClick={() => setActiveTab('resep')}
                                            >
                                                Resep
                                            </a>
                                        </NavItem>
                                        <NavItem>
                                            <a
                                                className={classnames({
                                                active: activeTab === 'pemeriksaan',
                                                'nav-link': true,
                                                'nav-tata-laksana': true,
                                                })}
                                                aria-disabled="true"
                                                onClick={() => setActiveTab('pemeriksaan')}
                                            >
                                                Pemeriksaan
                                            </a>
                                        </NavItem>
                                        <NavItem>
                                            <a
                                                className={classnames({
                                                active: activeTab === 'tindakan',
                                                'nav-link': true,
                                                'nav-tata-laksana': true,
                                                })}
                                                aria-disabled="true"
                                                onClick={() => setActiveTab('tindakan')}
                                            >
                                                Tindakan
                                            </a>
                                        </NavItem>
                                        <NavItem>
                                            <a
                                                className={classnames({
                                                active: activeTab === 'rujukan',
                                                'nav-link': true,
                                                'nav-tata-laksana': true,
                                                })}
                                                aria-disabled="true"
                                                onClick={() => setActiveTab('rujukan')}
                                            >
                                                Rujukan
                                            </a>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </Step> 
                        </Steps>
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
                    </Wizard>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
    </>
  );
};
export default FormRecord;