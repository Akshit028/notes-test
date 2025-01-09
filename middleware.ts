import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/notes"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (pathname === "/" && token) {
        return NextResponse.redirect(new URL("/notes", request.url));
    }
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
