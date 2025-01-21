import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/",
]);

const isPublicApiRoute = createRouteMatcher([
    "/", 
]);

export default clerkMiddleware(async (auth, req) => {
        const { userId } = await auth();
        const currentUrl = new URL(req.url);

        const isAccessingDashboard =  currentUrl.pathname === "/dashboard";
        const isApiRequest =  currentUrl.pathname.startsWith("/dashbaord");

        //if user is logged in and accessing the public route dashboard then redirect to dashboard(nothing changes)
        if(userId && isPublicRoute(req) && isAccessingDashboard){
            return NextResponse.redirect(new URL("/dashbaord", req.url));
        }
        //not logged in
        if(!userId){
            //if not logged in and accessing protective route
            if(!isPublicRoute(req) && !isPublicApiRoute(req))
            {
            return NextResponse.redirect(new URL("/", req.url));
            }
            //if not logged in and request is for api route
            if(isApiRequest && !isPublicApiRoute(req)){
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
        return NextResponse.next();
});
    
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  
}