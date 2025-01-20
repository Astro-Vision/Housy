import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const userId = parseInt(params.userId);
    const bookings = await prisma.profile.findUnique({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    profile: true,
                    email: true
                }
            }
        }
    });
    return NextResponse.json(bookings);
}