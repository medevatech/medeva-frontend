// export const UserRole = {
//   Developer: 0
//   SuperAdmin: 1,
//   Admin: 2,
//   Receptionist: 3,
//   Nurse : 4,
//   Doctor : 5,
//   Management: 6
// };

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-sub-hidden';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

// export const firebaseConfig = {
//   apiKey: "AIzaSyCweVr8u-8evAlKuRTbaEqlVf_Ep4zVvj8",
//   authDomain: "medeva-38c94.firebaseapp.com",
//   databaseURL: "https://medeva-38c94.firebaseio.com",
//   projectId: "medeva-38c94",
//   storageBucket: "medeva-38c94.appspot.com",
//   messagingSenderId: "1093600906446"
// };

export const adminRoot = '/dashboard';
// export const buyUrl = 'https://1.envato.market/k4z0';
// export const searchPath = `${adminRoot}/#`;
export const searchPath = "/dashboard/pages/search";
export const servicePath = 'https://api.coloredstrategies.com';

// export const currentUser = {
//   id: 1,
//   title: 'Sarah Kortney',
//   img: '/assets/img/profiles/l-1.jpg',
//   date: 'Last seen today 15:24',
//   role: UserRole.Admin,
// };

// export const themeColorStorageKey = '__theme_selected_color';
// export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
// export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
// export const themeRadiusStorageKey = '__theme_radius';
export const themeColorStorageKey="__theme_color";
export const themeRadiusStorageKey = true;
export const isAuthGuardActive = true;
// export const colors = [
//   'bluenavy',
//   'blueyale',
//   'blueolympic',
//   'greenmoss',
//   'greenlime',
//   'purplemonster',
//   'orangecarrot',
//   'redruby',
//   'yellowgranola',
//   'greysteel',
// ];
