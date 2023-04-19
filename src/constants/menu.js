const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-line-chart-1',
    label: 'Dashboard',
    to: `/dashboard`,
    roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter", "isManajemen" ],
  },
  {
    id: 'patient',
    icon: 'iconsminds-add-user',
    label: 'Pasien',
    to: `/patient`,
    roles: [ "isDev", "isResepsionis", "isPerawat", "isDokter" ],
  },
  {
    id: 'record',
    icon: 'iconsminds-first-aid',
    label: 'Kunjungan',
    to: `/record`,
    subs: [
      {
        icon: 'iconsminds-pulse',
        label: 'Pra-Konsultasi',
        to: `/record/vital-signs`,
        roles: [ "isDev", "isPerawat" ],
      },
      {
        icon: 'iconsminds-notepad',
        label: 'Rekam Medis',
        to: `/record/data`,
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
    id: 'schedule',
    icon: 'iconsminds-calendar-4',
    label: 'Jadwal',
    to: `/schedule`,
    roles: [ "isDev", "isManager", "isAdmin", "isResepsionis", "isPerawat", "isDokter" ],
  },
];
export default data;
