import { NextResponse, type NextRequest } from "next/server";
import { IsLoggedIn } from "./app/components/auth";




const protectedRoutes = ['/profile','/surfspots/add-surfspot', '/articles/add-article']

export default async function middleware(request : NextRequest) {
    
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)


    const user = await IsLoggedIn()

    if (isProtectedRoute && !user ) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
    }
    

    
}

