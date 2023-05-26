const api = {
  base: process.env.REACT_APP_BASE_PATHV1,
  auth: {
    login: "/karyawan/login",
    uploadPhoto: "/karyawan/photo",
    updatePassword: "/karyawan/password",
  },
  employee: {
    all: "/karyawan",
    updatePhoto: "/karyawan/photo",
    updatePassword: "/karyawan/password",
    archive: "/karyawan/archive",
    activate: "/karyawan/activate",
  },
  clinic: {
    all: "/klinik",
    archive: "/klinik/archive",
    activate: "/klinik/activate",
  },
  division: {
    all: "/divisi",
    byClinic: "/divisi/clinic",
    archive: "/divisi/archive",
    activate: "/divisi/activate",
  },
  shift: {
    all: "/shift",
    byClinic: "/shift/clinic",
    archive: "/shift/archive",
    activate: "/shift/activate",
    delete: "/shift",
  },
  schedule: "/jaga",
  patient: {
    all: "/pasien",
    archive: "/pasien/archive",
    activate: "/pasien/activate",
  },
  insurance: {
    all: "/asuransi",
    class: "/asuransi-kelas",
    classByInsurance: "/asuransi-kelas/asuransi",
  },
  allergy: "/alergi", // MASTER OF 'ALERGI' FIELD
  patientAllergy: {
    // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
    all: "/alergi-pasien",
    patient: "/alergi-pasien/pasien",
  },
  participant: {
    // JOIN TABLE ID ALERGY TO ID PATIENT AND ID RECORD
    all: "/peserta",
    patient: "/peserta/pasien",
  },
  queue: "/antrian",
  vitalSigns: {
    all: "/vital-signs",
    patient: "/vital-signs/pasien",
  },
  record: {
    all: "/kunjungan",
    patient: "/kunjungan/pasien",
    temp: "/temp-kunjungan", // JOIN TABLE ID RECORD TO ID VITAL SIGNS
  },
  diagnose: "/diagnosis",
  reciept: "/resep",
  treatment: {
    all: "/tindakan",
    list: "/daftar-tindakan", // MASTER OF 'NAMA TINDAKAN' FIELD
    archiveList: "/daftar-tindakan/archive",
    activateList: "/daftar-tindakan/activate",
    clinicList: "/daftar-tindakan/klinik",
    price: "/harga-tindakan", // MASTER OF 'HARGA TINDAKAN' FIELD,
    clinicPrice: "/harga-tindakan/klinik", // MASTER OF 'HARGA TINDAKAN' FIELD,
    archivePrice: "/harga-tindakan/archive",
    activatePrice: "/harga-tindakan/activate",
  },
  service: {
    all: "/layanan",
    list: "/daftar-layanan", // MASTER OF 'NAMA LAYANAN' FIELD
    archiveList: "/daftar-layanan/archive",
    activateList: "/daftar-layanan/activate",
    clinicList: "/daftar-layanan/klinik",
    price: "/harga-layanan", // MASTER OF 'HARGA LAYANAN' FIELD,
    clinicPrice: "/harga-layanan/klinik", // MASTER OF 'HARGA LAYANAN' FIELD,
    archivePrice: "/harga-layanan/archive",
    activatePrice: "/harga-layanan/activate",
  },
  disease: "/penyakit", // MASTER OF 'PENYAKIT' FIELD
  medicine: "/obat", // MASTER OF 'OBAT' FIELD
  lab: {
    all: "/laboratorium", // MASTER OF 'LABORATORIUM' FIELD
    treatment: "/layanan-laboratorium", // JOIN TABLE ID LAB TO ID PEMERIKSAAN
  },
  reference: {
    all: "/rujukan",
    diagnose: "/diagnosis-rujukan", // MASTER OF 'POLI RUJUKAN' FIELD
    division: "/poli", // MASTER OF 'POLI RUJUKAN' FIELD
    hospital: "/rs", // MASTER OF 'RS RUJUKAN' FIELD
  },
  inspect: {
    all: "/pemeriksaan", // MASTER OF 'PEMERIKSAAN' FIELD
    treatment: "/pemeriksaan/layanan-lab", // GET LAB BY TREATMENT
    support: "/pemeriksaan-penunjang", // JOIN TABLE ID RECORD TO ID LAB TO ID INSPECT
  },
};

export default api;
