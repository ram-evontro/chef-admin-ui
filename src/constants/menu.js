import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
  },
  {
    id: 'booking',
    icon: 'iconsminds-money-bag',
    label: 'menu.booking',
    to: `${adminRoot}/booking`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/booking/start`,
      },
    ],
  },
  {
    id: 'chef',
    icon: 'iconsminds-chef-hat',
    label: 'menu.chef',
    to: `${adminRoot}/chef`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-plus',
        label: 'menu.chefadd',
        to: `${adminRoot}/chef/add`,
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.chefviewall',
        to: `${adminRoot}/chef/list`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
];
export default data;
