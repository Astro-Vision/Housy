import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const res = NextResponse.json({ message: "Logout successful" });
    res.cookies.delete('token');
    return res;
}