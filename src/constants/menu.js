const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-line-chart-1',
    label: 'Dashboard',
    to: `/dashboard`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'patient',
    icon: 'iconsminds-add-user',
    label: 'Pasien',
    to: `/patient`
    // roles: [UserRole.Admin, UserRole.Editor],
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
        // roles: [UserRole.Admin, UserRole.Editor],
      },
      {
        icon: 'iconsminds-notepad',
        label: 'Rekam Medis',
        to: `/record/data`,
        // roles: [UserRole.Admin, UserRole.Editor],
      },
    ]
  },
  {
    id: 'employee',
    icon: 'iconsminds-male-female',
    label: 'Karyawan',
    to: `/employee`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'schedule',
    icon: 'iconsminds-calendar-4',
    label: 'Jadwal',
    to: `/schedule`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
];
export default data;
