import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const user = (request as any).user;
    if (!user) {
        throw new Error('User not found!');
    }
    return NextResponse.json(user);
}