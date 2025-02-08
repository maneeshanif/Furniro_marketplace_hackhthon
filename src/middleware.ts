import { type NextRequest, NextResponse } from "next/server";


export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("token")?.value

    const path = req.nextUrl.pathname

    if (token) {
        if (path == "/login" || path == "/signup") return NextResponse.redirect(new URL("/", req.url),)

        NextResponse.next()
    }

    // if (!token) {
    //     if(path.startsWith("^\/checkout(\/.*)?$") ) return NextResponse.redirect( new URL("/login", req.url),);

    //     NextResponse.next()
    // }
    // if (!token) {
    //     if( path == "^\/profile(\/.*)?$" ) return NextResponse.redirect( new URL("/login", req.url),);

    //     NextResponse.next()
    // }

    // Create regex patterns
    const checkoutRegex = /^\/checkout(\/.*)?$/;
    const profileRegex = /^\/account(\/.*)?$/;

    if (!token) {
        if (checkoutRegex.test(path)) {
            return NextResponse.redirect(new URL("/signup", req.url));
        }
    }

    if (!token) {
        if (profileRegex.test(path)) {
            return NextResponse.redirect(new URL("/signup", req.url));
        }
    }

    return NextResponse.next()


}


export const config = {
    matcher: ["/login", "/signup", "/checkout/:path*", "/account/:path*"]
}