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
  clinic: '/klinik',
  division: '/divisi',
  shift: '/shift',
  schedule: '/jaga',
  patient: '/pasien',
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
  vitalSigns: '/vital-signs',
  record: '/kunjungan',
  tempRecord: '/temp-kunjungan', // JOIN TABLE ID RECORD TO ID VITAL SIGNS
  disease: '/penyakit', // MASTER OF 'DIAGNOSIS' FIELD
  diagnose: '/diagnosis', // MASTER OF 'DIAGNOSIS' FIELD
  inspect: '/pemeriksaan', // MASTER OF 'PEMERIKSAAN' FIELD
  inspectSupport: '/pemeriksaan-penunjang', // JOIN TABLE ID RECORD TO ID PATIENT AND 
  poly: '/poli', // MASTER OF 'POLI' FIELD
}

export default api
