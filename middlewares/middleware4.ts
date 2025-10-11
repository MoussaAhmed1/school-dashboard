import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";
import { can } from "@/utils/permissions";
import { Locale, i18n } from "@/i18n.config";

export function withRoleMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const pathname = request.nextUrl.pathname;
    
    // Skip role checking for auth routes, API routes, and static files
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/auth/') ||
      pathname === '/' ||
      pathname.includes('/signin') ||
      pathname.includes('/not-allowed')
    ) {
      return middleware(request, event, response);
    }
    
    // Handle /dashboard redirect to default page
    if (pathname === '/dashboard' || pathname.match(/^\/[a-z]{2}\/dashboard$/)) {
      const lang = pathname.split('/')[1] as Locale;
      const defaultUrl = new URL(`/${lang}/dashboard/pending-requests`, request.url);
      return NextResponse.redirect(defaultUrl);
    }
    
    // Check if this is a dashboard route and user is authenticated
    const isDashboardRoute = pathname.includes('/dashboard');
    
    if (isDashboardRoute && token?.role) {
      // Remove language prefix for permission check
      const routeWithoutLang = pathname.replace(/^\/[a-z]{2}/, '');
      
      // Check if user can access this route
      if (!can(token.role as string, routeWithoutLang)) {
        // Redirect to not-allowed page
        const lang = pathname.split('/')[1] as Locale;
        const notAllowedUrl = new URL(`/${lang}/not-allowed`, request.url);
        return NextResponse.redirect(notAllowedUrl);
      }
    }

    return middleware(request, event, response);
  };
}
