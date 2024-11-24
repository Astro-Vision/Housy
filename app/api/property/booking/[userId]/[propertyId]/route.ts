import { PrismaClient, Payment } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { userId: string; propertyId: string } }) {
    try {
        const { checkIn, checkOut, payment, image } = await req.json();
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (isNaN(checkInDate.getTime())) {
            return NextResponse.json({
                message: "Invalid check-in date format",
            }, { status: 400 });
        }
        if (isNaN(checkOutDate.getTime())) {
            return NextResponse.json({
                message: "Invalid check-out date format",
            }, { status: 400 });
        }
        if (checkOutDate <= checkInDate) {
            return NextResponse.json({
                message: "Check-out date must be after check-in date",
            }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                checkIn: checkInDate,
                CheckOut: checkOutDate,
                userId: parseInt(params.userId),
                propertyId: parseInt(params.propertyId),
            },
        });

        return NextResponse.json({
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({
            message: "Error creating booking",
            error: (error as Error).message,
        });
    }
}
