const userData = JSON.parse(localStorage.getItem('user_data'));
// console.log('userData', userData);
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
          to: `/consumables/clinic`,
        },
        {
          icon: 'iconsminds-doctor',
          label: 'Jasa Medis',
          to: `/med-service/clinic`,
        },
        {
          icon: 'iconsminds-flask',
          label: 'Laboratorium',
          to: `/laboratorium`,
        },
      ]
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
        {
          icon: 'iconsminds-clinic',
          label: 'Tanah & Bangunan',
          to: `/property`,
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
        {
          icon: 'iconsminds-library',
          label: 'Daftar Pemeriksaan',
          to: `/master-data/inspect`,
        },
        {
          icon: 'iconsminds-library',
          label: 'Daftar Vendor',
          to: `/master-data/vendor`,
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
  ];

  if(userData.roles.includes('isResepsionis') === true || userData.roles.includes('isPerawat') === true || userData.roles.includes('isDokter') === true){
    data.push(
      {
        id: 'patient',
        icon: 'iconsminds-add-user',
        label: 'Pasien',
        to: `/patient`,
      }
    )
  }

  if(userData.roles.includes('isResepsionis') === true || userData.roles.includes('isPerawat') === true || userData.roles.includes('isDokter') === true){
    data.push(
      {
        id: 'queue',
        icon: 'iconsminds-profile',
        label: 'Antrian',
        to: `/queue`,
      }
    )
  }

  if(userData.roles.includes('isPerawat') === true || userData.roles.includes('isDokter') === true){
    data.push(
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
        ]
      }
    )
  }

  if(userData.roles.includes('isDokter') === true){
    data[data.length - 1].subs.push(
      {
        icon: 'iconsminds-notepad',
        label: 'Rekam Medis',
        to: `/record`,
      }
    )
  }

  if(userData.roles.includes('isManager') === true || userData.roles.includes('isAdmin') === true){
    data.push(
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
        subs : [

        ]
      }
    )
  }

  if(userData.roles.includes('isManager') === true || userData.roles.includes('isAdmin') === true || userData.roles.includes('isDokter') === true){
    data[data.length - 1].subs.push(
      {
        icon: 'iconsminds-doctor',
        label: 'Jadwal Dokter',
        to: `/schedule/manage-doctor`,
      }
    )
  }

  if(userData.roles.includes('isManager') === true || userData.roles.includes('isAdmin') === true || userData.roles.includes('isResepsionis') === true || userData.roles.includes('isPerawat') === true){
    data[data.length - 1].subs.push(
      {
        icon: 'iconsminds-male-female',
        label: 'Jadwal Tenaga Kesehatan',
        to: `/schedule/manage-employee`,
      }
    )
  }

  if(userData.roles.includes('isAdmin') === true){
    data.push(
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
            to: `/consumables/clinic`,
          },
          {
            icon: 'iconsminds-doctor',
            label: 'Jasa Medis',
            to: `/med-service/clinic`,
          },
          {
            icon: 'iconsminds-flask',
            label: 'Laboratorium',
            to: `/laboratorium`,
          },
        ]
      }
    )
  }

  if(userData.roles.includes('isManager') === true || userData.roles.includes('isAdmin') === true || userData.roles.includes('isManajemen') === true || userData.roles.includes('isFinance') === true){
    data.push(
      {
        id: 'insurance',
        icon: 'iconsminds-financial',
        label: 'Asuransi',
        to: `/insurance`,
        subs: [
          
        ]
      }
    )
  }

  if(userData.roles.includes('isManajemen') === true || userData.roles.includes('isFinance') === true){
    data[data.length - 1].subs.push(
      {
        icon: 'iconsminds-bar-chart-4',
        label: 'Dashboard Asuransi',
        to: `/insurance/dashboard`,
      }
    )
  }

  if(userData.roles.includes('isManager') === true || userData.roles.includes('isAdmin') === true){
    data[data.length - 1].subs.push(
      {
        icon: 'iconsminds-handshake',
        label: 'Kerjasama Asuransi',
        to: `/insurance/partnership`,
      }
    )
  }

  if(userData.roles.includes('isAdmin') === true){
    data.push(
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
          {
            icon: 'iconsminds-clinic',
            label: 'Tanah & Bangunan',
            to: `/property`,
          },
        ]
      }
    )
  }
  
  if(userData.roles.includes('isCashier') === true){
    data.push(
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
      }
    )
  }
}

export default data;
