

// const data = [
//   {
//     id: 'dashboard',
//     icon: 'iconsminds-line-chart-1',
//     label: 'Dashboard',
//     to: `/dashboard`,
//     roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
//   },
//   {
//     id: 'patient',
//     icon: 'iconsminds-add-user',
//     label: 'Pasien',
//     to: `/patient`,
//     roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
//   },
//   {
//     id: 'insurance',
//     icon: 'iconsminds-financial',
//     label: 'Asuransi',
//     to: `/insurance`,
//     subs: [
//       {
//         icon: 'iconsminds-bar-chart-4',
//         label: 'Dashboard Asuransi',
//         to: `/insurance/dashboard`,
//         roles: [ "isDev", "isFinance", "isManajemen" ],
//       },
//       {
//         icon: 'iconsminds-library',
//         label: 'Daftar Asuransi',
//         to: `/insurance/list`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//       {
//         icon: 'iconsminds-handshake',
//         label: 'Kerjasama Asuransi',
//         to: `/insurance/partnership`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//     ]
//   },
//   {
//     id: 'queue',
//     icon: 'iconsminds-profile',
//     label: 'Antrian',
//     to: `/queue`,
//     roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
//   },
//   {
//     id: 'record',
//     icon: 'iconsminds-stethoscope',
//     label: 'Kunjungan',
//     to: `/record`,
//     subs: [
//       {
//         icon: 'iconsminds-pulse',
//         label: 'Pra-Konsultasi',
//         to: `/record/vital-signs`,
//         roles: [ "isDev", "isPerawat", "isDokter" ],
//       },
//       {
//         icon: 'iconsminds-notepad',
//         label: 'Rekam Medis',
//         to: `/record`,
//         roles: [ "isDev", "isDokter" ],
//       },
//     ]
//   },
//   {
//     id: 'employee',
//     icon: 'iconsminds-male-female',
//     label: 'Karyawan',
//     to: `/employee`,
//     roles: [ "isDev", "isManager", "isAdmin" ],
//   },
//   {
//     id: 'division',
//     icon: 'iconsminds-office',
//     label: 'Poli / Divisi',
//     to: `/division`,
//     roles: [ "isDev", "isManager", "isAdmin" ],
//   },
//   {
//     id: 'treatment',
//     icon: 'iconsminds-ambulance',
//     label: 'Tindakan',
//     to: `/treatment`,
//     subs: [
//       {
//         icon: 'iconsminds-library',
//         label: 'Daftar Tindakan',
//         to: `/treatment/list`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//       {
//         icon: 'iconsminds-wallet',
//         label: 'Harga Tindakan',
//         to: `/treatment/price`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//     ]
//   },
//   {
//     id: 'service',
//     icon: 'iconsminds-first-aid',
//     label: 'Layanan',
//     to: `/service`,
//     subs: [
//       {
//         icon: 'iconsminds-library',
//         label: 'Daftar Layanan',
//         to: `/service/list`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//       {
//         icon: 'iconsminds-wallet',
//         label: 'Harga Layanan',
//         to: `/service/price`,
//         roles: [ "isDev", "isManager", "isAdmin" ],
//       },
//     ]
//   },
    // {
    //   id: 'medicine',
    //   icon: 'iconsminds-medicine-3',
    //   label: 'Obat',
    //   to: `/medicine`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Obat',
    //       to: `/medicine/list`,
    //       roles: [ "isDev", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Obat',
    //       to: `/medicine/price`,
    //       roles: [ "isDev", "isAdmin" ],
    //     },
    //   ]
    // }
//   // {
//   //   id: 'schedule',
//   //   icon: 'iconsminds-calendar-4',
//   //   label: 'Jadwal Jaga',
//   //   to: `/schedule`,
//   //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ],
//   // },
//   {
//     id: 'schedule',
//     icon: 'iconsminds-calendar-4',
//     label: 'Jadwal Jaga',
//     to: `/schedule`,
//     subs: [
//       {
//         icon: 'iconsminds-doctor',
//         label: 'Jadwal Dokter',
//         to: `/schedule/manage-doctor`,
//         roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
//       },
//       {
//         icon: 'iconsminds-male-female',
//         label: 'Jadwal Non-Dokter',
//         to: `/schedule/manage-employee`,
//         roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
//       },
//       // {
//       //   icon: 'iconsminds-watch',
//       //   label: 'Jadwal Shift',
//       //   to: `/schedule/shift`,
//       //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ],
//       // },
//     ]
//   },
// ];

const userData = JSON.parse(localStorage.getItem('user_data'));
// console.log('roles', userData.roles);
// console.log('isDev', userData.roles.includes('isDev'));
// console.log('isAdmin', userData.roles.includes('isAdmin'));

let data = [];

if(userData.roles.includes('isDev') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    {
      id: 'patient',
      icon: 'iconsminds-add-user',
      label: 'Pasien',
      to: `/patient`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
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
          roles: [ "isDev", "isFinance", "isManajemen" ],
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Asuransi',
          to: `/insurance/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-handshake',
          label: 'Kerjasama Asuransi',
          to: `/insurance/partnership`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'queue',
      icon: 'iconsminds-profile',
      label: 'Antrian',
      to: `/queue`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
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
          roles: [ "isDev", "isPerawat", "isDokter" ],
        },
        {
          icon: 'iconsminds-notepad',
          label: 'Rekam Medis',
          to: `/record`,
          roles: [ "isDev", "isDokter" ],
        },
      ]
    },
    {
      id: 'employee',
      icon: 'iconsminds-male-female',
      label: 'Karyawan',
      to: `/employee`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'division',
      icon: 'iconsminds-office',
      label: 'Poli / Divisi',
      to: `/division`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'treatment',
      icon: 'iconsminds-ambulance',
      label: 'Tindakan',
      to: `/treatment`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Tindakan',
          to: `/treatment/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Tindakan',
          to: `/treatment/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'service',
      icon: 'iconsminds-first-aid',
      label: 'Layanan',
      to: `/service`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Layanan',
          to: `/service/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Layanan',
          to: `/service/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'medicine',
      icon: 'iconsminds-medicine-3',
      label: 'Obat',
      to: `/medicine`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Obat',
          to: `/medicine`,
          roles: [ "isDev", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Obat',
          to: `/medicine/clinic`,
          roles: [ "isDev", "isAdmin" ],
        },
      ]
    },
    // {
    //   id: 'schedule',
    //   icon: 'iconsminds-calendar-4',
    //   label: 'Jadwal Jaga',
    //   to: `/schedule`,
    //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ],
    // },
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
          roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Non-Dokter',
          to: `/schedule/manage-employee`,
          roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        },
        // {
        //   icon: 'iconsminds-watch',
        //   label: 'Jadwal Shift',
        //   to: `/schedule/shift`,
        //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ],
        // },
      ]
    },
  ];
} else if(userData.roles.includes('isManager') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    // {
    //   id: 'patient',
    //   icon: 'iconsminds-add-user',
    //   label: 'Pasien',
    //   to: `/patient`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    {
      id: 'insurance',
      icon: 'iconsminds-financial',
      label: 'Asuransi',
      to: `/insurance`,
      subs: [
        // {
        //   icon: 'iconsminds-bar-chart-4',
        //   label: 'Dashboard Asuransi',
        //   to: `/insurance/dashboard`,
        //   roles: [ "isDev", "isFinance", "isManajemen" ],
        // },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Asuransi',
          to: `/insurance/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-handshake',
          label: 'Kerjasama Asuransi',
          to: `/insurance/partnership`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    // {
    //   id: 'queue',
    //   icon: 'iconsminds-profile',
    //   label: 'Antrian',
    //   to: `/queue`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    {
      id: 'employee',
      icon: 'iconsminds-male-female',
      label: 'Karyawan',
      to: `/employee`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'division',
      icon: 'iconsminds-office',
      label: 'Poli / Divisi',
      to: `/division`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'treatment',
      icon: 'iconsminds-ambulance',
      label: 'Tindakan',
      to: `/treatment`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Tindakan',
          to: `/treatment/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Tindakan',
          to: `/treatment/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'service',
      icon: 'iconsminds-first-aid',
      label: 'Layanan',
      to: `/service`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Layanan',
          to: `/service/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Layanan',
          to: `/service/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'medicine',
      icon: 'iconsminds-medicine-3',
      label: 'Obat',
      to: `/medicine`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Obat',
          to: `/medicine/list`,
          roles: [ "isDev", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Obat',
          to: `/medicine/price`,
          roles: [ "isDev", "isAdmin" ],
        },
      ]
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
          roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Non-Dokter',
          to: `/schedule/manage-employee`,
          roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        },
      ]
    },
  ];
} else if(userData.roles.includes('isAdmin') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    // {
    //   id: 'patient',
    //   icon: 'iconsminds-add-user',
    //   label: 'Pasien',
    //   to: `/patient`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'insurance',
    //   icon: 'iconsminds-financial',
    //   label: 'Asuransi',
    //   to: `/insurance`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-bar-chart-4',
    //       label: 'Dashboard Asuransi',
    //       to: `/insurance/dashboard`,
    //       roles: [ "isDev", "isFinance", "isManajemen" ],
    //     },
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Asuransi',
    //       to: `/insurance/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-handshake',
    //       label: 'Kerjasama Asuransi',
    //       to: `/insurance/partnership`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'queue',
    //   icon: 'iconsminds-profile',
    //   label: 'Antrian',
    //   to: `/queue`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    {
      id: 'employee',
      icon: 'iconsminds-male-female',
      label: 'Karyawan',
      to: `/employee`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'division',
      icon: 'iconsminds-office',
      label: 'Poli / Divisi',
      to: `/division`,
      roles: [ "isDev", "isManager", "isAdmin" ],
    },
    {
      id: 'treatment',
      icon: 'iconsminds-ambulance',
      label: 'Tindakan',
      to: `/treatment`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Tindakan',
          to: `/treatment/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Tindakan',
          to: `/treatment/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'service',
      icon: 'iconsminds-first-aid',
      label: 'Layanan',
      to: `/service`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Layanan',
          to: `/service/list`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Layanan',
          to: `/service/price`,
          roles: [ "isDev", "isManager", "isAdmin" ],
        },
      ]
    },
    {
      id: 'medicine',
      icon: 'iconsminds-medicine-3',
      label: 'Obat',
      to: `/medicine`,
      subs: [
        {
          icon: 'iconsminds-library',
          label: 'Daftar Obat',
          to: `/medicine/list`,
          roles: [ "isDev", "isAdmin" ],
        },
        {
          icon: 'iconsminds-wallet',
          label: 'Harga Obat',
          to: `/medicine/price`,
          roles: [ "isDev", "isAdmin" ],
        },
      ]
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
          roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Non-Dokter',
          to: `/schedule/manage-employee`,
          roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        },
      ]
    },
  ];
} else if(userData.roles.includes('isResepsionis') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    {
      id: 'patient',
      icon: 'iconsminds-add-user',
      label: 'Pasien',
      to: `/patient`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    },
    // {
    //   id: 'insurance',
    //   icon: 'iconsminds-financial',
    //   label: 'Asuransi',
    //   to: `/insurance`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-bar-chart-4',
    //       label: 'Dashboard Asuransi',
    //       to: `/insurance/dashboard`,
    //       roles: [ "isDev", "isFinance", "isManajemen" ],
    //     },
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Asuransi',
    //       to: `/insurance/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-handshake',
    //       label: 'Kerjasama Asuransi',
    //       to: `/insurance/partnership`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    {
      id: 'queue',
      icon: 'iconsminds-profile',
      label: 'Antrian',
      to: `/queue`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    {
      id: 'schedule',
      icon: 'iconsminds-calendar-4',
      label: 'Jadwal Jaga',
      to: `/schedule`,
      subs: [
        // {
        //   icon: 'iconsminds-doctor',
        //   label: 'Jadwal Dokter',
        //   to: `/schedule/manage-doctor`,
        //   roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        // },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Non-Dokter',
          to: `/schedule/manage-employee`,
          roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        },
      ]
    },
  ];
} else if(userData.roles.includes('isPerawat') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    {
      id: 'patient',
      icon: 'iconsminds-add-user',
      label: 'Pasien',
      to: `/patient`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    },
    // {
    //   id: 'insurance',
    //   icon: 'iconsminds-financial',
    //   label: 'Asuransi',
    //   to: `/insurance`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-bar-chart-4',
    //       label: 'Dashboard Asuransi',
    //       to: `/insurance/dashboard`,
    //       roles: [ "isDev", "isFinance", "isManajemen" ],
    //     },
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Asuransi',
    //       to: `/insurance/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-handshake',
    //       label: 'Kerjasama Asuransi',
    //       to: `/insurance/partnership`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    {
      id: 'queue',
      icon: 'iconsminds-profile',
      label: 'Antrian',
      to: `/queue`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
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
          roles: [ "isDev", "isPerawat", "isDokter" ],
        },
        // {
        //   icon: 'iconsminds-notepad',
        //   label: 'Rekam Medis',
        //   to: `/record`,
        //   roles: [ "isDev", "isDokter" ],
        // },
      ]
    },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    {
      id: 'schedule',
      icon: 'iconsminds-calendar-4',
      label: 'Jadwal Jaga',
      to: `/schedule`,
      subs: [
        // {
        //   icon: 'iconsminds-doctor',
        //   label: 'Jadwal Dokter',
        //   to: `/schedule/manage-doctor`,
        //   roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        // },
        {
          icon: 'iconsminds-male-female',
          label: 'Jadwal Non-Dokter',
          to: `/schedule/manage-employee`,
          roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        },
      ]
    },
  ];
} else if(userData.roles.includes('isDokter') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    {
      id: 'patient',
      icon: 'iconsminds-add-user',
      label: 'Pasien',
      to: `/patient`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    },
    // {
    //   id: 'insurance',
    //   icon: 'iconsminds-financial',
    //   label: 'Asuransi',
    //   to: `/insurance`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-bar-chart-4',
    //       label: 'Dashboard Asuransi',
    //       to: `/insurance/dashboard`,
    //       roles: [ "isDev", "isFinance", "isManajemen" ],
    //     },
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Asuransi',
    //       to: `/insurance/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-handshake',
    //       label: 'Kerjasama Asuransi',
    //       to: `/insurance/partnership`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    {
      id: 'queue',
      icon: 'iconsminds-profile',
      label: 'Antrian',
      to: `/queue`,
      roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
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
          roles: [ "isDev", "isPerawat", "isDokter" ],
        },
        {
          icon: 'iconsminds-notepad',
          label: 'Rekam Medis',
          to: `/record`,
          roles: [ "isDev", "isDokter" ],
        },
      ]
    },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
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
          roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
        },
        // {
        //   icon: 'iconsminds-male-female',
        //   label: 'Jadwal Non-Dokter',
        //   to: `/schedule/manage-employee`,
        //   roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
        // },
      ]
    },
  ];
} else if(userData.roles.includes('isManajemen') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    // {
    //   id: 'patient',
    //   icon: 'iconsminds-add-user',
    //   label: 'Pasien',
    //   to: `/patient`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
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
          roles: [ "isDev", "isFinance", "isManajemen" ],
        },
        // {
        //   icon: 'iconsminds-library',
        //   label: 'Daftar Asuransi',
        //   to: `/insurance/list`,
        //   roles: [ "isDev", "isManager", "isAdmin" ],
        // },
        // {
        //   icon: 'iconsminds-handshake',
        //   label: 'Kerjasama Asuransi',
        //   to: `/insurance/partnership`,
        //   roles: [ "isDev", "isManager", "isAdmin" ],
        // },
      ]
    },
    // {
    //   id: 'queue',
    //   icon: 'iconsminds-profile',
    //   label: 'Antrian',
    //   to: `/queue`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'schedule',
    //   icon: 'iconsminds-calendar-4',
    //   label: 'Jadwal Jaga',
    //   to: `/schedule`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-doctor',
    //       label: 'Jadwal Dokter',
    //       to: `/schedule/manage-doctor`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-male-female',
    //       label: 'Jadwal Non-Dokter',
    //       to: `/schedule/manage-employee`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
    //     },
    //   ]
    // },
  ];
} else if(userData.roles.includes('isFinance') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    // {
    //   id: 'patient',
    //   icon: 'iconsminds-add-user',
    //   label: 'Pasien',
    //   to: `/patient`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
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
          roles: [ "isDev", "isFinance", "isManajemen" ],
        },
        // {
        //   icon: 'iconsminds-library',
        //   label: 'Daftar Asuransi',
        //   to: `/insurance/list`,
        //   roles: [ "isDev", "isManager", "isAdmin" ],
        // },
        // {
        //   icon: 'iconsminds-handshake',
        //   label: 'Kerjasama Asuransi',
        //   to: `/insurance/partnership`,
        //   roles: [ "isDev", "isManager", "isAdmin" ],
        // },
      ]
    },
    // {
    //   id: 'queue',
    //   icon: 'iconsminds-profile',
    //   label: 'Antrian',
    //   to: `/queue`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'schedule',
    //   icon: 'iconsminds-calendar-4',
    //   label: 'Jadwal Jaga',
    //   to: `/schedule`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-doctor',
    //       label: 'Jadwal Dokter',
    //       to: `/schedule/manage-doctor`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-male-female',
    //       label: 'Jadwal Non-Dokter',
    //       to: `/schedule/manage-employee`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
    //     },
    //   ]
    // },
  ];
} else if(userData.roles.includes('isCashier') === true){
  data = [
    {
      id: 'dashboard',
      icon: 'iconsminds-line-chart-1',
      label: 'Dashboard',
      to: `/dashboard`,
      roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen", "isFinance", "isCashier" ],
    },
    // {
    //   id: 'patient',
    //   icon: 'iconsminds-add-user',
    //   label: 'Pasien',
    //   to: `/patient`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'insurance',
    //   icon: 'iconsminds-financial',
    //   label: 'Asuransi',
    //   to: `/insurance`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-bar-chart-4',
    //       label: 'Dashboard Asuransi',
    //       to: `/insurance/dashboard`,
    //       roles: [ "isDev", "isFinance", "isManajemen" ],
    //     },
    //     // {
    //     //   icon: 'iconsminds-library',
    //     //   label: 'Daftar Asuransi',
    //     //   to: `/insurance/list`,
    //     //   roles: [ "isDev", "isManager", "isAdmin" ],
    //     // },
    //     // {
    //     //   icon: 'iconsminds-handshake',
    //     //   label: 'Kerjasama Asuransi',
    //     //   to: `/insurance/partnership`,
    //     //   roles: [ "isDev", "isManager", "isAdmin" ],
    //     // },
    //   ]
    // },
    // {
    //   id: 'queue',
    //   icon: 'iconsminds-profile',
    //   label: 'Antrian',
    //   to: `/queue`,
    //   roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
    // },
    // {
    //   id: 'record',
    //   icon: 'iconsminds-stethoscope',
    //   label: 'Kunjungan',
    //   to: `/record`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-pulse',
    //       label: 'Pra-Konsultasi',
    //       to: `/record/vital-signs`,
    //       roles: [ "isDev", "isPerawat", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-notepad',
    //       label: 'Rekam Medis',
    //       to: `/record`,
    //       roles: [ "isDev", "isDokter" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'employee',
    //   icon: 'iconsminds-male-female',
    //   label: 'Karyawan',
    //   to: `/employee`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'division',
    //   icon: 'iconsminds-office',
    //   label: 'Poli / Divisi',
    //   to: `/division`,
    //   roles: [ "isDev", "isManager", "isAdmin" ],
    // },
    // {
    //   id: 'treatment',
    //   icon: 'iconsminds-ambulance',
    //   label: 'Tindakan',
    //   to: `/treatment`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Tindakan',
    //       to: `/treatment/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Tindakan',
    //       to: `/treatment/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'service',
    //   icon: 'iconsminds-first-aid',
    //   label: 'Layanan',
    //   to: `/service`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-library',
    //       label: 'Daftar Layanan',
    //       to: `/service/list`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //     {
    //       icon: 'iconsminds-wallet',
    //       label: 'Harga Layanan',
    //       to: `/service/price`,
    //       roles: [ "isDev", "isManager", "isAdmin" ],
    //     },
    //   ]
    // },
    // {
    //   id: 'schedule',
    //   icon: 'iconsminds-calendar-4',
    //   label: 'Jadwal Jaga',
    //   to: `/schedule`,
    //   subs: [
    //     {
    //       icon: 'iconsminds-doctor',
    //       label: 'Jadwal Dokter',
    //       to: `/schedule/manage-doctor`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isDokter" ],
    //     },
    //     {
    //       icon: 'iconsminds-male-female',
    //       label: 'Jadwal Non-Dokter',
    //       to: `/schedule/manage-employee`,
    //       roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat" ],
    //     },
    //   ]
    // },
  ];
} 


export default data;
