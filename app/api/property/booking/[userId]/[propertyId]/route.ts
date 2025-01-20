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

        const property = await prisma.property.findUnique({
            where: {
                id: parseInt(params.propertyId),
            }
        });

        if (!property) {
            return NextResponse.json({
                message: "Property not found",
            }, { status: 404 });
        }

        let price;
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const days = timeDifference / (1000 * 60 * 60 * 24);

        if (property.typeOfRent === "DAY") {
            price = property.price * days;
        } else if (property.typeOfRent === "MONTH") {
            const months = Math.ceil(days / 30);
            price = property.price * months;
        } else if (property.typeOfRent === "YEAR") {
            const years = Math.ceil(days / 365);
            price = property.price * years;
        }
        if (!price) {
            return NextResponse.json({
                message: "Error calculating price",
            })
        }

        const booking = await prisma.booking.create({
            data: {
                checkIn: checkInDate,
                CheckOut: checkOutDate,
                userId: parseInt(params.userId),
                propertyId: parseInt(params.propertyId),
                price
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
