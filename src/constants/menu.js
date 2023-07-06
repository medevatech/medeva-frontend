

const userData = JSON.parse(localStorage.getItem('user_data'));
// console.log('roles', userData.roles);

let data = [];

if(userData.roles.includes('isDev') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`
    },
    {
      id: 'patient',
      icon: 'iconsminds-add-user',
      label: 'Pasien',
      to: `/patient`,
    },
    {
      id: 'insurance',
      icon: 'iconsminds-financial',
      label: 'Asuransi',
      to: `/insurance`,
      subs: [
        {
          icon: 'iconsminds-bar-chart-4',
          label: 'Dashboard Asuransi',
          to: `/insurance/dashboard`,
        },
        // {
        //   icon: 'iconsminds-library',
        //   label: 'Daftar Asuransi',
        //   to: `/insurance/list`,
        // },
        {
          icon: 'iconsminds-handshake',
          label: 'Kerjasama Asuransi',
          to: `/insurance/partnership`,
        },
      ]
    },
    {
      id: 'queue',
      icon: 'iconsminds-profile',
      label: 'Antrian',
      to: `/queue`,
    },
    {
      id: 'record',
      icon: 'iconsminds-stethoscope',
      label: 'Kunjungan',
      to: `/record`,
      subs: [
        {
          icon: 'iconsminds-pulse',
          label: 'Pra-Konsultasi',
          to: `/record/vital-signs`,
        },
        {
          icon: 'iconsminds-notepad',
          label: 'Rekam Medis',
          to: `/record`,
        },
      ]
    },
    {
      id: 'division',
      icon: 'iconsminds-office',
      label: 'Poli / Divisi',
      to: `/division`,
    },
    {
      id: 'employee',
      icon: 'iconsminds-male-female',
      label: 'Karyawan',
      to: `/employee`,
    },
    {
      id: 'schedule',
      icon: 'iconsminds-calendar-4',
      label: 'Jadwal Jaga',
      to: `/schedule`,
      subs: [
        {
          icon: 'iconsminds-doctor',
          label: 'Jadwal Dokter',
          to: `/schedule/manage-doctor`,
        },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Tenaga Kesehatan',
          to: `/schedule/manage-employee`,
        }
      ]
    },
    {
      id: 'service',
      icon: 'iconsminds-medical-sign',
      label: 'Layanan',
      to: '/service',
      subs: [
        {
          icon: 'iconsminds-ambulance',
          label: 'Tindakan',
          to: `/treatment/price`,
        },
        {
          icon: 'iconsminds-first-aid',
          label: 'Layanan',
          to: `/service/price`,
        },
        {
          icon: 'iconsminds-books',
          label: 'Paket',
          to: `/package/price`,
        },
        {
          icon: 'iconsminds-medicine-3',
          label: 'Obat',
          to: `/medicine/clinic`,
        },
        {
          icon: 'iconsminds-test-tube',
          label: 'BHP',
          to: `/bhp/clinic`,
        },
        {
          icon: 'iconsminds-doctor',
          label: 'Jasa Medis',
          to: `/med-service/price`,
        },
        {
          icon: 'iconsminds-flask',
          label: 'Laboratorium',
          to: `/lab/price`,
        },
      ]
    },
    {
      id: 'inventory',
      icon: 'iconsminds-box-with-folders',
      label: 'Inventori',
      to: `/inventory`,
      subs: [
        {
          icon: 'iconsminds-test-tube',
          label: 'BHP',
          to: `/bhp/inventory`,
        },
        {
          icon: 'iconsminds-plaster',
          label: 'BNMHP',
          to: `/bnmhp/inventory`,
        },
        {
          icon: 'iconsminds-medicine-3',
          label: 'Obat',
          to: `/medicine/inventory`,
        },
        {
          icon: 'iconsminds-microscope',
          label: 'PMK',
          to: `/pmk/inventory`,
        },
        {
          icon: 'iconsminds-plasmid',
          label: 'PNMK',
          to: `/pnmk/inventory`,
        },
      ]
    },
    {
      id: 'purchasing',
      icon: 'iconsminds-shopping-cart',
      label: 'Purchasing',
      to: `/purchasing`,
    },
    {
      id: 'point-of-sales',
      icon: 'iconsminds-cash-register-2',
      label: 'Point of Sales',
      to: `/point-of-sales`,
    },
    {
      id: 'master-data',
      icon: 'iconsminds-big-data',
      label: 'Master Data',
      to: `/master-data`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Asuransi',
          to: `/master-data/insurance`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Tindakan',
          to: `/master-data/treatment`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Layanan',
          to: `/master-data/service`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Obat',
          to: `/master-data/medicine`,
        },
      ]
    },
  ];
} else {
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
    },
    {
      id: 'division',
      icon: 'iconsminds-office',
      label: 'Poli / Divisi',
      to: `/division`,
    },
    {
      id: 'employee',
      icon: 'iconsminds-male-female',
      label: 'Karyawan',
      to: `/employee`
    },
    {
      id: 'service',
      icon: 'iconsminds-medical-sign',
      label: 'Layanan',
      to: '/service',
      subs: [
        {
          icon: 'iconsminds-ambulance',
          label: 'Tindakan',
          to: `/treatment/price`,
        },
        {
          icon: 'iconsminds-first-aid',
          label: 'Layanan',
          to: `/service/price`,
        },
        {
          icon: 'iconsminds-medicine-3',
          label: 'Obat',
          to: `/medicine/clinic`,
        },
      ]
    },
    {
      id: 'master-data',
      icon: 'iconsminds-big-data',
      label: 'Master Data',
      to: `/master-data`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Tindakan',
          to: `/master-data/treatment`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Layanan',
          to: `/master-data/service`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Obat',
          to: `/master-data/medicine`,
        },
      ]
    },
  ];

  // if(userData.roles.includes('isManager') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     // {
  //     //   id: 'patient',
  //     //   icon: 'iconsminds-add-user',
  //     //   label: 'Pasien',
  //     //   to: `/patient`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     {
  //       id: 'insurance',
  //       icon: 'iconsminds-financial',
  //       label: 'Asuransi',
  //       to: `/insurance`,
  //       subs: [
  //         // {
  //         //   icon: 'iconsminds-bar-chart-4',
  //         //   label: 'Dashboard Asuransi',
  //         //   to: `/insurance/dashboard`,
  //         //   roles: [ "isDev", "isFinance", "isManajemen" ],
  //         // },
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Asuransi',
  //           to: `/insurance/list`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-handshake',
  //           label: 'Kerjasama Asuransi',
  //           to: `/insurance/partnership`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     // {
  //     //   id: 'queue',
  //     //   icon: 'iconsminds-profile',
  //     //   label: 'Antrian',
  //     //   to: `/queue`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'employee',
  //       icon: 'iconsminds-male-female',
  //       label: 'Karyawan',
  //       to: `/employee`,
  //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     },
  //     {
  //       id: 'division',
  //       icon: 'iconsminds-office',
  //       label: 'Poli / Divisi',
  //       to: `/division`,
  //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     },
  //     {
  //       id: 'treatment',
  //       icon: 'iconsminds-ambulance',
  //       label: 'Tindakan',
  //       to: `/treatment`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Tindakan',
  //           to: `/treatment/list`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Tindakan',
  //           to: `/treatment/price`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'service',
  //       icon: 'iconsminds-first-aid',
  //       label: 'Layanan',
  //       to: `/service`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Layanan',
  //           to: `/service/list`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Layanan',
  //           to: `/service/price`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'medicine',
  //       icon: 'iconsminds-medicine-3',
  //       label: 'Obat',
  //       to: `/medicine`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Obat',
  //           to: `/medicine/list`,
  //           roles: [ "isDev", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Obat',
  //           to: `/medicine/price`,
  //           roles: [ "isDev", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'schedule',
  //       icon: 'iconsminds-calendar-4',
  //       label: 'Jadwal Jaga',
  //       to: `/schedule`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-doctor',
  //           label: 'Jadwal Dokter',
  //           to: `/schedule/manage-doctor`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //         },
  //         {
  //           icon: 'iconsminds-male-female',
  //           label: 'Jadwal Non-Dokter',
  //           to: `/schedule/manage-employee`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //         },
  //       ]
  //     },
  //   ];
  // }
  
  // if(userData.roles.includes('isAdmin') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     // {
  //     //   id: 'patient',
  //     //   icon: 'iconsminds-add-user',
  //     //   label: 'Pasien',
  //     //   to: `/patient`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'insurance',
  //     //   icon: 'iconsminds-financial',
  //     //   label: 'Asuransi',
  //     //   to: `/insurance`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-bar-chart-4',
  //     //       label: 'Dashboard Asuransi',
  //     //       to: `/insurance/dashboard`,
  //     //       roles: [ "isDev", "isFinance", "isManajemen" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Asuransi',
  //     //       to: `/insurance/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-handshake',
  //     //       label: 'Kerjasama Asuransi',
  //     //       to: `/insurance/partnership`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'queue',
  //     //   icon: 'iconsminds-profile',
  //     //   label: 'Antrian',
  //     //   to: `/queue`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'employee',
  //       icon: 'iconsminds-male-female',
  //       label: 'Karyawan',
  //       to: `/employee`,
  //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     },
  //     {
  //       id: 'division',
  //       icon: 'iconsminds-office',
  //       label: 'Poli / Divisi',
  //       to: `/division`,
  //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     },
  //     {
  //       id: 'treatment',
  //       icon: 'iconsminds-ambulance',
  //       label: 'Tindakan',
  //       to: `/treatment`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Tindakan',
  //           to: `/treatment/list`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Tindakan',
  //           to: `/treatment/price`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'service',
  //       icon: 'iconsminds-first-aid',
  //       label: 'Layanan',
  //       to: `/service`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Layanan',
  //           to: `/service/list`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Layanan',
  //           to: `/service/price`,
  //           roles: [ "isDev", "isManager", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'medicine',
  //       icon: 'iconsminds-medicine-3',
  //       label: 'Obat',
  //       to: `/medicine`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-library',
  //           label: 'Daftar Obat',
  //           to: `/medicine/list`,
  //           roles: [ "isDev", "isAdmin" ],
  //         },
  //         {
  //           icon: 'iconsminds-wallet',
  //           label: 'Harga Obat',
  //           to: `/medicine/price`,
  //           roles: [ "isDev", "isAdmin" ],
  //         },
  //       ]
  //     },
  //     {
  //       id: 'schedule',
  //       icon: 'iconsminds-calendar-4',
  //       label: 'Jadwal Jaga',
  //       to: `/schedule`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-doctor',
  //           label: 'Jadwal Dokter',
  //           to: `/schedule/manage-doctor`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //         },
  //         {
  //           icon: 'iconsminds-male-female',
  //           label: 'Jadwal Non-Dokter',
  //           to: `/schedule/manage-employee`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //         },
  //       ]
  //     },
  //   ];
  // }

  // if(userData.roles.includes('isResepsionis') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     {
  //       id: 'patient',
  //       icon: 'iconsminds-add-user',
  //       label: 'Pasien',
  //       to: `/patient`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     // {
  //     //   id: 'insurance',
  //     //   icon: 'iconsminds-financial',
  //     //   label: 'Asuransi',
  //     //   to: `/insurance`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-bar-chart-4',
  //     //       label: 'Dashboard Asuransi',
  //     //       to: `/insurance/dashboard`,
  //     //       roles: [ "isDev", "isFinance", "isManajemen" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Asuransi',
  //     //       to: `/insurance/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-handshake',
  //     //       label: 'Kerjasama Asuransi',
  //     //       to: `/insurance/partnership`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'queue',
  //       icon: 'iconsminds-profile',
  //       label: 'Antrian',
  //       to: `/queue`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'schedule',
  //       icon: 'iconsminds-calendar-4',
  //       label: 'Jadwal Jaga',
  //       to: `/schedule`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-doctor',
  //           label: 'Jadwal Dokter',
  //           to: `/schedule/manage-doctor`,
  //         },
  //         {
  //           icon: 'iconsminds-male-female',
  //           label: 'Jadwal Non-Dokter',
  //           to: `/schedule/manage-employee`,
  //         },
  //       ]
  //     },
  //   ];
  // }

  // if(userData.roles.includes('isPerawat') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     {
  //       id: 'patient',
  //       icon: 'iconsminds-add-user',
  //       label: 'Pasien',
  //       to: `/patient`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     // {
  //     //   id: 'insurance',
  //     //   icon: 'iconsminds-financial',
  //     //   label: 'Asuransi',
  //     //   to: `/insurance`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-bar-chart-4',
  //     //       label: 'Dashboard Asuransi',
  //     //       to: `/insurance/dashboard`,
  //     //       roles: [ "isDev", "isFinance", "isManajemen" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Asuransi',
  //     //       to: `/insurance/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-handshake',
  //     //       label: 'Kerjasama Asuransi',
  //     //       to: `/insurance/partnership`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'queue',
  //       icon: 'iconsminds-profile',
  //       label: 'Antrian',
  //       to: `/queue`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     {
  //       id: 'record',
  //       icon: 'iconsminds-stethoscope',
  //       label: 'Kunjungan',
  //       to: `/record`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-pulse',
  //           label: 'Pra-Konsultasi',
  //           to: `/record/vital-signs`,
  //           roles: [ "isDev", "isPerawat", "isDokter" ],
  //         },
  //         // {
  //         //   icon: 'iconsminds-notepad',
  //         //   label: 'Rekam Medis',
  //         //   to: `/record`,
  //         //   roles: [ "isDev", "isDokter" ],
  //         // },
  //       ]
  //     },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'schedule',
  //       icon: 'iconsminds-calendar-4',
  //       label: 'Jadwal Jaga',
  //       to: `/schedule`,
  //       subs: [
  //         // {
  //         //   icon: 'iconsminds-doctor',
  //         //   label: 'Jadwal Dokter',
  //         //   to: `/schedule/manage-doctor`,
  //         //   roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //         // },
  //         {
  //           icon: 'iconsminds-male-female',
  //           label: 'Jadwal Non-Dokter',
  //           to: `/schedule/manage-employee`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //         },
  //       ]
  //     },
  //   ];
  // }
  
  // if(userData.roles.includes('isDokter') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     {
  //       id: 'patient',
  //       icon: 'iconsminds-add-user',
  //       label: 'Pasien',
  //       to: `/patient`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     // {
  //     //   id: 'insurance',
  //     //   icon: 'iconsminds-financial',
  //     //   label: 'Asuransi',
  //     //   to: `/insurance`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-bar-chart-4',
  //     //       label: 'Dashboard Asuransi',
  //     //       to: `/insurance/dashboard`,
  //     //       roles: [ "isDev", "isFinance", "isManajemen" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Asuransi',
  //     //       to: `/insurance/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-handshake',
  //     //       label: 'Kerjasama Asuransi',
  //     //       to: `/insurance/partnership`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'queue',
  //       icon: 'iconsminds-profile',
  //       label: 'Antrian',
  //       to: `/queue`,
  //       roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     },
  //     {
  //       id: 'record',
  //       icon: 'iconsminds-stethoscope',
  //       label: 'Kunjungan',
  //       to: `/record`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-pulse',
  //           label: 'Pra-Konsultasi',
  //           to: `/record/vital-signs`,
  //           roles: [ "isDev", "isPerawat", "isDokter" ],
  //         },
  //         {
  //           icon: 'iconsminds-notepad',
  //           label: 'Rekam Medis',
  //           to: `/record`,
  //           roles: [ "isDev", "isDokter" ],
  //         },
  //       ]
  //     },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       id: 'schedule',
  //       icon: 'iconsminds-calendar-4',
  //       label: 'Jadwal Jaga',
  //       to: `/schedule`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-doctor',
  //           label: 'Jadwal Dokter',
  //           to: `/schedule/manage-doctor`,
  //           roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //         },
  //         // {
  //         //   icon: 'iconsminds-male-female',
  //         //   label: 'Jadwal Non-Dokter',
  //         //   to: `/schedule/manage-employee`,
  //         //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //         // },
  //       ]
  //     },
  //   ];
  // }
  
  // if(userData.roles.includes('isManajemen') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     // {
  //     //   id: 'patient',
  //     //   icon: 'iconsminds-add-user',
  //     //   label: 'Pasien',
  //     //   to: `/patient`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     {
  //       id: 'insurance',
  //       icon: 'iconsminds-financial',
  //       label: 'Asuransi',
  //       to: `/insurance`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-bar-chart-4',
  //           label: 'Dashboard Asuransi',
  //           to: `/insurance/dashboard`,
  //           roles: [ "isDev", "isFinance", "isManajemen" ],
  //         },
  //         // {
  //         //   icon: 'iconsminds-library',
  //         //   label: 'Daftar Asuransi',
  //         //   to: `/insurance/list`,
  //         //   roles: [ "isDev", "isManager", "isAdmin" ],
  //         // },
  //         // {
  //         //   icon: 'iconsminds-handshake',
  //         //   label: 'Kerjasama Asuransi',
  //         //   to: `/insurance/partnership`,
  //         //   roles: [ "isDev", "isManager", "isAdmin" ],
  //         // },
  //       ]
  //     },
  //     // {
  //     //   id: 'queue',
  //     //   icon: 'iconsminds-profile',
  //     //   label: 'Antrian',
  //     //   to: `/queue`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'schedule',
  //     //   icon: 'iconsminds-calendar-4',
  //     //   label: 'Jadwal Jaga',
  //     //   to: `/schedule`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-doctor',
  //     //       label: 'Jadwal Dokter',
  //     //       to: `/schedule/manage-doctor`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-male-female',
  //     //       label: 'Jadwal Non-Dokter',
  //     //       to: `/schedule/manage-employee`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //     //     },
  //     //   ]
  //     // },
  //   ];
  // }
  
  // if(userData.roles.includes('isFinance') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     // {
  //     //   id: 'patient',
  //     //   icon: 'iconsminds-add-user',
  //     //   label: 'Pasien',
  //     //   to: `/patient`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     {
  //       id: 'insurance',
  //       icon: 'iconsminds-financial',
  //       label: 'Asuransi',
  //       to: `/insurance`,
  //       subs: [
  //         {
  //           icon: 'iconsminds-bar-chart-4',
  //           label: 'Dashboard Asuransi',
  //           to: `/insurance/dashboard`,
  //           roles: [ "isDev", "isFinance", "isManajemen" ],
  //         },
  //         // {
  //         //   icon: 'iconsminds-library',
  //         //   label: 'Daftar Asuransi',
  //         //   to: `/insurance/list`,
  //         //   roles: [ "isDev", "isManager", "isAdmin" ],
  //         // },
  //         // {
  //         //   icon: 'iconsminds-handshake',
  //         //   label: 'Kerjasama Asuransi',
  //         //   to: `/insurance/partnership`,
  //         //   roles: [ "isDev", "isManager", "isAdmin" ],
  //         // },
  //       ]
  //     },
  //     // {
  //     //   id: 'queue',
  //     //   icon: 'iconsminds-profile',
  //     //   label: 'Antrian',
  //     //   to: `/queue`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'schedule',
  //     //   icon: 'iconsminds-calendar-4',
  //     //   label: 'Jadwal Jaga',
  //     //   to: `/schedule`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-doctor',
  //     //       label: 'Jadwal Dokter',
  //     //       to: `/schedule/manage-doctor`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-male-female',
  //     //       label: 'Jadwal Non-Dokter',
  //     //       to: `/schedule/manage-employee`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //     //     },
  //     //   ]
  //     // },
  //   ];
  // }
  
  // if(userData.roles.includes('isCashier') === true){
  //   data = [
  //     {
  //       id: 'dashboard',
  //       icon: 'iconsminds-line-chart-1',
  //       label: 'Dashboard',
  //       to: `/dashboard`,
  //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
  //     },
  //     // {
  //     //   id: 'patient',
  //     //   icon: 'iconsminds-add-user',
  //     //   label: 'Pasien',
  //     //   to: `/patient`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'insurance',
  //     //   icon: 'iconsminds-financial',
  //     //   label: 'Asuransi',
  //     //   to: `/insurance`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-bar-chart-4',
  //     //       label: 'Dashboard Asuransi',
  //     //       to: `/insurance/dashboard`,
  //     //       roles: [ "isDev", "isFinance", "isManajemen" ],
  //     //     },
  //     //     // {
  //     //     //   icon: 'iconsminds-library',
  //     //     //   label: 'Daftar Asuransi',
  //     //     //   to: `/insurance/list`,
  //     //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     // },
  //     //     // {
  //     //     //   icon: 'iconsminds-handshake',
  //     //     //   label: 'Kerjasama Asuransi',
  //     //     //   to: `/insurance/partnership`,
  //     //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     // },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'queue',
  //     //   icon: 'iconsminds-profile',
  //     //   label: 'Antrian',
  //     //   to: `/queue`,
  //     //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  //     // },
  //     // {
  //     //   id: 'record',
  //     //   icon: 'iconsminds-stethoscope',
  //     //   label: 'Kunjungan',
  //     //   to: `/record`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-pulse',
  //     //       label: 'Pra-Konsultasi',
  //     //       to: `/record/vital-signs`,
  //     //       roles: [ "isDev", "isPerawat", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-notepad',
  //     //       label: 'Rekam Medis',
  //     //       to: `/record`,
  //     //       roles: [ "isDev", "isDokter" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'employee',
  //     //   icon: 'iconsminds-male-female',
  //     //   label: 'Karyawan',
  //     //   to: `/employee`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'division',
  //     //   icon: 'iconsminds-office',
  //     //   label: 'Poli / Divisi',
  //     //   to: `/division`,
  //     //   roles: [ "isDev", "isManager", "isAdmin" ],
  //     // },
  //     // {
  //     //   id: 'treatment',
  //     //   icon: 'iconsminds-ambulance',
  //     //   label: 'Tindakan',
  //     //   to: `/treatment`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Tindakan',
  //     //       to: `/treatment/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Tindakan',
  //     //       to: `/treatment/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'service',
  //     //   icon: 'iconsminds-first-aid',
  //     //   label: 'Layanan',
  //     //   to: `/service`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-library',
  //     //       label: 'Daftar Layanan',
  //     //       to: `/service/list`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-wallet',
  //     //       label: 'Harga Layanan',
  //     //       to: `/service/price`,
  //     //       roles: [ "isDev", "isManager", "isAdmin" ],
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'schedule',
  //     //   icon: 'iconsminds-calendar-4',
  //     //   label: 'Jadwal Jaga',
  //     //   to: `/schedule`,
  //     //   subs: [
  //     //     {
  //     //       icon: 'iconsminds-doctor',
  //     //       label: 'Jadwal Dokter',
  //     //       to: `/schedule/manage-doctor`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
  //     //     },
  //     //     {
  //     //       icon: 'iconsminds-male-female',
  //     //       label: 'Jadwal Non-Dokter',
  //     //       to: `/schedule/manage-employee`,
  //     //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
  //     //     },
  //     //   ]
  //     // },
  //   ];
  // } 
}


export default data;
