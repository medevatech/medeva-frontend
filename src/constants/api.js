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
    activate: '/karyawan/activate',
    contract: '/kontrak',
    contractByEmployee: '/kontrak/karyawan'
  },
  clinic: {
    all: '/klinik',
    archive: '/klinik/archive',
    activate: '/klinik/activate'
  },
  division: {
    all: '/divisi',
    archive: '/divisi/archive',
    activate: '/divisi/activate',
    distinct: "/divisi/distinct",
  },
  shift: {
    all: "/shift",
    byClinic: "/shift/klinik",
    byDivision: "/shift/divisi",
    bySchedule: "/shift/jaga",
    byEmployee: "/shift/personal",
    archive: "/shift/archive",
    activate: "/shift/activate"
  },
  schedule: {
    all: "/jadwal-jaga",
    byDivision: "/jadwal-jaga/divisi",
    byEmployee: "/jadwal-jaga/personal",
    distinct: "/jadwal-jaga/distinct",
    today: "/jadwal-jaga/today",
    archive: "/jadwal-jaga/archive",
    activate: "/jadwal-jaga/activate",
  },
  doctorSchedule: {
    all: "/praktik",
    archive: "/praktik/archive",
    activate: "/praktik/activate",

  },
  patient: {
    all: '/pasien',
    archive: '/pasien/archive',
    activate: '/pasien/activate',
    clinicalRules: '/tata-laksana',
    registered: '/terdaftar',
    registeredByClinic: '/terdaftar/klinik',
    registeredByPatient: '/terdaftar/pasien',
    registeredArchive: '/terdaftar/archive',
    registeredActivate: '/terdaftar/activate'
  },
  insurance: {
    all: '/asuransi',
    class: '/asuransi-kelas',
    classByInsurance: '/asuransi-kelas/asuransi',
    archive: "/asuransi/archive",
    activate: "/asuransi/activate",
    dashboard: "dashboard/as-02",
    dashboardPPS: "dashboard/as-03",
    dashboardPPSByDoctor: "dashboard/as-03/analisa-rujukan",
    dashboardFFSP: "dashboard/as-04",
    dashboardFFSNP: "dashboard/as-05"
  },
  partnership: {
    all: '/kerjasama',
    clinic: "/kerjasama/klinik",
    distinct: '/kerjasama/distinct',
    archive: "/kerjasama/archive",
    activate: "/kerjasama/activate",
    archiveByClinic: "/kerjasama/klinik/archive",
    activateByClinic: "/kerjasama/klinik/activate",
    deleteByClinic: "/kerjasama/klinik",
  },
  allergy: '/alergi', // MASTER OF 'ALERGI' FIELD
  patientAllergy: {  // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
    all: '/alergi-pasien',
    patient: '/alergi-pasien/pasien'
  },
  participant: {  // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
    all: '/peserta',
    patient: '/peserta/pasien'
  },
  queue: {
    all: "/antrian",
    sdiv: "/antrian/division",
  },
  vitalSigns: {
    all:  '/vital-signs',
    patient: '/vital-signs/pasien'
  },
  record: {
    all: '/kunjungan',
    patient: '/kunjungan/pasien',
    temp: '/temp-kunjungan', // JOIN TABLE ID RECORD TO ID VITAL SIGNS
  },
  diagnose: {
    all: '/diagnosis',
    record: '/diagnosis/kunjungan',
  },
  reciept: {
    all: 'resep',
    record: 'resep/kunjungan'
  },
  treatment: {
    all: '/tindakan',
    list: '/daftar-tindakan', // MASTER OF 'NAMA TINDAKAN' FIELD
    archiveList: '/daftar-tindakan/archive',
    activateList: '/daftar-tindakan/activate',
    clinicList: '/daftar-tindakan/klinik',
    price: '/harga-tindakan', // MASTER OF 'HARGA TINDAKAN' FIELD,
    clinicPrice: '/harga-tindakan/klinik', // MASTER OF 'HARGA TINDAKAN' FIELD,
    archivePrice: '/harga-tindakan/archive',
    activatePrice: '/harga-tindakan/activate',
    record: '/tindakan/kunjungan'
  },
  service: {
    all: '/layanan',
    list: '/daftar-layanan', // MASTER OF 'NAMA LAYANAN' FIELD
    archiveList: '/daftar-layanan/archive',
    activateList: '/daftar-layanan/activate',
    clinicList: '/daftar-layanan/klinik',
    price: '/harga-layanan', // MASTER OF 'HARGA LAYANAN' FIELD,
    clinicPrice: '/harga-layanan/klinik', // MASTER OF 'HARGA LAYANAN' FIELD,
    archivePrice: '/harga-layanan/archive',
    activatePrice: '/harga-layanan/activate',
    record: '/layanan/kunjungan',
    clinic: '/klinik-layanan',
    archiveClinic: '/klinik-layanan/archive',
    activateClinic: '/klinik-layanan/activate',
  },
  disease: {
    all: '/penyakit', // MASTER OF 'PENYAKIT' FIELD
    getAll: 'penyakit/all'
  },
  medService: {
    all: '/klinik-jasa',
    archive: '/klinik-jasa/archive',
    activate: '/klinik-jasa/activate',
    clinic: "/klinik-jasa/klinik",
  },
  medicine: {
    all: '/obat',  // MASTER OF 'OBAT' FIELD
    archive: '/obat/archive',
    activate: '/obat/activate',
    clinic: "/klinik-obat",
    archiveClinic: '/klinik-obat/archive',
    activateClinic: '/klinik-obat/activate',
  },
  consumables: {
    clinic: "/klinik-bhp",
    archiveClinic: '/klinik-bhp/archive',
    activateClinic: '/klinik-bhp/activate',
    service: "/layanan-bhp",
    archiveService: '/layanan-bhp/archive',
    activateService: '/layanan-bhp/activate',
  },
  lab: {
    all: '/laboratorium', // MASTER OF 'LABORATORIUM' FIELD
    archiveLab: '/laboratorium/archive',
    activateLab: '/laboratorium/activate',
    treatment: '/layanan-laboratorium', // JOIN TABLE ID LAB TO ID PEMERIKSAAN
    servicesByLab: '/layanan-laboratorium/laboratorium', // JOIN TABLE ID LAB TO ID PEMERIKSAAN
  },
  reference: {
    all: '/rujukan',
    record: '/rujukan/kunjungan',
    diagnose: '/diagnosis-rujukan', // MASTER OF 'POLI RUJUKAN' FIELD
    division: '/poli', // MASTER OF 'POLI RUJUKAN' FIELD
    hospital: '/rs', // MASTER OF 'RS RUJUKAN' FIELD
    diagnoseByRecord: '/diagnosis-rujukan/kunjungan',
    diagnoseByReference: '/diagnosis-rujukan/rujukan'
  },
  inspect: {
    all: '/pemeriksaan', // MASTER OF 'PEMERIKSAAN' FIELD,
    archiveInspect: '/pemeriksaan/archive',
    activateInspect: '/pemeriksaan/activate',
    treatment: '/pemeriksaan/layanan-lab', // GET LAB BY TREATMENT
    support: '/pemeriksaan-penunjang', // JOIN TABLE ID RECORD TO ID LAB TO ID INSPECT
    supportByRecord: 'pemeriksaan-penunjang/kunjungan'
  },
  property: {
    all: '/klinik-aset-tanah-bangunan',
    archive: '/klinik-aset-tanah-bangunan/archive',
    activate: '/klinik-aset-tanah-bangunan/activate',
    clinic: "/klinik-aset-tanah-bangunan/klinik",
  },
  vendor: {
    all: '/vendor',
    archive: '/vendor/archive',
    activate: '/vendor/activate',
  }
}

export default api
