import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const userId = parseInt(params.userId);
    const bookings = await prisma.booking.findMany({
        where: {
            userId
        },
        include: {
            property: true,
            user: {
                select: {
                    profile: true
                }
            }
        }
    });
    return NextResponse.json(bookings);
}