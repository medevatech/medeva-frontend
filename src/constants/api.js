const api = {
  base: process.env.REACT_APP_BASE_PATHV1,
  auth: {
    login: '/karyawan/login',
    uploadPhoto: '/karyawan/photo',
    updatePassword: '/karyawan/password'
  },
  employee: {
    all: '/karyawan/',
    updatePhoto: '/karyawan/photo',
    updatePassword: '/karyawan/password'
  },
  clinic: '/klinik',
  division: '/divisi',
  shift: '/shift',
  schedule: '/jaga',
  patient: '/pasien',
  insurance: '/asuransi',
  allergy: '/alergi', // MASTER OF 'ALERGI' FIELD
  patientAllergy: '/alergi-pasien', // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
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
