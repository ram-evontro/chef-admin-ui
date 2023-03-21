import { adminRoot } from "./defaultValues";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboard",
    to: `${adminRoot}/dashboards`,
  },
  {
    id: "booking",
    icon: "iconsminds-calendar-4",
    label: "menu.bookings",
    to: `${adminRoot}/booking`,
    subs: [],
  },
  {
    id: "chef",
    icon: "iconsminds-chef-hat",
    label: "menu.chef",
    to: `${adminRoot}/chef`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "simple-icon-list",
        label: "menu.chefviewall",
        to: `${adminRoot}/chef/list`,
      },
      {
        icon: "simple-icon-cup",
        label: "menu.chef_menus",
        to: `${adminRoot}/chef/allmenus`,
      },
      {
        icon: "simple-icon-calendar",
        label: "menu.chef_events",
        to: `${adminRoot}/chef/events`,
      },
      {
        icon: "simple-icon-note",
        label: "menu.chef_join_requests",
        to: `${adminRoot}/chef/chefrequests`,
      },
    ],
  },
  {
    id: "calls",
    icon: "iconsminds-headphone",
    label: "menu.requests",
    to: `${adminRoot}/menu`,
    notification:2,
    subs: [
      {
        icon: "simple-icon-phone",
        label: "menu.schedule_call",
        to: `${adminRoot}/request/schedule_call`,
      },
      {
        icon: "simple-icon-note",
        label: "menu.contact_us",
        to: `${adminRoot}/request/contact_us`,
      },
      {
        icon: "simple-icon-link",
        label: "menu.join_requests",
        to: `${adminRoot}/request/join_requests`,
      },
      {
        icon: "simple-icon-badge",
        label: "menu.patron",
        to: `${adminRoot}/request/patron`,
      },
      {
        icon: "simple-icon-people",
        label: "menu.partner",
        to: `${adminRoot}/request/patron`,
      },
    ],
  },
  {
    id: "settings",
    icon: "iconsminds-gears",
    label: "menu.settings",
    to: `${adminRoot}/menu`,
    subs: [
      {
        icon: "simple-icon-layers",
        label: "menu.taxonomy",
        to: `${adminRoot}/settings`,
        subs: [
          {
            icon: "simple-icon-arrow-right",
            label: "menu.chef_types",
            to: `${adminRoot}/settings/chef_types`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.feedback_parameters",
            to: `${adminRoot}/settings/feedback_parameters`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.meal_courses",
            to: `${adminRoot}/settings/meal_courses`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.cuisine",
            to: `${adminRoot}/settings/cuisine`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.meal_types",
            to: `${adminRoot}/settings/meal_types`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.meal_time",
            to: `${adminRoot}/settings/meal_time`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.country",
            to: `${adminRoot}/settings/country`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.city",
            to: `${adminRoot}/settings/city`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.partner_types",
            to: `${adminRoot}/settings/partner_type`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.patron_type",
            to: `${adminRoot}/settings/patron_type`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.occasion_types",
            to: `${adminRoot}/settings/occasion_type`,
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.addon_categories",
            to: `${adminRoot}/settings/addon_categories`,
          },
        ],
      },
      {
        icon: "simple-icon-screen-desktop",
        label: "menu.website_settings",
        to: `${adminRoot}/settings/website_settings`,
      },
      {
        icon: "simple-icon-handbag",
        label: "menu.booking_settings",
        to: `${adminRoot}/settings/booking_settings`,
      },
      {
        icon: "simple-icon-present",
        label: "menu.vouchers",
        to: `${adminRoot}/settings/vouchers`,
      },
      {
        icon: "simple-icon-speech",
        label: "menu.sms_templates",
        to: `${adminRoot}/settings/sms_templates`,
      },
      {
        icon: "simple-icon-envelope-letter",
        label: "menu.email_templates",
        to: `${adminRoot}/settings/email_templates`,
      },
      {
        icon: "simple-icon-layers",
        label: "menu.cms",
        to: `${adminRoot}/settings/cms`,
      },
    ],
  },
  {
    id: "diner",
    icon: "iconsminds-business-man",
    label: "menu.diners",
    to: `${adminRoot}/diner`,
    subs: [],
  },
  {
    id: "integrations",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.integrations",
    to: `${adminRoot}/integrations`,
    subs: [
      {
        icon: "simple-icon-map",
        label: "menu.google_maps",
        to: `${adminRoot}/integrations/google_maps`,
      },
      {
        icon: "simple-icon-event",
        label: "menu.google_calendar",
        to: `${adminRoot}/integrations/google_calendar`,
      },
      {
        icon: "simple-icon-envelope-open",
        label: "menu.mailchimp",
        to: `${adminRoot}/integrations/mailchimp`,
      },
      {
        icon: "simple-icon-social-pinterest",
        label: "menu.plivo",
        to: `${adminRoot}/integrations/plivo`,
      },
      {
        icon: "simple-icon-credit-card",
        label: "menu.razorpay",
        to: `${adminRoot}/integrations/razorpay`,
      },
      {
        icon: "simple-icon-basket-loaded",
        label: "menu.dunzo",
        to: `${adminRoot}/integrations/dunzo`,
      },
      {
        icon: "simple-icon-cloud-upload",
        label: "menu.s3_bucket",
        to: `${adminRoot}/integrations/s3`,
      },
      {
        icon: "simple-icon-notebook",
        label: "menu.quickbooks",
        to: `${adminRoot}/integrations/quickbooks`,
      },
    ],
  },
];
export default data;
