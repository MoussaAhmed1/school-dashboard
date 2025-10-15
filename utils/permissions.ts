import { Role } from "@/types/users";
import { NavItem } from "@/types";

// Define role-based permissions
export const ROLE_PERMISSIONS = {
  SECURITY: [
    "/",
    "/dashboard",
    "/not-allowed",
    "/dashboard/pending-requests",
    "/dashboard/confirmed-requests", 
    "/dashboard/history-of-requests",
    "/dashboard/profile"
  ],
  SCHOOL: [
    "/",
    "/dashboard",
    "/not-allowed",
    "/dashboard/pending-requests",
    "/dashboard/confirmed-requests",
    "/dashboard/history-of-requests", 
    "/dashboard/security",
    "/dashboard/security/new",
    "/dashboard/students",
    "/dashboard/requests-receiving-time",
    "/dashboard/notifications",
    "/dashboard/messages",
    "/dashboard/settings",
    "/dashboard/settings/about-us",
    "/dashboard/settings/faq", 
    "/dashboard/settings/terms-conditions",
    "/dashboard/settings/privacy-policy",
    "/dashboard/profile"
  ]
} as const;

// Navigation items with role restrictions
export const NAV_ITEMS_WITH_ROLES = {
  SECURITY: [
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
  ],
  SCHOOL: [
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
          label: "about_us"
        },
        {
          title: "FAQ",
          href: "/dashboard/settings/faq",
          label: "faq"
        },
        {
          title: "Terms and Conditions",
          href: "/dashboard/settings/terms-conditions",
          label: "terms_and_conditions"
        },
        {
          title: "privacyPolicy",
          href: "/dashboard/settings/privacy-policy",
          label: "privacyPolicy"
        },
      ],
    },
  ]
} as const;

/**
 * Check if a user with a specific role can access a route
 * @param role - User role (SECURITY, SCHOOL, etc.)
 * @param route - Route path to check
 * @returns boolean - true if access is allowed
 */
export function can(role: string, route: string): boolean {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  console.log(role, route);
  if (!permissions) return false;
  const baseRoutes = [
    "/pending-requests",
    "/confirmed-requests",
    "/history-of-requests"
  ];
  if (baseRoutes.some(baseRoute => route.includes(baseRoute))) {
    return true;
  }

  return permissions.some(permittedRoute => {
    // Exact match
    if (route === permittedRoute) return true;
    
    // Check for nested routes (e.g., /dashboard/settings/about-us matches /dashboard/settings)
    // return permittedRoute.startsWith(route) || route.startsWith(permittedRoute);
  });
}

/**
 * Get navigation items filtered by user role
 * @param role - User role
 * @returns Array of navigation items allowed for the role
 */
export function getNavItemsByRole(role: string): NavItem[] {
  const items = NAV_ITEMS_WITH_ROLES[role as keyof typeof NAV_ITEMS_WITH_ROLES] || [];
  return items.map(item => ({
    ...item,
    children: 'children' in item && item.children ? [...item.children] : undefined
  })) as NavItem[];
}

/**
 * Check if user can perform an action
 * @param role - User role
 * @param action - Action to check (e.g., 'view', 'edit', 'delete')
 * @param resource - Resource being accessed (e.g., 'students', 'requests')
 * @returns boolean - true if action is allowed
 */
export function canAction(role: string, action: string, resource: string): boolean {
  // Define action-based permissions
  const ACTION_PERMISSIONS = {
    SECURITY: {
      view: ['requests', 'profile'],
      edit: ['profile'],
      delete: []
    },
    SCHOOL: {
      view: ['requests', 'students', 'security', 'settings', 'profile'],
      edit: ['requests', 'students', 'security', 'settings', 'profile'],
      delete: ['students', 'security']
    }
  } as const;

  const rolePermissions = ACTION_PERMISSIONS[role as keyof typeof ACTION_PERMISSIONS];
  if (!rolePermissions) return false;

  const actionPermissions = rolePermissions[action as keyof typeof rolePermissions];
  return Array.isArray(actionPermissions) && actionPermissions.includes(resource);
}
