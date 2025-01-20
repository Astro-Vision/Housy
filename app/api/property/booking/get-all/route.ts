import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const bookings = await prisma.booking.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    profile: true,
                    Booking: {
                        select: {
                            property: true
                        }
                    }
                }
            }
        }
    });
    return NextResponse.json(bookings);
}