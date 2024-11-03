import { NextResponse } from "next/server";
import { auth } from "./auth";
const AUTH_ROUTES = [
    '/sign-in',
    '/sign-up'
]
export default auth(async(req)=>{
    const isLoggedIn = !!req.auth
    if(isLoggedIn){
        if(AUTH_ROUTES.includes(req.nextUrl.pathname)){
            return NextResponse.redirect(new URL('/chat', req.nextUrl))
        }
    }
    else{
        if(req.nextUrl.pathname.includes('/chat')){
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
        }
    }
})