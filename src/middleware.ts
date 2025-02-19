import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/", // Add more public routes if needed
]);

const isPublicApiRoute = createRouteMatcher([
    "/", // Specify actual public API endpoints
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentUrl = new URL(req.url);

    const isAccessingDashboard = currentUrl.pathname === "/dashboard";
    const isApiRequest = currentUrl.pathname.startsWith("/dashboard"); 

    // If user is logged in and trying to access a public route, redirect to dashboard
    if (userId && isPublicRoute(req) && isAccessingDashboard) {
        return NextResponse.redirect(new URL("/dashboard", req.url)); // Fixed typo
    }

    // If user is not logged in
    if (!userId) {
        // If trying to access a protected route (not public and not public API)
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // If making an API request that is protected
        if (isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
