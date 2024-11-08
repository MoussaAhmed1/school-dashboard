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

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "home",
    label: "home",
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
    title: "historyOfRequests",
    href: "/dashboard/history-of-requests",
    icon: "trello",
    label: "historyOfRequests",
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
        title: "Contact us",
        href: "/dashboard/settings/contact-us",
        label:"contact_us"
      },
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
