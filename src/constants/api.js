const api = {
  base: process.env.REACT_APP_BASE_PATHV1,
  auth: {
    login: '/karyawan/login',
    uploadPhoto: '/karyawan/photo',
    updatePassword: '/karyawan/password'
  },
  employee: {
    all: '/karyawan',
    updatePhoto: '/karyawan/photo',
    updatePassword: '/karyawan/password',
    archive: '/karyawan/archive',
    activate: '/karyawan/activate'
  },
  clinic: {
    all: '/klinik',
    archive: '/klinik/archive',
    activate: '/klinik/activate'
  },
  division: {
    all: '/divisi',
    archive: '/divisi/archive',
    activate: '/divisi/activate'
  },
  shift: '/shift',
  schedule: '/jaga',
  patient: {
    all: '/pasien',
    archive: '/pasien/archive',
    activate: '/pasien/activate'
  },
  insurance: {
    all: '/asuransi',
    patient: '/asuransi/pasien',
    edit: '/asuransi/edit'
  },
  allergy: '/alergi', // MASTER OF 'ALERGI' FIELD
  patientAllergy: {  // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
    all: '/alergi-pasien',
    patient: '/alergi-pasien/pasien'
  },
  queue: '/antrian',
  vitalSigns: {
    all:  '/vital-signs',
    patient: '/vital-signs/pasien'
  },
  record: {
    all: '/kunjungan',
    patient: '/kunjungan/pasien'
  },
  diagnose: '/diagnosis',
  reciept: '/resep',
  treatment: '/tindakan',
  reference: '/rujukan',
  tempRecord: '/temp-kunjungan', // JOIN TABLE ID RECORD TO ID VITAL SIGNS
  disease: '/penyakit', // MASTER OF 'PENYAKIT' FIELD
  medicine: '/obat', // MASTER OF 'OBAT' FIELD
  lab: '/laboratorium', // MASTER OF 'LABORATORIUM' FIELD
  labTreatment: '/layanan-laboratorium', // JOIN TABLE ID LAB TO ID PEMERIKSAAN
  treatmentList: '/daftar-tindakan', // MASTER OF 'TINDAKAN' FIELD
  diagnoseReference: '/diagnosis-rujukan', // MASTER OF 'POLI RUJUKAN' FIELD
  divisionReference: '/poli', // MASTER OF 'POLI RUJUKAN' FIELD
  hospitalReference: '/rs', // MASTER OF 'RS RUJUKAN' FIELD
  inspect: {
    all: '/pemeriksaan',
    treatment: '/pemeriksaan/layanan-lab',
  }, // MASTER OF 'PEMERIKSAAN' FIELD
  inspectSupport: '/pemeriksaan-penunjang', // JOIN TABLE ID RECORD TO ID LAB TO ID INSPECT
}

export default api
