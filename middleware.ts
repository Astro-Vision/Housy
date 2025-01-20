import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/invoices", "/property", "/transaction"],
};
