import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { propertyId: string } }) {
    try {
        const propertyId = parseInt(params.propertyId);
        if (isNaN(propertyId)) {
            return NextResponse.json({ message: "Invalid property ID" }, { status: 400 });
        }

        const body = await req.json();
        const {
            name,
            description,
            province,
            regency,
            district,
            village,
            address,
            price,
            typeOfRent,
            amenities,
            bedroom,
            bathroom,
            area,
        } = body;

        const property = await prisma.property.findUnique({
            where: { id: propertyId },
        });

        if (!property) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }

        await prisma.property.update({
            where: { id: propertyId },
            data: {
                name,
                description,
                province,
                regency,
                district,
                village,
                address,
                price,
                typeOfRent,
                amenities,
                bedroom,
                bathroom,
                area,
            },
        });

        return NextResponse.json({
            message: "Property updated successfully",
        });
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json(
            {
                message: "Error updating property",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
