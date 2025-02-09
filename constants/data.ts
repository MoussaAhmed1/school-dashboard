import { NavItem } from "@/types";
export const ITEMS_PER_PAGE = 10


export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard/pending-requests",
    icon: "home",
    label: "home",
    subItems: false,
  },
  {
    title: "confirmedRequests",
    href: "/dashboard/confirmed-requests",
    icon: "trello",
    label: "confirmedRequests",
    subItems: false,
  },
  {
    title: "historyOfRequests",
    href: "/dashboard/history-of-requests",
    icon: "trello",
    label: "historyOfRequests",
    subItems: false,
  },
  {
    title: "security",
    href: "/dashboard/security",
    icon: "admin",
    label: "security",
    subItems: false,
  },
  {
    title: "students",
    href: "/dashboard/students",
    icon: "watches",
    label: "students",
    subItems: false,
  },
  {
    title: "requestsPickupTime",
    href: "/dashboard/requests-receiving-time",
    icon: "clock",
    label: "requestsPickupTime",
    subItems: false,
  },

  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: "notification",
    label: "notifications",
    subItems: false,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messages",
    label: "suggestionsComplaintsTitle",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "info",
    label: "general_settings",
    subItems: true,
    children: [
      {
        title: "About Us",
        href: "/dashboard/settings/about-us",
        label:"about_us"
      },
      {
        title: "FAQ",
        href: "/dashboard/settings/faq",
        label:"faq"
      },
      {
        title: "Terms and Conditions",
        href: "/dashboard/settings/terms-conditions",
        label:"terms_and_conditions"
      },
      {
        title: "privacyPolicy",
        href: "/dashboard/settings/privacy-policy",
        label:"privacyPolicy"
      },
    ],
  },
];
